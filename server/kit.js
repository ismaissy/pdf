const fs = require('fs');
const PDFDocument = require('pdfkit');

const doc = new PDFDocument();

doc.pipe(fs.createWriteStream('pdfkit_example.pdf'));

doc.fontSize(25).text('PDFKit Example', 100, 80);
doc.fontSize(14).text('Дата: ' + new Date().toLocaleDateString(), 100, 150);

doc.rect(100, 200, 150, 30).stroke();
doc.text('Кнопка (визуально)', 110, 210); // Это не настоящая кнопка, просто текст

doc.end();
console.log('✅ pdfkit_example.pdf создан');
