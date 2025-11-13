import { Menu } from "lucide-react";

export default function Navbar({ onMenuClick }) {
    return (
        <header className="sticky top-0 z-20 flex justify-between items-center px-6 py-4 bg-brand-black/70 backdrop-blur-md border-b border-brand-terracotta/20 shadow-sm">
            {/* Botón menú (solo móvil) */}
            <button
                onClick={onMenuClick}
                className="lg:hidden p-2 rounded-md hover:bg-brand-terracotta/20 transition"
            >
                <Menu className="w-6 h-6 text-brand-yellow" />
            </button>

            <h1 className="text-xl font-semibold tracking-wide text-brand-yellow">
                Visual Pleasures
            </h1>

            <div className="flex items-center gap-3">
                <span className="text-brand-yellow hidden sm:block">Usuario</span>
                <img
                    src="https://images.pexels.com/photos/1839963/pexels-photo-1839963.jpeg"
                    alt="Avatar"
                    className="rounded-full w-8 h-8 ring-2 ring-brand-orange"
                />
            </div>
        </header>
    );
}
