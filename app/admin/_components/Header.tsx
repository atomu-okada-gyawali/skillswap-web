"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { logout, user } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-c5 supports-[backdrop-filter]:bg-background/80 ">
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo & Title */}
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2 group">
              <span className="text-base font-semibold tracking-tight group-hover:opacity-80 transition-opacity">
                Skill Swap
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-6 flex items-center justify-center text-xs font-semibold">
              {user?.email || "Admin"}
            </div>
            <span className="text-sm font-medium sm:inline">
              <button
                onClick={() => {
                  logout();
                }}
                className="w-full border border-red-500 bg-red-500 text-white flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-red-600 transition-colors text-left"
              >
                Logout
              </button>
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
}
