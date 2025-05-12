// fill.js
const fs = require('fs');
const { PDFDocument, StandardFonts } = require('pdf-lib');

async function fillForm() {
  // 1) Загрузить шаблон из Acrobat Pro
  const templateBytes = fs.readFileSync('template.pdf');
  const pdfDoc = await PDFDocument.load(templateBytes);

  // 2) Подключить шрифт (если надо)
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  pdfDoc.getForm().updateFieldAppearances(font);

  // 3) Получить форму и поля
  const form = pdfDoc.getForm();

  form.getTextField('name').setText('Ivan Petrov');
  form.getDropdown('country').select('Russia');
  form.getTextField('dob').setText('2025-05-12'); // календарь покажется при клике
  form.getCheckBox('agree').check();
  form.getRadioGroup('gender').select('Male');

  // 4) Сохранить новый PDF
  const filledBytes = await pdfDoc.save();
  fs.writeFileSync('filled.pdf', filledBytes);
  console.log('filled.pdf saved');
}

fillForm().catch(console.error);