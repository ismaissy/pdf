import React, { useState, useEffect } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import { vfs as customVfs } from '../../../vfs_fonts';
import Utils from '../../../utils';
import { citizens } from '../../../utils/data';
import {
  bold, alignment, italics, fontSize, fontSizeTable, fontSizeTableHeader, valign,
  layoutTable, pageMarginsTable, font, pageSize, TimesNewRomanObject
} from '../../../utils/constants'

// Font Style
pdfMake.vfs = customVfs;
pdfMake.fonts = TimesNewRomanObject;


const TableIkiToOneGezekligeOwurmek = ({ ...props }) => {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => generatePdf(), []);

  const thead = ['T/N', 'AS-№', 'Tassyknama belgisi', 'Familiýasy', 'Ady', 'Doglan senesi we ýurdy', 'Pasportynyň belgisi', 'Bilimi we wezipesi', 'Hereket edýän çägi', 'Rugsot edilen möhleti', 'Wiza belgisi', 'Wiza möhleti başlanýan senesi', 'Wiza möhleti tamamlanýan sene'];

  const tableBody = [
    Utils.thead(thead, 'center', true),
    ...citizens.map((item, index) => [
      { text: `${index + 1}`, alignment, valign },
      { text: item.lastName, alignment, valign },
      { text: item.firstName, alignment, valign },
      { text: item.birthDate, alignment, valign },
      { text: item.birthDate, alignment, valign },
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
      pageSize,
      pageOrientation: "landscape",
      defaultStyle: { font },
      pageMargins: pageMarginsTable,
      content: [
        {
          italics, fontSize: fontSizeTableHeader,
          text: [{ text: 'Belgi:   ', bold }, { text: `${'11/-2945' || ''}` }]
        },
        {
          italics, fontSize: fontSizeTableHeader,
          text: [{ text: 'Sene:   ', bold }, { text: `${'09.11.2018' || ''}` }]
        },
        { text: 'Daşary ýurt raýatlarynyň sanawy', fontSize, bold, alignment },
        { text: '\n' },
        {
          fontSize: fontSizeTable,
          layout: layoutTable,
          table: {
            headerRows: 1,
            widths: Utils.theadWidths(thead, (item, index) => index === 0 ? 20 : "auto"),
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

export default TableIkiToOneGezekligeOwurmek; 