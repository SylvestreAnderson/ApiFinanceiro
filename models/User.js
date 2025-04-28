const { DataTypes } = require('sequelize');
const db = require('../db/conn.js'); // Certifique-se de que esse caminho está correto

const User = db.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    perfil: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true, // Para createdAt e updatedAt serem gerenciados automaticamente
    tableName: 'User', // Garante que o nome da tabela seja 'Users' e não 'users' (Sequelize usa lowercase por padrão)
});

module.exports = User;
