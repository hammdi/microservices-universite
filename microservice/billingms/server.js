require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.config');
const eurekaClient = require('./config/eureka.config');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Register with Eureka
eurekaClient.start(error => {
  console.log(error || 'Billing service registered with Eureka');
});

// Routes
app.use('/api/payments', require('./routes/payment.routes'));
//app.use('/api/invoices', require('./routes/invoice.routes'));

// Health check endpoint for Eureka
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

const PORT = process.env.PORT || 8070;
app.listen(PORT, () => {
  console.log(`Billing service running on port ${PORT}`);
});