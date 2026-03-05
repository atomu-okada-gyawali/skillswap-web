"use client";

import { useRouter } from "next/navigation";
import { Tag } from "lucide-react";
import SafeImage from "@/app/_components/SafeImage";
import { BASE_URL } from "@/lib/api/axios";

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

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    params.set("page", newPage.toString());
    params.set("size", pagination.size.toString());
    if (search) params.set("search", search);
    router.push(`/admin/tags?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-xl border border-c2 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-c1">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-c7 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-c7 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-c7 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-c7 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-c2">
            {tags.map((tag) => (
              <tr key={tag._id} className="hover:bg-c1/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {tag.tagImage ? (
                    <div className="w-10 h-10 rounded-lg overflow-hidden">
                      <SafeImage
                        src={BASE_URL + tag.tagImage}
                        alt={tag.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-c3 flex items-center justify-center">
                      <Tag className="w-5 h-5 text-c7" />
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-c7">{tag.name}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-c7">
                    {new Date(tag.createdAt).toLocaleDateString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <a
                      href={`/admin/tags/${tag._id}/edit`}
                      className="px-3 py-1 text-sm font-medium text-c5 hover:bg-c5/10 rounded-lg transition-colors"
                    >
                      Edit
                    </a>
                    <button
                      onClick={async () => {
                        if (
                          confirm("Are you sure you want to delete this tag?")
                        ) {
                          const { handleDeleteTag } = await import(
                            "@/lib/actions/admin/tag-actions"
                          );
                          const result = await handleDeleteTag(tag._id);
                          if (result.success) {
                            window.location.reload();
                          } else {
                            alert(result.message);
                          }
                        }
                      }}
                      className="px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-c2">
          <span className="text-sm text-c7">
            Showing {(pagination.page - 1) * pagination.size + 1} to{" "}
            {Math.min(pagination.page * pagination.size, pagination.totalItems)}{" "}
            of {pagination.totalItems} results
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3 py-1 text-sm font-medium text-c7 bg-c1 rounded-lg hover:bg-c2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-c7">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="px-3 py-1 text-sm font-medium text-c7 bg-c1 rounded-lg hover:bg-c2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
