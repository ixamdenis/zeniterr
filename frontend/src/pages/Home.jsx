import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import GalleryModal from "../components/GalleryModal";

const Home = () => {
    const [galerias, setGalerias] = useState([]);
    const [galeriaSeleccionada, setGaleriaSeleccionada] = useState(null);

    // ✅ Obtener galerías reales del backend
    useEffect(() => {
        fetch("http://localhost:5000/galerias")
            .then((res) => res.json())
            .then((data) => {
                const withRatings = data.map((g) => ({
                    ...g,
                    rating: g.rating || Math.floor(Math.random() * 5) + 1,
                }));
                setGalerias(withRatings);
            })
            .catch((err) => console.error("Error al obtener galerías:", err));
    }, []);

    const renderStars = (rating) => (
        <div className="flex gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={16}
                    className={i < rating ? "text-yellow-400" : "text-neutral-600"}
                    fill={i < rating ? "#facc15" : "none"}
                />
            ))}
        </div>
    );

    return (
        <div className="p-6 text-white bg-neutral-900 min-h-screen">
            <style>{swiperStyles}</style>
            {/* ===== CARRUSEL DE GALERÍAS DESTACADAS ===== */}
            {galerias.length > 0 && (
                <>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        loop={true}
                        spaceBetween={30}
                        slidesPerView={1}
                        className="w-full rounded-3xl overflow-hidden shadow-lg hover:shadow-yellow-500/20 transition-all relative !-mt-10"
                    >


                        {galerias.slice(0, 4).map((galeria) => (
                            <SwiperSlide key={galeria._id}>
                                <div
                                    className="relative cursor-pointer"
                                    onClick={() => setGaleriaSeleccionada(galeria)}
                                >
                                    <div className="relative w-full h-[550px] bg-neutral-800 flex items-center justify-center">
                                        {galeria.imagenes && galeria.imagenes[0] ? (
                                            <img
                                                src={galeria.imagenes[0]}
                                                alt={galeria.titulo}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src =
                                                        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80";
                                                }}
                                            />
                                        ) : (
                                            <span className="text-gray-500 italic">Sin imagen</span>
                                        )}
                                    </div>

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex flex-col justify-end p-8">
                                        <h2 className="text-3xl font-bold text-yellow-400 mb-2">
                                            {galeria.titulo}
                                        </h2>
                                        <p className="text-gray-300 mb-4">
                                            {galeria.descripcion}
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-xl transition">
                                                Previsualizar
                                            </button>
                                            <button className="bg-neutral-800 hover:bg-neutral-700 text-yellow-400 border border-yellow-500 px-4 py-2 rounded-xl transition">
                                                Agregar al carrito
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </>
            )}

            {/* ===== GRID DE GALERÍAS ===== */}
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
                Otras galerías
            </h2>

            {galerias.length === 0 ? (
                <p className="text-center text-gray-400">Cargando galerías...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galerias.map((galeria) => (
                        <div
                            key={galeria._id}
                            onClick={() => setGaleriaSeleccionada(galeria)}
                            className="bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden hover:scale-[1.02] transition-all cursor-pointer shadow-md hover:shadow-yellow-400/20"
                        >
                            <div className="relative w-full h-56 bg-neutral-800 flex items-center justify-center">
                                {galeria.imagenes && galeria.imagenes[0] ? (
                                    <img
                                        src={galeria.imagenes[0]}
                                        alt={galeria.titulo}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80";
                                        }}
                                    />
                                ) : (
                                    <span className="text-gray-500 italic">Sin imagen</span>
                                )}
                            </div>

                            <div className="p-4">
                                <h3 className="font-semibold text-lg text-yellow-400">
                                    {galeria.titulo}
                                </h3>
                                <p className="text-sm text-gray-300 line-clamp-2 mb-2">
                                    {galeria.descripcion}
                                </p>
                                {renderStars(galeria.rating)}
                                <div className="flex justify-between mt-3">
                                    <button className="bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-semibold px-3 py-1.5 rounded-lg">
                                        Previsualizar
                                    </button>
                                    <button className="bg-neutral-800 hover:bg-neutral-700 text-yellow-400 border border-yellow-500 text-sm px-3 py-1.5 rounded-lg">
                                        Agregar al carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ===== MODAL ===== */}
            {galeriaSeleccionada && (
                <GalleryModal
                    galeria={galeriaSeleccionada}
                    onClose={() => setGaleriaSeleccionada(null)}
                />
            )}
        </div>
    );
};

// Estilos personalizados para la paginación de Swiper
const swiperStyles = `
  .swiper-pagination-bullet {
    background-color: rgba(250, 204, 21, 0.6); /* Amarillo suave */
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    background-color: #facc15; /* Amarillo dorado */
  }
`;


export default Home;
