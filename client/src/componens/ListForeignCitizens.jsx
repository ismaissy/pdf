import React, { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import { vfs as customVfs } from "../vfs_fonts";
import Utils from "../utils";

pdfMake.vfs = customVfs;
pdfMake.fonts = {
  TimesNewRoman: {
    normal: "TIMES.TTF", bold: "TIMESBD.TTF", italics: "TIMESI.TTF", bolditalics: "TIMESBI.TTF",
  },
};

const ListForeignCitizens = ({ ...props }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const layout = {
    hLineWidth: () => 1,
    vLineWidth: () => 1,
    hLineColor: () => "#000000",
    vLineColor: () => "#000000",
    paddingTop: () => 6,
    paddingBottom: () => 6,
  };

  const [citizens, setCitizens] = useState([
    { lastName: "HANDA", firstName: "Hokuto", birthDate: "16.05.1967", gender: "Erkek", citizenship: "JPN", passport: "TZ1132601", position: "Baş menejer", visa: "Wiza №123456", address: "Garabogaz, Balkan Türkmenbaşy şäheri Aşgabat şäheri" },
    { lastName: "LEE", firstName: "Jin", birthDate: "10.09.1978", gender: "Erkek", citizenship: "KOR", passport: "AB987654", position: "Inžener", visa: "Wiza №654321", address: "Türkmenbaşy şäheri" },
    { lastName: "SMITH", firstName: "Anna", birthDate: "23.03.1985", gender: "Aýal", citizenship: "USA", passport: "XY123789", position: "Maslahatçy", visa: "Wiza №789123", address: "Aşgabat şäheri" },
  ]);


  const thead = ["№", "Familiýasy", "Ady", "Doglan senesi", "Jynsy", "Raýatlygy", "Pasportynyň belgisi", "Wezipesi", "Wiza maglumatlary", "Türkmenistandaky salgysy"];

  const tableBody = [
    Utils.thead(thead, "center", true),
    ...citizens.map((item, index) => [
      { text: `${index + 1}`, alignment: "center", valign: "middle" },
      { text: item.lastName, alignment: "center", valign: "middle" },
      { text: item.firstName, alignment: "center", valign: "middle" },
      { text: item.birthDate, alignment: "center", valign: "middle" },
      { text: item.gender, alignment: "center", valign: "middle" },
      { text: item.citizenship, alignment: "center", valign: "middle" },
      { text: item.passport, alignment: "center", valign: "middle" },
      { text: item.position, alignment: "center", valign: "middle" },
      { text: item.visa, alignment: "center", valign: "middle" },
      { text: item.address, alignment: "center", valign: "middle" },
    ]),
  ];

  const generatePdf = () => {

    const documentDefinition = {
      pageSize: "A4",
      pageOrientation: "landscape",
      pageMargins: [40, 30, 30, 30],
      defaultStyle: { font: "TimesNewRoman" },
      content: [
        { text: `Belgi:   ${props.data?.asNo || ''}`, fontSize: 16, italics: true, bold: true },
        { text: `Sene:   ${props.data?.date || ''}`, fontSize: 16, italics: true, bold: true },
        { text: '\n' },
        {
          columns: [
            { text: 'Daşary ýurt raýatlarynyň sanawy', alignment: 'center', fontSize: 15, bold: true, },
          ],
        },
        { text: '\n' },
        {
          layout,
          fontSize: 14,
          table: { widths: Utils.theadWidths(thead, "auto"), body: tableBody }
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
      <button onClick={generatePdf}>Daşary ýurt raýatlarynyň sanowy</button>
      {pdfUrl && (
        <div style={{ height: "100vh", marginTop: "20px" }}>
          <iframe src={pdfUrl} width="100%" height="100%" title="PDF Viewer" />
        </div>
      )}
    </div>
  );
};

export default ListForeignCitizens;