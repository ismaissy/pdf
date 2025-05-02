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

const TableKomandirowochnye = ({ ...props }) => {
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
      width: 'auto', name: 'Wezipesi', style: tableBodyStyle,
      value: (prop) => { return `${prop?.position}` },
    },
    {
      width: 'auto', name: 'Möhleti we gezekligi', style: tableBodyStyle,
      value: (prop) => { return `${'A1368785'}\n${'BS'}\n15.07.2019 14.08.2019` },
    },
    {
      width: 'auto', name: 'Türkmenistandaky salgysy', style: tableBodyStyle,
      value: (prop) => { return `${prop?.address}` },
    },
    {
      width: 'auto', name: 'Iş saparynda boljak salgysy', style: tableBodyStyle,
      value: (prop) => { return `${'Aşgabat ş, 2086 köçe, jaý-107, öý-13'}` },
    },
  ]

  const tablePdfMake = new TablePdfMake(thead, citizens, layoutTable, { fontSize: fontSizeTable });

  const generatePdf = () => {
    const documentDefinition = {
      pageSize,
      pageOrientation: "landscape",
      defaultStyle: { font },
      pageMargins: pageMarginsTable,
      info: Utils.documentProperties('Komandirowoçnye', COMPANY_DATA.name),
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
          )}
      </>
    </PreviewDocWrapper>
  );
};

export default TableKomandirowochnye;