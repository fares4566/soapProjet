// models/Restaurant.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Restaurant = sequelize.define('Restaurant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: false, // Disable timestamps if not needed

});

module.exports = Restaurant;
