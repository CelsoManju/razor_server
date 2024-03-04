const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
//const port = 3000;

const razorpay = new Razorpay({
    key_id: 'rzp_test_bA6BnBtSanhgXP',
    key_secret: 'RJYQMTN79JoC1NIbi4YhD6eg'
});

app.use(cors()); // Use the cors middleware

app.use(bodyParser.json());

// Endpoint to create Razorpay order
app.post('/create-order', (req, res) => {
    const { amount, currency } = req.body;

    const options = {
        amount: 5000,
        currency: 'INR',
        receipt: 'receipt_order_1',
        payment_capture: '1'
    };

    razorpay.orders.create(options, (err, order) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(order);
        }
    });
});

// Endpoint to handle Razorpay webhook notification
app.post('/webhook', (req, res) => {
    const { event, payload } = req.body;

    // Process webhook event and update payment status accordingly
    // Example: if (event === 'payment.captured') { // update payment status }

    res.status(200).send('Webhook received');
});
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
