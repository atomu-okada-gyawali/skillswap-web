"use client";

import Link from "next/link";
import PostCard from "./PostCard";

interface Post {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  postPhoto: string;
  locationType: string;
  availability: string;
}

interface PostsGridProps {
  posts: Post[];
  loading: boolean;
  deletingId: string | null;
  onDelete: (postId: string) => void;
}

export default function PostsGrid({
  posts,
  loading,
  deletingId,
  onDelete,
}: PostsGridProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-c5"></div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
        <p className="text-gray-500 text-lg">
          You havent created any posts yet
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          onDelete={onDelete}
          isDeleting={deletingId === post._id}
        />
      ))}
    </div>
  );
}
