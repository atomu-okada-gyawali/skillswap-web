import { handleGetOneUser } from "@/lib/actions/admin/user-actions";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, User, Mail, Shield, Calendar, Hash } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await handleGetOneUser(id);
  if (!response.success) {
    throw new Error(response.message || "Failed to load user");
  }

  const user = response.data;

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      admin: "bg-purple-100 text-purple-700 ring-purple-500/20",
      user: "bg-blue-100 text-blue-700 ring-blue-500/20",
      instructor: "bg-orange-100 text-orange-700 ring-orange-500/20",
    };
    return colors[role.toLowerCase()] || "bg-c2 text-c7";
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-1.5 text-sm text-c7 opacity-60 hover:text-c5 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Users
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-c2 p-6 text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              {user.profilePicture ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${user.profilePicture}`}
                  alt={user.fullName || "User"}
                  fill
                  className="rounded-full object-cover ring-4 ring-c1"
                />
              ) : (
                <div className="w-32 h-32 bg-c5/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl text-c5 font-medium">
                    {user.fullName?.charAt(0).toUpperCase() || "?"}
                  </span>
                </div>
              )}
            </div>
            <h2 className="text-xl font-bold text-c7">
              {user.fullName || "N/A"}
            </h2>
            <p className="text-c7 text-sm mt-1 opacity-60">{user.email}</p>
            <span
              className={`inline-flex mt-3 px-3 py-1 rounded-full text-sm font-medium ring-1 ring-inset ${getRoleBadgeColor(
                user.role,
              )}`}
            >
              {user.role}
            </span>
            <div className="mt-6 pt-6 border-t border-c2">
              <Link
                href={`/admin/users/${id}/edit`}
                className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 bg-c5 text-white rounded-lg font-medium hover:bg-c4 transition-colors"
              >
                Edit User
              </Link>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-c2 p-6">
            <h3 className="text-lg font-semibold text-c7 mb-6 pb-4 border-b border-c2">
              Account Information
            </h3>
            <dl className="space-y-5">
              <div className="flex items-center justify-between py-2">
                <dt className="flex items-center gap-3 text-c7 opacity-60">
                  <Hash className="w-4 h-4" />
                  User ID
                </dt>
                <dd className="text-c7 text-sm font-mono bg-c1 px-3 py-1 rounded">
                  {user._id}
                </dd>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-c2">
                <dt className="flex items-center gap-3 text-c7 opacity-60">
                  <User className="w-4 h-4" />
                  Full Name
                </dt>
                <dd className="text-c7 font-medium">
                  {user.fullName || "N/A"}
                </dd>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-c2">
                <dt className="flex items-center gap-3 text-c7 opacity-60">
                  <span className="w-4 text-center">@</span>
                  Username
                </dt>
                <dd className="text-c7">{user.username || "N/A"}</dd>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-c2">
                <dt className="flex items-center gap-3 text-c7 opacity-60">
                  <Mail className="w-4 h-4" />
                  Email Address
                </dt>
                <dd className="text-c7">{user.email}</dd>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-c2">
                <dt className="flex items-center gap-3 text-c7 opacity-60">
                  <Shield className="w-4 h-4" />
                  Role
                </dt>
                <dd className="text-c7 capitalize">{user.role}</dd>
              </div>
              {user.createdAt && (
                <div className="flex items-center justify-between py-2 border-t border-c2">
                  <dt className="flex items-center gap-3 text-c7 opacity-60">
                    <Calendar className="w-4 h-4" />
                    Created At
                  </dt>
                  <dd className="text-c7 text-sm">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
