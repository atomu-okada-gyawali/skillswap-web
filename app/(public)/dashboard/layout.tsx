import Navigation from "../_components/Navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-c1 flex">
      <Navigation />
      {children}
    </section>
  );
}
