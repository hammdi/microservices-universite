const router = require('express').Router();
const paymentController = require('../controllers/payment.controller');

router.post('/', paymentController.createPayment);
router.get('/student/:studentId', paymentController.getStudentPayments); // Move this before the :id route
router.get('/', paymentController.getAllPayments);
router.get('/:id', paymentController.getPaymentById);
router.put('/:id', paymentController.updatePayment);
<<<<<<< HEAD
router.delete('/:id', paymentController.deletePayment);
=======
>>>>>>> 59d9e5629c996274e5cf4488f0d051bdcc4ed809

module.exports = router;