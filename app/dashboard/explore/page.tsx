"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Plus,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import PostCard from "./_components/PostCard";
import CreatePostModal from "./_components/CreatePostModal";
import { handleGetAllPosts } from "@/lib/actions/post-actions";
import { BASE_URL } from "@/lib/api/axios";
import { useAuth } from "@/context/AuthContext";
const ITEMS_PER_PAGE = 6;

interface Post {
  _id: string;
  userId: {
    username: string;
    profilePicture: string;
    _id: string;
    fullName: string;
  };
  tags: string[];
  title: string;
  description: string;
  postPhoto: string;
  requirements: string[];
  locationType: string;
  availability: string;
  duration: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "title">(
    "recent",
  );
  const [showFilters, setShowFilters] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const result = await handleGetAllPosts(
        currentPage.toString(),
        ITEMS_PER_PAGE.toString(),
        searchQuery,
        user?._id,
      );
      if (result.success && result.data) {
        setPosts(result.data as Post[]);
        setTotalPosts(result.pagination?.total || 0);
      }
      setLoading(false);
    };
    if (user?._id) {
      fetchPosts();
    }
  }, [currentPage, searchQuery, user?._id]);

  const totalPages = Math.ceil(totalPosts / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#fff2e0] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Explore Skills</h1>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">Filter</span>
            </button>

            <button
              onClick={() =>
                setSortBy(
                  sortBy === "recent"
                    ? "popular"
                    : sortBy === "popular"
                      ? "title"
                      : "recent",
                )
              }
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="hidden sm:inline capitalize">{sortBy}</span>
            </button>

            <button
              onClick={() => setIsCreatePostOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-c5 text-white rounded-full hover:bg-purple-700 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Create Post</span>
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mb-6 p-4 bg-white rounded-2xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Filters</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Design",
                "Music",
                "Tech",
                "Cooking",
                "Art",
                "Fitness",
                "Marketing",
              ].map((tag) => (
                <button
                  key={tag}
                  className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-c4 hover:text-c5-700 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {loading ? (
            <div className="col-span-full flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-c5"></div>
            </div>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post._id}
                tags={post.tags}
                id={post._id}
                title={post.title}
                authorName={post.userId.username}
                // tags={post.wantsToLearn}
                imageUrl={post.postPhoto ? BASE_URL + post.postPhoto : undefined}
                avatarUrl={post.userId.profilePicture ? BASE_URL + post.userId.profilePicture : undefined}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                No skills found matching your search.
              </p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full font-medium transition-colors ${
                  currentPage === page
                    ? "bg-orange-500 text-white"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        <CreatePostModal
          isOpen={isCreatePostOpen}
          onClose={() => setIsCreatePostOpen(false)}
        />
      </div>
    </div>
  );
}
