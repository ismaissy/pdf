import React, { useState, useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import { vfs as customVfs } from "../vfs_fonts";
import logoGapinsaat from "../assets/logo_gapinsaat.png";
import logoCalikEnerji from "../assets/logoCalikEnerji1.png";

pdfMake.vfs = customVfs;
pdfMake.fonts = {
  TimesNewRoman: {
    normal: "TIMES.TTF", bold: "TIMESBD.TTF", italics: "TIMESI.TTF", bolditalics: "TIMESBI.TTF",
  },
};

const PasportChalshmakHasabaDurmok = ({ ...props }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [base64LogoFooter, setBase64LogoFooter] = useState(null);

  // useEffect(() => {
  //   const toBase64 = async () => {
  //     const response = await fetch(logoGapinsaat);
  //     const blob = await response.blob();
  //     const reader = new FileReader();
  //     reader.onloadend = () => setBase64Image(reader.result);
  //     reader.readAsDataURL(blob);
  //   };
  //   toBase64();
  // }, []);
  useEffect(() => {
    const toBase64 = async (url) => {
      const response = await fetch(url);
      const blob = await response.blob();
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    };

    const loadImages = async () => {
      const gapinsaatLogo = await toBase64(logoGapinsaat);
      const calikEnerjiLogo = await toBase64(logoCalikEnerji);
      setBase64Image(gapinsaatLogo);
      setBase64LogoFooter(calikEnerjiLogo);
    };

    loadImages();
  }, []);


  // useEffect(() => {
  //   if (base64Image) generatePdf();
  // }, [base64Image]);

  useEffect(() => {
    if (base64Image && base64LogoFooter) generatePdf();
  }, [base64Image, base64LogoFooter]);

  const generatePdf = () => {
    if (!base64Image) return;

    const documentDefinition = {
      pageSize: "A4",
      pageOrientation: "portrait",
      pageMargins: [40, 50, 50, 40],
      defaultStyle: { font: "TimesNewRoman" },


      footer: function (currentPage, pageCount) {
        if (currentPage === 1) {
          return {
            margin: [40, 0, 40, 10],
            columns: [
              {
                image: base64LogoFooter,
                width: 320, height: 30,
                alignment: "left",
                margin: [0, -5, 0, 0],
              },
              {
                width: '*',
                margin: [0, -10, 0, 0],
                fontSize: 6,
                // color: 'silver',
                alignment: "right",
                text: [
                  { text: "Adres: Aşgabat şäheri,\n" },
                  { text: "Bitarap Türkmenistan şaýoly,538\n" },
                  { text: 'T ', color: "#00246b" },
                  { text: '+993 12 75 60 70\n' },
                  { text: '+993 12 75 70 57\n' },
                  { text: 'F ', color: "#00246b" },
                  { text: '+993 12 75 57 55\n' },
                  { text: 'info@gapinsaat.com' }
                ]
              }
            ]
          };
        }
        return null;
      }



      ,

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

export default PasportChalshmakHasabaDurmok;