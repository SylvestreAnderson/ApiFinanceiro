const { DataTypes } = require('sequelize');
const db = require('../db/conn.js'); // Certifique-se de que esse caminho está correto

const Igreja = db.define('Igreja', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    fantasia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bairro:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cnpjempresa: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    responsavel: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    matriz: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    timestamps: true, // Para createdAt e updatedAt serem gerenciados automaticamente
    tableName: 'Igreja', // Garante que o nome da tabela seja 'Users' e não 'users' (Sequelize usa lowercase por padrão)
});

module.exports = Igreja;
