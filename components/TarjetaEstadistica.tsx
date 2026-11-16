export interface TarjetaProps {
  titulo: string;
  valor: string;
}

export function TarjetaEstadistica({ titulo, valor }: TarjetaProps) {
  return (
    <div className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <h2 className="text-xl font-bold text-emerald-400">{titulo}</h2>
      <p className="mt-2 text-2xl font-bold">{valor}</p>
    </div>
  );
}