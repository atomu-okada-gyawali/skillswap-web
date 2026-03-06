"use client";

import { useState, useRef, useEffect } from "react";
import { User, Camera, X } from "lucide-react";
import { BASE_URL } from "@/lib/api/axios";
import SafeImage from "@/app/_components/SafeImage";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    fullName?: string;
    username?: string;
    profilePicture?: string;
  } | null;
  formData: {
    fullName: string;
    username: string;
  };
  onFormDataChange: (data: { fullName: string; username: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
  onImageChange: (file: File | null) => void;
  previewUrl: string | null;
  updating: boolean;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  user,
  formData,
  onFormDataChange,
  onSubmit,
  onImageChange,
  previewUrl,
  updating,
}: EditProfileModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-c3 to-c4 flex items-center justify-center overflow-hidden">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : user?.profilePicture ? (
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
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  onImageChange(file || null);
                }}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-8 h-8 bg-c5 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
              {previewUrl && (
                <button
                  type="button"
                  onClick={() => onImageChange(null)}
                  className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => onFormDataChange({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-c5"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updating}
              className="flex-1 px-4 py-2 bg-c5 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {updating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
