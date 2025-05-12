const fs = require('fs');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

async function generateForm() {
    // 1. Создаём новый PDF документ
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4

    // 2. Встраиваем шрифт Helvetica
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // 3. Создаём форму
    const form = pdfDoc.getForm();

    // 4. Заголовок
    page.drawText('Employee Form', {
        x: 50, y: 800, size: 18, font, color: rgb(0, 0, 0),
    });

    // 5. TextField: Имя
    const nameField = form.createTextField('name');
    nameField.setText('Enter your name');
    nameField.addToPage(page, { x: 50, y: 760, width: 300, height: 20 });

    // 6. CheckBox: Согласие
    const agreeCheckbox = form.createCheckBox('agree');
    agreeCheckbox.addToPage(page, { x: 50, y: 720, width: 15, height: 15 });
    page.drawText('Agree to terms', { x: 70, y: 718, size: 12, font });

    // 7. RadioGroup: Пол
    const genderGroup = form.createRadioGroup('gender');
    genderGroup.addOptionToPage('Male', page, { x: 50, y: 680 });
    genderGroup.addOptionToPage('Female', page, { x: 120, y: 680 });
    page.drawText('Gender:', { x: 50, y: 700, size: 12, font });

    // 8. Dropdown: Страна
    const countryDropdown = form.createDropdown('country');
    countryDropdown.setOptions(['Turkmenistan', 'Russia', 'Uzbekistan']);
    countryDropdown.select('Turkmenistan');
    countryDropdown.addToPage(page, { x: 50, y: 640, width: 200, height: 20 });
    page.drawText('Country of Birth:', { x: 50, y: 660, size: 12, font });

    // 9. TextField: Дата рождения (с JS-валидацией)
    const dobField = form.createTextField('dob');
    dobField.setText('YYYY-MM-DD');
    dobField.addToPage(page, { x: 50, y: 600, width: 150, height: 20 });
    page.drawText('Date of Birth:', { x: 50, y: 620, size: 12, font });

    // 10. Прямоугольник для фото
    page.drawRectangle({
        x: 400, y: 700, width: 100, height: 100,
        borderColor: rgb(0, 0, 0), borderWidth: 1,
    });
    page.drawText('Insert photo here', {
        x: 405, y: 685, size: 10, font, color: rgb(0.5, 0, 0),
    });

    // 11. Вставка JavaScript для валидации даты
    pdfDoc.addJavaScript('EnableDateValidation', `
    var f = this.getField("dob");
    if (f) {
      f.setAction("Keystroke", "AFDate_KeystrokeEx('yyyy-mm-dd');");
      f.setAction("Format", "AFDate_FormatEx('yyyy-mm-dd');");
    }
  `);

    // 12. Сохраняем PDF
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('employee_form.pdf', pdfBytes);
    console.log('✅ employee_form.pdf has been created');
}

generateForm().catch(err => {
    console.error('❌ Error:', err);
});