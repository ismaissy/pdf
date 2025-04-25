import React, { useState, useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import { vfs as customVfs } from "../vfs_fonts";
import logoGapinsaat from "../assets/logo_gapinsaat.png";
import logoCalikEnerjiFooter from "../assets/logoCalikEnerjiFooter.png";
import Utils from "../utils";
import { bold, alignment, italics, fontSize, valign, layoutTable } from '../utils/constants'

pdfMake.vfs = customVfs;
pdfMake.fonts = {
  TimesNewRoman: {
    normal: "TIMES.TTF", bold: "TIMESBD.TTF", italics: "TIMESI.TTF", bolditalics: "TIMESBI.TTF",
  },
};

const citizens = [
  { lastName: "HANDA", firstName: "Hokuto", birthDate: "16.05.1967", gender: "Erkek", citizenship: "JPN", passport: "TZ1132601", passportFinished: "07.12.2032", position: "Baş menejer", visa: "Wiza №123456", address: "Garabogaz, Balkan Türkmenbaşy şäheri Aşgabat şäheri" },
  { lastName: "LEE", firstName: "Jin", birthDate: "10.09.1978", gender: "Erkek", citizenship: "KOR", passport: "AB987654", passportFinished: "01.11.2035", position: "Inžener", visa: "Wiza A654321 WP sdçasdý asýfdýdfrýçsdaça sdçsdaýasýddsaadsçadsçdsç çdassdasdç asdçdsçdssadçsdýasdýçdsa asdýsadý asdýdasýsdaý 05.01.2023 04.07.2023", address: "Türkmenbaşy şäheri Garabogaz, Balkan Türkmenbaşy şäheri Aşgabat şäheri Garabogaz, Balkan Türkmenbaşy şäheri Aşgabat şäheri Garabogaz, Balkan Türkmenbaşy şäheri Aşgabat şäheri" },
  { lastName: "SMITH", firstName: "Anna", birthDate: "23.03.1985", gender: "Aýal", citizenship: "USA", passport: "XY123789", passportFinished: "12.05.2037", position: "Maslahatçy", visa: "Wiza №789123", address: "Aşgabat şäheri" },
]

const PasportChalshmakHasabaDurmok = ({ ...props }) => {
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

  const thead = ['№', 'Familiýasy', 'Ady', 'Doglan senesi', 'Jynsy', 'Raýatlygy', 'Pasportynyň belgisi', 'Pasportynyň möhleti', 'Wezipesi', 'Wiza maglumatlary', 'Türkmenistandaky salgysy'];

  const tableBody = [
    Utils.thead(thead, "center", true),
    ...citizens.map((item, index) => [
      { text: `${index + 1}`, alignment, valign },
      { text: item.lastName, alignment, valign },
      { text: item.firstName, alignment, valign },
      { text: item.birthDate, alignment, valign },
      { text: item.gender, alignment, valign },
      { text: item.citizenship, alignment, valign },
      { text: item.passport, alignment, valign },
      { text: item.passportFinished, alignment, valign },
      { text: item.position, alignment, valign },
      { text: item.visa, alignment, valign },
      { text: item.address, alignment, valign },
    ]),
  ];

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
                  { text: "Adres: Aşgabat şäheri,\n" },
                  { text: "Bitarap Türkmenistan şaýoly,538\n" },
                  { color: "#00246b", text: 'T ' }, { text: '+993 12 75 60 70\n' },
                  { text: '+993 12 75 70 57\n' },
                  { color: "#00246b", text: 'F ' }, { text: '+993 12 75 57 55\n' },
                  { text: 'info@gapinsaat.com' }
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
            { image: base64Image, width: 150, height: 40, alignment: "left", margin: [0, 0, 0, 0], },
            { text: "gapinsaat.com", link: 'https://gapinsaat.com/tr/index.html', alignment: "right", color: '#00246b', fontSize: 10, bold: true, }
          ],
        },
        { text: '\n\n\n\n\n' },
        { text: `Belgi:   ${'1/-46' || ''}`, fontSize: 15, italics, bold },
        { text: `Sene:   ${'24.01.2023' || ''}`, fontSize: 15, italics, bold },
        { text: '\n\n' },
        {
          columns: [
            { text: ' ' }, {
              text: `${'Türkmenistanyň Döwlet Migrasiýa'}\n${'Gullugynyň Ahal welaýaty'} boýunça müdirligine.`,
              fontSize: 15, bold, width: 230
            },
          ],
        },
        { text: '\n\n' },
        {
          leadingIndent: 25, fontSize, alignment: 'justify',
          text: [
            { text: 'Hatymyzyň goşundysynda görkezilen sanawdaky ' },
            { text: `${3} (${'üç'}) sany `, bold },
            { text: 'daşary ýurt raýatlarynyň ' },
            { text: 'pasportyny çalyşmagy bilen baglanyşykly hasaba durmagy möhletini täze pasportyna geçirmegiňizi ', bold: true },
            { text: 'Sizden haýyş edýäris.' },
          ]
        },
        { text: '\n' },
        {
          leadingIndent: 15, fontSize, alignment: 'justify',
          text: [
            { text: 'Daşary ýurt raýatynyň Türkmenistana gelmeginiň onda bolmagynyň we ondan ' },
            { text: 'gitmeginiň düzgünlerini berjaý etmegine jogapkärçiligi kompaniýamyz öz üstüne alýar.' },
          ]
        },
        { text: '\n\n\n\n' },
        { text: `Sebit müdiriň orunbasary\t\t\t\t\t\t\t\t\t\t\t\t${'Recep AKÇI'}`, fontSize, bold, },

        { text: ' ', pageBreak: 'before', pageOrientation: "landscape" },
        { text: `Belgi:   ${'1/-46' || ''}`, fontSize: 11, italics, bold },
        { text: `Sene:   ${'24.01.2023' || ''}`, fontSize: 11, italics, bold },
        { text: 'Daşary ýurt raýatlarynyň sanawy', fontSize, bold, alignment },
        { text: '\n' },
        {
          fontSize: 10,
          layout: layoutTable,
          table: {
            widths: Utils.theadWidths(thead, (item, index) => index === 0 ? "*" : "auto"),
            body: tableBody
          }
        },
        { text: '\n' },
        {
          columns: [
            { text: 'Sebit müdiriň orunbasary', alignment, fontSize, bold, },
            { text: `Recep AKÇI`, alignment, fontSize, bold, },
          ],
        },

      ]
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