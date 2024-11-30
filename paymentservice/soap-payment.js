const express = require('express');
const soap = require('soap');
const bodyParser = require('body-parser');
const sequelize = require('./db'); // Sequelize connection
const Commande = require('./models/Commande');
const Payment = require('./models/Payment');
const { Op } = require('sequelize');
const fs=require('fs')

// Create an Express app
const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// The SOAP service definition
const service = {
  PaymentService: {
    PaymentServicePort: {
      // The method for processing the payment
      createPayment: async (args) => {
        const { commandeId, amount, paymentMethod } = args;
      
        try {
          // Step 1: Validate the existence of the order (Commande)
          const commande = await Commande.findOne({
            where: { id: commandeId, status: { [Op.ne]: 'Paid' } } // Check if the order exists and is not already paid
          });
      
          if (!commande) {
            throw new Error('Order not found or already paid');
          }
      
          // Log the fetched values for debugging
          console.log('Fetched Commande:', commande);
          console.log('Requested Amount:', amount);
          console.log('Total Price in DB:', commande.total_price);
      
          // Step 2: Ensure the amount matches the order total
          if (Math.round(commande.total_price * 100) / 100 !== Math.round(amount * 100) / 100) {
            throw new Error('Payment amount does not match the order total price');
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
          return {
            message: 'Payment processed successfully',
            payment: payment,
            order: commande,
          };
      
        } catch (error) {
          console.error('Error processing payment:', error);
          throw new Error('Error processing payment: ' + error.message);
        }
      }
      
    },
  },
};

// The SOAP XML definition for the web service
const WSDL = require('fs').readFileSync('./soapfile/payment.wsdl', 'utf8'); // Path to the WSDL
// Start the SOAP server using the Express app
const PORT = 3001;
soap.listen(app, '/payment', service, WSDL, () => {
  console.log(`SOAP service is running on http://localhost:${PORT}/payment`);
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
