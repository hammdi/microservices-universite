const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentType: {
    type: String,
    enum: ['TUITION', 'LIBRARY', 'LABORATORY', 'OTHER'],
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'FAILED'],
    default: 'PENDING'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);