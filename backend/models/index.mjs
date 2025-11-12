// Archivo: backend/models/index.mjs

import Usuario from "./Usuario.mjs";
import Galeria from "./Galeria.mjs";

export function defineModels(sequelize) {
    // Inicializamos los modelos con la instancia de Sequelize
    const UsuarioModel = Usuario(sequelize);
    const GaleriaModel = Galeria(sequelize);

    // Devolvemos los modelos inicializados
    return {
        Usuario: UsuarioModel,
        Galeria: GaleriaModel,
    };
}