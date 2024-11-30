const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  commandeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Commandes', // This refers to the Commandes table
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pending',
  },
}, {
  tableName: 'Payments', // Ensure this matches the actual Payments table name in your DB
  timestamps: true, // Assuming Payments table uses timestamps (createdAt, updatedAt)
});

module.exports = Payment;
