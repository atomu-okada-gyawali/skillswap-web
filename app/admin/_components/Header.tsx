"use client";
import { useAuth } from "@/context/AuthContext";
import { LogOut, Menu, User } from "lucide-react";
import { useState } from "react";
import SafeImage from "@/app/_components/SafeImage";
import { BASE_URL } from "@/lib/api/axios";

export default function Header() {
  const { logout, user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-c2">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Mobile menu button */}
        <button className="xl:hidden p-2 text-c7 hover:bg-c1 rounded-lg">
          <Menu className="w-5 h-5" />
        </button>

        {/* Spacer for desktop */}
        <div className="hidden xl:block" />

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* User dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-c1 transition-colors"
            >
              {user?.profilePicture ? (
                <SafeImage
                  src={BASE_URL + user.profilePicture}
                  alt={user.fullName || user.username || "Admin"}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-c5 flex items-center justify-center text-white text-sm font-medium">
                  {user?.fullName?.charAt(0).toUpperCase() || user?.username?.charAt(0).toUpperCase() || "A"}
                </div>
              )}
              <span className="hidden sm:block text-sm font-medium text-c7">
                {user?.fullName || user?.username || "Admin"}
              </span>
            </button>

            {showDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowDropdown(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-c2 py-1 z-20">
                  <div className="px-4 py-3 border-b border-c2">
                    <p className="text-sm font-medium text-c7">{user?.fullName || user?.username || "Admin"}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    {user?.role && (
                      <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded">
                        {user.role}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setShowDropdown(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
