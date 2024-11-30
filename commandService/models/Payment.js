const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Commande = require('./Commande'); // Import Commande model

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
      model: 'Commandes',
      key: 'id',
    },
    onDelete: 'CASCADE', // Ensures payment is deleted if associated Commande is deleted
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pending', // Initially the payment status is 'Pending'
  },
  paymentMethod: {
    type: DataTypes.STRING,  // e.g., Credit card, PayPal
    allowNull: false,
  },
}, {
  timestamps: false,  // Track creation and update times
});

module.exports = Payment;
