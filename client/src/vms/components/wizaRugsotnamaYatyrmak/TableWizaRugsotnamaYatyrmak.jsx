import React, { useState, useEffect } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import { vfs as customVfs } from '../../../vfs_fonts';
import Utils from '../../../utils';
import TablePdfMake from '../../../utils/TablePdfMake';
import { citizens } from '../../../utils/data';
import {
  bold, alignment, italics, fontSize, fontSizeTable, fontSizeTableHeader,
  valign, layoutTable, pageMarginsTable, font, pageSize, TimesNewRomanObject, tableBodyStyle,
  COMPANY_DATA
} from '../../../utils/constants'
import PreviewDocWrapper from '../../PreviewDoc';

// Font Style
pdfMake.vfs = customVfs;
pdfMake.fonts = TimesNewRomanObject;


const TableWizaRugsotnamaYatyrmak = ({ ...props }) => {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => generatePdf(), []);
  const thead = [
    {
      width: 20, name: 'T/N', style: tableBodyStyle,
      value: (prop, rowIndex) => { return `${rowIndex + 1}` },
    },
    {
      width: 'auto', name: 'AS-№', style: tableBodyStyle,
      value: (prop) => { return `${prop?.citizenship}${prop?.birthDate}` },
    },
    {
      width: 'auto', name: 'Tassyknama belgisi', style: tableBodyStyle,
      value: (prop) => { return `${prop?.passport}${prop?.citizenship}` },
    },
    {
      width: 'auto', name: 'Familiýasy', style: tableBodyStyle,
      value: (prop) => { return `${prop?.lastName}` }
    },
    {
      width: 'auto', name: 'Ady', style: tableBodyStyle,
      value: (prop) => { return `${prop?.firstName}` }
    },
    {
      width: 'auto', name: 'Doglan senesi we ýurdy', style: tableBodyStyle,
      value: (prop) => { return `${prop?.birthDate} - ${prop?.citizenship}` }
    },
    {
      width: 'auto', name: 'Pasportynyň belgisi', style: tableBodyStyle,
      value: (prop) => { return `${prop?.passport}` }
    },
    {
      width: 'auto', name: 'Bilimi we wezipesi', style: tableBodyStyle,
      value: (prop) => { return `${prop?.study} - ${prop?.position}` }
    },
    {
      width: 'auto', name: 'Hereket edýän çägi', style: tableBodyStyle,
      value: (prop) => { return `${prop?.address}` }
    },
    {
      width: 'auto', name: 'Rugsot edilen möhleti', style: tableBodyStyle,
      value: (prop) => { return `${prop?.passport}` }
    },
    {
      width: 'auto', name: 'Wiza belgisi', style: tableBodyStyle,
      value: (prop) => { return `${prop?.passport}` }
    },
    {
      width: 'auto', name: 'Wiza möhleti başlanýan senesi', style: tableBodyStyle,
      value: (prop) => { return `${prop?.visa}` }
    },
    {
      width: 'auto', name: 'Wiza möhleti tamamlanýan sene', style: tableBodyStyle,
      value: (prop) => { return `${prop?.position}` }
    },
  ]

  const tablePdfMake = new TablePdfMake(thead, citizens, layoutTable, { fontSize: fontSizeTable });

  const generatePdf = () => {
    const documentDefinition = {
      pageSize,
      pageOrientation: "landscape",
      defaultStyle: { font },
      pageMargins: pageMarginsTable,
      info: Utils.documentProperties('Wiza Rugsotnama Ýatyrmak', COMPANY_DATA.name),
      content: [
        {
          italics, fontSize: fontSizeTableHeader,
          text: [{ text: 'Belgi:   ', bold }, { text: `${'4/-198' || ''}` }]
        },
        {
          italics, fontSize: fontSizeTableHeader,
          text: [{ text: 'Sene:   ', bold }, { text: `${'11.04.2024' || ''}` }]
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
    <PreviewDocWrapper>
      <>
        {
          pdfUrl && (
            <iframe title="PDF Viewer" type="application/pdf" className="iframeDocument" src={pdfUrl} />
          )
        }
      </>
    </PreviewDocWrapper>
  );
};

export default TableWizaRugsotnamaYatyrmak; 