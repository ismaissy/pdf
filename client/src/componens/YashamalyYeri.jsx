import React, { useState, useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import { vfs as customVfs } from "../vfs_fonts";
import logoGapinsaat from "../assets/logo_gapinsaat.png";
import Utils from "../utils";

pdfMake.vfs = customVfs;
pdfMake.fonts = {
  TimesNewRoman: {
    normal: "TIMES.TTF", bold: "TIMESBD.TTF", italics: "TIMESI.TTF", bolditalics: "TIMESBI.TTF",
  },
};

const YashamalyYeri = ({ ...props }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const layout = {
    hLineWidth: () => 1,
    vLineWidth: () => 1,
    hLineColor: () => "#000000",
    vLineColor: () => "#000000",
    paddingTop: () => 6,
    paddingBottom: () => 6,
  };


  const [users, setCitizens] = useState([
    { lastName: "HANDA", firstName: "Hokuto", passportNo: "TZ1132601" },
    { lastName: "LEE", firstName: "Jin", passportNo: "AD465413" },
    { lastName: "SMITH", firstName: "Anna", passportNo: "TG516546533" },
  ]);


  const thead = ["", "", ""];

  const tableBody = [
    Utils.thead(thead, "left", true),
    ...users.map((item, index) => [
      { text: `${index + 1}`, alignment: "center", bold: true },
      { text: `${item.lastName} ${item.firstName}`, alignment: "left", bold: true },
      { text: item.passportNo, alignment: "left", bold: true },
    ]),
  ];

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
      pageMargins: [50, 40, 40, 30],
      defaultStyle: { font: "TimesNewRoman" },
      content: [
        {
          columns: [
            { image: base64Image, width: 150, height: 40, alignment: "left", margin: [0, 0, 0, 0], },
            {
              text: "GAP Construction and Investment CO.\nTurkmenistan Branch",
              alignment: "right",
              color: '#061f6d',
              fontSize: 16,
              bold: true,
            }
          ],
        },
        {
          stack: [
            {
              canvas: [{ type: 'line', x1: 0, y1: 0, x2: 505, y2: 0, lineWidth: 0.5, lineColor: '#ffb900' }],
              margin: [0, 10, 0, 0],
            }
          ]
        },
        {
          margin: [0, 5, 0, 0],
          alignment: "justify",
          fontSize: 8,
          text: [
            { text: 'Türkmenistan Şahamçasy, Aşgabat şäheri, Bitarap Türkmenistan şaýoly.' },
            { text: `538 Tel:75 60 70/75 70 57 Fax:75 57 55 info@gapinsaat.com-` },
            { text: 'www.gapinsaat.com', link: "https://gapinsaat.com/tr/index.html", },
          ]
        },
        { text: '\n\n\n\n\n\n\n\n\n' },
        {
          columns: [
            {
              text: `Sene:  ${props.data?.date || ''}`,
              alignment: "left", fontSize: 15, bold: true,
            },
            {
              text: `Türkmenistanyň Döwlet Migrasiýa\nGullugynyň Aşgabat şäher boýunça\nmüdirliginiň başlygyna`,
              alignment: "left", fontSize: 16, bold: true,
            }
          ],
        },
        { text: '\n\n\n' },
        {
          leadingIndent: 20, fontSize: 14, alignment: 'justify',
          text: [
            { text: 'Türkiýäniň "Gap inşaat Ýatyrym we Dyş Tijaret A.Ş." firmasynyň aşakda ady geçen işgärimiziň ' },
            { text: `ş.Aşgabat "Ýyldyz" myhmanhanasy, salgysynda ýerleşýän firmamyzyň umumy ýaşaýyş jaýynda ` },
            { text: `${'03.03.2025'} `, bold: true },
            { text: `senesinde ýaşaýandygyny Size habar berýas.` },
          ]
        },
        { text: '\n\n' },
        {
          fontSize: 14,
          layout: 'noBorders',
          margin: [100, 0, 0, 20],
          table: {
            widths: Utils.theadWidths(thead, "auto"),
            body: tableBody
          }
        },
        { text: '\n' },
        {
          columns: [
            { text: 'Umumy ýaşaýyş jaý jogapkäri', alignment: "left", fontSize: 16, bold: true, },
            { text: `Necat AKA`, alignment: "right", fontSize: 16, bold: true, },
          ],
        },
      ],
    };

    pdfMake.createPdf(documentDefinition).getBlob((blob) => setPdfUrl(URL.createObjectURL(blob)));
  };

  return (
    <div>
      <button onClick={generatePdf} disabled={!base64Image}>Yashamaly Yeri</button>

      {pdfUrl && (
        <div style={{ height: "100vh", marginTop: "20px" }}>
          <iframe src={pdfUrl} width="100%" height="100%" title="PDF Viewer" />
        </div>
      )}
    </div>
  );
};

export default YashamalyYeri;