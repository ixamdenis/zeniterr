import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const mainRef = useRef(null);

    useEffect(() => {
        const mainEl = mainRef.current;
        if (!mainEl) return;

        const handleScroll = () => {
            const currentScrollY = mainEl.scrollTop;
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsHidden(true); // ocultar al bajar
            } else if (currentScrollY < lastScrollY) {
                setIsHidden(false); // mostrar al subir
            }
            setLastScrollY(currentScrollY);
        };

        mainEl.addEventListener("scroll", handleScroll);
        return () => mainEl.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <div className="flex h-screen bg-neutral-950 text-white">
            {/* === SIDEBAR === */}
            <Sidebar />

            {/* === CONTENIDO PRINCIPAL === */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* HEADER flotante (sin ocupar espacio en el flujo visual) */}
                <header
                    className={`absolute top-0 left-0 w-full border-b border-neutral-800 p-4 z-30
          transition-all duration-500 ease-in-out ${isHidden
                            ? "opacity-0 -translate-y-full pointer-events-none"
                            : "opacity-100 translate-y-0 bg-neutral-900/70 backdrop-blur-md shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                        }`}
                    style={{ height: "64px" }}
                >
                    <div className="flex justify-between items-center h-full">
                        <h1 className="text-yellow-400 text-xl font-semibold tracking-wide drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                            Galería App
                        </h1>
                    </div>
                </header>

                {/* MAIN: Scroll interno + compensación de header */}
                <main
                    ref={mainRef}
                    className="flex-1 overflow-y-auto bg-neutral-900 p-6 scrollbar-thin scrollbar-thumb-yellow-600 scrollbar-track-neutral-800"
                    style={{ paddingTop: "80px" }}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
