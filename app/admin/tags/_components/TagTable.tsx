"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tag, Search, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import SafeImage from "@/app/_components/SafeImage";
import { BASE_URL } from "@/lib/api/axios";
import { toast } from "react-toastify";
import DeleteModal from "@/app/_components/DeleteModal";
import { handleGetAllTags, handleDeleteTag, handleTagSearch, handleTagPagination } from "@/lib/actions/admin/tag-actions";

interface TagData {
  _id: string;
  name: string;
  tagImage?: string;
  createdAt: string;
  updatedAt: string;
}

interface TagTableProps {
  tags: TagData[];
  pagination: {
    page: number;
    size: number;
    totalItems: number;
    totalPages: number;
  };
  search: string;
}

export default function TagTable({ tags, pagination, search }: TagTableProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(search || "");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const onSearchChange = async () => {
    await handleTagSearch(searchTerm, pagination.size);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearchChange();
    }
  };

  const onPageChange = async (newPage: number) => {
    await handleTagPagination(newPage, pagination.size, search);
  };

  const onDelete = async () => {
    try {
      const { handleDeleteTag } = await import(
        "@/lib/actions/admin/tag-actions"
      );
      const result = await handleDeleteTag(deleteId!);
      if (result.success) {
        toast.success("Tag deleted successfully");
        router.refresh(); // Or window.location.reload()
      } else {
        toast.error(result.message || "Failed to delete tag");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred");
    } finally {
      setDeleteId(null);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const currentPage = pagination.page;
    const totalPages = pagination.totalPages;
    const delta = 2;

    const startPage = Math.max(1, currentPage - delta);
    const endPage = Math.min(totalPages, currentPage + delta);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-c2 overflow-hidden">
      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={onDelete}
        title="Delete Tag"
        description="Are you sure you want to delete this tag? This action cannot be undone."
      />

      <div className="p-4 border-b border-c2 bg-c1/50">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-c7 opacity-50" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Search tags..."
              className="w-full pl-10 pr-4 py-2.5 border border-c3 rounded-lg text-sm text-c7 bg-white focus:outline-none focus:ring-2 focus:ring-c5 focus:border-transparent"
            />
          </div>
          <button
            onClick={onSearchChange}
            className="px-4 py-2.5 bg-c5 text-white rounded-lg font-medium hover:bg-c4 transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-c1 border-b border-c2">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-c7 opacity-70 uppercase tracking-wider">
                Tag
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-c7 opacity-70 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-c7 opacity-70 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-c7 opacity-70 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-c1">
            {tags.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-c7 opacity-50">
                  No tags found
                </td>
              </tr>
            ) : (
              tags.map((tag) => (
                <tr key={tag._id} className="hover:bg-c1/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {tag.tagImage ? (
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-c1 shadow-sm">
                          <SafeImage
                            src={BASE_URL + tag.tagImage}
                            alt={tag.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-c5/10 flex items-center justify-center">
                          <Tag className="w-5 h-5 text-c5" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-c7">{tag.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono text-c7 opacity-50">
                      {tag._id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-c7 opacity-70">
                      {new Date(tag.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`/admin/tags/${tag._id}/edit`}
                        className="p-2 text-c7 opacity-50 hover:text-c5 hover:bg-c5/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => setDeleteId(tag._id)}
                        className="p-2 text-c7 opacity-50 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination.totalPages > 1 && (
        <div className="px-6 py-4 border-t border-c2 bg-c1/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-c7 opacity-50">
              Showing page{" "}
              <span className="font-medium text-c7">{pagination.page}</span> of{" "}
              <span className="font-medium text-c7">{pagination.totalPages}</span>
              {" "}({pagination.totalItems} total)
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onPageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className={`p-2 rounded-lg border transition-colors ${
                  pagination.page === 1
                    ? "text-c7 opacity-30 border-c2 cursor-not-allowed"
                    : "text-c7 border-c3 hover:bg-c1"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {getPageNumbers().map((page, idx) =>
                page === "..." ? (
                  <span key={`ellipsis-${idx}`} className="px-2 text-c7 opacity-30">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => onPageChange(page as number)}
                    className={`min-w-[36px] h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      page === pagination.page
                        ? "bg-c5 text-white"
                        : "text-c7 hover:bg-c1 border border-c3"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => onPageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className={`p-2 rounded-lg border transition-colors ${
                  pagination.page === pagination.totalPages
                    ? "text-c7 opacity-30 border-c2 cursor-not-allowed"
                    : "text-c7 border-c3 hover:bg-c1"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
