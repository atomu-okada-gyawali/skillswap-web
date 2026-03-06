"use client";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ChatProvider } from "@/context/ChatContext";
import Navigation from "../(public)/_components/Navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function ProtectedContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-c4"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <section className="bg-c1 flex min-h-screen">
      <Navigation />
      <main className="flex-1 ml-64 overflow-auto">{children}</main>
    </section>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ChatProvider>
        <ProtectedContent>{children}</ProtectedContent>
      </ChatProvider>
    </AuthProvider>
  );
}
