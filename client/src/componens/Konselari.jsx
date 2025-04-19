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

const Konselari = ({ ...props }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [data, setData] = useState({
    firstName: "Hokuto",
    lastName: "HANDA",
    middleName: "",
    birthDay: "16.05.1967",
    bornCountry: "JPN, Tokyo/Ýaponiýa",
    citizenship: "JPN",
    passport: "TZ1132601, 20.50.2016 ý, 20.05.2026 ý.",
    studyOfCountry: "Ýokary, JPN, Keio Uniwersiteti",
    major: "Himiýa Inzenerligi",
    position: "Infrastruktura taslamalary müdirliginiň baş menejerniň orunbasary",

    asNo: '3/-183',
    date: '03.03.2025',
    severity: true,
    border: 'Balkan welaýatynyň Garabogaz şäherinde',
    organization: 'karbanit öndürýan zawodyny gurmak',
  });

  useEffect(() => {
    // Convertor for IMG PHOTO в base64 when loading a component
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
      pageMargins: [40, 40, 40, 40], // отступы[left, top, right, bottom]
      // BELLIK // alignment: "left", можно left / right / center shulor yaly ulonyp bolya TEXT-da
      defaultStyle: { font: "TimesNewRoman" },
      // footer: (currentPage) => ({ text: currentPage.toString(), alignment: "center", margin: [0, 10, 0, 0], fontSize: 10, }),
      // background: (currentPage, pageSize) => ({ canvas: [{ type: "rect", x: 15, y: 25, w: pageSize.width - 35, h: pageSize.height - 70, lineWidth: 1, }] }),
      content: [
        {
          columns: [
            { image: base64Image, width: 150, height: 40, alignment: "left", margin: [0, -10, 0, 0], },
            { text: "gapinsaat.com", link: 'https://gapinsaat.com/tr/index.html', alignment: "right", color: 'blue', fontSize: 10, bold: true, }
          ],
        },
        { text: `\n\n\nBelgi:   ${data?.asNo || ''}`, fontSize: 16, italics: true, bold: true },
        { text: `Sene:   ${data?.date || ''}`, fontSize: 16, italics: true, bold: true },
        { text: '\n\n' },
        {
          columns: [
            { text: data.severity ? `Gyssagly tertipde!` : ' ', alignment: "left", fontSize: 10, italics: true },
            { text: "Türkmenhimiýa Döwlet\nKonserniniň başlygy\nD.I. Sapbaýew", margin: [100, 0, 0, 0], alignment: "center", fontSize: 15, bold: true, },
          ],
        },
        { columns: [{ text: `\nHormatly ${data.firstName} ${data?.middleName || ''}!`, alignment: "center", fontSize: 15, bold: true, }] },
        { text: '\n' },
        {
          leadingIndent: 20,
          fontSize: 14,
          alignment: 'justify',
          text: [
            { text: 'Türkmenistanyň Prezidentiniň 2014-nji ýylyň  16-nji awgustynda, ' },
            { text: `"${data.border} ${data.organization} gurmak hakynda" ` },
            { text: 'kabul eden 13811 belgili kararyna laýyklykda, "Türkmenhimiýa" döwlet konsernine ' },
            { text: 'Ýaponiýanyň "Mitsubushi Çorporation" we Türkiýäniň "GAP Inşaat Ýatyrym we Dyş Tijaret A. Ş" ' },
            { text: 'kompaniýalar konsorsiumy bilen Balkan welaýatynyň Garabogaz ' },
            { text: 'şäherinde ýyllyk kuwwaty 1155 müň tonna karbanid öndürýän zawody gurmak ' },
            { text: 'barada şertnama baglanyşmaga ygtyýar berildi.' },
          ]
        },
        {
          leadingIndent: 20,
          fontSize: 14,
          alignment: 'justify',
          text: [
            { text: 'Gurluşygyň bellenilen möhletde tamamlanmagy üçin hatymyza goşundyda görkezlen sanawdaky ' },
            { text: `1 (bir) sany daşary ýurt raýatyna 1 (bir) aý `, bold: true },
            { text: 'möhlet bilen ' },
            { text: `iki gezeklik çakylyk we iş rugsotnamasynyň resmileşdirilmegine `, bold: true },
            { text: `Aşgabat şäheri we Balkan welaýatynyň Türkmenbaşy etrabynyň Gyýanly obasynda hereket eder ýaly`, bold: true },
            { text: `ýardam etmegiňizi Sizden haýyş edýäris.` },
          ]
        },

        {
          leadingIndent: 20,
          fontSize: 14,
          alignment: 'justify',
          text: [
            { text: 'Daşary ýurt raýatynyň Türkmenistana gelmeginiň, onda bolmagynyň we ondan ' },
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
      <button onClick={generatePdf} disabled={!base64Image}>Preview Konselari PDF</button>

      {pdfUrl && (
        <div style={{ height: "100vh", marginTop: "20px" }}>
          <iframe src={pdfUrl} width="100%" height="100%" title="PDF Viewer" />
        </div>
      )}
    </div>
  );
};

export default Konselari;