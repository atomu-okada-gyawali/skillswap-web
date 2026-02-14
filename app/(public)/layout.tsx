import Header from "./_components/Header";
import { AuthProvider } from "@/context/AuthContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <section>
        <Header />
        <main className="mx-auto h-screen bg-c1">{children}</main>
      </section>
    </AuthProvider>
  );
}
