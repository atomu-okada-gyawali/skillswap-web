import React from "react";
import { Heart } from "lucide-react";
import Link from "next/link";
import SafeImage from "@/app/_components/SafeImage";

interface SkillCardProps {
  id: string;
  title: string;
  authorName: string;
  tag?: string;
  imageUrl?: string;
  avatarUrl?: string;
  isFavorited?: boolean;
  onToggleFavorite?: (postId: string) => void;
}

const PostCard: React.FC<SkillCardProps> = ({
  id,
  title,
  authorName,
  tag,
  imageUrl,
  avatarUrl,
  isFavorited = false,
  onToggleFavorite,
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(id);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 font-sans transition-all hover:shadow-md">
      <Link href={`/dashboard/explore/${id}`} className="block">
        <div className="relative mb-3">
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 z-10 p-1.5 backdrop-blur-sm rounded-full md:bg-transparent md:backdrop-none transition-colors ${
              isFavorited
                ? "text-red-500 bg-white/60"
                : "text-gray-400 hover:text-red-500 bg-white/60"
            }`}
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              size={20}
              strokeWidth={1.5}
              fill={isFavorited ? "currentColor" : "none"}
            />
          </button>

          <div className="w-full aspect-[4/3] overflow-hidden rounded-xl">
            <SafeImage
              width={300}
              height={300}
              src={imageUrl ? imageUrl : "/images/skillplaceholder.jpg"}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <SafeImage
                height={40}
                width={40}
                src={avatarUrl ? avatarUrl : "/images/avatarplaceholder.png"}
                alt={authorName}
                className="w-full h-full object-cover bg-[#E0E7FF]"
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 leading-tight truncate">
              {title}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">By {authorName}</p>

            <div className="mt-2">
              {tag ? (
                <span className="px-2 py-0.5 bg-gray-50 border border-gray-100 text-gray-600 text-xs font-medium rounded-full">
                  {tag}
                </span>
              ) : (
                <span className="text-xs text-gray-400 italic">
                  No tag listed
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
