import React from "react";
import { X, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const GalleryModal = ({ galeria, onClose }) => {
    if (!galeria) return null;

    // Generar estrellas de calificación
    const renderStars = (rating) => (
        <div className="flex gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={18}
                    className={i < rating ? "text-yellow-400" : "text-neutral-600"}
                    fill={i < rating ? "#facc15" : "none"}
                />
            ))}
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="relative bg-neutral-900 text-white rounded-3xl shadow-lg w-full max-w-3xl overflow-hidden border border-neutral-700">
                {/* Botón cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-yellow-400 transition"
                >
                    <X size={26} />
                </button>

                {/* Carrusel de imágenes */}
                <div className="w-full h-[420px]">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        loop={true}
                        spaceBetween={10}
                        slidesPerView={1}
                        className="w-full h-full"
                    >
                        {(galeria.imagenes?.slice(0, 4) || []).map((img, i) => (
                            <SwiperSlide key={i}>
                                <img
                                    src={img}
                                    alt={`Imagen ${i + 1}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80";
                                    }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Contenido de la galería */}
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-yellow-400 mb-2">
                        {galeria.titulo}
                    </h2>
                    <p className="text-gray-300 mb-4">{galeria.descripcion}</p>

                    {renderStars(galeria.rating || 4)}

                    {/* Precio */}
                    <div className="mt-4 text-lg">
                        <span className="text-gray-400 mr-1">Precio:</span>
                        <span className="text-yellow-400 font-semibold">
                            ${galeria.precio?.toFixed(2) || "—"}
                        </span>
                    </div>

                    {/* Botón de acción */}
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={() =>
                                (window.location.href = `/perfil/${galeria.creador || "default"}`)
                            }
                            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-5 py-2 rounded-xl transition"
                        >
                            Conoceme
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const swiperStyles = `
  .swiper-pagination-bullet {
    background-color: rgba(250, 204, 21, 0.6);
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    background-color: #facc15;
  }
`;

<style>{swiperStyles}</style>


export default GalleryModal;
