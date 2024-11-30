const { Sequelize } = require('sequelize');

// Setup Sequelize to connect to your MySQL database
const sequelize = new Sequelize('dbrestaurant', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Disable logging for cleaner output
});

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

connectDb();

module.exports = sequelize;
