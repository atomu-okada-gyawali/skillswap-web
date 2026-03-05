"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { handleGetOneTag, handleUpdateTag } from "@/lib/actions/admin/tag-actions";
import { Tag, Upload, ArrowLeft } from "lucide-react";
import { BASE_URL } from "@/lib/api/axios";

interface TagData {
  _id: string;
  name: string;
  tagImage?: string;
}

export default function EditTagPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [tagImage, setTagImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [tagId, setTagId] = useState<string>("");

  useEffect(() => {
    const fetchTag = async () => {
      const resolvedParams = await params;
      setTagId(resolvedParams.id);
      const result = await handleGetOneTag(resolvedParams.id);
      if (result.success && result.data) {
        const tag = result.data as TagData;
        setName(tag.name);
        if (tag.tagImage) {
          setExistingImage(BASE_URL + tag.tagImage);
        }
      }
    };
    fetchTag();
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    if (tagImage) {
      formData.append("tagImage", tagImage);
    }

    const result = await handleUpdateTag(tagId, formData);

    setLoading(false);

    if (result.success) {
      router.push("/admin/tags");
    } else {
      alert(result.message || "Failed to update tag");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTagImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <a
          href="/admin/tags"
          className="p-2 hover:bg-c1 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-c7" />
        </a>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-c5 rounded-lg flex items-center justify-center">
            <Tag className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-c7">Edit Tag</h1>
            <p className="text-sm text-c7 opacity-70">Update skill tag</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-c2 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-c7 mb-2">
              Tag Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-c2 rounded-lg focus:outline-none focus:ring-2 focus:ring-c5 focus:border-transparent"
              placeholder="Enter tag name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-c7 mb-2">
              Tag Image
            </label>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-lg border-2 border-dashed border-c3 flex items-center justify-center overflow-hidden bg-c1">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : existingImage ? (
                    <img
                      src={existingImage}
                      alt="Current"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Upload className="w-8 h-8 text-c3" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="tagImage"
                />
                <label
                  htmlFor="tagImage"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-c1 text-c7 rounded-lg cursor-pointer hover:bg-c2 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Upload Image
                </label>
                <p className="text-xs text-c7 mt-2 opacity-70">
                  Recommended: Square image, max 2MB
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-c5 text-white rounded-lg font-medium hover:bg-c4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <a
              href="/admin/tags"
              className="px-4 py-2 bg-c1 text-c7 rounded-lg font-medium hover:bg-c2 transition-colors"
            >
              Cancel
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
