import { AuthProvider } from "@/context/AuthContext";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import { ToastContainer } from "react-toastify";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen bg-c1">
        {/* Sidebar - hidden on mobile, fixed on desktop */}
        <div className="hidden xl:block xl:fixed xl:inset-y-0 xl:z-40">
          <Sidebar />
        </div>
        
        {/* Main content area */}
        <div className="flex-1 xl:pl-64">
          {/* Header */}
          <Header />
          
          {/* Main content */}
          <main className="py-6 px-4 sm:px-6 lg:px-8">
            {children}
            <ToastContainer position="top-right" autoClose={3000} />
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
