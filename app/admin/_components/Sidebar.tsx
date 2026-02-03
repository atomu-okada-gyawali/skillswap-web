"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ADMIN_LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/users", label: "Users" },
];

export default function Sidebar() {
  const pathname = usePathname();

  // Checks if current route matches the link
  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname?.startsWith(href);

  return (
    <aside
      className="
        fixed md:static
        top-0 left-0
        h-screen w-64
        z-40 overflow-y-auto

        bg-c1
        border-r border-c2
      "
    >
      {/* Header / Logo section */}
      <div className="p-4 border-b border-c2">
        <Link href="/admin" className="flex items-center gap-2">
          {/* Logo box */}
          <div className="h-8 w-8 rounded bg-c4 text-c6 flex items-center justify-center font-bold">
            A
          </div>

          {/* Title */}
          <span className="font-semibold text-c7">Admin Panel</span>
        </Link>
      </div>

      {/* Navigation links */}
      <nav className="p-2 space-y-1">
        {ADMIN_LINKS.map((link) => (
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
                  ? "bg-c5 text-c6" // active state
                  : "text-c7 hover:bg-c2" // default + hover
              }
            `}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
