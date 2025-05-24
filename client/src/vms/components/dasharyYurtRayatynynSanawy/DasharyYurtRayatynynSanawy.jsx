import { useState, useEffect } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import { vfs as customVfs } from '../../../vfs_fonts';
import { citizens } from '../../../utils/data';
import TablePdfMake from '../../../utils/TablePdfMake';
import {
  bold, alignment, italics, fontSize, fontSizeTable, fontSizeTableHeader,
  pageMarginsTable, font, pageSize, TimesNewRomanObject, valign,
  COMPANY_DATA
} from '../../../utils/constants'
import Utils from '../../../utils';
import PreviewDocWrapper from '../../PreviewDoc';

// Font Style
pdfMake.vfs = customVfs;
pdfMake.fonts = TimesNewRomanObject;

export const tableBodyStyle = { alignment, valign, fontSize: 9 };
const layoutTable = {
  hLineWidth: () => 0.5,
  vLineWidth: () => 0.5,
  hLineColor: () => '#000000',
  vLineColor: () => '#000000',
  paddingTop: () => 5,
  paddingBottom: () => 5,
};

const DasharyYurtRayatynynSanawy = ({ ...props }) => {

  const [pdfUrl, setPdfUrl] = useState(null);
  useEffect(() => generatePdf(), []);

  const thead = [
    {
      width: 'auto', name: '№', style: tableBodyStyle,
      value: (prop, rowIndex) => { return `${rowIndex + 1}` },
    },
    {
      width: 'auto', name: 'F.A.A', style: tableBodyStyle,
      value: (prop) => { return `${prop?.firstName} ${prop?.lastName}` },
    },
    {
      width: 'auto', name: 'Doglan ýyly we raýatlygy', style: tableBodyStyle,
      value: (prop) => { return `${prop?.birthDate} ${prop?.citizenship}` },
    },
    {
      width: 'auto', name: 'Pasportynyň belgisi we möhleti', style: tableBodyStyle,
      value: (prop) => { return `${prop?.passport} ${prop?.passportStarted} ${prop?.passportFinished}` }
    },
    {
      width: 'auto', name: 'Bilimi', style: tableBodyStyle,
      value: (prop) => { return `${prop?.firstName}` }
    },
    {
      width: 'auto', name: 'Wezipesi', style: tableBodyStyle,
      value: (prop) => { return `${prop?.position}` }
    },
    {
      width: 'auto', name: 'Türkmenistandaky anyk ýaşaýan salgysy', style: tableBodyStyle,
      value: (prop) => { return `${prop?.address}` }
    },
    {
      width: 'auto', name: 'Rugsotnama belgisi we möhleti', style: tableBodyStyle,
      value: (prop) => { return `${prop?.study} - ${prop?.position}` }
    },
    {
      width: 'auto', name: 'Wiza belgisi we möhleti', style: tableBodyStyle,
      value: (prop) => { return `${prop?.visa}` }
    },
    {
      width: 'auto', name: 'Rugsot edilen serhet ýaka', style: tableBodyStyle,
      value: (prop) => { return ` ` }
    },
    {
      width: 'auto', name: 'Bellik', style: tableBodyStyle,
      value: (prop) => { return ` ` }
    },
  ]

  const tablePdfMake = new TablePdfMake(thead, citizens, layoutTable, { fontSize: fontSizeTable });

  const generatePdf = () => {
    const documentDefinition = {
      pageSize,
      pageOrientation: "portrait",
      defaultStyle: { font },
      pageMargins: [15, 20, 15, 10],
      info: Utils.documentProperties('Dashary Yurt Rayatynyn Sanawy', COMPANY_DATA.name),
      content: [
        { text: '\n\n\n\n' },
        {
          fontSize: 13, alignment,
          text: [
            { text: '20.05.2025 ', bold },
            { text: 'sene boýunça ' },
            { text: 'Çalyk Enerji Sanaýi we Tijaret A.Ş Türk kärhanasynyň\nTürkmenistandaky şahamçasy ', bold },
            { text: 'işleýän daşary ýurt raýatlaryň sanawy barada' },
          ]
        },
        { text: 'MAGLUMAT', fontSize, bold, alignment, margin: [0, 7, 0, 7] },
        tablePdfMake.table,
      ]
    };

    pdfMake.createPdf(documentDefinition).getBlob((blob) => setPdfUrl(URL.createObjectURL(blob)));
  };

  return (
    <PreviewDocWrapper title='Daşary Ýurt Raýatynyň Sanawy'>
      <>
        {
          pdfUrl && (
            <iframe title="PDF Viewer" type="application/pdf" className="iframeDocument" src={pdfUrl} />
          )}
      </>
    </PreviewDocWrapper>
  );
};

export default DasharyYurtRayatynynSanawy; 