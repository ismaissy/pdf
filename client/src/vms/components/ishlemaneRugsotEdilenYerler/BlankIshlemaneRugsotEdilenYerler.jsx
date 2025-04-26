import React, { useState, useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import { vfs as customVfs } from "../../../vfs_fonts";
import logoGapinsaat from "../../../assets/logo_gapinsaat.png";
import logoCalikEnerjiFooter from "../../../assets/logoCalikEnerjiFooter.png";
import { alignment, bold, italics, fontSize, leadingIndent, COMPANY_DATA } from '../../../utils/constants'

// Font Style
pdfMake.vfs = customVfs;
pdfMake.fonts = {
  TimesNewRoman: {
    normal: "TIMES.TTF",
    bold: "TIMESBD.TTF",
    italics: "TIMESI.TTF",
    bolditalics: "TIMESBI.TTF",
  },
};

const BlankIshlemaneRugsotEdilenYerler = ({ ...props }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [base64LogoFooter, setBase64LogoFooter] = useState(null);


  useEffect(() => {
    // Converts an image URL to a Base64 string
    const toBase64 = async (url) => {
      const response = await fetch(url);         // Fetch the image from the given URL
      const blob = await response.blob();        // Convert the response to a binary blob
      const reader = new FileReader();           // Create a FileReader to read the blob
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result); // When reading is done, resolve with Base64 string
        reader.readAsDataURL(blob);             // Start reading the blob as DataURL (Base64)
      });
    };

    // Loads two logos and sets them as Base64
    const loadImages = async () => {
      const gapinsaatLogo = await toBase64(logoGapinsaat);         // Convert first logo to Base64
      const calikEnerjiLogo = await toBase64(logoCalikEnerjiFooter); // Convert second logo to Base64
      setBase64Image(gapinsaatLogo);                               // Save first Base64 logo in state
      setBase64LogoFooter(calikEnerjiLogo);                        // Save second Base64 logo in state
    };

    loadImages(); // Start loading when component mounts
  }, []);

  useEffect(() => {
    if (base64Image && base64LogoFooter) generatePdf();
  }, [base64Image, base64LogoFooter]);


  const generatePdf = () => {
    if (!base64Image) return;

    const documentDefinition = {
      pageSize: 'A4',
      pageOrientation: "portrait",
      pageMargins: [40, 20, 50, 70],
      defaultStyle: { font: "TimesNewRoman" },
      footer: (currentPage, pageCount) => {
        if (currentPage === 1) {
          return {
            margin: [40, 2, 40, 30],
            columns: [
              { image: base64LogoFooter, width: 320, height: 30, alignment: "left", margin: [0, 15, 0, 0] },
              {
                width: '*', fontSize: 8, alignment: "right",
                text: [
                  { text: `Adres: ${COMPANY_DATA.city}\n` },
                  { text: `${COMPANY_DATA.street}\n` },
                  { color: "#00246b", text: 'T ' }, { text: `${COMPANY_DATA.phoneNumberOne}\n` },
                  { text: `${COMPANY_DATA.phoneNumberTwo}\n` },
                  { color: "#00246b", text: 'F ' }, { text: `${COMPANY_DATA.fax}\n` },
                  { text: `${COMPANY_DATA.email}` }
                ]
              }
            ]
          };
        }
        return null;
      },
      content: [
        {
          columns: [
            { image: base64Image, width: 150, height: 40, alignment: "left", },
            { text: COMPANY_DATA.name, link: COMPANY_DATA.link, alignment: "right", color: '#00246b', fontSize: 10, bold, }
          ],
        },
        { text: '\n\n\n\n\n' },
        { text: `Belgi:   ${'11/-2945' || ''}`, fontSize: 15, italics, bold },
        { text: `Sene:   ${'09.11.2018' || ''}`, fontSize: 15, italics, bold },
        { text: '\n\n' },
        {
          columns: [
            { text: `${'Adaty tertipde!'}`, fontSize: 10, italics, },
            { text: `${'Türkmenistanyň Döwlet migrasiýa gullugynyň başlygyna'}`, fontSize, bold, width: 230 },
          ],
        },
        { text: '\n\n' },
        {
          leadingIndent, fontSize, alignment: 'justify',
          text: [
            { text: 'Türkmenistanyň Prezidentiniň 2021-nji ýylyň Sentýabr aýynyň 26-da çykaran №2462 belgili kararyna laýyklykda, ' },
            { text: 'Aşgabat şäherinde 400 orunlyk ' },
            { text: `${'Halkara Sagaldyş-dikeldiş merkezini gurmak barada'} ${'Türkiýäniň'} «${'GAP Inşaat Yatirim ýe Diş Ticaret A. Ş.'}» ` },
            { text: `${'şereketi bilen şertnama baglaşmaga ygtyýar berildi.'} ` },
            { text: `${'Hatymyzyň goşundysynda görkezilen sanawdaky'} ` },
            { text: `${3} (${'üç'}) `, bold },
            { text: 'sany daşary ýurt raýatyna ', },
            { text: `${'Aşgabat şäherinde hereket eder ýaly işlemäge rugsat bermegiňizi'}  `, bold },
            { text: 'Sizden haýyş edýäris.' },
          ]
        },
        { text: '\n' },
        {
          leadingIndent, fontSize, alignment: 'justify',
          text: [
            { text: 'Daşary ýurt raýatynyň Türkmenistana gelmeginiň onda bolmagynyň we ondan ' },
            { text: 'gitmeginiň düzgünlerini berjaý etmegine jogapkärçiligi kompaniýamyz öz üstüne alýar.' },
          ]
        },
        { text: '\n\n\n\n' },
        {
          fontSize, bold,
          columns: [
            { text: 'Sebit müdiriň orunbasary', alignment: "left" },
            { text: `Recep AKÇI`, alignment },
          ],
        },
      ]
    };

    pdfMake.createPdf(documentDefinition).getBlob((blob) => setPdfUrl(URL.createObjectURL(blob)));
  };

  return (
    <>
      {
        pdfUrl && (
          <iframe title="PDF Viewer" type="application/pdf" className="iframeDocument" src={pdfUrl} />
        )
      }
    </>
  );
};

export default BlankIshlemaneRugsotEdilenYerler;