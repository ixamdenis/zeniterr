// Archivo: backend/helpers/initializer.mjs (CÓDIGO 100% REEMPLAZADO PARA FORZAR INSERCIÓN)
import bcrypt from "bcryptjs";

// Función para insertar un usuario admin y algunas galerías de muestra
export async function initializeData(Usuario, Galeria) {
    try {
        // ⚠️ FORZAR ELIMINACIÓN DE GALERÍAS ANTIGUAS para que se reinserten con la URL correcta
        await Galeria.destroy({ where: {}, truncate: true });
        console.log("Datos de prueba antiguos eliminados.");

        let adminUser = await Usuario.findOne({ where: { rol: 'admin' } });

        if (!adminUser) {
            // 2. Crear un usuario administrador si no existe
            const salt = await bcrypt.genSalt(10);
            const adminPassword = await bcrypt.hash("admin1234", salt);

            adminUser = await Usuario.create({
                nombre: "Admin Zeniterr",
                email: "admin@zeniterr.com",
                password: adminPassword,
                rol: "admin",
                edad: 30,
                vendedorAprobado: true,
                activo: true
            });
            console.log(`Usuario administrador creado: ${adminUser.email}`);
        } else {
            console.log(`Usuario administrador ya existe: ${adminUser.email}.`);
        }

        // 3. Crear galerías de muestra con URLs accesibles
        await Galeria.bulkCreate([
            {
                titulo: "Paisaje Abstracto 1",
                descripcion: "Pintura acrílica con tonos azules y verdes. Imágenes gratis para preview.",
                // 🆕 URLs ACTUALIZADAS con localhost y la carpeta estática 'public'
                imagenes: ["http://localhost:5000/public/ejemplo01.jpg"],
                videos: [],
                precio: 150.00,
                creadorId: adminUser.id,
                publicada: true
            },
            {
                titulo: "Retrato Digital 'Alma'",
                descripcion: "Retrato en alta resolución con estilo impresionista. Imágenes gratis para preview.",
                imagenes: ["http://localhost:5000/public/ejemplo02.jpg"],
                videos: [],
                precio: 250.50,
                creadorId: adminUser.id,
                publicada: true
            },
            {
                titulo: "Escultura Minimalista 'Línea'",
                descripcion: "Representación simple de la forma y el movimiento. Imágenes gratis para preview.",
                imagenes: ["http://localhost:5000/public/ejemplo03.jpg"],
                videos: [],
                precio: 400.00,
                creadorId: adminUser.id,
                publicada: true
            },
        ]);

        console.log("3 galerías de prueba creadas y publicadas con URLs de imágenes estáticas.");

    } catch (error) {
        console.error("Error durante la inicialización de datos de prueba:", error);
    }
}