// models/Commande.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Client = require('./Client');
const Restaurant = require('./Restaurant');
const Plat = require('./Plat');
const Payment = require('./Payment'); // Import Payment model


// Define the Commande model (Order)
const Commande = sequelize.define('Commande', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pending',
  },
  total_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
}, {
  timestamps: false, // Disable timestamps if not needed
});

// Relationships
Commande.belongsTo(Client, { foreignKey: 'clientId' });
Commande.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
Commande.belongsToMany(Plat, { through: 'CommandePlats' });
Commande.hasMany(Payment, { foreignKey: 'commandeId' });
Payment.belongsTo(Commande, { foreignKey: 'commandeId' });

module.exports = Commande;
