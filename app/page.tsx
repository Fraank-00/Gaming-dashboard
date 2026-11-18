"use client";
import { useState, useEffect } from "react";
import { Users, Trophy, Award, Trash2, PlusCircle } from "lucide-react";
import Link from "next/link";

interface Personaje {
  id: number;
  nombre: string;
  clase: string;
  nivel: number;
  victorias: number;
}

export default function Home() {
  const [totalPersonajes, setTotalPersonajes] = useState(0);
  const [nivelMaximo, setNivelMaximo] = useState(0);
  const [totalVictorias, setTotalVictorias] = useState(0);
  const [ultimosPersonajes, setUltimosPersonajes] = useState<Personaje[]>([]);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  useEffect(() => {
    const misPersonajes = localStorage.getItem("mis-personajes");
    if (misPersonajes) {
      const personajes: Personaje[] = JSON.parse(misPersonajes);
      setTotalPersonajes(personajes.length);
      
      if (personajes.length > 0) {
        setNivelMaximo(Math.max(...personajes.map((p) => p.nivel), 0));
        // Sumamos las victorias de todos los personajes automáticamente
        const sumaVictorias = personajes.reduce((acc, p) => acc + (p.victorias || 0), 0);
        setTotalVictorias(sumaVictorias);
      } else {
        setNivelMaximo(0);
        setTotalVictorias(0);
      }

      setUltimosPersonajes(personajes.slice(-3).reverse());
    }
  }, []);

  const reiniciarDatos = () => {
    localStorage.removeItem("mis-personajes");
    setTotalPersonajes(0);
    setNivelMaximo(0);
    setTotalVictorias(0);
    setUltimosPersonajes([]);
    setMostrarConfirmacion(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-emerald-400 flex items-center gap-2">
            <Trophy className="w-8 h-8 text-amber-400" />
            Dashboard Gaming
          </h1>
          <p className="text-slate-400 mt-1">
            Centro de estadísticas y gestión de personajes.
          </p>
        </div>

        <div>
          <button
            onClick={() => setMostrarConfirmacion(true)}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50 text-sm font-semibold py-2 px-3 rounded-xl flex items-center gap-2 transition duration-300"
          >
            <Trash2 className="w-4 h-4" />
            Reiniciar Progreso
          </button>
        </div>
      </div>

      {/* Modal de confirmación moderno */}
      {mostrarConfirmacion && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2">¿Reiniciar progreso?</h3>
            <p className="text-slate-400 text-sm mb-6">
              Esta acción borrará todos tus personajes guardados y sus victorias. No se puede deshacer.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setMostrarConfirmacion(false)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-4 py-2 rounded-xl transition duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={reiniciarDatos}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-xl transition duration-300 shadow-lg shadow-red-500/20"
              >
                Sí, reiniciar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tarjetas de Estadísticas con Iconos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-lg flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Personajes Activos</p>
            <p className="text-2xl font-bold text-white">{totalPersonajes}</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-lg flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Nivel Máximo</p>
            <p className="text-2xl font-bold text-white">{nivelMaximo}</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-lg flex items-center gap-4">
          <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-lg text-violet-400">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Victorias Totales</p>
            <p className="text-2xl font-bold text-white">{totalVictorias}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          href="/personajes"
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg transition duration-300 flex items-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          Gestionar Personajes y Victorias
        </Link>
      </div>

      {/* Sección de Últimos Personajes Registrados */}
      <div className="mt-10 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-bold text-white mb-4">Últimos Personajes</h2>
        {ultimosPersonajes.length === 0 ? (
          <p className="text-slate-500 italic">No hay personajes creados todavía. Andá a la sección Personajes para agregar uno.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ultimosPersonajes.map((p) => (
              <div key={p.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                <p className="font-bold text-lg text-white">{p.nombre}</p>
                <div className="flex justify-between items-center mt-3 text-sm border-t border-slate-900 pt-2">
                  <span className="text-slate-400">Clase: <strong className="text-emerald-400">{p.clase}</strong></span>
                  <span className="bg-slate-900 px-2.5 py-1 rounded-lg text-slate-200 border border-slate-800">Lv. {p.nivel}</span>
                </div>
                <div className="mt-2 text-xs text-amber-400 flex items-center gap-1 font-semibold">
                  <Trophy className="w-3.5 h-3.5" /> {p.victorias} victorias individuales
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}