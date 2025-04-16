const router = require('express').Router();
const paymentController = require('../controllers/payment.controller');
const pdfmake = require('pdfmake');

// Initialize PDFMake with default fonts
const pdfMake = new pdfmake();

// Generate PDF report for all payments
router.get('/report', async (req, res) => {
    try {
        console.log('Fetching payments for PDF...');
        const payments = await paymentController.getPaymentsForPDF();
        console.log('Payments retrieved:', payments.length);
        
        // Create simple PDF content
        const docDefinition = {
            content: payments.map(payment => {
                console.log('Processing payment:', payment._id);
                return {
                    text: `Payment ID: ${payment._id}\n` +
                           `Amount: $${payment.amount}\n` +
                           `Status: ${payment.status}\n` +
                           `Date: ${new Date(payment.paymentDate).toLocaleDateString()}\n` +
                           `Student ID: ${payment.studentId}\n\n`
                };
            })
        };

        console.log('Creating PDF...');
        const pdfDoc = pdfMake.createPdfKitDocument(docDefinition);
        
        console.log('Setting headers and sending PDF...');
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=payment_report.pdf');
        pdfDoc.pipe(res);
        pdfDoc.end();

    } catch (error) {
        console.error('Error details:', error);
        console.error('Stack trace:', error.stack);
        res.status(500).json({ message: 'Error generating PDF report', error: error.message });
    }
});

// Existing routes
router.post('/', paymentController.createPayment);
router.get('/student/:studentId', paymentController.getStudentPayments);
router.get('/', paymentController.getAllPayments);
router.get('/:id', paymentController.getPaymentById);
router.put('/:id', paymentController.updatePayment);
router.delete('/:id', paymentController.deletePayment);

module.exports = router;