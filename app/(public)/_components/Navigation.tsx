"use client";
import React, { useState } from "react";
import {
  CompassIcon,
  HandIcon,
  Users,
  MessageCircle,
  Heart,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Explore", icon: CompassIcon },
    { name: "Requests", icon: HandIcon },
    { name: "Messages", icon: MessageCircle },
    { name: "Favorites", icon: Heart },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <nav className="flex-1 p-4  space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`w-full flex justify-center items-center gap-3 px-3 py-2 rounded-md text-lg  transition-colors border-2 ${
              active === item.name
                ? "bg-c4 text-c1 font-medium  border-c4"
                : "text-c7 hover:bg-c2 hover:text-c1 hover:border-c2"
            }`}
          >
            <item.icon className="w-7 h-7  " />
            <p className=" ">{item.name}</p>
          </button>
        ))}
      </nav>

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
