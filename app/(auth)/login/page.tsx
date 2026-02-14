"use client";

import Link from "next/link";
import LoginForm from "../_components/LoginForm";

export default function Page() {
  return (
    <div className="space-y-6 w-full">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Welcome </h1>
        <p className="mt-1 text-sm text-foreground/70">
          Log in to your account
        </p>
        <div className="mt-1 text-center text-sm">
          <Link
            href="/forget-password"
            className="font-semibold hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
      <LoginForm />
    </div>
  );
}
