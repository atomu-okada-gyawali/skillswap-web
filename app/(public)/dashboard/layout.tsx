import Navigation from "../_components/Navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-c1 flex min-h-screen">
      <Navigation />
      <main className="flex-1 ml-64 overflow-auto">
        {children}
      </main>
    </section>
  );
}
