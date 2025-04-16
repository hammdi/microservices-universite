const pdfMake = require('pdfmake');
const fonts = {
    Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Bold.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-BoldItalic.ttf'
    }
};

const printer = new pdfMake.PdfPrinter(fonts);

async function generatePaymentReport(payments) {
    const docDefinition = {
        content: [
            { text: 'Payment Report', style: 'header' },
            { text: new Date().toLocaleDateString(), alignment: 'right' },
            {
                style: 'tableExample',
                table: {
                    headerRows: 1,
                    widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
                    body: [
                        ['Payment ID', 'Amount', 'Status', 'Date', 'Student ID'],
                        ...payments.map(payment => [
                            payment._id.toString(),
                            `$${payment.amount.toFixed(2)}`,
                            payment.status,
                            new Date(payment.paymentDate).toLocaleDateString(),
                            payment.studentId
                        ])
                    ]
                }
            }
        ],
        styles: {
            header: { fontSize: 18, bold: true, margin: [0, 0, 0, 20] },
            tableExample: { margin: [0, 5, 0, 15] }
        }
    };

    return printer.createPdfKitDocument(docDefinition);
}

module.exports = {
    generatePaymentReport
};
