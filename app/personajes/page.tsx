"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, Sparkles, Wand2, Crown, Trash2, Trophy } from "lucide-react";

type ClasePersonaje = "Dark Knight" | "High Elf" | "Magic Gladiator" | "Dark Lord";

interface Personaje {
  id: number;
  nombre: string;
  clase: ClasePersonaje;
  nivel: number;
  victorias: number; // <--- Nuevo campo individual
}

export default function PersonajesPage() {
  const [personajes, setPersonajes] = useState<Personaje[]>([]);
  const [nombre, setNombre] = useState("");
  const [clase, setClase] = useState<ClasePersonaje>("Dark Knight");
  const [nivel, setNivel] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const guardados = localStorage.getItem("mis-personajes");
    if (guardados) {
      // Aseguramos compatibilidad por si algún personaje viejo no tenía el campo victorias
      const parsed: Personaje[] = JSON.parse(guardados);
      const conVictorias = parsed.map(p => ({ ...p, victorias: p.victorias ?? 0 }));
      setPersonajes(conVictorias);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mis-personajes", JSON.stringify(personajes));
  }, [personajes]);

  const agregarPersonaje = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !nivel) {
      setError("Por favor completa todos los campos.");
      return;
    }

    const nuevoPersonaje: Personaje = {
      id: Date.now(),
      nombre: nombre.trim(),
      clase,
      nivel: Number(nivel),
      victorias: 0, // Arranca en 0 victorias individuales
    };

    setPersonajes([...personajes, nuevoPersonaje]);
    setNombre("");
    setNivel("");
    setError("");
  };

  const subirNivel = (id: number) => {
    setPersonajes(
      personajes.map((p) => (p.id === id ? { ...p, nivel: p.nivel + 1 } : p))
    );
  };

  const sumarVictoriaPersonaje = (id: number) => {
    setPersonajes(
      personajes.map((p) => (p.id === id ? { ...p, victorias: p.victorias + 1 } : p))
    );
  };

  const eliminarPersonaje = (id: number) => {
    setPersonajes(personajes.filter((p) => p.id !== id));
  };

  const obtenerColorClase = (clase: ClasePersonaje) => {
    switch (clase) {
      case "Dark Knight":
        return "border-red-500/30 bg-red-500/10 text-red-400";
      case "High Elf":
        return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
      case "Magic Gladiator":
        return "border-violet-500/30 bg-violet-500/10 text-violet-400";
      case "Dark Lord":
        return "border-amber-500/30 bg-amber-500/10 text-amber-400";
    }
  };

  const obtenerIconoClase = (clase: ClasePersonaje) => {
    switch (clase) {
      case "Dark Knight":
        return <Shield className="w-6 h-6 text-red-400" />;
      case "High Elf":
        return <Sparkles className="w-6 h-6 text-emerald-400" />;
      case "Magic Gladiator":
        return <Wand2 className="w-6 h-6 text-violet-400" />;
      case "Dark Lord":
        return <Crown className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <h1 className="text-3xl font-bold text-emerald-400">Mis Personajes</h1>
      
      <form onSubmit={agregarPersonaje} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl mt-6 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex flex-col flex-1 w-full">
          <label htmlFor="nombre" className="text-slate-400 text-sm mb-1">Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="bg-slate-950 text-white placeholder:text-slate-500 border border-slate-800 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            placeholder="Ej: Loki"
          />
        </div>

        <div className="flex flex-col flex-1 w-full">
          <label htmlFor="clase" className="text-slate-400 text-sm mb-1">Clase</label>
          <select
            id="clase"
            value={clase}
            onChange={(e) => setClase(e.target.value as ClasePersonaje)}
            className="bg-slate-950 text-white border border-slate-800 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          >
            <option value="Dark Knight">Dark Knight</option>
            <option value="High Elf">High Elf</option>
            <option value="Magic Gladiator">Magic Gladiator</option>
            <option value="Dark Lord">Dark Lord</option>
          </select>
        </div>

        <div className="flex flex-col w-full md:w-32">
          <label htmlFor="nivel" className="text-slate-400 text-sm mb-1">Nivel</label>
          <input
            type="number"
            id="nivel"
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
            className="bg-slate-950 text-white placeholder:text-slate-500 border border-slate-800 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            placeholder="Ej: 32"
          />
        </div>

        <button
          type="submit"
          className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg transition duration-300 h-[46px]"
        >
          Agregar
        </button>
      </form>

      {error && <p className="mt-4 text-red-400" role="alert">{error}</p>}

      {/* Tarjetas de personajes con victorias individuales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {personajes.map((personaje) => (
          <div key={personaje.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl border ${obtenerColorClase(personaje.clase)}`}>
                {obtenerIconoClase(personaje.clase)}
              </div>
              <div>
                <h2 className="text-xl font-bold">{personaje.nombre}</h2>
                <span className={`inline-block mt-1 px-2.5 py-0.5 text-xs font-medium rounded border ${obtenerColorClase(personaje.clase)}`}>
                  {personaje.clase}
                </span>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center text-slate-300 border-t border-slate-800 pt-3">
              <span>Nivel: <strong className="text-white">{personaje.nivel}</strong></span>
              <span className="flex items-center gap-1.5 text-amber-400 font-semibold bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
                <Trophy className="w-4 h-4" /> {personaje.victorias} Victorias
              </span>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => subirNivel(personaje.id)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-3 rounded-xl shadow-lg transition duration-300 text-sm"
              >
                +1 Nivel
              </button>
              <button
                onClick={() => sumarVictoriaPersonaje(personaje.id)}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2 px-3 rounded-xl shadow-lg transition duration-300 text-sm flex items-center gap-1"
              >
                <Trophy className="w-4 h-4" /> +1 Victoria
              </button>
              <button
                onClick={() => eliminarPersonaje(personaje.id)}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50 font-bold py-2 px-3 rounded-xl transition duration-300 flex items-center gap-1.5 text-sm ml-auto"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link href="/" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
          ← Volver al inicio
        </Link>
      </div>
    </main>
  );
}