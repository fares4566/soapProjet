// server.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const Client = require('./models/Client');
const Plat = require('./models/Plat');
const Commande = require('./models/Commande');
const Restaurant = require('./models/Restaurant');

const app = express();
app.use(bodyParser.json());

// Create an order
app.post('/order', async (req, res) => {
  try {
    const { clientId, restaurantId, plats } = req.body || {};

    // Log incoming data for debugging
    console.log("Request body:", req.body);
    console.log("Received plats:", plats);

    // Validate plats is an array
    if (!Array.isArray(plats) || plats.length === 0) {
      return res.status(400).json({ message: 'Plats should be a valid non-empty array' });
    }

    const client = await Client.findByPk(clientId);
    const restaurant = await Restaurant.findByPk(restaurantId);
    const platsData = await Plat.findAll({ where: { id: plats } });

    if (!client) return res.status(400).json({ message: 'Client not found' });
    if (!restaurant) return res.status(400).json({ message: 'Restaurant not found' });
    if (platsData.length === 0) return res.status(400).json({ message: 'No plats found' });

    const totalPrice = platsData.reduce((total, plat) => total + plat.price, 0);

    const commande = await Commande.create({
      status: 'Pending',
      total_price: totalPrice,
      clientId,
      restaurantId,
    });

    await commande.setPlats(platsData);

    res.status(201).json({ message: 'Order placed successfully', commande });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ message: 'Error placing order', error: error.message });
  }
});


// Start the server
const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
