import InscripcionCard from "./InscripcionCard";

export default function ListaInscripciones({ inscripciones, cargando }) {
  if (cargando) {
    return (
      <p className="text-center text-white text-lg animate-pulse">
        Cargando inscripciones...
      </p>
    );
  }

  if (inscripciones.length === 0) {
    return (
      <p className="text-center text-white text-lg">
        No hay inscripciones registradas.
      </p>
    );
  }

  return (
    <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
      {inscripciones.map((item) => (
        <InscripcionCard
          key={item.id}
          correo={item.email}
          taller={`Taller: ${item.taller.nombre}`}
          descripcion={item.taller.descripcion}
          profesor={item.taller.profesor}
        />
      ))}
    </div>
  );
}
