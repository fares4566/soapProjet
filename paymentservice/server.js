const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db'); // Sequelize connection
const Commande = require('./models/Commande');
const Payment = require('./models/Payment');
const { Op } = require('sequelize');

// Initialize the Express app
const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Payment processing route
app.post('/payment', async (req, res) => {
  const { commandeId, amount, paymentMethod } = req.body;

  try {
    // Step 1: Validate the existence of the order (Commande)
    const commande = await Commande.findOne({
      where: { id: commandeId, status: { [Op.ne]: 'Paid' } } // Check if the order exists and is not already paid
    });

    if (!commande) {
      return res.status(404).json({ message: 'Order not found or already paid' });
    }

    // Step 2: Ensure the amount matches the order total
    if (commande.total_price !== amount) {
      return res.status(400).json({ message: 'Payment amount does not match the order total price' });
    }

    // Step 3: Create the payment record
    const payment = await Payment.create({
      commandeId: commande.id,
      amount: amount,
      paymentMethod: paymentMethod, // e.g., 'Credit Card', 'PayPal'
      status: 'Completed', // Assuming the payment is successful
    });

    // Step 4: Update the order status to 'Paid'
    commande.status = 'Paid';
    await commande.save();

    // Step 5: Return the response
    return res.status(200).json({
      message: 'Payment processed successfully',
      payment: payment,
      order: commande,
    });
    
  } catch (error) {
    console.error('Error processing payment:', error);
    return res.status(500).json({ message: 'Error processing payment', error: error.message });
  }
});

// Start the server on port 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
