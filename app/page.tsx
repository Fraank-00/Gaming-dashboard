"use client";
import { useState } from "react";
import { TarjetaEstadistica } from "../components/TarjetaEstadistica";



interface Estadistica {
  titulo: string;
  valor: string;
}

const misEstadisticas: Estadistica[] = [
  { titulo: "Horas jugadas", valor: "120" },
  { titulo: "Nivel", valor: "25" },
  { titulo: "Victorias", valor: "48" },
];

export default function Home() {

  const [estadisticas, setEstadisticas] = useState<Estadistica[]>(misEstadisticas);

  const sumarVictoria = () => {
    setEstadisticas(prev =>
      prev.map(est =>
        est.titulo === "Victorias"
          ? { ...est, valor: (parseInt(est.valor) + 1).toString() }
          : est
      )
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold text-emerald-400">
        Mi Dashboard Gaming
      </h1>
      <p className="text-slate-400 mt-2">
        Bienvenido a mi centro de estadísticas.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {estadisticas.map((estadistica, index) => (
          <TarjetaEstadistica
            key={index}
            titulo={estadistica.titulo}
            valor={estadistica.valor}
          />
        ))}
      </div>
      {/* Botón verde para ejecutar sumarVictoria */}
      <button
        onClick={sumarVictoria}
        className="bg-emerald-500  mt-6 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300"
      >
        Sumar Victoria
      </button>
    </main>
  );
}