import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

const Profile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [creador, setCreador] = useState(null);
    const [galerias, setGalerias] = useState([]);

    useEffect(() => {
        // Obtener datos del creador (simulado o desde backend real)
        fetch(`http://localhost:5000/usuarios/${id}`)
            .then((res) => res.json())
            .then((data) => setCreador(data))
            .catch(() => setCreador({ nombre: "Artista desconocido" }));

        // Obtener galerías del creador
        fetch(`http://localhost:5000/galerias?creador=${id}`)
            .then((res) => res.json())
            .then((data) => setGalerias(data))
            .catch(() => setGalerias([]));
    }, [id]);

    if (!creador) {
        return <p className="text-gray-400 text-center mt-10">Cargando perfil...</p>;
    }

    return (
        <div className="text-white space-y-10">
            {/* Información del creador */}
            <div className="bg-neutral-900 rounded-3xl p-8 shadow-lg border border-neutral-800">
                <button
                    onClick={() => navigate(-1)}
                    className="text-yellow-400 hover:underline mb-4"
                >
                    ← Volver
                </button>

                <div className="flex items-center gap-6">
                    <img
                        src={
                            creador.avatar ||
                            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80"
                        }
                        alt="Avatar"
                        className="w-24 h-24 rounded-full object-cover border-2 border-yellow-400"
                    />
                    <div>
                        <h1 className="text-3xl font-bold text-yellow-400">
                            {creador.nombre || "Artista sin nombre"}
                        </h1>
                        <p className="text-gray-400">
                            {creador.descripcion || "Modelo Pampita"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Galerías del creador */}
            <div>
                <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
                    Otras galerías de {creador.nombre || "este artista"}
                </h2>

                {galerias.length === 0 ? (
                    <p className="text-gray-400">Este creador aún no tiene galerías publicadas.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {galerias.map((galeria) => (
                            <div
                                key={galeria._id}
                                className="bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden hover:scale-[1.02] transition-all cursor-pointer shadow-md hover:shadow-yellow-400/20"
                            >
                                <img
                                    src={galeria.imagenes?.[0]}
                                    alt={galeria.titulo}
                                    className="w-full h-56 object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80";
                                    }}
                                />
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg text-yellow-400">
                                        {galeria.titulo}
                                    </h3>
                                    <p className="text-sm text-gray-300 line-clamp-2 mb-2">
                                        {galeria.descripcion}
                                    </p>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-yellow-400 font-semibold">
                                            ${galeria.precio?.toFixed(2) || "—"}
                                        </span>
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    className={
                                                        i < (galeria.rating || 4)
                                                            ? "text-yellow-400"
                                                            : "text-neutral-600"
                                                    }
                                                    fill={i < (galeria.rating || 4) ? "#facc15" : "none"}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
