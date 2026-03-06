"use client";
import React from "react";
import Link from "next/link";
import SafeImage from "@/app/_components/SafeImage";
import { usePathname } from "next/navigation";
import {
  CompassIcon,
  HandIcon,
  MessageCircle,
  Heart,
  LogOut,
  User,
} from "lucide-react";
import { handleLogout } from "@/lib/actions/auth-actions";
import { BASE_URL } from "@/lib/api/axios";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const menuItems = [
    { name: "Explore", icon: CompassIcon, href: "/dashboard/explore" },
    { name: "Requests", icon: HandIcon, href: "/dashboard/proposals" },
    { name: "Messages", icon: MessageCircle, href: "/dashboard/messages" },
    { name: "Favorites", icon: Heart, href: "/dashboard/favorites" },
  ];

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0">
      {/* Navigation */}
      <nav className="flex-1 p-4 pt-12 space-y-1">
        <p className="px-3 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Menu
        </p>
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive(item.href)
                ? "bg-c2 text-c5"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <item.icon
              className={`w-5 h-5 ${isActive(item.href) ? "text-c5" : ""}`}
            />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-100">
        <Link
          href="/dashboard/profile"
          className="flex items-center justify-between group cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            {user?.profilePicture ? (
              <SafeImage
                src={BASE_URL + user.profilePicture}
                alt={user.fullName || "User"}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-c3 to-c4 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                {user?.fullName || user?.username || "User"}
              </span>
              <span className="text-xs text-gray-500">View Profile</span>
            </div>
          </div>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 mt-1 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
