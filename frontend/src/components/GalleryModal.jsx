// Archivo: frontend/src/components/GalleryModal.jsx (CÓDIGO 100% FINAL)

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Lock, User } from 'lucide-react';

function GalleryModal({ gallery, onClose }) {
    const navigate = useNavigate();

    if (!gallery) return null;

    const rating = gallery.rating || 0;

    const renderStars = (currentRating) => (
        <div className="flex gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={16}
                    className={i < currentRating ? "text-yellow-400" : "text-neutral-600"}
                    fill={i < currentRating ? "#facc15" : "none"}
                    strokeWidth={1.5}
                />
            ))}
        </div>
    );

    // 🖱️ Lógica para el botón "Conóceme"
    const handleConoceme = (e) => {
        e.stopPropagation();
        onClose();
        if (gallery.creador && gallery.creador.id) {
            navigate(`/profile/${gallery.creador.id}`); // Navegación al perfil del creador
        } else {
            alert("Información del creador no disponible.");
        }
    };

    // 🛒 Lógica para el botón "Desbloquear Contenido"
    const handleDesbloquear = (e) => {
        e.stopPropagation();
        alert(`Iniciando proceso de compra para: ${gallery.titulo}. Precio: $${gallery.precio.toFixed(2)}`);
    };

    return (
        // Fondo oscuro (overlay)
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-85"
            onClick={onClose}
        >

            {/* Contenedor del Modal (Diseño Oscuro) */}
            <div
                className="bg-neutral-800 rounded-xl shadow-2xl border border-neutral-700 max-w-4xl w-full mx-4 p-6 relative overflow-y-auto max-h-full text-white"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botón de Cierre (la 'X') */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-yellow-400 transition duration-150 p-1 rounded-full bg-neutral-700"
                    aria-label="Cerrar"
                >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                <h2 className="text-3xl font-serif font-bold text-yellow-400 mb-4 border-b border-neutral-700 pb-2">
                    {gallery.titulo}
                </h2>

                {/* Contenido principal del modal (Imagen y Detalles) */}
                <div className="flex flex-col md:flex-row gap-6">

                    {/* Columna de la Imagen/Preview */}
                    <div className="md:w-1/2 flex flex-col items-start">

                        <h3 className="text-lg font-serif font-semibold text-gray-300 mb-2 flex items-center gap-2">
                            Previsualización gratuita
                            <Lock size={16} className="text-yellow-400" />
                        </h3>

                        {/* Muestra la primera imagen como preview, con fallback en caso de error de carga */}
                        {gallery.imagenes && gallery.imagenes.length > 0 ? (
                            <img
                                src={gallery.imagenes[0]}
                                alt={gallery.titulo}
                                className="w-full h-auto object-cover rounded-md shadow-md border border-neutral-700 mb-3"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    // SVG de caja gris como fallback
                                    e.target.src = "data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' fill='%23D1D5DB' font-family='sans-serif' font-size='10' text-anchor='middle' alignment-baseline='middle'%3ESin Imagen</text%3E%3C/svg%3E";
                                    e.target.className = "w-full h-64 object-contain rounded-md shadow-md border border-neutral-700 mb-3";
                                }}
                            />
                        ) : (
                            <div className="w-full h-64 flex items-center justify-center bg-neutral-700 rounded-md text-gray-400 italic">Sin Imagen de Muestra</div>
                        )}

                        {/* Rating y Creador */}
                        <div className="flex flex-col space-y-1">
                            <div className="flex items-center text-gray-300 font-sans text-sm">
                                Calificación:
                                {renderStars(rating)}
                            </div>
                            {gallery.creador?.nombre && (
                                <p className="text-sm text-gray-400 font-sans">
                                    Creado por: <span className="font-semibold text-yellow-400">{gallery.creador.nombre}</span>
                                </p>
                            )}
                        </div>

                    </div>

                    {/* Columna de Detalles y Acciones */}
                    <div className="md:w-1/2 flex flex-col justify-between">
                        <div>
                            <p className="text-2xl font-serif text-green-500 font-bold mb-4">
                                Precio: ${gallery.precio ? gallery.precio.toFixed(2) : 'N/A'}
                            </p>

                            <h3 className="text-xl font-serif font-semibold text-gray-300 mb-2">Descripción de la obra</h3>
                            <p className="text-gray-400 mb-4 font-sans">{gallery.descripcion || 'Sin descripción.'}</p>
                        </div>

                        {/* Botones de Acción */}
                        <div className="flex flex-col space-y-3 pt-4 border-t border-neutral-700 mt-4">

                            {/* Botón: Conóceme */}
                            <button
                                onClick={handleConoceme}
                                className="bg-neutral-700 hover:bg-neutral-600 text-yellow-400 border border-yellow-500 font-sans font-bold py-2 px-4 rounded-xl transition duration-150 ease-in-out flex items-center justify-center gap-2"
                            >
                                <User size={18} /> Conóceme (Ver Perfil del Creador)
                            </button>

                            {/* Botón: Desbloquear Contenido Completo */}
                            <button
                                onClick={handleDesbloquear}
                                className="bg-yellow-500 hover:bg-yellow-600 text-black font-sans font-bold py-2 px-4 rounded-xl transition duration-150 ease-in-out flex items-center justify-center gap-2"
                            >
                                <Lock size={18} /> Desbloquear Contenido Completo
                            </button>

                            {/* Botón de cerrar */}
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-yellow-400 border border-neutral-600 hover:border-yellow-400 py-2 px-4 rounded-xl transition duration-150 ease-in-out font-sans"
                            >
                                Cerrar Previsualización
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GalleryModal;