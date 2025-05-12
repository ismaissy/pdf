// const HummusRecipe = require('hummus-recipe');

// const createPdfWithForm = () => {
//     const pdfDoc = new HummusRecipe('new', 'form.pdf');

//     pdfDoc.createPage(600, 400)
//         .text('User Form', 50, 50)
//         .formTextField(120, 100, 200, 25, 'name', 'Enter your name')
//         .formCheckbox(120, 150, 20, 20, 'agree', 'Agree to terms')
//         .formRadioGroup(120, 200, 20, 'gender', ['Male', 'Female'])
//         .formDropdown(120, 250, 200, 25, 'department', ['HR', 'Engineering', 'Marketing'])
//         .endPage()
//         .endPDF();
// };

// createPdfWithForm();// server.js
const fs = require('fs');
const {
  PDFDocument,
  rgb,
  StandardFonts
} = require('pdf-lib');

async function generateEmployeeForm() {
  // 1) Создаём PDF и страницу A4
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 в пунктах

  // 2) Шрифт
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // 3) Создаём AcroForm
  const form = pdfDoc.getForm();

  // 4) Заголовок
  page.drawText('Employee Form', {
    x: 50,
    y: 800,
    size: 18,
    font,
    color: rgb(0, 0, 0),
  });

  // 5) Текстовое поле: Name
  const nameField = form.createTextField('name');
  nameField.setText('Enter your name');
  nameField.addToPage(page, { x: 50, y: 760, width: 300, height: 20 });

  // 6) Чекбокс: Agree to terms
  const agreeField = form.createCheckBox('agree');
  agreeField.addToPage(page, { x: 50, y: 720, width: 15, height: 15 });

  page.drawText('Agree to terms', { x: 70, y: 718, size: 12, font });

  // 7) Радиогруппа: Gender
  const genderGroup = form.createRadioGroup('gender');
  genderGroup.addOptionToPage('Male', page, { x: 50, y: 680 });
  genderGroup.addOptionToPage('Female', page, { x: 120, y: 680 });

  page.drawText('Gender:', { x: 50, y: 700, size: 12, font });

  // 8) Выпадающий список: Country of Birth
  const countryField = form.createDropdown('country');
  countryField.setOptions(['Turkmenistan', 'Russia', 'Uzbekistan']);
  countryField.select('Turkmenistan');
  countryField.addToPage(page, { x: 50, y: 640, width: 200, height: 20 });

  page.drawText('Country of Birth:', { x: 50, y: 660, size: 12, font });

  // 9) Текстовое поле: Date of Birth
  const dobField = form.createTextField('dob');
  dobField.setText('YYYY-MM-DD');
  dobField.addToPage(page, { x: 50, y: 600, width: 150, height: 20 });

  page.drawText('Date of Birth:', { x: 50, y: 620, size: 12, font });

  // 10) Резерв для фото — пользователь вставит вручную в Acrobat
  page.drawRectangle({
    x: 400,
    y: 700,
    width: 100,
    height: 100,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1,
  });
  page.drawText('Insert photo here', {
    x: 400,
    y: 685,
    size: 10,
    font,
    color: rgb(0.5, 0, 0),
  });

  // 11) Сохраняем PDF на диск
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('employee_form.pdf', pdfBytes);
  console.log('✅ employee_form.pdf saved');
}

generateEmployeeForm().catch(err => console.error(err));