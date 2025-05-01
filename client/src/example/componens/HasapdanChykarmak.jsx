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


  useEffect(() => {
    if (base64Image) generatePdf();
  }, [base64Image]);

  const generatePdf = () => {
    if (!base64Image) return;

    const documentDefinition = {
      pageSize: "A4",
      pageOrientation: "portrait",
      pageMargins: [60, 50, 50, 40],
      defaultStyle: { font: "TimesNewRoman" },
      // footer: function (currentPage, pageCount) {
      //   return {
      //     margin: [60, 0, 50, 20], // отступы слева, сверху, справа, снизу
      //     canvas: [
      //       // Сплошная линия до середины страницы
      //       {
      //         type: 'line',
      //         x1: 0,
      //         y1: 0,
      //         x2: 250, // длина сплошной части
      //         y2: 0,
      //         lineWidth: 1,
      //       },
      //       // Прерывистая линия от середины до конца
      //       ...Array.from({ length: 15 }).map((_, i) => ({
      //         type: 'line',
      //         x1: 260 + i * 10,
      //         y1: 0,
      //         x2: 265 + i * 10,
      //         y2: 0,
      //         lineWidth: 1,
      //       })),
      //     ],
      //   };
      // },
      footer: function (currentPage, pageCount) {
        // Кол-во шагов затухания
        const fadeSteps = 20;

        // Начальная координата для "затухания"
        const startFadeX = 260;

        // Генерация fade-линии
        const fadeLines = Array.from({ length: fadeSteps }).map((_, i) => {
          const opacity = 1 - i / fadeSteps; // от 1 до 0
          const lineWidth = Math.max(0.5, 1 * opacity); // уменьшаем толщину
          const length = 5 * opacity; // уменьшаем длину штриха
          const gap = 5 + i * 1.5; // увеличиваем расстояние между

          const x1 = startFadeX + i * gap;
          const x2 = x1 + length;

          return {
            type: 'line',
            x1,
            y1: 0,
            x2,
            y2: 0,
            lineWidth,
            lineColor: `rgba(0,0,0,${opacity.toFixed(2)})`, // слегка эмулируем прозрачность
          };
        });

        return {
          margin: [60, 0, 50, 20],
          canvas: [
            // Сплошная линия
            {
              type: 'line',
              x1: 0,
              y1: 0,
              x2: startFadeX,
              y2: 0,
              lineWidth: 1,
            },
            // Эффект затухания
            ...fadeLines,
          ],
        };
      },

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

  return (<>{
    pdfUrl && (
      <iframe src={pdfUrl} title="PDF Viewer" type="application/pdf" style={{ width: "100%", height: "100%", border: "none" }} />
    )}
  </>);
};

export default HasapdanChykarmak;