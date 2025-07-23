export default function InscripcionCard({ correo, taller, descripcion, profesor }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 text-white transition transform hover:-translate-y-1 hover:shadow-2xl">
      <p className="text-sm text-gray-200 mb-1">{correo}</p>
      <h3 className="text-xl font-bold text-lime-300">{taller}</h3>
      <p className="text-sm mb-2">{descripcion}</p>
      <p className="text-xs text-gray-300">👤 Profesor: {profesor}</p>
    </div>
  );
}



