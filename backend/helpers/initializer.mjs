// Archivo: backend/helpers/initializer.mjs
import bcrypt from "bcryptjs";

// Función para insertar un usuario admin y algunas galerías de muestra
export async function initializeData(Usuario, Galeria) {
    try {
        // 1. Verificar si ya existe un administrador
        const adminUser = await Usuario.findOne({ where: { rol: 'admin' } });

        if (adminUser) {
            console.log("Datos de prueba: El usuario administrador ya existe. Saltando inicialización.");
            return;
        }

        console.log("Inicializando datos de prueba...");

        // 2. Crear un usuario administrador
        const salt = await bcrypt.genSalt(10);
        const adminPassword = await bcrypt.hash("admin1234", salt); // Contraseña simple para el admin de prueba

        const newAdmin = await Usuario.create({
            nombre: "Admin Zeniterr",
            email: "admin@zeniterr.com",
            password: adminPassword,
            rol: "admin",
            edad: 30,
            vendedorAprobado: true,
            activo: true
        });

        console.log(`Usuario administrador creado: ${newAdmin.email}`);

        // 3. Crear galerías de muestra
        await Galeria.bulkCreate([
            {
                titulo: "Paisaje Abstracto 1",
                descripcion: "Pintura acrílica con tonos azules y verdes.",
                imagenes: ["/backend/helpers/emeplo01.jpg"],
                videos: [],
                precio: 150.00,
                creadorId: newAdmin.id,
                publicada: true
            },
            {
                titulo: "Retrato Digital 'Alma'",
                descripcion: "Retrato en alta resolución con estilo impresionista.",
                imagenes: ["/backend/helpers/emeplo02.jpg"],
                videos: [],
                precio: 250.50,
                creadorId: newAdmin.id,
                publicada: true
            },
            {
                titulo: "Escultura Minimalista 'Línea'",
                descripcion: "Representación simple de la forma y el movimiento.",
                imagenes: ["/backend/helpers/emeplo03.jpg"],
                videos: [],
                precio: 400.00,
                creadorId: newAdmin.id,
                publicada: true
            },
        ]);

        console.log("3 galerías de prueba creadas y publicadas.");

    } catch (error) {
        console.error("Error durante la inicialización de datos de prueba:", error);
    }
}