import React, { useState, useEffect } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import { vfs as customVfs } from '../../../vfs_fonts';
import TablePdfMake from '../../../utils/TablePdfMake';
import {
  bold, alignment, italics, fontSize, fontSizeTable, fontSizeTableHeader,
  layoutTable, pageMarginsTable, font, pageSize, TimesNewRomanObject, tableBodyStyle
} from '../../../utils/constants'
import { citizens } from '../../../utils/data';

// Font Style
pdfMake.vfs = customVfs;
pdfMake.fonts = TimesNewRomanObject;

const TablePasportChalshmakHasabaDurmok = ({ ...props }) => {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => generatePdf(), []);

  const thead = [
    { width: 20, name: '№', attr: '', style: tableBodyStyle },
    { width: 'auto', name: 'Familiýasy', attr: 'firstName', style: tableBodyStyle },
    { width: 'auto', name: 'Ady', attr: 'lastName', style: tableBodyStyle },
    { width: 'auto', name: 'Doglan senesi', attr: 'birthDate', style: tableBodyStyle },
    { width: 'auto', name: 'Jynsy', attr: 'gender', style: tableBodyStyle },
    { width: 'auto', name: 'Raýatlygy', attr: 'citizenship', style: tableBodyStyle },
    { width: 'auto', name: 'Pasportynyň belgisi', attr: 'passport', style: tableBodyStyle },
    { width: 'auto', name: 'Pasportynyň möhleti', attr: 'passportFinished', style: tableBodyStyle },
    { width: 'auto', name: 'Wezipesi', attr: 'position', style: tableBodyStyle },
    { width: 'auto', name: 'Wiza maglumatlary', attr: 'visa', style: tableBodyStyle },
    { width: 'auto', name: 'Türkmenistandaky salgysy', attr: 'address', style: tableBodyStyle },
  ]

  const tablePdfMake = new TablePdfMake(true, thead, citizens, layoutTable, { fontSize: fontSizeTable });

  const generatePdf = () => {
    const documentDefinition = {
      pageSize,
      pageOrientation: "landscape",
      defaultStyle: { font },
      pageMargins: pageMarginsTable,
      content: [
        {
          fontSize: fontSizeTableHeader, italics,
          text: [{ text: 'Belgi:   ', bold }, { text: `${'1/-46' || ''}` }]
        },
        {
          fontSize: fontSizeTableHeader, italics,
          text: [{ text: 'Sene:   ', bold }, { text: `${'24.01.2023' || ''}` }]
        },
        { text: 'Daşary ýurt raýatlarynyň sanawy', fontSize, bold, alignment },
        { text: '\n' },
        tablePdfMake.table,
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

export default TablePasportChalshmakHasabaDurmok;