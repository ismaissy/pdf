import React, { useState, useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import { vfs as customVfs } from "../vfs_fonts";
import logoGapinsaat from "../assets/logo_gapinsaat.png";

pdfMake.vfs = customVfs;
pdfMake.fonts = {
  TimesNewRoman: {
    normal: "TIMES.TTF", bold: "TIMESBD.TTF", italics: "TIMESI.TTF", bolditalics: "TIMESBI.TTF",
  },
};

const HasapdanChykarmak = ({ ...props }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  useEffect(() => {
    const toBase64 = async () => {
      const response = await fetch(logoGapinsaat);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => setBase64Image(reader.result);
      reader.readAsDataURL(blob);
    };

    toBase64();
  }, []);

  const generatePdf = () => {
    if (!base64Image) return;

    const documentDefinition = {
      pageSize: "A4",
      pageOrientation: "portrait",
      pageMargins: [60, 50, 50, 40], // отступы[left, top, right, bottom]
      // BELLIK // alignment: "left", можно left / right / center shulor yaly ulonyp bolya TEXT-da
      defaultStyle: { font: "TimesNewRoman" },
      // footer: (currentPage) => ({ text: currentPage.toString(), alignment: "center", margin: [0, 10, 0, 0], fontSize: 10, }),
      // background: (currentPage, pageSize) => ({ canvas: [{ type: "rect", x: 15, y: 25, w: pageSize.width - 35, h: pageSize.height - 70, lineWidth: 1, }] }),
      content: [
        {
          columns: [
            { image: base64Image, width: 150, height: 40, alignment: "left", margin: [0, 0, 0, 0], },
            { text: "gapinsaat.com", link: 'https://gapinsaat.com/tr/index.html', alignment: "right", color: 'blue', fontSize: 10, bold: true, }
          ],
        },
        { text: '\n\n\n\n\n' },
        { text: `Belgi:   ${props.data?.asNo || ''}`, fontSize: 16, italics: true, bold: true },
        { text: `Sene:   ${props.data?.date || ''}`, fontSize: 16, italics: true, bold: true },
        { text: '\n\n' },
        {
          columns: [
            { text: ' ', alignment: "left", fontSize: 10 },
            {
              text: "Türkmenhimiýa Döwlet Migrasiýa\nGullugynyň Ahal welaýaty boýunça müdirligine.",
              alignment: "right",
              fontSize: 15,
              bold: true,
            },
          ],
        },
        { text: '\n\n' },
        {
          leadingIndent: 20, fontSize: 14, alignment: 'justify',
          text: [
            { text: 'Hatymyzyň goşundysynda görkezilen sanawdaky ' },
            { text: `${3} (${'üç'}) sany `, bold: true },
            { text: `daşary ýurt raýatlarynyň ` },
            { text: `Türkmenistandan gidendigi sebäpli `, bold: true },
            { text: 'hasapdan doly çykarmagyňyzy Sizden haýyş edýäris.' },
          ]
        },
        {
          leadingIndent: 20, fontSize: 14, alignment: 'justify',
          text: [
            { text: 'Daşary ýurt raýatynyň Türkmenistana gelmeginiň onda bolmagynyň we ondan ' },
            { text: 'gitmeginiň düzgünlerini berjaý etmegine jogapkärçiligi kompaniýamyz öz üstüne alýar.' },
          ]
        },
        { text: '\n\n\n\n' },
        {
          columns: [
            { text: 'Sebit müdiriň orunbasary', alignment: "left", fontSize: 16, bold: true, },
            { text: `Recep AKÇI`, alignment: "right", fontSize: 15, bold: true, },
          ],
        },
      ],
    };

    pdfMake.createPdf(documentDefinition).getBlob((blob) => setPdfUrl(URL.createObjectURL(blob)));
  };

  return (
    <div>
      <button onClick={generatePdf} disabled={!base64Image}>Hasapdan Chykarmak</button>

      {pdfUrl && (
        <div style={{ height: "100vh", marginTop: "20px" }}>
          <iframe src={pdfUrl} width="100%" height="100%" title="PDF Viewer" />
        </div>
      )}
    </div>
  );
};


export default HasapdanChykarmak;