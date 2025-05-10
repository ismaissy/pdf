import React, { useState, useEffect } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import { vfs as customVfs } from '../../../vfs_fonts';
import TablePdfMake from '../../../utils/TablePdfMake';
import {
  bold, alignment, italics, fontSize, fontSizeTable, fontSizeTableHeader, valign,
  layoutTable, pageMarginsTable, font, pageSize, TimesNewRomanObject, tableBodyStyle,
  COMPANY_DATA
} from '../../../utils/constants'
import { citizens } from '../../../utils/data';
import Utils from '../../../utils';
import PreviewDocWrapper from '../../PreviewDoc';

// Font Style
pdfMake.vfs = customVfs;
pdfMake.fonts = TimesNewRomanObject;

const TableTaslamanynKepilligi = ({ ...props }) => {
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
    }, {
      width: 'auto', name: 'Jynsy', style: tableBodyStyle,
      value: (prop) => { return `${prop?.gender}` },
    }, {
      width: 'auto', name: 'Raýatlygy', style: tableBodyStyle,
      value: (prop) => { return `${prop?.citizenship}` },
    }, {
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
      info: Utils.documentProperties('Adress Üýtketmek Şäher Içinde', COMPANY_DATA.name),
      content: [
        {
          italics,
          fontSize: fontSizeTableHeader,
          text: [{ text: 'Belgi:   ', bold }, { text: `${'9/-148' || ''}` }]
        },
        {
          italics,
          fontSize: fontSizeTableHeader,
          text: [{ text: 'Sene:   ', bold }, { text: `${'23.09.2021' || ''}` }]
        },
        { text: 'Daşary ýurt raýatlarynyň sanawy', fontSize, bold, alignment },
        { text: '\n' },
        tablePdfMake.table,
        { text: '\n' },
        {
          alignment, fontSize, bold,
          columns: [
            { text: 'Sebit müdiri' },
            { text: `Ömer AYDIN` },
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
          )}
      </>
    </PreviewDocWrapper>
  );
};

export default TableTaslamanynKepilligi;