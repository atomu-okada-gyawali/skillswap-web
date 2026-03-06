"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import Link from "next/link";
import PostCard from "../explore/_components/PostCard";
import {
  handleGetFavorites,
  handleCreateFavorite,
  handleDeleteFavorite,
  handleGetUserFavoritePostIds,
} from "@/lib/actions/favorite-actions";
import { BASE_URL } from "@/lib/api/axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

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

export default function FavoritesPage() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [favoritePostIds, setFavoritePostIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      const result = await handleGetFavorites(
        currentPage.toString(),
        ITEMS_PER_PAGE.toString(),
      );
      if (result.success && result.data) {
        setPosts(result.data as Post[]);
        setTotalPosts(result.pagination?.total || 0);
      }
      setLoading(false);
    };

    const fetchFavoriteIds = async () => {
      const result = await handleGetUserFavoritePostIds();
      if (result.success && result.data) {
        setFavoritePostIds(result.data as string[]);
      }
    };

    if (user?._id) {
      fetchFavorites();
      fetchFavoriteIds();
    }
  }, [currentPage, user?._id]);

  const handleToggleFavorite = async (postId: string) => {
    const isFavorited = favoritePostIds.includes(postId);
    let result;
    if (isFavorited) {
      result = await handleDeleteFavorite(postId);
    } else {
      result = await handleCreateFavorite(postId);
    }

    if (result.success) {
      if (isFavorited) {
        setFavoritePostIds((prev) => prev.filter((id) => id !== postId));
        setPosts((prev) => prev.filter((post) => post._id !== postId));
        toast.success("Removed from favorites");
      } else {
        setFavoritePostIds((prev) => [...prev, postId]);
        toast.success("Added to favorites");
      }
    } else {
      toast.error(result.message || "Failed to update favorite");
    }
  };

  const totalPages = Math.ceil(totalPosts / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#fff2e0] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
          <p className="text-gray-600">
            Posts you have saved for later
          </p>
        </div>

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
                imageUrl={
                  post.postPhoto ? BASE_URL + post.postPhoto : undefined
                }
                avatarUrl={
                  post.userId.profilePicture
                    ? BASE_URL + post.userId.profilePicture
                    : undefined
                }
                isFavorited={favoritePostIds.includes(post._id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="flex flex-col items-center gap-4">
                <Heart className="w-16 h-16 text-gray-300" />
                <p className="text-gray-500 text-lg">
                  You haven&apos;t favorited any posts yet.
                </p>
                <Link
                  href="/dashboard/explore"
                  className="px-4 py-2 bg-c5 text-white rounded-full hover:bg-purple-700 transition-colors"
                >
                  Explore Skills
                </Link>
              </div>
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
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
