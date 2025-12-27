import React, { useState } from "react";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Explore", icon: LayoutDashboard },
    { name: "Requests", icon: BarChart3 },
    { name: "Mesages", icon: Users },
    { name: "Favorites", icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 font-bold text-xl text-gray-900 border-b border-gray-50">
        <div className="w-8 h-8 bg-black rounded flex items-center justify-center mr-3">
          <div className="w-4 h-4 bg-white rounded-sm" />
        </div>
        Nexus
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
              active === item.name
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between group cursor-pointer p-2 rounded-md hover:bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                User Name
              </span>
              <span className="text-xs text-gray-500">View Profile</span>
            </div>
          </div>
          <LogOut className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </aside>
  );
}
