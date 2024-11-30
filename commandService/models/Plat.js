// models/Plat.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Plat = sequelize.define('Plat', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }}, {
    timestamps: false, // Disable timestamps if not needed
 
});


module.exports = Plat;
