// Archivo: frontend/src/components/GalleryCard.jsx (CÓDIGO 100% REEMPLAZADO)
import React from "react";
import { Star } from "lucide-react";

// El componente ahora espera una función onPreviewClick
const GalleryCard = ({ galeria, onPreviewClick }) => {
    // rating temporal (1 a 5)
    const rating = galeria.rating || Math.floor(Math.random() * 5) + 1;

    const renderStars = (rating) => {
        return (
            <div className="flex gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={14}
                        className={i < rating ? "text-yellow-400" : "text-neutral-700"}
                        fill={i < rating ? "#facc15" : "none"}
                    />
                ))}
            </div>
        );
    };

    const handlePreviewClick = (e) => {
        e.stopPropagation(); // Previene que el clic se propague al contenedor si lo tuviera
        if (onPreviewClick) {
            onPreviewClick(galeria);
        }
    }

    return (
        <div
            className="bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden hover:scale-[1.02] transition-all cursor-pointer shadow-md hover:shadow-yellow-400/20"
            // Se puede hacer clic en toda la tarjeta para la vista previa
            onClick={handlePreviewClick}
        >
            <img
                src={galeria.imagen || galeria.imagenes?.[0] || ""}
                alt={galeria.titulo}
                className="w-full h-56 object-cover"
            />
            <div className="p-4 flex flex-col justify-between min-h-[150px]">
                <div>
                    <h3 className="font-semibold text-lg text-yellow-400">
                        {galeria.titulo}
                    </h3>
                    <p className="text-sm text-gray-300 line-clamp-2">
                        {galeria.descripcion}
                    </p>
                    {renderStars(rating)}
                </div>
                <div className="flex justify-between mt-3">
                    {/* El botón explícitamente llama al manejador de click */}
                    <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-semibold px-3 py-1.5 rounded-lg"
                        onClick={handlePreviewClick}
                    >
                        Previsualizar
                    </button>
                    <button className="bg-neutral-800 hover:bg-neutral-700 text-yellow-400 border border-yellow-500 text-sm px-3 py-1.5 rounded-lg">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GalleryCard;