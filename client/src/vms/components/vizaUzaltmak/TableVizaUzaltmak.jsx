import React, { useState, useEffect } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import { vfs as customVfs } from '../../../vfs_fonts';
import TablePdfMake from '../../../utils/TablePdfMake';
import {
  bold, alignment, italics, fontSize, fontSizeTable, fontSizeTableHeader,
  layoutTable, pageMarginsTable, font, pageSize, TimesNewRomanObject, tableBodyStyle,
  COMPANY_DATA
} from '../../../utils/constants'
import { citizens } from '../../../utils/data';
import Utils from '../../../utils';

// Font Style
pdfMake.vfs = customVfs;
pdfMake.fonts = TimesNewRomanObject;

const TableVizaUzaltmak = ({ ...props }) => {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => generatePdf(), []);

  const thead = [
    {
      width: '*', name: '№', style: tableBodyStyle,
      value: (prop, rowIndex) => { return `${rowIndex + 1}` },
    },
    {
      width: 'auto', name: 'Familiýasy', style: tableBodyStyle,
      value: (prop) => { return `${prop?.firstName}` },
    },
    {
      width: 'auto', name: 'Ady', style: tableBodyStyle,
      value: (prop) => { return `${prop?.lastName}` },
    },
    {
      width: 'auto', name: 'Doglan senesi', style: tableBodyStyle,
      value: (prop) => { return `${prop?.birthDate}` },
    },
    {
      width: 'auto', name: 'Jynsy', style: tableBodyStyle,
      value: (prop) => { return `${prop?.gender}` },
    },
    {
      width: 'auto', name: 'Raýatlygy', style: tableBodyStyle,
      value: (prop) => { return `${prop?.citizenship}` },
    },
    {
      width: 'auto', name: 'Pasportynyň belgisi', style: tableBodyStyle,
      value: (prop) => { return `${prop?.passport}` },
    },
    {
      width: 'auto', name: 'Pasportynyň möhleti', style: tableBodyStyle,
      value: (prop) => { return `${prop?.passportFinished}` },
    },
    {
      width: 'auto', name: 'Wezipesi', style: tableBodyStyle,
      value: (prop) => { return `${prop?.position}` },
    },
    {
      width: 'auto', name: 'Wiza maglumatlary', style: tableBodyStyle,
      value: (prop) => { return `${prop?.visa}` },
    },
    {
      width: 'auto', name: 'Türkmenistandaky salgysy', style: tableBodyStyle,
      value: (prop) => { return `${prop?.address}` },
    }
  ]

  const tablePdfMake = new TablePdfMake(thead, citizens, layoutTable, { fontSize: fontSizeTable });

  const generatePdf = () => {
    const documentDefinition = {
      pageSize,
      pageOrientation: "landscape",
      defaultStyle: { font },
      pageMargins: pageMarginsTable,
      info: Utils.documentProperties('Viza Uzaltmak', COMPANY_DATA.name),
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

export default TableVizaUzaltmak;