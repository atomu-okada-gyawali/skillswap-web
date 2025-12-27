import Header from "./_components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header />
      <main className="mx-auto   bg-c1">{children}</main>
    </section>
  );
}
