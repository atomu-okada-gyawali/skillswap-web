"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, X, Plus, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { handleUpdatePost, handleGetOnePost } from "@/lib/actions/post-actions";
import { handleGetAllTags } from "@/lib/actions/tag-actions";
import { PostSchema } from "./schema";
import Link from "next/link";
import SafeImage from "@/app/_components/SafeImage";
import { BASE_URL } from "@/lib/api/axios";

type PostFormData = z.infer<typeof PostSchema>;

interface PostData {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  postPhoto: string;
  requirements: string[];
  locationType: string;
  availability: string;
  duration: string;
}

interface Tag {
  _id: string;
  name: string;
}

export default function EditPostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const [postId, setPostId] = useState<string>("");
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [requirement, setRequirement] = useState("");
  const [requirements, setRequirements] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [existingPhoto, setExistingPhoto] = useState<string | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTagId, setSelectedTagId] = useState<string>("");

  useEffect(() => {
    const init = async () => {
      const { postId: id } = await params;
      setPostId(id);

      const fetchTags = async () => {
        const result = await handleGetAllTags();
        if (result.success && result.data) {
          setTags(result.data);
        }
      };
      fetchTags();

      const fetchPost = async () => {
        try {
          const result = await handleGetOnePost(id);
          if (result.success && result.data) {
            const postData = result.data as PostData;
            setPost(postData);
            setRequirements(postData.requirements || []);
            setExistingPhoto(postData.postPhoto);
            setSelectedTagId(postData.tags?.[0] || "");
            setValue("title", postData.title);
            setValue("description", postData.description);
            setValue("locationType", postData.locationType);
            setValue("availability", postData.availability);
            setValue("duration", postData.duration || "");
            setValue("tag", postData.tags || []);
            setValue("requirements", postData.requirements || []);
          }
        } catch (error) {
          toast.error("Failed to load post");
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    };
    init();
  }, [params]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: "",
      description: "",
      requirements: [],
      tag: [],
      locationType: "",
      availability: "",
      duration: "",
    },
  });

  const addRequirement = () => {
    if (requirement.trim()) {
      const newRequirements = [...requirements, requirement.trim()];
      setRequirements(newRequirements);
      setValue("requirements", newRequirements);
      setRequirement("");
    }
  };

  const removeRequirement = (index: number) => {
    const newRequirements = requirements.filter((_, i) => i !== index);
    setRequirements(newRequirements);
    setValue("requirements", newRequirements);
  };

  const onSubmit = async (data: PostFormData) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("locationType", data.locationType);
      formData.append("availability", data.availability);
      if (data.duration) formData.append("duration", data.duration);
      if (requirements.length > 0) {
        requirements.forEach((req) => formData.append("requirements", req));
      }
      if (selectedTagId) formData.append("tag", selectedTagId);
      if (selectedFile) formData.append("postPhoto", selectedFile);

      const result = await handleUpdatePost(postId, formData);
      if (result.success) {
        toast.success("Post updated successfully!");
      } else {
        toast.error(result.message || "Failed to update post");
      }
    } catch {
      toast.error("Failed to update post");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fff2e0] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-c5"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#fff2e0] flex items-center justify-center">
        <p className="text-gray-500">Post not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff2e0] p-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/dashboard/profile"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Profile</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Post</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                {...register("title")}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-c5 focus:border-c5 outline-none transition-colors"
                placeholder="What skill do you want to teach?"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("description")}
                rows={5}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-c5 focus:border-c5 outline-none transition-colors resize-none"
                placeholder="Describe your skill and what you're looking to learn..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Post Photo
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-c5 hover:bg-gray-50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedFile(file);
                        setPreviewUrl(URL.createObjectURL(file));
                      }
                    }}
                  />
                  {previewUrl ? (
                    <div className="relative w-full h-full p-2">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-contain rounded"
                      />
                    </div>
                  ) : existingPhoto ? (
                    <div className="relative w-full h-full p-2">
                      <SafeImage
                        src={BASE_URL + existingPhoto}
                        alt="Current photo"
                        fill
                        className="object-contain rounded"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-gray-400">
                      <Upload className="w-8 h-8 mb-2" />
                      <span className="text-sm">Click to upload</span>
                    </div>
                  )}
                </label>
                {(selectedFile || existingPhoto) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                      setExistingPhoto(null);
                    }}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Requirements
              </label>
              <div className="flex gap-2">
                <input
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addRequirement())
                  }
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-c5 focus:border-c5 outline-none transition-colors"
                  placeholder="Add a requirement"
                />
                <button
                  type="button"
                  onClick={addRequirement}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  <Plus className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              {requirements.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {requirements.map((req, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-c5/10 text-c5 rounded-full text-sm"
                    >
                      {req}
                      <button
                        type="button"
                        onClick={() => removeRequirement(index)}
                        className="hover:text-purple-900"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              {tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag._id}
                      type="button"
                      onClick={() => {
                        const newTagId =
                          selectedTagId === tag._id ? "" : tag._id;
                        setSelectedTagId(newTagId);
                        setValue("tag", newTagId ? [newTagId] : []);
                      }}
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                        selectedTagId === tag._id
                          ? "bg-c5 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No tags available</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location Type <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("locationType")}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-c5 focus:border-c5 outline-none transition-colors bg-white"
                >
                  <option value="">Select location type</option>
                  <option value="remote">Remote</option>
                  <option value="onsite">On-site</option>
                  <option value="hybrid">Hybrid</option>
                </select>
                {errors.locationType && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.locationType.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Availability <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("availability")}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-c5 focus:border-c5 outline-none transition-colors bg-white"
                >
                  <option value="">Select availability</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="weekends">Weekends</option>
                  <option value="flexible">Flexible</option>
                </select>
                {errors.availability && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.availability.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <input
                {...register("duration")}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-c5 focus:border-c5 outline-none transition-colors"
                placeholder="e.g., 1 month, ongoing"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Link
                href="/dashboard/profile"
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 text-sm font-medium text-white bg-c5 hover:bg-purple-700 rounded-xl transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
