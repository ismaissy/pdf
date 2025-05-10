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
import PreviewDocWrapper from '../../PreviewDoc';

// Font Style
pdfMake.vfs = customVfs;
pdfMake.fonts = TimesNewRomanObject;

const TableKonselari = ({ ...props }) => {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => generatePdf(), []);

  const thead = [
    {
      width: 20, name: '№', style: tableBodyStyle,
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
      width: 'auto', name: 'Doglan senesi we ýeri', style: tableBodyStyle,
      value: (prop) => { return `${prop?.birthDate} ${prop?.citizenship}` },
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
      width: 'auto', name: 'Pasportynyň belgisi we möhleti', style: tableBodyStyle,
      value: (prop) => { return `${prop?.passport} ${prop?.passportFinished}` },
    },
    {
      width: 'auto', name: 'Bilimi we okan ýeri', style: tableBodyStyle,
      value: (prop) => { return `Ýokory, ${prop?.study}` },
    },
    {
      width: 'auto', name: 'Bilimine görä hünäri', style: tableBodyStyle,
      value: (prop) => { return `Injener` },
    },
    {
      width: 'auto', name: 'Wezipesi', style: tableBodyStyle,
      value: (prop) => { return `${prop?.position}` },
    },
    {
      width: 'auto', name: 'Möhleti we görnüşi', style: tableBodyStyle,
      value: (prop) => { return `15.07.2019ý 14.08.2019ý\n${'A1368785'}\n${'BS'}` },
    },
    {
      width: 'auto', name: 'Türkmenistandaky salgysy', style: tableBodyStyle,
      value: (prop) => { return `${prop?.address}` },
    },
    {
      width: 'auto', name: 'Daşary ýurtdaky salgysy', style: tableBodyStyle,
      value: (prop) => { return `${'TUR, ŞAHIN ÖZBILEN MH.285 SK. NO:85/2 ÝEYHAN/ADANA'}` },
    },
    {
      width: 'auto', name: 'Barjak hereket çägi', style: tableBodyStyle,
      value: (prop) => { return `` },
    },
    {
      width: 'auto', name: 'Barjak serhet ýakasy', style: tableBodyStyle,
      value: (prop) => { return `` },
    },
  ]

  const tablePdfMake = new TablePdfMake(thead, citizens, layoutTable, { fontSize: fontSizeTable });

  const generatePdf = () => {
    const documentDefinition = {
      pageSize,
      pageOrientation: "landscape",
      defaultStyle: { font },
      pageMargins: pageMarginsTable,
      info: Utils.documentProperties('Pasport Çalşmak', COMPANY_DATA.name),
      content: [
        {
          fontSize: fontSizeTableHeader, italics,
          text: [{ text: 'Belgi:   ', bold }, { text: `${'7/-5020' || ''}` }]
        },
        {
          fontSize: fontSizeTableHeader, italics,
          text: [{ text: 'Sene:   ', bold }, { text: `${'17.07.2019' || ''}` }]
        },
        { text: 'Daşary ýurt raýatlarynyň sanawy', fontSize, bold, alignment },
        { text: '\n\n' },
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

export default TableKonselari;