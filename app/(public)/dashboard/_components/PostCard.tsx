import React from 'react';
import { Heart } from 'lucide-react';


interface SkillCardProps {
  title?: string;
  authorName?: string;
  wantsToLearn?: string[];
  imageUrl?: string;
  avatarUrl?: string;
}

const PostCard: React.FC<SkillCardProps> = ({
  title = "Public speaking",
  authorName = "Mahesh Lamsal",
  // Default pills added here
  wantsToLearn = ["Design", "Cooking", "Guitar"],
  imageUrl = "https://images.unsplash.com/photo-1475721027785-f74dea9f2672?auto=format&fit=crop&q=80&w=800",
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=Mahesh"
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 font-sans transition-all hover:shadow-md">
      {/* Card Header/Image Section */}
      <div className="relative mb-3">
        {/* Heart Icon (Top Right) */}
        <button 
          className="absolute top-2 right-2 z-10 p-1.5 text-gray-400 hover:text-red-500 transition-colors bg-white/60 backdrop-blur-sm rounded-full md:bg-transparent md:backdrop-none"
          aria-label="Like"
        >
          <Heart size={20} strokeWidth={1.5} />
        </button>

        {/* Hero Image */}
        <div className="w-full aspect-[4/3] overflow-hidden rounded-xl">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x500?text=Skill+Image";
            }}
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex items-start gap-3">
        {/* Profile Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <img 
              src={avatarUrl} 
              alt={authorName}
              className="w-full h-full object-cover bg-[#E0E7FF]"
            />
          </div>
        </div>

        {/* Text Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 leading-tight truncate">
            {title}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            By {authorName}
          </p>
          
          <div className="mt-2">
            {/* Pill Items */}
            <div className="flex flex-wrap gap-1.5">
              {wantsToLearn.slice(0, 2).map((skill, index) => (
                <span 
                  key={index}
                  className="px-2 py-0.5 bg-gray-50 border border-gray-100 text-gray-600 text-xs font-medium rounded-full"
                >
                  {skill}
                </span>
              ))}
              {wantsToLearn.length === 0 && (
                <span className="text-xs text-gray-400 italic">No skills listed</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;