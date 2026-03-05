"use client";
import React, { useState } from "react";
import Link from "next/link";
import SafeImage from "@/app/_components/SafeImage";
import { Menu, X } from "lucide-react";
import logo from "@/public/images/logo.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky  top-0 z-50 bg-white/80 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/">
            <SafeImage src={logo} alt="Skill Swap Logo" height={60} width={60} />
          </Link>

          <nav className="hidden md:flex space-x-8 items-center">
            <Link
              href="/"
              className="text-gray-600 hover:text-c5 font-medium transition"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-c5 font-medium transition"
            >
              About
            </Link>
            <Link
              href="/login"
              className="px-6 py-2.5 rounded-lg bg-c4 text-white font-semibold hover:bg-c5 transition shadow-sm"
            >
              Login
            </Link>
          </nav>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-c5 focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm">
          <nav className="flex flex-col items-center space-y-4 py-4 border-t border-gray-200">
            <Link
              href="/"
              className="text-gray-600 hover:text-c5 font-medium transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-c5 font-medium transition"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/login"
              className="px-6 py-2.5 rounded-lg bg-c4 text-white font-semibold hover:bg-c5 transition shadow-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
