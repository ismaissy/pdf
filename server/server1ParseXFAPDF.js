const fs = require('fs');
const { PDFDocument, } = require('pdf-lib');
async function extractXfaFromPdf(pdfPath) {
    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes, { updateMetadata: false });

    const xfaObject = pdfDoc.catalog.get('AcroForm')?.get('XFA');
    if (!xfaObject) {
        console.log('❌ XFA данные не найдены в этом PDF.');
        return;
    }

    const xfaArray = xfaObject.array || [];
    let result = '';

    for (let i = 0; i < xfaArray.length; i += 2) {
        const key = xfaArray[i];
        const stream = xfaArray[i + 1];
        const content = stream?.value?.decodeContents
            ? stream.value.decodeContents()
            : stream?.decodeText?.()
            ?? stream?.decode?.();

        result += `<!-- ${key?.value ?? key} -->\n` + (content?.toString?.() ?? '');
    }

    fs.writeFileSync('xfa_output.xml', result, 'utf-8');
    console.log('✅ XFA XML извлечён в xfa_output.xml');
}

extractXfaFromPdf('./1.pdf');
