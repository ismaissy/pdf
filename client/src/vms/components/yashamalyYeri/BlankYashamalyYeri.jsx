import React, { useState, useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import { vfs as customVfs } from "../../../vfs_fonts";
import logoGapinsaat from "../../../assets/logo_gapinsaat.png";
import logoCalikEnerjiFooter from "../../../assets/logoCalikEnerjiFooter.png";
import useBase64Image from "../../../hooks/useBase64Image";
import TablePdfMake from '../../../utils/TablePdfMake';
import Utils from "../../../utils";
import {
  bold, alignment, italics, fontSize, pageSize, TimesNewRomanObject, COMPANY_POLICY_RESPONSIBILITY,
  COMPANY_DATA, leadingIndent, pageMarginsBlank, font, fontSizeBlankHeader, tableBodyStyle, PORTRAIT
} from '../../../utils/constants';
import PreviewDocWrapper from "../../PreviewDoc";

pdfMake.vfs = customVfs;
pdfMake.fonts = TimesNewRomanObject;

const BlankYashamalyYeri = ({ ...props }) => {
  const [pdfUrl, setPdfUrl] = useState(null);

  const base64Image = useBase64Image(logoGapinsaat);
  const base64LogoFooter = useBase64Image(logoCalikEnerjiFooter);

  useEffect(() => {
    if (base64Image && base64LogoFooter) {
      generatePdf();
    }
  }, [base64Image, base64LogoFooter]);


  const users = [
    { lastName: "HANDA", firstName: "Hokuto", passportNo: "TZ1132601" },
    { lastName: "LEE", firstName: "Jin", passportNo: "AD465413" },
    { lastName: "SMITH", firstName: "Anna", passportNo: "TG516546533" },
  ];


  const thead = [
    {
      width: 'auto', name: '', style: { bold, alignment },
      value: (prop, rowIndex) => { return `${rowIndex + 1}` },
    },
    {
      width: '*', name: '', style: { bold, alignment },
      value: (prop) => { return `${prop?.firstName} ${prop?.lastName}` },
    },
    {
      width: '*', name: '', style: { bold, alignment },
      value: (prop) => { return `${prop?.passportNo}` },
    },
  ]

  const tablePdfMake = new TablePdfMake(thead, users, 'noBorders', { fontSize, margin: [50, 0, 0, 20], });


  const generatePdf = () => {
    const documentDefinition = {
      pageSize,
      pageOrientation: PORTRAIT,
      pageMargins: pageMarginsBlank,
      defaultStyle: { font },
      footer: Utils.createFooter(base64LogoFooter),
      content: [
        {
          columns: [
            { image: base64Image, width: 140, height: 40, alignment: "left", margin: [0, 0, 0, 0], },
            {
              text: "GAP Construction and Investment CO.\nTurkmenistan Branch",
              link: COMPANY_DATA.link, alignment: "right", color: '#061f6d', fontSize: 15, bold,
            }
          ],
        },
        {
          stack: [
            {
              canvas: [{ type: 'line', x1: 0, y1: 0, x2: 505, y2: 0, lineWidth: 0.5, lineColor: '#ffb900' }],
              margin: [0, 10, 0, 0],
            }
          ]
        },
        {
          margin: [0, 5, 0, 0],
          alignment: "justify",
          fontSize: 8,
          text: [
            { text: 'Türkmenistan Şahamçasy, Aşgabat şäheri, Bitarap Türkmenistan şaýoly.' },
            { text: `538 Tel:75 60 70/75 70 57 Fax:75 57 55 info@gapinsaat.com-` },
            { text: 'www.gapinsaat.com', link: "https://gapinsaat.com/tr/index.html", },
          ]
        },
        { text: '\n\n\n\n\n\n\n\n' },
        {
          columns: [
            { text: `Sene:  ${props.data?.date || ''}`, alignment: "left", fontSize, bold, },
            { text: `Türkmenistanyň Döwlet Migrasiýa\nGullugynyň Aşgabat şäher boýunça\nmüdirliginiň başlygyna`, alignment: "right", fontSize, bold }
          ],
        },
        { text: '\n\n' },
        {
          leadingIndent, fontSize, alignment: 'justify',
          text: [
            { text: 'Türkiýäniň "Gap inşaat Ýatyrym we Dyş Tijaret A.Ş." firmasynyň aşakda ady geçen işgärimiziň ' },
            { text: `ş.Aşgabat "Ýyldyz" myhmanhanasy, salgysynda ýerleşýän firmamyzyň umumy ýaşaýyş jaýynda ` },
            { text: `${'03.03.2025'} `, bold: true },
            { text: `senesinde ýaşaýandygyny Size habar berýas.` },
          ]
        },
        { text: '\n\n' },
        tablePdfMake.table,
        { text: '\n' },
        {
          columns: [
            { text: 'Umumy ýaşaýyş jaý jogapkäri', alignment: "left", fontSize, bold, },
            { text: `Necat AKA`, alignment, fontSize, bold, }
          ],
        },
      ],
    };

    pdfMake.createPdf(documentDefinition).getBlob((blob) => setPdfUrl(URL.createObjectURL(blob)));
  };


  return (
    <PreviewDocWrapper title='Ýaşamaly Ýeri'>
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

export default BlankYashamalyYeri;