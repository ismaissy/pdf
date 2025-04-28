import React, { useState, useEffect } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import { vfs as customVfs } from '../../../vfs_fonts';
import { citizens } from '../../../utils/data';
import TablePdfMake from '../../../utils/TablePdfMake';
import {
  bold, alignment, italics, fontSize, fontSizeTable, fontSizeTableHeader,
  layoutTable, pageMarginsTable, font, pageSize, TimesNewRomanObject, tableBodyStyle
} from '../../../utils/constants'

// Font Style
pdfMake.vfs = customVfs;
pdfMake.fonts = TimesNewRomanObject;


const TableIshlemaneRugsotEdilenYerler = ({ ...props }) => {

  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => generatePdf(), []);

  const thead = [
    { width: 20, name: 'T/N', attr: '', style: tableBodyStyle },
    { width: 'auto', name: 'AS-№', attr: 'lastName', style: tableBodyStyle },
    { width: 'auto', name: 'Tassyknama belgisi', attr: 'firstName', style: tableBodyStyle },
    { width: 'auto', name: 'Familiýasy', attr: 'birthDate', style: tableBodyStyle },
    { width: 'auto', name: 'Ady', attr: 'birthDate', style: tableBodyStyle },
    { width: 'auto', name: 'Doglan senesi we ýurdy', attr: 'birthDate', style: tableBodyStyle },
    { width: 'auto', name: 'Pasportynyň belgisi', attr: 'gender', style: tableBodyStyle },
    {
      width: 'auto',
      name: 'Bilimi we wezipesi',
      attr: ['birthDate', 'position', 'gender', 'citizenship', 'visa'],
      style: tableBodyStyle
    },
    { width: 'auto', name: 'Hereket edýän çägi', attr: 'citizenship', style: tableBodyStyle },
    { width: 'auto', name: 'Rugsot edilen möhleti', attr: 'passport', style: tableBodyStyle },
    { width: 'auto', name: 'Wiza belgisi', attr: 'passport', style: tableBodyStyle },
    { width: 'auto', name: 'Wiza möhleti başlanýan senesi', attr: 'visa', style: tableBodyStyle },
    { width: 'auto', name: 'Wiza möhleti tamamlanýan sene', attr: 'position', style: tableBodyStyle },
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
          italics, fontSize: fontSizeTableHeader,
          text: [{ text: 'Belgi:   ', bold }, { text: `${'11/-2945' || ''}` }]
        },
        {
          italics, fontSize: fontSizeTableHeader,
          text: [{ text: 'Sene:   ', bold }, { text: `${'09.11.2018' || ''}` }]
        },
        { text: 'Daşary ýurt raýatlarynyň sanawy', fontSize, bold, alignment },
        { text: '\n' },
        tablePdfMake.table,
        { text: '\n' },
        {
          alignment, fontSize, bold,
          columns: [
            { text: 'Sebit müdiriň orunbasary' }, { text: `Recep AKÇI` },
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