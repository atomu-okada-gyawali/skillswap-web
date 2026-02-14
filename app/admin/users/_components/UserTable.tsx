"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import { handleDeleteUser } from "@/lib/actions/admin/user-actions";
import DeleteModal from "@/app/_components/DeleteModal";
import {
  Search,
  Pencil,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  profilePicture?: string;
}

interface Pagination {
  page: number;
  size: number;
  totalPages: number;
  total: number;
}

const UserTable = ({
  users,
  pagination,
  search,
}: {
  users: User[];
  pagination: Pagination;
  search?: string;
}) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(search || "");

  const handleSearchChange = () => {
    router.push(
      `/admin/users?page=1&size=${pagination.size}${
        searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ""
      }`,
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchChange();
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

  const buildPageUrl = (page: number) => {
    return `/admin/users?page=${page}&size=${pagination.size}${
      searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ""
    }`;
  };

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const onDelete = async () => {
    try {
      await handleDeleteUser(deleteId!);
      toast.success("User deleted successfully");
    } catch (err: Error | any) {
      toast.error(err.message || "Failed to delete user");
    } finally {
      setDeleteId(null);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      admin: "bg-purple-100 text-purple-700",
      user: "bg-blue-100 text-blue-700",
      moderator: "bg-orange-100 text-orange-700",
    };
    return colors[role.toLowerCase()] || "bg-c2 text-c7";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-c2 overflow-hidden">
      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={onDelete}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
      />

      <div className="p-4 border-b border-c2 bg-c1/50">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-c7 opacity-50" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2.5 border border-c3 rounded-lg text-sm text-c7 bg-white focus:outline-none focus:ring-2 focus:ring-c5 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSearchChange}
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
                User
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-c7 opacity-70 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-c7 opacity-70 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-c7 opacity-70 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-c1">
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-c7 opacity-50"
                >
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-c1/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {user.profilePicture ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${user.profilePicture}`}
                          alt={user.fullName || "User"}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-c1"
                          width={40}
                          height={40}
                        />
                      ) : (
                        <div className="w-10 h-10 bg-c5/10 rounded-full flex items-center justify-center">
                          <span className="text-c5 font-medium text-sm">
                            {user.fullName?.charAt(0).toUpperCase() || "U"}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-c7">
                          {user.fullName || "N/A"}
                        </p>
                        <p className="text-xs text-c7 opacity-50">{user._id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-c7 opacity-70">{user.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                        user.role,
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/users/${user._id}`}
                        className="p-2 text-c7 opacity-50 hover:text-c5 hover:bg-c5/10 rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/users/${user._id}/edit`}
                        className="p-2 text-c7 opacity-50 hover:text-c5 hover:bg-c5/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteId(user._id)}
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
              <span className="font-medium text-c7">
                {pagination.totalPages}
              </span>{" "}
              ({pagination.total} total)
            </p>
            <div className="flex items-center gap-1">
              <Link
                href={
                  pagination.page === 1
                    ? "#"
                    : buildPageUrl(pagination.page - 1)
                }
                className={`p-2 rounded-lg border transition-colors ${
                  pagination.page === 1
                    ? "text-c7 opacity-30 border-c2 cursor-not-allowed"
                    : "text-c7 border-c3 hover:bg-c1"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </Link>
              {getPageNumbers().map((page, idx) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-2 text-c7 opacity-30"
                  >
                    ...
                  </span>
                ) : (
                  <Link
                    key={page}
                    href={buildPageUrl(page as number)}
                    className={`min-w-[36px] h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      page === pagination.page
                        ? "bg-c5 text-white"
                        : "text-c7 hover:bg-c1 border border-c3"
                    }`}
                  >
                    {page}
                  </Link>
                ),
              )}
              <Link
                href={
                  pagination.page === pagination.totalPages
                    ? "#"
                    : buildPageUrl(pagination.page + 1)
                }
                className={`p-2 rounded-lg border transition-colors ${
                  pagination.page === pagination.totalPages
                    ? "text-c7 opacity-30 border-c2 cursor-not-allowed"
                    : "text-c7 border-c3 hover:bg-c1"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
