const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Commande = sequelize.define('Commande', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  total_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Commandes', // Make sure this matches the actual table name in your DB
  timestamps: false, // If your table doesn't have timestamps (createdAt, updatedAt)
});

module.exports = Commande;
