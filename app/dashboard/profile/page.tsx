"use client";

import { useState, useEffect, useRef } from "react";
import { handleGetMyPosts, handleDeletePost } from "@/lib/actions/post-actions";
import { handleUpdateProfile } from "@/lib/actions/auth-actions";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { User, MapPin, Clock, Edit, Trash2, Camera, X } from "lucide-react";
import { BASE_URL } from "@/lib/api/axios";
import SafeImage from "@/app/_components/SafeImage";
import DeleteModal from "@/app/_components/DeleteModal";
import { toast } from "react-toastify";

interface Post {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  postPhoto: string;
  locationType: string;
  availability: string;
  duration: string;
  requirements: string[];
}

export default function ProfilePage() {
  const { user, setUser, checkAuth } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    username: user?.username || "",
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        username: user.username || "",
      });
    }
  }, [user]);

  const onDeletePost = (postId: string) => {
    setPostToDelete(postId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;
    
    setDeleteModalOpen(false);
    setDeletingId(postToDelete);
    const result = await handleDeletePost(postToDelete);
    setDeletingId(null);

    if (result.success) {
      toast.success("Post deleted successfully");
      setPosts(posts.filter((p) => p._id !== postToDelete));
    } else {
      toast.error(result.message || "Failed to delete post");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    const result = await handleUpdateProfile({
      fullName: formData.fullName,
      profilePicture: profilePicture || undefined,
    });

    setUpdating(false);

    if (result.success) {
      toast.success("Profile updated successfully");
      if (result.data) {
        setUser(result.data);
      }
      setIsEditing(false);
      setProfilePicture(null);
      setPreviewUrl(null);
    } else {
      toast.error(result.message || "Failed to update profile");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setProfilePicture(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoadingPosts(true);
      const result = await handleGetMyPosts("1", "100");
      if (result.success && result.data) {
        setPosts(result.data as Post[]);
      }
      setLoadingPosts(false);
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-[#fff2e0] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-c3 to-c4 flex items-center justify-center overflow-hidden">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : user?.profilePicture ? (
                  <SafeImage
                    src={BASE_URL + user.profilePicture}
                    alt={user.username}
                    width={96}
                    height={96}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-white" />
                )}
              </div>
              <button
                onClick={() => setIsEditing(true)}
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
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-c5 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>

        {loadingPosts ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-c5"></div>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
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
                    onClick={() => onDeletePost(post._id)}
                    disabled={deletingId === post._id}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
                  >
                    {deletingId === post._id ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-500 text-lg">
              You haven't created any posts yet
            </p>
            <Link
              href="/dashboard"
              className="inline-block mt-4 px-5 py-2.5 bg-c5 text-white rounded-full text-sm font-medium hover:bg-purple-700 transition-colors"
            >
              Create your first post
            </Link>
          </div>
        )}
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setProfilePicture(null);
                  setPreviewUrl(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-c3 to-c4 flex items-center justify-center overflow-hidden">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : user?.profilePicture ? (
                      <SafeImage
                        src={BASE_URL + user.profilePicture}
                        alt={user.username}
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
                    onChange={handleImageChange}
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
                      onClick={removeImage}
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
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-c5"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setProfilePicture(null);
                    setPreviewUrl(null);
                  }}
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
      )}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Post"
        description="Are you sure you want to delete this post? This action cannot be undone."
      />
    </div>
  );
}
