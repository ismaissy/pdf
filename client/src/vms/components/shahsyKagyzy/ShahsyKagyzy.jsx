import React, { useState, useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import { vfs as customVfs } from "../../../vfs_fonts";
import Utils from "../../../utils";
import { bold, alignment, pageSize, TimesNewRomanObject, fontSize, font, noWrap, COMPANY_DATA, italics } from '../../../utils/constants'
import PreviewDocWrapper from "../../PreviewDoc";
import useBase64Image from "../../../hooks/useBase64Image";
import logoGapinsaat from "../../../assets/Turkmenistan_Gerb.png";
// import logoCalikEnerjiFooter from "../../../assets/logoCalikEnerjiFooter.png";
import logoUser from "../../../assets/logoUser.png";

pdfMake.vfs = customVfs;
pdfMake.fonts = TimesNewRomanObject;


const fontSizeCell = 9;
const fontSizeEmptyCell = 10;
const fontSizeHeadCell = 11;
const sectionHeadColor = '#e2e1df';
const border = [false, false, false, false];
const layout = {
  hLineWidth: (i, node) => 0.1,
  vLineWidth: () => 0.1,
  paddingLeft: () => 2,
  paddingRight: () => 1,
  paddingTop: () => 1,
  paddingBottom: () => 1
};


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

    const flag = false;
    const checkbox = flag ? [
      { type: 'rect', x: 0, y: 0, w: 8, h: 8, lineWidth: 1 },  // Внешний квадрат (рамка)
      { type: 'rect', x: 2, y: 2, w: 4, h: 4, color: 'black', fillOpacity: 1, lineWidth: 0 }       // Внутренний чёрный квадрат с отступом 2px со всех сторон
    ] : [
      { type: 'rect', x: 0, y: 0, w: 8, h: 8, lineWidth: 1 }
    ]; // Только внешний квадрат (рамка)


    const flag2 = true; // или false
    const checkbox2 = flag2 ? [
      { type: 'rect', x: 0, y: 0, w: 8, h: 8, lineWidth: 1 }, { type: 'rect', x: 2, y: 2, w: 4, h: 4, color: 'black', fillOpacity: 1, lineWidth: 0 }
    ] : [{ type: 'rect', x: 0, y: 0, w: 8, h: 8, lineWidth: 1 }];


    const documentDefinition = {
      pageSize,
      pageOrientation: "portrait",
      pageMargins: [20, 20, 20, 20],
      defaultStyle: { font },
      footer: (currentPage) => currentPage === 2 ? 'V015' : '',
      // background: (currentPage, pageSize) => {
      //   return {
      //     canvas: [
      //       {
      //         type: "rect",
      //         x: 20, y: 20,
      //         w: pageSize.width - 40,
      //         h: pageSize.height - 60,
      //         lineWidth: 1,
      //       },
      //     ],
      //   };
      // },
      content: [
        {
          fontSize: 13,
          layout: {
            hLineWidth: (i, node) => 1.5,
            vLineWidth: () => 1.5,
            paddingLeft: () => 2,
            paddingRight: () => 2,
            paddingTop: () => 0,
            paddingBottom: () => 0,
          },
          table: {
            widths: ['*', '*', '*', '*', '*'],
            body: [
              [
                { image: base64Image, width: 80, height: 80, alignment, margin: [0, 5], },
                {
                  text: [
                    { text: 'Daşary ýurt raýatyna işewürlik (BS1, BS2), maý goýum (IN), işçi ' },
                    { text: '(WP), maşgala (FM), Sport (SP1, SP2), ynsanperwerlik (HM), hususy ' },
                    { text: '(PR1, PR2), talyp (ST), syýahatçylyk (TU), üstaşyr (TR1, TR2), ' },
                    { text: 'Saglygy bejeriş (HL), sürüjilik (DR) wizasyny resmileşdirmek üçin\n' },
                    { text: "\nŞAHSY KAGYZY", bold, fontSize }
                  ],
                  fontSize: 10, alignment, colSpan: 3,
                  border: [false, true, false, false],
                  margin: [20, 8]
                }, {}, {},
                {
                  rowSpan: 3,
                  stack: [
                    { image: base64LogoUser, width: 100, height: 100, alignment, margin: [0, 5] },
                    { text: 'FOTO', bold, alignment, fontSize: 11, margin: [0, 15, 0, 0] }
                  ],
                },
              ],
              [
                {
                  text: "I. Ýüztutmanyň maglumatlary:",
                  colSpan: 4, bold, margin: [2, 2, 0, 2],
                  fontSize: fontSizeHeadCell, fillColor: sectionHeadColor,
                },
                {}, {}, {}, {},
              ],
              [
                {
                  colSpan: 2, layout, margin: [0, 1, 0, 2],
                  table: {
                    widths: ['*',],
                    body: [
                      [{ text: 'Ýüz tutmanyň görnüşi *', border, fontSize: fontSizeCell, }],
                      [{ text: 'CAKL - CAKYLYK', bold, fontSize: fontSizeEmptyCell, margin: [0, 2, 0, 0] }]
                    ]
                  },
                }, {},
                {
                  colSpan: 2, layout, margin: [0, 1, 0, 2],
                  table: {
                    widths: ['*',],
                    body: [
                      [{ text: 'Seretmegiň tertibi *', border, fontSize: fontSizeCell, }],
                      [{ text: 'TIZ', bold, fontSize: fontSizeEmptyCell, margin: [0, 2, 0, 0] }]
                    ]
                  },
                }, {}, {}
              ],

              // [
              //   {
              //     text: "□ Çagyryjy tarap - fiziki şahs:", margin: [2, 0, 0, 1], colSpan: 5, fontSize: 10, border: [true, false, true, false],
              //   }, {}, {}, {}, {},
              // ],
              [
                {
                  columns: [
                    {
                      canvas: checkbox,
                      width: 15,
                      margin: [0, 2, 5, 0]
                    },
                    {
                      text: 'Çagyryjy tarap - fiziki şahs:',
                      fontSize: 10,
                      margin: [0, 0, 0, 1]
                    }
                  ],
                  colSpan: 5,
                  border: [true, false, true, false],
                },
                {}, {}, {}, {}
              ],

              [
                {
                  colSpan: 2, layout, border: [true, false, false, false],
                  table: {
                    widths: ['*'],
                    body: [
                      [{ text: 'Familiýasy *', fontSize: fontSizeCell, border }],
                      [{ text: ' ', fontSize: fontSizeEmptyCell }]
                    ]
                  },
                }, {},
                {
                  colSpan: 2, border, layout,
                  table: {
                    widths: ['*'],
                    body: [
                      [{ text: 'Ady *', fontSize: fontSizeCell, border }],
                      [{ text: ' ', fontSize: fontSizeEmptyCell }]
                    ]
                  },
                }, {},
                {
                  layout, border: [false, false, true, false],
                  table: {
                    widths: ['*'],
                    body: [
                      [{ text: 'Atasynyň ady', fontSize: fontSizeCell, border }],
                      [{ text: ' ', fontSize: fontSizeEmptyCell }]
                    ]
                  },
                },
              ],

              [
                {
                  colSpan: 4, layout, border: [true, false, false, false],
                  table: {
                    widths: ['*'],
                    body: [
                      [{ text: 'Ýaşaýan salgysy *:', fontSize: fontSizeCell, border, margin: [0, 0, 0, 0] }],
                      [{ text: ' ', fontSize: fontSizeEmptyCell }],
                      [{ text: ' ', fontSize: fontSizeEmptyCell }]
                    ]
                  },
                }, {}, {}, {},
                {
                  layout, border: [false, false, true, false],
                  table: {
                    widths: ['*'],
                    body: [
                      [{ text: 'Telefon belgi (ler) *', fontSize: fontSizeCell, border }],
                      [{ text: ' ', fontSize: fontSizeEmptyCell }],
                      [{ text: ' ', fontSize: fontSizeEmptyCell }]
                    ]
                  },
                },
              ],

              [
                {
                  colSpan: 4, layout, margin: [0, 0, 0, 2], border: [true, false, false, true],
                  table: {
                    widths: ['*',],
                    body: [
                      [{ text: 'Pasport belgisi we berlen ýeri *', fontSize: fontSizeCell, border },],
                      [{ text: ' ', fontSize: fontSizeEmptyCell }]
                    ]
                  },
                },
                {}, {}, {},
                {
                  layout, border: [false, false, true, true], margin: [0, 0, 0, 2],
                  table: {
                    widths: ['*',],
                    body: [
                      [{ text: 'E-mail', fontSize: fontSizeCell, border }],
                      [{ text: ' ', fontSize: fontSizeEmptyCell }]
                    ]
                  },
                },
              ],

              // [
              //   {
              //     text: "Çagyryjy tarap - ýuridik şahs (ýa-da hususy telekeçi):", colSpan: 5, fontSize: 10, margin: [2, 0, 0, 1], border: [true, false, true, false],
              //   }, {}, {}, {}, {},
              // ],
              [
                {
                  columns: [
                    {
                      canvas: checkbox2,
                      width: 15,
                      margin: [0, 2, 5, 0]
                    },
                    {
                      text: "Çagyryjy tarap - ýuridik şahs (ýa-da hususy telekeçi):",
                      fontSize: 10,
                      margin: [0, 0, 0, 1]
                    }
                  ],
                  colSpan: 5,
                  border: [true, false, true, false],
                },
                {}, {}, {}, {}
              ],
              [
                {
                  colSpan: 5, layout, border: [true, false, true, false],
                  table: {
                    widths: ['*'],
                    body: [
                      [{ text: 'Kärhananyň, edaranyň ady (hususy telekeçiniň F.A.A.)* (ENG)', fontSize: fontSizeCell, border }],
                      [{ text: ' ', fontSize: fontSizeEmptyCell }]
                    ]
                  }
                }, {}, {}, {}, {},
              ],

              [
                {
                  colSpan: 2, layout, border: [true, false, false, false], margin: [0, 0, 0, 2],
                  table: {
                    widths: ['*'],
                    body: [
                      [{ text: 'Hukuk salgysy *:', fontSize: fontSizeCell, border }],
                      [{ text: ' ', fontSize: fontSizeEmptyCell }]
                    ]
                  }
                }, {},
                {
                  colSpan: 2, layout, border, margin: [0, 0, 0, 2],
                  table: {
                    widths: ['*'],
                    body: [
                      [{ text: 'E-mail *', fontSize: fontSizeCell, border }],
                      [{ text: ' ', fontSize: fontSizeEmptyCell }]
                    ]
                  }
                }, {},
                {
                  layout, border: [false, false, true, false], margin: [0, 0, 0, 2],
                  table: {
                    widths: ['*',],
                    body: [
                      [{ text: 'Telefon belgi (ler) *', fontSize: fontSizeCell, border }],
                      [{ text: ' ', fontSize: fontSizeEmptyCell }]
                    ]
                  },
                },
              ],

              [
                {
                  text: 'II. Çagyrylýan daşary ýurt raýatynyň şahsy maglumatlary:', bold, colSpan: 5, margin: [2, 2, 0, 2], fontSize: fontSizeHeadCell, fillColor: sectionHeadColor
                }, {}, {}, {}, {},
              ],
              [
                {
                  colSpan: 5, border: [true, false, true, true],
                  layout: {
                    hLineWidth: () => 0.1,
                    vLineWidth: () => 0.1,
                    paddingLeft: () => 2,
                    paddingRight: () => 0,
                    paddingTop: () => 1,
                    paddingBottom: () => 0.6
                  },
                  table: {
                    fontSize: fontSizeCell,
                    widths: ['*', 2, '*', 2, '*', 2, '*', 2, '*', 2, '*', 2, '*', 2, '*', 2, '*', 2, '*', 2, '*', 2, '*'],
                    body: [
                      [
                        { text: '1. Familiýasy*', border, colSpan: 11, margin: [0, 1, 0, 1], fontSize: fontSizeCell },
                        {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                        { text: '', border },
                        { text: '2. Doglan wagtyndaky familiýasy (ozalky familiýa(lary) sy)', colSpan: 11, border, margin: [0, 1, 0, 1], fontSize: fontSizeCell },
                        {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                      ],
                      [
                        { text: ' ', colSpan: 11, fontSize: fontSizeEmptyCell }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                        { text: '', border },
                        { text: ' ', colSpan: 11, fontSize: fontSizeEmptyCell }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                      ],

                      [
                        { text: '3. Ady *', colSpan: 11, fontSize: fontSizeCell, border }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                        { text: '', border },
                        { text: '4. Doglan senesi (GG.AA.ÝÝÝÝ) *', fontSize: fontSizeCell, colSpan: 5, border }, {}, {}, {}, {},
                        { text: '', border },
                        { text: '5. Jynsy *', colSpan: 5, fontSize: fontSizeCell, border }, {}, {}, {}, {},
                      ], [
                        { text: ' ', fontSize: fontSizeEmptyCell, colSpan: 11 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                        { text: '', border },
                        { text: '', fontSize: 11, colSpan: 5 }, {}, {}, {}, {},
                        { text: '', border },
                        { text: ' ', fontSize: 11, colSpan: 5 }, {}, {}, {}, {},
                      ],

                      [
                        { text: '6. Raýatlygy *', fontSize: fontSizeCell, colSpan: 7, border }, {}, {}, {}, {}, {}, {},
                        { text: '', border },
                        { text: '7. Doglan ýurdy *', fontSize: fontSizeCell, colSpan: 7, border }, {}, {}, {}, {}, {}, {},
                        { text: '', border },
                        { text: '8. Doglan ýeri *', fontSize: fontSizeCell, colSpan: 7, border }, {}, {}, {}, {}, {}, {},
                      ], [
                        { text: ' ', fontSize: fontSizeEmptyCell, colSpan: 7 }, {}, {}, {}, {}, {}, {},
                        { text: '', border },
                        { text: ' ', fontSize: fontSizeEmptyCell, colSpan: 7 }, {}, {}, {}, {}, {}, {},
                        { text: '', border },
                        { text: ' ', fontSize: fontSizeEmptyCell, colSpan: 7 }, {}, {}, {}, {}, {}, {},
                      ],

                      [
                        { text: '9. Şahsy belgisi', fontSize: fontSizeCell, colSpan: 5, border }, {}, {}, {}, {},
                        { text: '', border },
                        { text: '10. Pasportynyň görnüşi *', fontSize: fontSizeCell, colSpan: 5, border }, {}, {}, {}, {},
                        { text: '', border },
                        { text: '11. Pasportynyň belgisi *', fontSize: 8, colSpan: 3, border }, {}, {},
                        { text: '', border },
                        { text: '12. Berlen senesi*', fontSize: fontSizeCell, colSpan: 3, border }, {}, {},
                        { text: '', border },
                        { text: '13. Möhleti *', colSpan: 3, fontSize: fontSizeCell, border }, {}, {},
                      ], [
                        { text: ' ', colSpan: 5, fontSize: fontSizeEmptyCell }, {}, {}, {}, {},
                        { text: '', border },
                        { text: ' ', colSpan: 5, fontSize: fontSizeEmptyCell }, {}, {}, {}, {},
                        { text: '', border },
                        { text: ' ', colSpan: 3, fontSize: fontSizeEmptyCell }, {}, {},
                        { text: '', border },
                        { text: ' ', colSpan: 3, fontSize: fontSizeEmptyCell }, {}, {},
                        { text: '', border },
                        { text: ' ', colSpan: 3, fontSize: fontSizeEmptyCell }, {}, {},
                      ],

                      [
                        { text: '14. Berlen ýeri (ýurdy)*', fontSize: fontSizeCell, colSpan: 7, border }, {}, {}, {}, {}, {}, {},
                        { text: '', border },
                        { text: '15. Daşary ýurtdaky ýaşaýan salgysy *', colSpan: 15, fontSize: fontSizeCell, border }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                      ], [
                        { text: ' ', colSpan: 7, fontSize: fontSizeEmptyCell }, {}, {}, {}, {}, {}, {},
                        { text: '', border },
                        { text: ' ', colSpan: 15, fontSize: fontSizeEmptyCell }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                      ],

                      [{ text: '16. E-mail', fontSize: fontSizeCell, colSpan: 23, border }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: ' ', fontSize: fontSizeEmptyCell, colSpan: 23 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [
                        { text: '17. Türkmenistanda jenaýat/administratiw jogapkärçiligine çekilendigi ýa-da çekilmändigi barada *', fontSize: fontSizeCell, colSpan: 23, border },
                        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
                      ],
                      [{ text: ' ', fontSize: fontSizeEmptyCell, colSpan: 23 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [
                        { text: '18. Maşgala ýagdaýy *', fontSize: fontSizeCell, colSpan: 4, border, margin: [0, 1] }, {}, {}, {},
                        { text: 'Sallah/Durmuşa çykmadyk', fontSize: fontSizeCell, colSpan: 5, margin: [0, 1] }, {}, {}, {}, {},
                        { text: 'Äriniň/aýalynyň we çagalarynyň raýatlygy, doglan senesi, FAA', fontSize: fontSizeCell, colSpan: 14, border, margin: [0, 1] },
                        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
                      ],
                      [{ text: ' ', fontSize: fontSizeEmptyCell, colSpan: 23 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: ' ', fontSize: fontSizeEmptyCell, colSpan: 23 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: ' ', fontSize: fontSizeEmptyCell, colSpan: 23 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: '19. Bilimi (*-Diňe BS, IN, WP üçin)', fontSize: fontSizeCell, colSpan: 23, border, margin: [0, 0.2] }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: ' ', fontSize: fontSizeEmptyCell, colSpan: 23 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: '20. Hünäri (*Diňe BS, IN, WP üçin)', fontSize: fontSizeCell, colSpan: 23, border, margin: [0, 0.2] }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: ' ', fontSize: fontSizeEmptyCell, colSpan: 23 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: '21. Okan (okaýan) ýeri *(Diňe BS, IN, WP üçin)', fontSize: fontSizeCell, colSpan: 23, border, margin: [0, 0.2] }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: ' ', fontSize: fontSizeEmptyCell, colSpan: 23 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: '22. Işleýän ýeri we iş telefony, şahsy telefony *', fontSize: fontSizeCell, colSpan: 23, border, margin: [0, 0.2] }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: ' ', fontSize: fontSizeEmptyCell, colSpan: 23 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: '23. Wezipesi (*-Diňe BS, IN, WP üçin)', fontSize: fontSizeCell, colSpan: 23, border, margin: [0, 0.2] }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: ' ', fontSize: fontSizeEmptyCell, colSpan: 23 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: '24. Wezipe boýunça iş tejribesi', fontSize: fontSizeCell, colSpan: 23, border, margin: [0, 0.2] }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: ' ', fontSize: fontSizeEmptyCell, colSpan: 23 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: ' ', fontSize: fontSizeEmptyCell, colSpan: 23, }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                    ]
                  },
                }, {}, {}, {}, {},
              ],
            ],
          },
        },


        // page 2
        {
          fontSize: 13, pageBreak: 'before',
          layout: {
            hLineWidth: (i, node) => 1.5,
            vLineWidth: () => 1.5,
            paddingLeft: () => 2,
            paddingRight: () => 2,
            paddingTop: () => 0,
            paddingBottom: () => 0,
          },
          table: {
            widths: ['*', '*', '*', '*', '*'], // пять равных колонок
            body: [
              [{ text: 'III.Wiza maglumatlary:', bold, colSpan: 5, margin: [2, 2, 0, 2], fontSize: fontSizeHeadCell, fillColor: sectionHeadColor }, {}, {}, {}, {}],
              [
                {
                  colSpan: 5, border: [true, false, true, true], margin: [0, 0, 0, 2],
                  layout: {
                    hLineWidth: () => 0.1,
                    vLineWidth: () => 0.1,
                    paddingLeft: () => 2,
                    paddingRight: () => 0,
                    paddingTop: () => 1,
                    paddingBottom: () => 0.6
                  },
                  table: {
                    fontSize: fontSizeCell,
                    widths: ['*', 2, '*', 2, '*', 2, '*', 2, '*', 2, '*', 2, '*', 2, '*', 2, '*', 2, '*', 2, '*', 2, '*'],
                    body: [
                      [
                        { text: '25. Wizanyň derejesi *', border, colSpan: 11, margin: [0, 1, 0, 1], fontSize: fontSizeCell }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                        { text: '', border },
                        { text: '26. Wizanyň görnüşi (gezekligi) *', colSpan: 11, border, margin: [0, 1, 0, 1], fontSize: fontSizeCell }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                      ],
                      [
                        { text: ' ', colSpan: 11, fontSize: fontSizeEmptyCell, }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                        { text: '', border },
                        { text: ' ', colSpan: 11, fontSize: fontSizeEmptyCell, }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                      ],
                      [
                        { text: '27. Wizanyň möhleti *', fontSize: fontSizeCell, colSpan: 5, border }, {}, {}, {}, {},
                        { text: '', border },
                        { text: ' ', colSpan: 5, fontSize: fontSizeCell, border }, {}, {}, {}, {},
                        { text: '', border },
                        { text: '28. Başlanýan wagty', fontSize: fontSizeCell, colSpan: 5, border }, {}, {}, {}, {},
                        { text: '', border },
                        { text: '29. Tamamlanýan wagty', colSpan: 5, fontSize: fontSizeCell, border }, {}, {}, {}, {},
                      ],
                      [
                        { text: '', fontSize: 11, colSpan: 5 }, {}, {}, {}, {},
                        { text: '', border },
                        { text: 'Aý', fontSize: 11, colSpan: 5, bold }, {}, {}, {}, {},
                        { text: '', border },
                        { text: '', fontSize: 11, colSpan: 5 }, {}, {}, {}, {},
                        { text: '', border },
                        { text: ' ', fontSize: 11, colSpan: 5 }, {}, {}, {}, {},
                      ],
                      [{ text: '30. Soňky berlen wizasynyň derejesi, görnüşi, belgisi we möhleti', fontSize: fontSizeCell, colSpan: 23, border }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: 'BS, IKI GEZEKLIK, A1580991, 22.11.2024 21.12.2024', bold, fontSize: fontSizeEmptyCell, colSpan: 23 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [
                        { text: '31. Barjak serhet ýakalary', border, colSpan: 17, margin: [0, 1, 0, 1], fontSize: fontSizeCell },
                        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { text: '', border },
                        { text: '32. Gatnaşýan Döwlet çäresi', colSpan: 5, border, margin: [0, 1, 0, 1], fontSize: fontSizeCell, }, {}, {}, {}, {},
                      ],
                      [
                        { text: ' ', colSpan: 17, fontSize: fontSizeEmptyCell, }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                        { text: '', border },
                        { text: ' ', colSpan: 5, fontSize: fontSizeEmptyCell, }, {}, {}, {}, {},
                      ],
                      [
                        { text: '33. Boljak welaýaty *', fontSize: fontSizeCell, colSpan: 5, border }, {}, {}, {}, {},
                        { text: '', border },
                        { text: '34. Boljak etraby *', colSpan: 5, fontSize: fontSizeCell, border }, {}, {}, {}, {},
                        { text: '', border },
                        { text: '35. Boljak salgysy *', fontSize: fontSizeCell, colSpan: 11, border }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                      ],
                      [
                        { text: '', fontSize: 11, colSpan: 5, }, {}, {}, {}, {}, { text: '', border },
                        { text: 'Aý', fontSize: 11, colSpan: 5, bold }, {}, {}, {}, {}, { text: '', border },
                        { text: '', fontSize: 11, colSpan: 11 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                      ],
                    ]
                  },
                },
                {}, {}, {}, {},
              ],
            ],
          },
        },

        {
          fontSize: 13,
          layout: {
            hLineWidth: (i, node) => 1.5,
            vLineWidth: () => 1.5,
            paddingLeft: () => 0,
            paddingRight: () => 0,
            paddingTop: () => 0,
            paddingBottom: () => 0
          },
          table: {
            widths: [220, '*'],
            body: [
              [
                {
                  text: 'IV. Wizanyň käbir derejelerine degişli goşmaça maglumatlar:',
                  colSpan: 2, border: [true, false, true, false], margin: [4, 2, 0, 2], bold, fontSize: fontSizeHeadCell, fillColor: sectionHeadColor,
                }, {}
              ],
              [
                {
                  colSpan: 2,
                  fontSize: 13,
                  layout: {
                    hLineWidth: (i, node) => 0.1,
                    vLineWidth: () => 0.1,
                    paddingLeft: () => 2,
                    paddingRight: () => 0,
                    paddingTop: () => 0,
                    paddingBottom: () => 2
                  },
                  table: {
                    widths: [70, '*'],
                    body: [
                      [
                        {
                          alignment, fillColor: sectionHeadColor, margin: [0, 3, 0, 3], border: [true, false, false, false],
                          text: [{ text: '(IN)' }, { text: '\nMaýa goýum', fontSize: 8 }]
                        },
                        {
                          layout, margin: [1, 2, 2, 1],
                          table: {
                            widths: ['*'],
                            body: [
                              [{ text: '36. Maýa goýum goýulýan pudak (IN)*', fontSize: fontSizeCell, border }],
                              [{ text: ' ', fontSize: fontSizeEmptyCell }]
                            ]
                          },
                        },
                      ],
                      [
                        {
                          alignment, fillColor: sectionHeadColor, margin: [0, 3, 0, 3],
                          text: [{ text: '(WP)' }, { text: '\nIşçi', fontSize: 8 }]
                        },
                        {
                          layout, margin: [1, 2, 2, 1],
                          table: {
                            widths: ['*'],
                            body: [
                              [{ text: '37. Hereket çägi (WP)*', fontSize: fontSizeCell, border }],
                              [{ text: 'ASGABAT S., AHAL WEL. AKBUGDAY ETR.', bold, fontSize: fontSizeEmptyCell }]
                            ]
                          },
                        },
                      ],
                      [
                        {
                          text: [{ text: '(FM)' }, { text: '\nMaşgala', fontSize: 8 }], alignment, fillColor: sectionHeadColor, margin: [0, 16, 0, 0],
                        },
                        {
                          layout, margin: [1, 2, 2, 1],
                          table: {
                            widths: ['*'],
                            body: [
                              [{ text: '38. Çagyrýanyň wizasynyň derejesi, görnüşi, belgisi we möhleti (FM)', fontSize: fontSizeCell, border }],
                              [{ text: ' ', bold, fontSize: fontSizeEmptyCell }],
                              [{ text: '39. Garyndaşlyk derejesi (FM)*', fontSize: fontSizeCell, border }],
                              [{ text: ' ', bold, fontSize: fontSizeEmptyCell }]
                            ]
                          },
                        },
                      ],
                      [
                        {
                          alignment, fillColor: sectionHeadColor, margin: [0, 16, 0, 0],
                          text: [{ text: '(PR)' }, { text: '\nHususy', fontSize: 8 },]
                        },
                        {
                          layout, margin: [1, 2, 2, 1],
                          table: {
                            widths: ['*'],
                            body: [
                              [{ text: '40. Gelmeginiň maksady (PR1, PR2)*', fontSize: fontSizeCell, border }],
                              [{ text: ' ', bold, fontSize: fontSizeEmptyCell }],
                              [{ text: '41. Garyndaşlyk derejesi (PR1, PR2) *', fontSize: fontSizeCell, border }],
                              [{ text: ' ', bold, fontSize: fontSizeEmptyCell }]
                            ]
                          },
                        },
                      ],
                      [
                        {
                          alignment, fillColor: sectionHeadColor, margin: [0, 3, 0, 3], border: [true, false, false, true],
                          text: [{ text: '(SP)' }, { text: '\nSport', fontSize: 8 }]
                        },
                        {
                          layout, margin: [1, 2, 2, 1],
                          table: {
                            widths: ['*'],
                            body: [
                              [{ text: '42. Sportyň görnüşi (SP1)', fontSize: fontSizeCell, border }],
                              [{ text: ' ', fontSize: fontSizeEmptyCell }]
                            ]
                          },
                        },
                      ],
                      [
                        {
                          alignment, fillColor: sectionHeadColor, margin: [0, 7, 0, 0], border: [true, false, false, true],
                          text: [{ text: '(TR)' }, { text: '\nÜstaşyr', fontSize: 8 }]
                        },
                        {
                          layout, margin: [1, 2, 2, 1],
                          table: {
                            widths: ['*', 2, '*', 2, '*'],
                            body: [
                              [
                                { text: '43. Giriş nokady (TR1, TR2) *', marginTop: 3, fontSize: fontSizeCell, border }, { text: ' ', border },
                                { text: '44. Çykyş nokady (TR1, TR2) *', marginTop: 3, fontSize: fontSizeCell, border }, { text: ' ', border },
                                { text: '45. Barýan ýurdy (TR1, TR2) *', marginTop: 3, fontSize: fontSizeCell, border },
                              ],
                              [
                                { text: '', fontSize: 3 }, { text: ' ', border }, { text: '', fontSize: 3 }, { text: ' ', border }, { text: '', fontSize: 3 }
                              ]
                            ]
                          },
                        },
                      ],
                      [
                        {
                          alignment, fillColor: sectionHeadColor, margin: [0, 7, 0, 0], border: [true, false, false, true],
                          text: [{ text: '(ST)' }, { text: '\nTalyp', fontSize: 8 }]
                        },
                        {
                          layout, margin: [1, 2, 2, 1],
                          table: {
                            widths: ['*', '*'],
                            body: [
                              [
                                { text: '46. Ýokary okuw jaýy ТКМ (ST) *', fontSize: fontSizeCell, border },
                                { text: '47. Okaýan hünäri we ýyly (ST) *', fontSize: fontSizeCell, border },
                              ],
                              [{ text: ' ', fontSize: fontSizeEmptyCell }, { text: ' ', fontSize: fontSizeEmptyCell }]
                            ]
                          },
                        },
                      ],

                      [
                        {
                          alignment, fillColor: sectionHeadColor, margin: [0, 3, 0, 3], border: [true, false, false, false],
                          text: [{ text: '(HL)' }, { text: '\nSaglygy bejeriş', fontSize: 8 },]
                        },
                        {
                          layout, margin: [1, 2, 2, 1],
                          table: {
                            widths: ['*',],
                            body: [
                              [{ text: '48. Saglygy goraýyş edarasy (HL) *', fontSize: fontSizeCell, border }],
                              [{ text: ' ', fontSize: fontSizeEmptyCell }]
                            ]
                          },
                        },
                      ],
                    ],
                  },
                }, {}
              ],
              [
                {
                  border: [true, false, true, false], colSpan: 2,
                  table: {
                    widths: ['*'],
                    body: [
                      [
                        {
                          border, layout,
                          table: {
                            widths: ['*'],
                            body: [
                              [{ text: '49. Kämillik ýaşyna ýetmedikler üçin: ata-enesiniň/kanuny wekiliniň F.A.A., raýatlygy we öý salgysy: *', fontSize: fontSizeCell, border }],
                              [{ text: ' ', bold, fontSize: fontSizeEmptyCell }],
                              [{ text: '50. BELLIKLER:', fontSize: fontSizeCell, border }],
                              [{ text: ' ', bold, fontSize: fontSizeEmptyCell }]
                            ]
                          },
                        },
                      ],
                    ],
                  }
                }, {}
              ],
              [
                {
                  text: 'Galp maglumat berlen ýagdaýynda Türkmenistanyň kanunçylygyna laýyklykda jogapkärçilige çekiljekdigim duýduryldy.',
                  colSpan: 2, margin: [4, 5, 0, 10], fontSize: fontSizeHeadCell,
                }, {}
              ],
              [
                { text: 'Sene:', fontSize: 9, marginTop: 20, marginLeft: 5 },
                {
                  margin: [5, 3, 0, 2],
                  text: [
                    { text: 'Ýüz tutýan tarapyň (ygtyýarly adamyň) goly ' },
                    { text: '(kämillik ýaşyna ýetmedikleriň, kämillik ukyby bolmadyklaryň ata-enesiniň ýa-da kanuny wekiliniň goly)', italics },
                    { text: '\n\n  ' },
                    { text: ' '.repeat(60), decoration: 'underline' }
                  ],
                  fontSize: 9,
                },
              ],
            ],
          },
        },
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
          pdfUrl && (<iframe title="PDF Viewer" type="application/pdf" className="iframeDocument" src={pdfUrl} />)
        }
      </>
    </PreviewDocWrapper>
  );
};

export default ShahsyKagyzy;