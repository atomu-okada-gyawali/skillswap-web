"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SafeImage from "@/app/_components/SafeImage";
import { LayoutDashboard, Users, Tag } from "lucide-react";

const ADMIN_LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/tags", label: "Tags", icon: Tag },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname?.startsWith(href);

  return (
    <aside className="h-screen w-64 bg-white border-r border-c2 flex flex-col">
      {/* Header / Logo section */}
      <div className="p-4 border-b border-c2">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-c1 flex items-center justify-center">
            <SafeImage
              src="/images/logo.png"
              alt="Admin Panel Logo"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
          <span className="font-semibold text-c7">Admin Panel</span>
        </Link>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 p-4 space-y-1">
        {ADMIN_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex items-center gap-3
                px-3 py-2.5 rounded-lg
                text-sm font-medium
                transition-colors

                ${
                  isActive(link.href)
                    ? "bg-c5 text-white"
                    : "text-c7 hover:bg-c1 hover:text-c7"
                }
              `}
            >
              <Icon className="w-5 h-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
