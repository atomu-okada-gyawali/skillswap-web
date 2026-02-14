"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  CompassIcon,
  HandIcon,
  MessageCircle,
  Heart,
  LogOut,
  User,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const [active, setActive] = useState("Explore");
  const { user, logout } = useAuth();

  const menuItems = [
    { name: "Explore", icon: CompassIcon, href: "/dashboard" },
    { name: "Requests", icon: HandIcon, href: "/dashboard/requests" },
    { name: "Messages", icon: MessageCircle, href: "/dashboard/messages" },
    { name: "Favorites", icon: Heart, href: "/dashboard/favorites" },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0">
      {/* Navigation */}
      <nav className="flex-1 p-4 pt-12 space-y-1">
        <p className="px-3 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Menu
        </p>
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              active === item.name
                ? "bg-c2 text-c5"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <item.icon className={`w-5 h-5 ${active === item.name ? "text-c5" : ""}`} />
            {item.name}
          </button>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between group cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-c3 to-c4 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                {user?.name || "User"}
              </span>
              <span className="text-xs text-gray-500">View Profile</span>
            </div>
          </div>
          <button onClick={logout}>
            <LogOut className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
          </button>
        </div>
      </div>
    </aside>
  );
}
