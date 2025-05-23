const fs = require("fs");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const content = fs.readFileSync("template.docx", "binary");
const zip = new PizZip(content);
const doc = new Docxtemplater(zip);

doc.setData({
    firstName: "Иван",
    lastName: "Иванов"
});

try {
    doc.render();
} catch (error) {
    console.error(error);
}

const buf = doc.getZip().generate({ type: "nodebuffer" });
fs.writeFileSync("output.docx", buf);
