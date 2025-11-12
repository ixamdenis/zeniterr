// Archivo: backend/models/Usuario.mjs

import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El nombre es obligatorio"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Importante: Asegura que el email sea único
      validate: {
        isEmail: true,
        notEmpty: {
          msg: "El email es obligatorio"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "La contraseña es obligatoria"
        }
      }
    },
    rol: {
      type: DataTypes.ENUM("admin", "vendedor", "comprador"),
      defaultValue: "comprador",
      allowNull: false
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [18],
          msg: "Debe ser mayor de edad para registrarse"
        }
      }
    },
    solicitudVendedor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    vendedorAprobado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    fechaRegistro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  }, {
    tableName: 'Usuarios',
    timestamps: false
  });

  return Usuario;
};