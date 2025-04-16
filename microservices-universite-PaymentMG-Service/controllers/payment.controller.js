const Payment = require('../models/payment.model');

// Create new payment
exports.createPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    const savedPayment = await payment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getAllPaymentsRaw = async () => {
  return await Payment.find(); // renvoie un tableau de paiements
};
// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get payments for PDF
exports.getPaymentsForPDF = async () => {
  try {
    const payments = await Payment.find();
    return payments;
  } catch (error) {
    console.error('Error getting payments for PDF:', error);
    throw error;
  }
};

// Get payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get payments by student ID
exports.getStudentPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ studentId: req.params.studentId });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update payment
exports.updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.deletePayment = async (req, res) => {
  try {
      const { id } = req.params;
      const deletedPayment = await Payment.findByIdAndDelete(id);
      if (!deletedPayment) {
          return res.status(404).json({ message: 'Payment not found' });
      }
      res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting payment', error });
  }
};