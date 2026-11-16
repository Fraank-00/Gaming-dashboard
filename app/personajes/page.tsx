import Link from "next/link";

export default function PersonajesPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <h1 className="text-3xl font-bold">Mis Personajes</h1>
      <Link href="/" className="mt-4 inline-block text-emerald-400 hover:text-emerald-300">
        Volver al inicio
      </Link>
    </main>
  );
}