"use client";

import Link from "next/link";
import { MapPin, Clock, Edit, Trash2 } from "lucide-react";
import { BASE_URL } from "@/lib/api/axios";
import SafeImage from "@/app/_components/SafeImage";

interface Post {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  postPhoto: string;
  locationType: string;
  availability: string;
}

interface PostCardProps {
  post: Post;
  onDelete: (postId: string) => void;
  isDeleting: boolean;
}

export default function PostCard({ post, onDelete, isDeleting }: PostCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="relative mb-3">
        <div className="w-full aspect-[4/3] overflow-hidden rounded-xl">
          <SafeImage
            width={300}
            height={300}
            src={
              post.postPhoto
                ? BASE_URL + post.postPhoto
                : "/images/skillplaceholder.jpg"
            }
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <h3 className="font-semibold text-gray-900 mb-2 truncate">
        {post.title}
      </h3>
      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
        {post.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {post.tags?.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="px-2 py-0.5 bg-gray-50 border border-gray-100 text-gray-600 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
        <span className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" />
          {post.locationType}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {post.availability}
        </span>
      </div>

      <div className="flex gap-2">
        <Link
          href={`/dashboard/profile/${post._id}`}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-c5 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
        >
          <Edit className="w-4 h-4" />
          Edit
        </Link>
        <button
          onClick={() => onDelete(post._id)}
          disabled={isDeleting}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
        >
          {isDeleting ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
