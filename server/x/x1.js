// Load our library that generates the document
const Docxtemplater = require("docxtemplater");
// Load PizZip library to load the docx/pptx/xlsx file in memory
const PizZip = require("pizzip");

// Builtin file system utilities
const fs = require("fs");
const path = require("path");

// Load the docx file as binary content
const content = fs.readFileSync(
    path.resolve(__dirname, "input.docx"),
    "binary"
);

// Unzip the content of the file
const zip = new PizZip(content);

/*
 * Parse the template.
 * This function throws an error if the template is invalid,
 * for example, if the template is "Hello {user" (missing closing tag)
 */
const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
});

/*
 * Render the document : Replaces :
 * - {first_name} with John
 * - {last_name} with Doe,
 * ...
 */
doc.render({
    first_name: "John",
    last_name: "Doe",
    phone: "+33666666",
    description: "The Acme Product",
});

/*
 * Get the output document and export it as a Node.js buffer
 * This method is available since docxtemplater@3.62.0
 */
const buf = doc.toBuffer();

// Write the Buffer to a file
fs.writeFileSync(path.resolve(__dirname, "output.docx"), buf);
/*
 * Instead of writing it to a file, you could also
 * let the user download it, store it in a database,
 * on AWS S3, ...
 */