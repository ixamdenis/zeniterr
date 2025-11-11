import React from "react";
import { Folder, CreditCard, Settings } from "lucide-react";

const Sidebar = () => {
    return (
        <aside className="w-60 bg-neutral-950 border-r border-neutral-800 flex flex-col justify-between p-4">
            {/* ===== MENÚ PRINCIPAL ===== */}
            <div>
                <h2 className="text-yellow-400 font-bold text-lg mb-6">Menú</h2>

                <nav className="space-y-4">
                    <a
                        href="/galerias"
                        className="flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition"
                    >
                        <Folder size={18} className="text-yellow-400" />
                        <span>Galerías</span>
                    </a>

                    <a
                        href="/compras"
                        className="flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition"
                    >
                        <CreditCard size={18} className="text-yellow-400" />
                        <span>Compras</span>
                    </a>

                    <a
                        href="/configuracion"
                        className="flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition"
                    >
                        <Settings size={18} className="text-yellow-400" />
                        <span>Configuración</span>
                    </a>
                </nav>
            </div>

            {/* ===== USUARIO / PERFIL ===== */}
            <div className="border-t border-neutral-800 pt-4 mt-6 flex items-center gap-3 px-2">
                <img
                    src="/avatar.png"
                    alt="Usuario"
                    className="w-9 h-9 rounded-full border border-yellow-400 object-cover"
                />
                <div>
                    <p className="text-yellow-400 font-semibold text-sm cursor-pointer hover:underline">
                        Usuario
                    </p>
                    <p className="text-xs text-gray-400">Ver perfil</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
