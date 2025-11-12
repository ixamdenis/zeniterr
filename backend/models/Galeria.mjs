// Archivo: backend/models/Galeria.mjs

import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Galeria = sequelize.define('Galeria', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imagenes: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Soporte para arrays de strings
      defaultValue: [],
      allowNull: false
    },
    videos: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      allowNull: false
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    precioPromocional: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    promocionActiva: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    creadorId: { // Foreign Key que apunta al Usuario
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuarios', // Nombre de la tabla de Usuarios
        key: 'id',
      }
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    publicada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {
    tableName: 'Galerias',
    timestamps: false
  });

  return Galeria;
};