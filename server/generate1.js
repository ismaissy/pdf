const fs = require('fs');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

async function generateFormWithButton() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const form = pdfDoc.getForm();

  page.drawText('PDF with JavaScript Button', {
    x: 50,
    y: 800,
    size: 18,
    font,
    color: rgb(0, 0, 0),
  });

  // Кнопка с alert
  const button = form.createButton('showDate');
  button.setLabel('Показать дату');
  button.addToPage(page, { x: 50, y: 740, width: 150, height: 25 });

  // Встроим JavaScript действие на кнопку
  button.setAction('MouseUp', `
    var now = new Date();
    app.alert("Сегодня: " + now.toDateString());
  `);

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('button_alert.pdf', pdfBytes);
  console.log('✅ button_alert.pdf создан');
}

generateFormWithButton().catch(err => {
  console.error(err);
  process.exit(1);
});
