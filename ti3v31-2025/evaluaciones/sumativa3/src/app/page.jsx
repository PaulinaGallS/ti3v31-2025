'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [inscripciones, setInscripciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resInsc, resTall] = await Promise.all([
          fetch("https://ejemplo-firebase-657d0-default-rtdb.firebaseio.com/inscripciones.json"),
          fetch("https://ejemplo-firebase-657d0-default-rtdb.firebaseio.com/talleres.json"),
        ]);

        const dataInsc = await resInsc.json();
        const dataTall = await resTall.json();

        dataInsc?.shift?.();
        dataTall?.shift?.();

        const inscripcionesFormateadas = Object.entries(dataInsc || {}).map(([id, insc]) => {
          const taller = dataTall?.[insc.taller] || {};
          return {
            id,
            nombre: insc.nombre,
            email: insc.correo,
            taller: {
              nombre: taller.nombre || "Baile Urbano",
              descripcion: taller.descripcion || "Taller de Baile Urbano",
              profesor: taller.profesor || "profesor 6",
            },
          };
        });

        setInscripciones(inscripcionesFormateadas);
        setCargando(false);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setCargando(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-lime-300 drop-shadow mb-8">
        Inscripciones a Talleres - Raíces Digitales
      </h1>

      {cargando ? (
        <p className="text-center text-white">Cargando inscripciones...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {inscripciones.map((item) => (
            <div
              key={item.id}
              className="bg-white/10 border border-white/20 backdrop-blur p-5 rounded-xl shadow-lg text-white"
            >
              <p className="text-sm text-purple-200 mb-1">{item.email}</p>
              <h3 className="text-xl font-bold text-lime-300">{item.taller.nombre}</h3>
              <p className="text-sm">{item.taller.descripcion}</p>
              <p className="text-xs text-purple-300 mt-2">👤 Profesor: {item.taller.profesor}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

