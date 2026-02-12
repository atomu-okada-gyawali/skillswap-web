import { AuthProvider } from "@/context/AuthContext";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import { ToastContainer } from "react-toastify";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full min-h-screen overflow-hidden">
      <AuthProvider>
        <div className="page-wrapper flex w-full">
          {/* Header/sidebar */}
          <div className="xl:block hidden">
            <Sidebar />
          </div>
          <div className="w-full bg-background flex-col">
            {/* Top Header  */}
            <Header />
            {/* Body Content  */}
            <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 p-2 pt-0 ">
              {children}
              <ToastContainer position="top-right" autoClose={3000} />
            </main>
          </div>
        </div>
      </AuthProvider>
    </div>
  );
}
