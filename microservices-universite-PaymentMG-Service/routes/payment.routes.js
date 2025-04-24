const router = require('express').Router();
const paymentController = require('../controllers/payment.controller');

router.post('/', paymentController.createPayment);
router.get('/student/:studentId', paymentController.getStudentPayments); // Move this before the :id route
router.get('/', paymentController.getAllPayments);
router.get('/:id', paymentController.getPaymentById);
router.put('/:id', paymentController.updatePayment);
router.delete('/:id', paymentController.deletePayment);

module.exports = router;