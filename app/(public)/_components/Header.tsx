import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-c6 bg-opacity-95 backdrop-blur-sm text-black shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <Image src={logo} alt={"Logo"} height={65} width={65}></Image>
          </Link>

          <nav className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="hover:text-c2">
              Home
            </Link>
            <Link href="/about" className="hover:text-c2">
              About
            </Link>
            <Link href="/login" className="px-4 py-2 rounded-lg bg-c5 text-c1">
              Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
