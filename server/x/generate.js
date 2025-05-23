const fs = require("fs");
const path = require("path");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

// https://docxtemplater.com/docs/goals/

// 📂 Загружаем шаблон
const content = fs.readFileSync(path.resolve(__dirname, "template.docx"), "binary");
const zip = new PizZip(content);

// ⚙️ Создаём экземпляр шаблонизатора
const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
});

// 🎯 Данные
const data = {
    birthDay: "2024-08-15", // или null / undefined если нет даты
    // birthDay: null,
};

// Если даты нет — удалим поле из объекта
if (!data.birthDay) {
    delete data.birthDay;
}

// 🔁 Рендерим
doc.setData(data);

try {
    doc.render();
} catch (error) {
    console.error("❌ Ошибка при рендеринге:", error);
}

// 💾 Сохраняем готовый файл
const buf = doc.getZip().generate({ type: "nodebuffer" });
fs.writeFileSync(path.resolve(__dirname, "output.docx"), buf);

console.log("📄 Документ создан: output.docx");
