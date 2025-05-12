// generate-and-patch.js
const fs = require('fs');
const {
  PDFDocument,
  rgb,
  StandardFonts
} = require('pdf-lib');

async function run() {
  // 1) Создаём пустой PDF и страницу A4
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4

  // 2) Шрифт
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // 3) AcroForm
  const form = pdfDoc.getForm();

  // 4) Заголовок
  page.drawText('Employee Form', { x: 50, y: 800, size: 18, font, color: rgb(0, 0, 0) });

  // 5) TextField — Name
  form.createTextField('name')
      .setText('Enter your name')
      .addToPage(page, { x: 50, y: 760, width: 300, height: 20 });

  // 6) CheckBox — Agree
  form.createCheckBox('agree')
      .addToPage(page, { x: 50, y: 720, width: 15, height: 15 });
  page.drawText('Agree to terms', { x: 70, y: 718, size: 12, font });

  // 7) RadioGroup — Gender
  const gender = form.createRadioGroup('gender');
  gender.addOptionToPage('Male', page, { x: 50,  y: 680 });
  gender.addOptionToPage('Female', page, { x: 120, y: 680 });
  page.drawText('Gender:', { x: 50, y: 700, size: 12, font });

  // 8) Dropdown — Country of Birth
  const country = form.createDropdown('country');
  country.setOptions(['Turkmenistan', 'Russia', 'Uzbekistan'])
         .select('Turkmenistan')
         .addToPage(page, { x: 50, y: 640, width: 200, height: 20 });
  page.drawText('Country of Birth:', { x: 50, y: 660, size: 12, font });

  // 9) TextField — Date of Birth (будет патчиться скриптом)
  form.createTextField('dob')
      .setText('YYYY-MM-DD')
      .addToPage(page, { x: 50, y: 600, width: 150, height: 20 });
  page.drawText('Date of Birth:', { x: 50, y: 620, size: 12, font });

  // 10) Место для фото
  page.drawRectangle({
    x: 400, y: 700, width: 100, height: 100,
    borderColor: rgb(0,0,0), borderWidth: 1
  });
  page.drawText('Insert photo here', {
    x: 400, y: 685, size: 10, font, color: rgb(0.5,0,0)
  });

  // 11) Добавляем Document-level JavaScript для date-picker
  pdfDoc.addJavaScript('DatePicker', `
    var f = this.getField("dob");
    if (f) {
      f.setAction("Keystroke", "AFDate_KeystrokeEx('yyyy-mm-dd');");
      f.setAction("Format",    "AFDate_FormatEx('yyyy-mm-dd');");
    }
  `);

  // 12) Сохраняем итоговый PDF
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('employee_form_with_datepicker.pdf', pdfBytes);
  console.log('✅ employee_form_with_datepicker.pdf saved');
}

run().catch(err => console.error(err));