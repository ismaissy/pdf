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
      pageMargins: [40, 40, 40, 40],
      defaultStyle: { font: "TimesNewRoman" },
      content: [
        {
          columns: [
            { image: base64Image, width: 150, height: 40, alignment: "left", margin: [0, -10, 0, 0], },
            { text: "gapinsaat.com", link: 'https://gapinsaat.com/tr/index.html', alignment: "right", color: 'blue', fontSize: 10, bold: true, }
          ],
        },
        { text: `\n\n\nBelgi:   ${props.data?.asNo || ''}`, fontSize: 16, italics: true, bold: true },
        { text: `Sene:   ${props.data?.date || ''}`, fontSize: 16, italics: true, bold: true },
        { text: '\n\n' },
        {
          columns: [
            { text: props.data.severity ? `Gyssagly tertipde!` : ' ', alignment: "left", fontSize: 10, italics: true },
            { text: "Türkmenhimiýa Döwlet\nKonserniniň başlygy\nD.I. Sapbaýew", margin: [100, 0, 0, 0], alignment: "center", fontSize: 15, bold: true, },
          ],
        },
        { columns: [{ text: `\nHormatly ${props.data.firstName} ${props.data?.middleName || ''}!`, alignment: "center", fontSize: 15, bold: true, }] },
        { text: '\n' },
        {
          leadingIndent: 20,
          fontSize: 14,
          alignment: 'justify',
          text: [
            { text: 'Türkmenistanyň Prezidentiniň 2014-nji ýylyň  16-nji awgustynda, ' },
            { text: `"${props.data.border} ${props.data.organization} gurmak hakynda" ` },
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
      <button onClick={generatePdf} disabled={!base64Image}>Konselari</button>

      {pdfUrl && (
        <div style={{ height: "100vh", marginTop: "20px" }}>
          <iframe src={pdfUrl} width="100%" height="100%" title="PDF Viewer" />
        </div>
      )}
    </div>
  );
};


export default Konselari;