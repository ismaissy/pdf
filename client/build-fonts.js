// const fs = require('fs');
// const path = require('path');
// const PdfPrinter = require('pdfmake/src/printer');

// const fonts = {
//     TimesNewRoman: {
//         normal: path.join(__dirname, 'public/fonts/TIMES.TTF'),
//         bold: path.join(__dirname, 'public/fonts/TIMESBD.TTF'),
//         italics: path.join(__dirname, 'public/fonts/TIMESI.TTF'),
//         bolditalics: path.join(__dirname, 'public/fonts/TIMESBI.TTF'),
//     },
// };

// const printer = new PdfPrinter(fonts);
// const vfs = printer.fontDescriptors;

// fs.writeFileSync(
//     path.join(__dirname, 'src', 'vfs_fonts.js'),
//     'window.pdfMake = window.pdfMake || {};\n' +
//     'window.pdfMake.vfs = ' + JSON.stringify(vfs) + ';'
// );

// console.log('✅ vfs_fonts.js сгенерирован!');

const fs = require('fs');
const path = require('path');

// Читаем и кодируем каждый файл шрифта
const fonts = {
    'TIMES.TTF': fs.readFileSync(path.join(__dirname, 'public/fonts/TIMES.TTF')).toString('base64'),
    'TIMESBD.TTF': fs.readFileSync(path.join(__dirname, 'public/fonts/TIMESBD.TTF')).toString('base64'),
    'TIMESI.TTF': fs.readFileSync(path.join(__dirname, 'public/fonts/TIMESI.TTF')).toString('base64'),
    'TIMESBI.TTF': fs.readFileSync(path.join(__dirname, 'public/fonts/TIMESBI.TTF')).toString('base64')
};

const vfsContent =
    'export const vfs = ' + JSON.stringify(fonts, null, 2) + ';';

fs.writeFileSync(path.join(__dirname, 'src', 'vfs_fonts.js'), vfsContent);


console.log('✅ vfs_fonts.js сгенерирован правильно!');
