import React, { useState, useEffect } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import { vfs as customVfs } from '../../../vfs_fonts';
import Utils from '../../../utils';
import { bold, alignment, italics, fontSize, valign, layoutTable } from '../../../utils/constants'

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

const citizens = [
  { lastName: "HANDA", firstName: "Hokuto", birthDate: "16.05.1967", gender: "Erkek", citizenship: "JPN", passport: "TZ1132601", passportFinished: "07.12.2032", position: "Baş menejer", visa: "Wiza №123456", address: "Garabogaz, Balkan Türkmenbaşy şäheri Aşgabat şäheri" },
  { lastName: "LEE", firstName: "Jin", birthDate: "10.09.1978", gender: "Erkek", citizenship: "KOR", passport: "AB987654", passportFinished: "01.11.2035", position: "Inžener", visa: "Wiza A654321 WP sdçasdý asýfdýdfrýçsdaça sdçsdaýasýddsaadsçadsçdsç çdassdasdç asdçdsçdssadçsdýasdýçdsa asdýsadý asdýdasýsdaý 05.01.2023 04.07.2023", address: "Türkmenbaşy şäheri Garabogaz, Balkan Türkmenbaşy şäheri Aşgabat şäheri Garabogaz, Balkan Türkmenbaşy şäheri Aşgabat şäheri Garabogaz, Balkan Türkmenbaşy şäheri Aşgabat şäheri" },
  { lastName: "SMITH", firstName: "Anna", birthDate: "23.03.1985", gender: "Aýal", citizenship: "USA", passport: "XY123789", passportFinished: "12.05.2037", position: "Maslahatçy", visa: "Wiza №789123", address: "Aşgabat şäheri" },
  { lastName: "HANDA", firstName: "Hokuto", birthDate: "16.05.1967", gender: "Erkek", citizenship: "JPN", passport: "TZ1132601", passportFinished: "07.12.2032", position: "Baş menejer", visa: "Wiza №123456", address: "Garabogaz, Balkan Türkmenbaşy şäheri Aşgabat şäheri" },
  { lastName: "LEE", firstName: "Jin", birthDate: "10.09.1978", gender: "Erkek", citizenship: "KOR", passport: "AB987654", passportFinished: "01.11.2035", position: "Inžener", visa: "Wiza A654321 WP sdçasdý asýfdýdfrýçsdaça sdçsdaýasýddsaadsçadsçdsç çdassdasdç asdçdsçdssadçsdýasdýçdsa asdýsadý asdýdasýsdaý 05.01.2023 04.07.2023", address: "Türkmenbaşy şäheri Garabogaz, Balkan Türkmenbaşy şäheri Aşgabat şäheri Garabogaz, Balkan Türkmenbaşy şäheri Aşgabat şäheri Garabogaz, Balkan Türkmenbaşy şäheri Aşgabat şäheri" },
  { lastName: "SMITH", firstName: "Anna", birthDate: "23.03.1985", gender: "Aýal", citizenship: "USA", passport: "XY123789", passportFinished: "12.05.2037", position: "Maslahatçy", visa: "Wiza №789123", address: "Aşgabat şäheri" },
  { lastName: "HANDA", firstName: "Hokuto", birthDate: "16.05.1967", gender: "Erkek", citizenship: "JPN", passport: "TZ1132601", passportFinished: "07.12.2032", position: "Baş menejer", visa: "Wiza №123456", address: "Garabogaz, Balkan Türkmenbaşy şäheri Aşgabat şäheri" },
  { lastName: "LEE", firstName: "Jin", birthDate: "10.09.1978", gender: "Erkek", citizenship: "KOR", passport: "AB987654", passportFinished: "01.11.2035", position: "Inžener", visa: "Wiza A654321 WP sdçasdý asýfdýdfrýçsdaça sdçsdaýasýddsaadsçadsçdsç çdassdasdç asdçdsçdssadçsdýasdýçdsa asdýsadý asdýdasýsdaý 05.01.2023 04.07.2023", address: "Türkmenbaşy şäheri Garabogaz, Balkan Türkmenbaşy şäheri Aşgabat şäheri Garabogaz, Balkan Türkmenbaşy şäheri Aşgabat şäheri Garabogaz, Balkan Türkmenbaşy şäheri Aşgabat şäheri" },
  { lastName: "SMITH", firstName: "Anna", birthDate: "23.03.1985", gender: "Aýal", citizenship: "USA", passport: "XY123789", passportFinished: "12.05.2037", position: "Maslahatçy", visa: "Wiza №789123", address: "Aşgabat şäheri" },
  { lastName: "LEE", firstName: "Jin", birthDate: "10.09.1978", gender: "Erkek", citizenship: "KOR", passport: "AB987654", passportFinished: "01.11.2035", position: "Inžener", visa: "Wiza A654321 WP sdçasdý asýfdýdfrýçsdaça sdçsdaýasýddsaadsçadsçdsç çdassdasdç asdçdsçdssadçsdýasdýçdsa asdýsadý asdýdasýsdaý 05.01.2023 04.07.2023", address: "Türkmenbaşy şäheri Garabogaz, Balkan Türkmenbaşy şäheri Aşgabat şäheri Garabogaz, Balkan Türkmenbaşy şäheri Aşgabat şäheri Garabogaz, Balkan Türkmenbaşy şäheri Aşgabat şäheri" },
]

const TableIshlemaneRugsotEdilenYerler = ({ ...props }) => {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => generatePdf(), []);

  const thead = ['№', 'Familiýasy', 'Ady', 'Doglan senesi', 'Jynsy', 'Raýatlygy', 'Pasportynyň belgisi', 'Pasportynyň möhleti', 'Wezipesi', 'Wiza maglumatlary', 'Türkmenistandaky salgysy'];

  const tableBody = [
    Utils.thead(thead, 'center', true),
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
    const documentDefinition = {
      pageSize: 'A4',
      pageOrientation: "landscape",
      defaultStyle: { font: "TimesNewRoman" },
      pageMargins: [10, 20, 10, 10],
      content: [
        {
          fontSize: 12, italics,
          text: [{ text: 'Belgi:   ', bold }, { text: `${'1/-46' || ''}` }]
        },
        {
          fontSize: 12, italics,
          text: [{ text: 'Sene:   ', bold }, { text: `${'24.01.2023' || ''}` }]
        },
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
          alignment, fontSize, bold,
          columns: [
            { text: 'Sebit müdiriň orunbasary' },
            { text: `Recep AKÇI` },
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
        )}
    </>
  );
};

export default TableIshlemaneRugsotEdilenYerler;