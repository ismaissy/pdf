import React, { useState, useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import { vfs as customVfs } from "../../../vfs_fonts";
import logoGapinsaat from "../../../assets/logo_gapinsaat.png";
import logoCalikEnerjiFooter from "../../../assets/logoCalikEnerjiFooter.png";
import {
  bold, alignment, italics, fontSize, pageSize, TimesNewRomanObject,
  COMPANY_DATA, leadingIndent, pageMarginsBlank, font, fontSizeBlankHeader
} from '../../../utils/constants'

// Font Style
pdfMake.vfs = customVfs;
pdfMake.fonts = TimesNewRomanObject;

const BlankAdresUytketmekShaherIchinde = ({ ...props }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [base64LogoFooter, setBase64LogoFooter] = useState(null);

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
      const calikEnerjiLogo = await toBase64(logoCalikEnerjiFooter);
      setBase64Image(gapinsaatLogo);
      setBase64LogoFooter(calikEnerjiLogo);
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (base64Image && base64LogoFooter) generatePdf();
  }, [base64Image, base64LogoFooter]);

  const generatePdf = () => {
    if (!base64Image) return;

    const documentDefinition = {
      pageSize,
      pageOrientation: "portrait",
      defaultStyle: { font },
      pageMargins: pageMarginsBlank,
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
        { text: `Belgi:   ${'8/-620' || ''}`, fontSize: fontSizeBlankHeader, italics, bold },
        { text: `Sene:   ${'29.08.2024' || ''}`, fontSize: fontSizeBlankHeader, italics, bold },
        { text: '\n\n' },
        {
          columns: [
            { text: ' ' },
            {
              fontSize, bold, width: 230,
              text: `${'Türkmenistanyň Döwlet Migrasiýa'}\n${'Gullugynyň Aşgabat şäherin'} boýunça müdirliginiň müdirine.`,
            },
          ],
        },
        { text: '\n\n' },
        {
          leadingIndent, fontSize, alignment: 'justify',
          text: [
            { text: 'Hatymyzyň goşundysynda görkezilen sanawdaky ' },
            { text: `${1} (${'bir'}) `, bold },
            { text: 'sany daşary ýurt raýatlarynyň ' },
            { text: `${'ýaşaýan salgysyny çalyşandygy'} `, bold },
            { text: 'sebäpli täze öý salgysyna hasaba almagyňyzy ' },
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

export default BlankAdresUytketmekShaherIchinde;