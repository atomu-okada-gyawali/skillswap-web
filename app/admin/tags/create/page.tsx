"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleTagSubmission } from "@/lib/actions/admin/tag-actions";
import { Tag, Upload, ArrowLeft } from "lucide-react";

export default function CreateTagPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [tagImage, setTagImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await handleTagSubmission({ name, tagImage: tagImage || undefined });

    setLoading(false);

    if (result.success) {
      router.push("/admin/tags");
    } else {
      alert(result.message || "Failed to create tag");
    }
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            <h1 className="text-xl font-bold text-c7">Create Tag</h1>
            <p className="text-sm text-c7 opacity-70">Add a new skill tag</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-c2 shadow-sm overflow-hidden">
        <div className="p-8">
          <form onSubmit={onSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-c7/80">
                Tag Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-c2 rounded-xl focus:outline-none focus:ring-2 focus:ring-c5/20 focus:border-c5 transition-all placeholder:text-c7/30"
                placeholder="e.g. Graphic Design"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-c7/80">
                Tag Image
              </label>
              <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-c2 hover:border-c5/50 transition-colors group">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-xl bg-white shadow-sm flex items-center justify-center overflow-hidden border border-c2">
                    {preview || tagImage ? (
                      <img
                        src={preview || tagImage ? URL.createObjectURL(tagImage!) : ""}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload className="w-8 h-8 text-c7/20 group-hover:text-c5 transition-colors" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onImageChange}
                    className="hidden"
                    id="tagImage"
                  />
                  <label
                    htmlFor="tagImage"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-c5 text-white rounded-xl cursor-pointer hover:bg-c4 shadow-lg shadow-c5/20 transition-all active:scale-95"
                  >
                    <Upload className="w-4 h-4" />
                    <span className="font-semibold">Upload Image</span>
                  </label>
                  <p className="text-xs text-c7/50 mt-3">
                    Supported formats: JPG, PNG. Max size 2MB.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-c2">
              <button
                type="submit"
                disabled={loading}
                className="flex-[2] px-6 py-3 bg-c5 text-white rounded-xl font-bold hover:bg-c4 shadow-lg shadow-c5/25 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating...
                  </span>
                ) : (
                  "Create Tag"
                )}
              </button>
              <a
                href="/admin/tags"
                className="flex-1 px-6 py-3 bg-white text-c7 border border-c2 rounded-xl font-semibold hover:bg-gray-50 text-center transition-all"
              >
                Cancel
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
