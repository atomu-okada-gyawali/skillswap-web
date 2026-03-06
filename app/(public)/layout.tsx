import Header from "./_components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header />
      <main className="mx-auto h-screen bg-c1">{children}</main>
    </section>
  );
}
