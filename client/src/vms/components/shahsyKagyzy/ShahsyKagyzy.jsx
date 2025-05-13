import React, { useState, useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import { vfs as customVfs } from "../../../vfs_fonts";
import Utils from "../../../utils";
import { bold, alignment, pageSize, TimesNewRomanObject, fontSize, font, noWrap, COMPANY_DATA } from '../../../utils/constants'
import PreviewDocWrapper from "../../PreviewDoc";
import useBase64Image from "../../../hooks/useBase64Image";
import logoGapinsaat from "../../../assets/Turkmenistan_Gerb.png";
// import logoCalikEnerjiFooter from "../../../assets/logoCalikEnerjiFooter.png";
import logoUser from "../../../assets/logoUser.png";

const border = [false, false, false, false];

pdfMake.vfs = customVfs;
pdfMake.fonts = TimesNewRomanObject;

const ShahsyKagyzy = ({ ...props }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const base64Image = useBase64Image(logoGapinsaat);
  const base64LogoUser = useBase64Image(logoUser);

  useEffect(() => {
    if (base64Image && base64LogoUser) {
      generatePdf();
    }
  }, [base64Image, base64LogoUser]);


  const qrData = {
    "ŞAHSY KAGYZY": "",
    "Familiýasy, ady, atasynyň ady": `${props.data?.firstName || ''} ${props.data?.lastName || ''} ${props.data?.middleName || ''}`,
    "Doglan senesi we ýeri": `${props.data.birthDay} ${props.data.bornCountry}`,
    "Raýatlygy": `${props.data.citizenship}`,
    "Pasportyň belgisi, berlen senesi we möhleti": `${props.data.passport}`,
    "Şahsy belgisi": ``,
    "Bilimi, okan ýeri": `${props.data.studyOfCountry}`,
    "Hünäri": `${props.data.major}`,
    "Wezipesi": `${props.data.position}`,
    "Türkmenistanda öňki işlän ýerleri": `vdfsvdfvs dfv sdfjklvvnd fvsdfvjndfsvn dfsajvk qaerw gearui SHdh`,
    "Maşgala ýagdaýy": `Aýaly-Takae Handa-30.07.1965 (JPN)`,
    "Daşary ýurtdaky ýaşaýan anyk salgysy": `JPN, 4-11-1 Kaminoge Setagaya-ku, Tokyo, Japan`,
    "Daşary ýurt raýaylary barada galp maglumatlary görkezilýän ýagdaýynda Türkmenistanyň kanunçylygyna laýyklykda doly jogapkärçiligi çekýarin.": "",
    "Ygtyýarly adam.": ""
  };

  const generatePdf = () => {

    const documentDefinition = {
      pageSize,
      pageOrientation: "portrait",
      pageMargins: [20, 20, 20, 40],
      defaultStyle: { font },
      footer: (currentPage) => {
        if (currentPage === 2) return 'V015'
      },
      background: (currentPage, pageSize) => {
        return {
          canvas: [
            {
              type: "rect",
              x: 20, y: 20,
              w: pageSize.width - 40,
              h: pageSize.height - 60,
              lineWidth: 1,
            },
          ],
        };
      },
      content: [
        {
          fontSize: 13,
          layout: {
            hLineWidth: (i, node) => 1.5,
            vLineWidth: () => 1.5,
            paddingLeft: () => 2,
            paddingRight: () => 2,
            paddingTop: () => 1,
            paddingBottom: () => 2,
          },
          table: {

            widths: ['*', '*', '*', '*', '*'], // пять равных колонок
            body: [
              [
                { image: base64Image, width: 80, height: 80, alignment, margin: [0, 5] },
                {
                  text: [
                    { text: 'Daşary ýurt raýatyna işewürlik (BS1, BS2), maý goýum (IN), işçi ' },
                    { text: '(WP), maşgala (FM), Sport (SP1, SP2), ynsanperwerlik (HM), hususy ' },
                    { text: '(PR1, PR2), talyp (ST), syýahatçylyk (TU), üstaşyr (TR1, TR2), ' },
                    { text: 'Saglygy bejeriş (HL), sürüjilik (DR) wizasyny resmileşdirmek üçin\n' },
                    { text: "\nŞAHSY KAGYZY", bold, fontSize }
                  ],
                  fontSize: 9,
                  alignment,
                  colSpan: 3,
                  border: [false, true, false, false],
                  margin: [25, 8]
                }, {}, {},
                { image: base64LogoUser, width: 80, height: 80, alignment, rowSpan: 2, border: [true, true, true, false], },
              ],


              [
                { text: "I. Ýüztutmanyň maglumatlary:", bold, fontSize: 10, colSpan: 4, fillColor: '#d3d3d3', }, {}, {}, {}, {},
              ],
              [
                {
                  colSpan: 2,
                  layout: {
                    hLineWidth: (i, node) => 0.1,
                    vLineWidth: () => 0.1,
                    paddingLeft: () => 1,
                    paddingRight: () => 1,
                    paddingTop: () => 1,
                    paddingBottom: () => 1
                  },
                  table: {
                    widths: ['*',],
                    body: [
                      [{ text: 'Ýüz tutmanyň görnüşi *', fontSize: 10, border: [false], margin: [0, 0, 0, 0] },],
                      [{ text: 'CAKL - CAKYLYK', bold, fontSize: 13, }]
                    ]
                  },
                },
                {},
                {
                  colSpan: 2,
                  layout: {
                    hLineWidth: (i, node) => 0.1,
                    vLineWidth: () => 0.1,
                    paddingLeft: () => 1,
                    paddingRight: () => 1,
                    paddingTop: () => 1,
                    paddingBottom: () => 1
                  },
                  table: {
                    widths: ['*',],
                    body: [
                      [{ text: 'Seretmegiň tertibi *', fontSize: 10, border: [false], margin: [0, 0, 0, 0] },],
                      [{ text: 'TIZ', bold, fontSize: 13, }]
                    ]
                  },
                },
                {},
                { text: "FOTO", fontSize: 9, bold, alignment, border: [true, false, true, true], },
              ],

              [
                { text: "Çagyryjy tarap - fiziki şahs:", border, colSpan: 5, fontSize: 10 }, {}, {}, {}, {},
              ],
              [
                {
                  border, colSpan: 2,
                  layout: {
                    hLineWidth: (i, node) => 0.1,
                    vLineWidth: () => 0.1,
                    paddingLeft: () => 2,
                    paddingRight: () => 1,
                    paddingTop: () => 1,
                    paddingBottom: () => 1
                  },
                  table: {
                    widths: ['*',],
                    body: [
                      [{ text: 'Familiýasy *', fontSize: 10, border, margin: [0, 0, 0, 0] },],
                      [{ text: ' ' }]
                    ]
                  },
                }, {},
                {
                  border, colSpan: 2,
                  layout: {
                    hLineWidth: (i, node) => 0.1,
                    vLineWidth: () => 0.1,
                    paddingLeft: () => 2,
                    paddingRight: () => 1,
                    paddingTop: () => 1,
                    paddingBottom: () => 1
                  },
                  table: {
                    widths: ['*',],
                    body: [
                      [{ text: 'Ady *', fontSize: 10, border: [false], margin: [0, 0, 0, 0] },],
                      [{ text: ' ' }]
                    ]
                  },
                }, {},
                {
                  border,
                  layout: {
                    hLineWidth: (i, node) => 0.1,
                    vLineWidth: () => 0.1,
                    paddingLeft: () => 2,
                    paddingRight: () => 1,
                    paddingTop: () => 1,
                    paddingBottom: () => 1
                  },
                  table: {
                    widths: ['*',],
                    body: [
                      [{ text: 'Atasynyň ady', fontSize: 10, border: [false], margin: [0, 0, 0, 0] },],
                      [{ text: ' ' }]
                    ]
                  },
                },
              ],



              [
                {
                  border, colSpan: 4,
                  layout: {
                    hLineWidth: (i, node) => 0.1,
                    vLineWidth: () => 0.1,
                    paddingLeft: () => 2,
                    paddingRight: () => 1,
                    paddingTop: () => 1,
                    paddingBottom: () => 1
                  },
                  table: {
                    widths: ['*',],
                    body: [
                      [{ text: 'Ýaşaýan salgysy *:', fontSize: 10, border, margin: [0, 0, 0, 0] },],
                      [{ text: ' ' }],
                      [{ text: ' ' }]
                    ]
                  },
                },
                {}, {}, {},
                {
                  border,
                  layout: {
                    hLineWidth: (i, node) => 0.1,
                    vLineWidth: () => 0.1,
                    paddingLeft: () => 2,
                    paddingRight: () => 1,
                    paddingTop: () => 1,
                    paddingBottom: () => 1
                  },
                  table: {
                    widths: ['*'],
                    body: [
                      [{ text: 'Telefon belgi (ler) *', fontSize: 10, border: [false], margin: [0, 0, 0, 0] },],
                      [{ text: ' ' }],
                      [{ text: ' ' }]
                    ]
                  },
                },
              ],

              [
                {
                  border, colSpan: 4,
                  layout: {
                    hLineWidth: (i, node) => 0.1,
                    vLineWidth: () => 0.1,
                    paddingLeft: () => 2,
                    paddingRight: () => 1,
                    paddingTop: () => 1,
                    paddingBottom: () => 1
                  },
                  table: {
                    widths: ['*',],
                    body: [
                      [{ text: 'Pasport belgisi we berlen ýeri *', fontSize: 10, border, margin: [0, 0, 0, 0] },],
                      [{ text: ' ' }]
                    ]
                  },
                },
                {}, {}, {},
                {
                  border,
                  layout: {
                    hLineWidth: (i, node) => 0.1,
                    vLineWidth: () => 0.1,
                    paddingLeft: () => 2,
                    paddingRight: () => 1,
                    paddingTop: () => 1,
                    paddingBottom: () => 1
                  },
                  table: {
                    widths: ['*',],
                    body: [
                      [{ text: 'E-mail', fontSize: 10, border: [false], margin: [0, 0, 0, 0] },],
                      [{ text: ' ' }]
                    ]
                  },
                },
              ],
            ],
          },
        },




        {
          fontSize: 13,
          layout: {
            hLineWidth: () => 0,
            vLineWidth: () => 0,
            paddingLeft: () => 5,
            paddingRight: () => 5,
            paddingTop: () => 5,
            paddingBottom: () => 5,
          },
          table: {
            widths: ['*', '*', '*', '*', '*'],
            body: [
              [
                { text: "Familiýasy, ady, atasynyň ady", alignment: "left", noWrap },

              ],

            ],

          }
        },
        { text: '...', pageBreak: 'before' },

        {
          qr: JSON.stringify(qrData),
          alignment,
          margin: [0, 30, 0, 0],
          fit: 300,
        },
      ],
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

export default ShahsyKagyzy;