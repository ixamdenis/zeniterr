import GalleryCard from "../components/GalleryCard";

export default function GalleryView() {
    const galleries = [
        {
            id: 1,
            title: "Atardeceres de la Patagonia",
            image:
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
            description:
                "Colección de paisajes patagónicos bañados por la luz dorada del atardecer.",
        },
        {
            id: 2,
            title: "Ciudades nocturnas",
            image:
                "https://images.unsplash.com/photo-1486308510493-aa64833634ef?auto=format&fit=crop&w=800&q=80",
            description:
                "Luces urbanas y contrastes entre movimiento y silencio.",
        },
        {
            id: 3,
            title: "Detalles del mar",
            image:
                "https://images.unsplash.com/photo-1529927066849-bd4bde1b0b39?auto=format&fit=crop&w=800&q=80",
            description:
                "Texturas, reflejos y vida marina capturada desde cerca.",
        },
    ];

    return (
        <section className="w-full flex flex-col items-center text-white">
            <h1 className="text-3xl font-bold mb-8 text-brand-yellow">
                Galerías disponibles
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                {galleries.map((gallery) => (
                    <GalleryCard key={gallery.id} {...gallery} />
                ))}
            </div>
        </section>
    );
}
