import Link from "next/link";
import { handleGetAllUsers } from "@/lib/actions/admin/user-actions";
import UserTable from "./_components/UserTable";
import { Plus, Users } from "lucide-react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = (params.page as string) || "1";
  const size = (params.size as string) || "10";
  const search = (params.search as string) || "";

  const response = await handleGetAllUsers(page, size, search as string);

  if (!response.success) {
    throw new Error(response.message || "Failed to load users");
  }
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-c5 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-c7">Users</h1>
            <p className="text-sm text-c7 opacity-70">Manage your team members</p>
          </div>
        </div>
        <Link
          className="inline-flex items-center gap-2 px-4 py-2 bg-c5 text-white rounded-lg font-medium hover:bg-c4 transition-colors"
          href="/admin/users/create"
        >
          <Plus className="w-4 h-4" />
          Create User
        </Link>
      </div>
      <UserTable
        users={response.data}
        pagination={response.pagination}
        search={search}
      />
    </div>
  );
}
