"use client";

import { User, Camera, Edit } from "lucide-react";
import { BASE_URL } from "@/lib/api/axios";
import SafeImage from "@/app/_components/SafeImage";

interface ProfileHeaderProps {
  user: {
    fullName?: string;
    username?: string;
    email?: string;
    profilePicture?: string;
  } | null;
  onEditClick: () => void;
}

export default function ProfileHeader({ user, onEditClick }: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-c3 to-c4 flex items-center justify-center overflow-hidden">
            {user?.profilePicture ? (
              <SafeImage
                src={BASE_URL + user.profilePicture}
                alt={user.username || "User"}
                width={96}
                height={96}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-white" />
            )}
          </div>
          <button
            onClick={onEditClick}
            className="absolute bottom-0 right-0 w-8 h-8 bg-c5 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">
            {user?.fullName || "User"}
          </h1>
          <p className="text-gray-500">@{user?.username}</p>
          <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
        </div>
        <button
          onClick={onEditClick}
          className="flex items-center gap-2 px-4 py-2 bg-c5 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
        >
          <Edit className="w-4 h-4" />
          Edit Profile
        </button>
      </div>
    </div>
  );
}
