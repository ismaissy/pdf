import React, { useState, useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import { vfs as customVfs } from "../../../vfs_fonts";
import Utils from "../../../utils";
import {
  bold, alignment, italics, pageSize, TimesNewRomanObject, COMPANY_POLICY_RESPONSIBILITY,
  COMPANY_DATA, leadingIndent, pageMarginsBlank, font, fontSizeBlankHeader,
  // fontSize
} from '../../../utils/constants';

const fontSize = 12;

pdfMake.vfs = customVfs;
pdfMake.fonts = TimesNewRomanObject;


const Profile = ({ ...props }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  useEffect(() => generatePdf(), []);

  const generatePdf = () => {

    const documentDefinition = {
      pageSize: "A4",
      pageOrientation: "portrait",
      pageMargins: [30, 30, 30, 10],
      defaultStyle: { font: "TimesNewRoman", },
      content: [
        { text: "DAŞARY YURT RAÝATLARYNY BELLIGE ALYŞ NAMASY\n", fontSize: 14, bold, alignment },
        { text: "\n" },
        {
          table: {
            widths: [180, '*', 80],
            body: [
              [
                { text: '1 Familiýasy, ady, atasynyň ady', fontSize, alignment: 'left' },
                {
                  stack: [
                    { text: `${'FirstName'}\t${'LastName'}`, italics, bold, fontSize, alignment, margin: [0, 0, 0, 2] },
                    {
                      canvas: [
                        { type: 'line', x1: -30, y1: 0, x2: 250, y2: 0, lineWidth: 0.5, color: '#000000' }
                      ]
                    }
                  ]
                },
                {
                  width: "auto", width: 90, height: 115, alignment: "right",
                  canvas: [{ type: "rect", x: 0, y: 0, w: 90, h: 115, lineWidth: 1, dash: { length: 4 }, },],
                  alignment,
                  rowSpan: 8
                }
              ],
              [
                {
                  stack: [
                    {
                      text: [
                        { text: `2 Raýatlygy\t\t\t\t`, },
                        { text: `${'JPN'}`, italics, bold, alignment }
                      ],
                      fontSize, alignment: 'left', margin: [0, 0, 0, 2]
                    },
                    { canvas: [{ type: 'line', x1: 70, y1: 0, x2: 180, y2: 0, lineWidth: 0.5, color: '#000000' }] }
                  ]
                },
                {
                  stack: [
                    {
                      text: [
                        { text: '3 Doglan senesi\t\t\t' }, { text: `${"16.05.1967"}`, italics, bold }
                      ],
                      fontSize, alignment: 'left', margin: [0, 0, 0, 2]
                    },
                    { canvas: [{ type: 'line', x1: 80, y1: 0, x2: 250, y2: 0, lineWidth: 0.5, color: '#000000' }] }
                  ]
                }, { text: '' }
              ],
              [
                {
                  colSpan: 2,
                  fontSize,
                  alignment: 'left',
                  stack: [
                    {
                      fontSize, alignment: 'left',
                      text: [
                        { text: '4 Pasportynyň belgisi\t\t\t' }, { text: `${'TZ1132601'}\t\t\t`, italics, bold, }, { text: `${'20.05.2026'}`, italics, bold, }
                      ]
                    },
                    { canvas: [{ type: 'line', x1: 110, y1: 0, x2: 437, y2: 0, lineWidth: 0.5, color: '#000000' }] }
                  ]
                }, {}, { text: '', alignment } // Column 3
              ],
              [
                {
                  stack: [
                    { text: `5 Doglan ýeri ýurdy\t`, fontSize, alignment: 'left', margin: [0, 0, 0, 2] },
                    { canvas: [{ type: 'line', x1: 100, y1: 0, x2: 437, y2: 0, lineWidth: 0.5, color: '#000000' }] }
                  ]
                },
                { text: `${"JPN, Tokyo/Ýaponiýa"}`, italics, bold, fontSize, margin: [40, 0, 0, 2] },
                { text: '', alignment }
              ],
              [
                {
                  colSpan: 2, fontSize, alignment: 'left',
                  stack: [
                    {
                      fontSize, alignment: 'left', margin: [0, 0, 0, 2],
                      text: [
                        { text: `6 Jynsy\t\t`, }, { text: `${'Erkek'}`, italics, bold }
                      ],
                    },
                    { canvas: [{ type: 'line', x1: 45, y1: 0, x2: 437, y2: 0, lineWidth: 0.5, color: '#000000' }] }
                  ]
                },
                { text: '', alignment }
              ],

              [
                {
                  colSpan: 2, fontSize, alignment: 'left',
                  stack: [
                    {
                      fontSize, alignment: 'left',
                      text: [
                        { text: `7 Öý salgysy\t` }, { text: `${'JPN  4-11-1 Kaminoge Setagaya-ku, Tokyo, Japan'}`, italics, bold }
                      ]
                    },
                    {
                      canvas: [
                        { type: 'line', x1: 70, y1: 0, x2: 437, y2: 0, lineWidth: 0.5, color: '#000000' }
                      ],
                    }
                  ]
                }, {}, { text: '', alignment }
              ],
              [{ text: '(ýurt, şäher, köçe, jaý №, öý №)', colSpan: 2, fontSize: 12, alignment, marginBottom: 5 }, {}, {}],
              [
                {
                  colSpan: 3, fontSize, alignment: 'left',
                  stack: [
                    {
                      fontSize, alignment: 'left', margin: [0, 0, 0, 2],
                      text: [
                        { text: `8 Gelmeginiň makasady\t` },
                        { text: `${'Infrastruktura taslamalary müdirliginiň baş menejeriniň orunbasary-TKF'}`, italics, alignment, bold }
                      ]
                    },
                    {
                      canvas: [
                        { type: 'line', x1: 120, y1: 0, x2: 533, y2: 0, lineWidth: 0.5, color: '#000000' }
                      ],
                    }
                  ]
                }, {}, {}
              ],

              [
                {
                  colSpan: 3, fontSize, alignment: 'left',
                  stack: [
                    {
                      fontSize, alignment: 'left', margin: [0, 0, 0, 2],
                      text: [
                        { text: `9 Türkmenistanda bolýan ýeri\t` },
                        { text: `${'ş.Aşgabat "Ýyldyz" myhmanhanasy'}`, alignment, italics, bold }
                      ]
                    },
                    { canvas: [{ type: 'line', x1: 175, y1: 0, x2: 533, y2: 0, lineWidth: 0.5, color: '#000000' }] }
                  ]
                }, {}, {}
              ],

              [{}, { text: '(doly salgysy)', colSpan: 2, fontSize: 12, alignment, marginBottom: 2 }, {}],

              [
                {
                  colSpan: 3, fontSize, alignment: 'left',
                  stack: [
                    {
                      fontSize, alignment: 'left',
                      margin: [0, 0, 0, 2],
                      text: [
                        { text: `${'10 Wizanyň derejesi, görnüşi we №\t'}`, },
                        { text: `${'BS, iki gezeklik-A1602025'}`, alignment, bold, italics, }
                      ],
                    },
                    { canvas: [{ type: 'line', x1: 180, y1: 0, x2: 533, y2: 0, lineWidth: 0.5, color: '#000000' }] }
                  ]
                }, {}, {}
              ],
              [
                { text: `11 Wizanyň berlen ýeri (ýurdy)`, fontSize, alignment: 'left', margin: [0, 0, 0, 2] },
                {
                  colSpan: 2, fontSize, alignment: 'left',
                  stack: [
                    { text: `${'Aşgabat şäher howa meňzilindäli MGP'}`, fontSize, alignment, bold, italics, margin: [0, 0, 0, 2] },
                    { canvas: [{ type: 'line', x1: -30, y1: 0, x2: 344, y2: 0, lineWidth: 0.5, color: '#000000' }] }
                  ]
                }, {}
              ],
              [
                {
                  colSpan: 3, fontSize, alignment: 'left',
                  stack: [
                    {
                      margin: [0, 0, 0, 2],
                      text: [
                        { text: `${'12 Wizanyň berlen senesi we möhleti\t'}`, },
                        {
                          text: `${'03.03.2025'}-de\t${'03.03.2025'}-den\t${'02.04.2025'}-çenli`,
                          bold, italics,
                        }
                      ],
                    },
                    { canvas: [{ type: 'line', x1: 185, y1: 0, x2: 533, y2: 0, lineWidth: 0.5, color: '#000000' }] }
                  ]
                }, {}, {}
              ],
              [
                {
                  fontSize,
                  margin: [0, 0, 0, 2],
                  stack: [
                    {
                      margin: [0, 0, 0, 2],
                      text: [
                        { text: `${'13 Giren wagty'}\t\t`, alignment: 'left', },
                        { text: `${'03.03.2025'}`, alignment, bold, italics },
                      ]
                    },
                    { canvas: [{ type: 'line', x1: 80, y1: 0, x2: 180, y2: 0, lineWidth: 0.5, color: '#000000', }] }
                  ]

                },
                {
                  colSpan: 2, fontSize, alignment: 'left',
                  stack: [
                    {
                      margin: [0, 0, 0, 2],
                      text: [
                        { text: `${'14 Giren ýeri'}\t` },
                        { text: `${'Aşgabat şäher howa meňzilindäli MGP fdvdfs dfg '}`, alignment, bold, italics }
                      ]
                    },
                    { canvas: [{ type: 'line', x1: 70, y1: 0, x2: 345, y2: 0, lineWidth: 0.5, color: '#000000', }] }
                  ]
                }, {}
              ],

              [
                {
                  colSpan: 3, fontSize, alignment: 'left',
                  margin: [0, 2, 0, 2],
                  stack: [
                    {
                      marginBottom: 2,
                      text: [
                        { text: `${'15 Kabul edýän edara ýa-da şahsyýet\t'}`, },
                        {
                          bold, italics, alignment: 'right',
                          text: `${'"Gap Inşaat Ýatyrym we Dyş Tijaret A.Ş"'}`,
                        }
                      ],
                    },
                    { canvas: [{ type: 'line', x1: 185, y1: 0, x2: 533, y2: 0, lineWidth: 0.5, color: '#000000' }] }
                  ]
                }, {}, {}
              ],
              [{}, { text: '(familiýasy, ady, doglan ýyly, öý salgysy)', colSpan: 2, fontSize: 12, alignment, }, {}],
              [
                {
                  colSpan: 3, fontSize, alignment, bold, italics,
                  stack: [
                    { margin: [0, 2, 0, 2], text: `${'Aşgabat ş. B.Türkmenistan şaýoly, jaý-538'}` },
                    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 530, y2: 0, lineWidth: 0.5, color: '#000000' }] }
                  ]
                }, {}, {}
              ],
              [
                {
                  colSpan: 3, fontSize, alignment: 'left',
                  stack: [
                    {
                      text: [
                        { text: 'Dolduran edara ' },
                        { text: `${'\t\tTDMG\t\t'}`, bold, italics, },
                        { text: ' wagty\t' },
                        { text: `${'03.03.2025'}`, bold, italics, },
                      ],
                    },
                    { canvas: [{ type: 'line', x1: 80, y1: 0, x2: 160, y2: 0, lineWidth: 0.5, color: '#000000' }] },
                    { canvas: [{ type: 'line', x1: 200, y1: 0, x2: 532, y2: 0, lineWidth: 0.5, color: '#000000' }] }
                  ]
                }, {}, {}
              ],
              [
                {
                  colSpan: 3, fontSize, alignment: 'left',
                  stack: [
                    { text: 'Barlan gözegçi' },
                    { canvas: [{ type: 'line', x1: 80, y1: 0, x2: 532, y2: 0, lineWidth: 5, color: '#000000' }] }
                  ]
                }, {}, {}
              ],
              [{ text: '(goly, familiýasy, ady)', colSpan: 3, fontSize: 12, alignment, }, {}, {}],
            ]
          },
          layout: {
            hLineWidth: (i, node) => 0,
            vLineWidth: (i, node) => 0
          }
        },
        // {    text: '\n', pageBreak: 'before',    pageOrientation: "landscape" },
        { canvas: [{ type: 'line', x1: 80, y1: 0, x2: 535, y2: 0, lineWidth: 5, color: '#000000' }] },


        { text: "\n" },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Hasaba alan, möhletini uzaldan TDMG-nyň edarasy', alignment },
                { text: 'Hasaba alyş, uzaldyş belgisi', alignment },
                { text: 'Hasaba alnan,', alignment },
                { text: 'Möhleti', alignment },
                { text: 'Esas(belgisi we wagty)', alignment },
                { text: 'Jogapkär işgäriň familiýasy we goly', alignment },
              ],
              [
                { text: 'TDMG', alignment, bold, bold },
                { text: ' ', alignment, bold },
                { text: '03.03.2025', alignment, bold },
                { text: '02.04.2025', alignment, bold },
                { text: '03.03.2025 3/-185', alignment, bold },
                { text: ' ', alignment, bold }
              ],
              [
                { text: ' ', alignment },
                { text: ' ', alignment },
                { text: ' ', alignment },
                { text: ' ', alignment },
                { text: ' ', alignment },
                { text: ' ', alignment }
              ],
            ]
          },
        },
        {
          margin: [0, 5, 0, 5],
          table: {
            widths: ['*', '*', '*'],
            body: [
              [
                { text: 'Türkmenistanyň çäginde bolýan ýeriniň salgysy', alignment },
                { text: 'Gelen, giden ýeri', alignment },
                { text: 'Kabul edýän edara ýa-da şahsyýet', alignment }
              ],
              [{ text: ' ', }, { text: ' ', }, { text: ' ', }],
              [{ text: ' ', }, { text: ' ', }, { text: ' ', }],
              [{ text: ' ', }, { text: ' ', }, { text: ' ', }],
            ]
          },
        },
        {
          margin: [0, 5, 0, 5],
          table: {
            widths: ['*'],
            body: [[{ text: 'Hasapdan aýyrmak üçin esas' }]]
          }
        },
        {
          table: {
            widths: ['*', '*', '*', '*'],
            body: [
              [{ text: 'Başga bellikler', }, { text: '', colSpan: 2 }, {}, {}],
              [
                { text: 'Pasportynyň möhleti', },
                { text: '20.05.2016', alignment, bold },
                { text: '20.05.2026', alignment, bold },
                {},
              ],
              [
                { text: 'Milleti', },
                { text: 'JPN', alignment, bold, colSpan: 2 }, {},
                { text: 'Esasy we ýazgyň wagty', alignment },
              ],
            ]
          },
        }
      ]
    };

    pdfMake.createPdf(documentDefinition).getBlob((blob) => setPdfUrl(URL.createObjectURL(blob)));
  };


  return (<>
    {
      pdfUrl && (
        <iframe title="PDF Viewer" type="application/pdf" className="iframeDocument" src={pdfUrl} />
      )
    }
  </>);
};

export default Profile;