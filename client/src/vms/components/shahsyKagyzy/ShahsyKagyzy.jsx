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
const layout = {
  hLineWidth: (i, node) => 0.1,
  vLineWidth: () => 0.1,
  paddingLeft: () => 2,
  paddingRight: () => 1,
  paddingTop: () => 1,
  paddingBottom: () => 1
};


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
      footer: (currentPage) => currentPage === 2 ? 'V015' : '',
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
                    paddingLeft: () => 2,
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
                  colSpan: 2, layout,
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
                { text: "Çagyryjy tarap - fiziki şahs:", border: [true, false, true, false], colSpan: 5, fontSize: 10 }, {}, {}, {}, {},
              ],
              [
                {
                  colSpan: 2, layout, border: [true, false, false, false],
                  table: {
                    widths: ['*',],
                    body: [
                      [{ text: 'Familiýasy *', fontSize: 10, border, margin: [0, 0, 0, 0] },],
                      [{ text: ' ' }]
                    ]
                  },
                }, {},
                {
                  colSpan: 2, border, layout,
                  table: {
                    widths: ['*',],
                    body: [
                      [{ text: 'Ady *', fontSize: 10, border: [false], margin: [0, 0, 0, 0] },],
                      [{ text: ' ' }]
                    ]
                  },
                }, {},
                {
                  layout, border: [false, false, true, false],
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
                  colSpan: 4, layout, border: [true, false, false, false],
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
                  layout, border: [false, false, true, false],
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
                  colSpan: 4, border: [true, false, false, true], layout,
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
                  layout, border: [false, false, true, true],
                  table: {
                    widths: ['*',],
                    body: [
                      [{ text: 'E-mail', fontSize: 10, border: [false], margin: [0, 0, 0, 0] },],
                      [{ text: ' ' }]
                    ]
                  },
                },
              ],


              [
                { text: "Çagyryjy tarap - ýuridik şahs (ýa-da hususy telekeçi):", border: [true, false, true, false], colSpan: 5, fontSize: 10 }, {}, {}, {}, {},
              ],
              [
                {
                  colSpan: 5, layout, border: [true, false, true, false],
                  table: {
                    widths: ['*',],
                    body: [
                      [{ text: 'Kärhananyň, edaranyň ady (hususy telekeçiniň F.A.A.)* (ENG)', fontSize: 10, border, margin: [0, 0, 0, 0] },],
                      [{ text: ' ' }]
                    ]
                  },
                },
                {}, {}, {}, {},
              ],

              [
                {
                  colSpan: 2, layout, border: [true, false, false, false],
                  table: {
                    widths: ['*',],
                    body: [
                      [{ text: 'Hukuk salgysy *:', fontSize: 10, border, margin: [0, 0, 0, 0] },],
                      [{ text: ' ' }]
                    ]
                  },
                }, {},
                {
                  colSpan: 2, layout, border,
                  table: {
                    widths: ['*',],
                    body: [
                      [{ text: 'E-mail *', fontSize: 10, border, margin: [0, 0, 0, 0] },],
                      [{ text: ' ' }]
                    ]
                  },
                }, {},
                {
                  layout, border: [false, false, true, false],
                  table: {
                    widths: ['*',],
                    body: [
                      [{ text: 'Telefon belgi (ler) *', fontSize: 10, border: [false], margin: [0, 0, 0, 0] },],
                      [{ text: ' ' }]
                    ]
                  },
                },
              ],


              [
                { text: 'II. Çagyrylýan daşary ýurt raýatynyň şahsy maglumatlary:', bold, fontSize: 11, colSpan: 5, fillColor: '#d3d3d3', }, {}, {}, {}, {},
              ],

              // [
              //   {
              //     colSpan: 5, layout: {
              //       hLineWidth: () => 0.1,
              //       vLineWidth: () => 0.1,
              //       paddingLeft: () => 2,
              //       paddingRight: () => 0,
              //       paddingTop: () => 0,
              //       paddingBottom: () => 0
              //     }, border: [true, false, true, false],
              //     table: {
              //       widths: ['*', '*', 2, '*', 2, 'auto'],
              //       body: [
              //         [
              //           { text: '1. Familiýasy *', colSpan: 3, fontSize: 9, border, },
              //           { text: '', border },
              //           { text: '', border },
              //           { text: '2. Doglan wagtyndaky familiýasy (ozalky familiýa(lary) sy)', colSpan: 3, fontSize: 9, border },
              //           { text: '', border },
              //           { text: '', border },
              //         ],
              //         [
              //           { text: ' ', colSpan: 2, }, {}, { text: ' ', border },
              //           { text: '', colSpan: 3, }, {}, {},
              //         ],
              //         [
              //           { text: '3. Ady *', colSpan: 3, fontSize: 9, border, }, {}, {},
              //           { text: '', text: '4. Doglan senesi (GG.AA.ÝÝÝÝ) *', colSpan: 2, fontSize: 9, border, }, {},
              //           { text: '5. Jynsy *', fontSize: 9, border, },
              //         ],
              //         [{ text: ' ', colSpan: 2 }, {}, { text: '', border }, { text: '', }, { text: '', border }, { text: '' },],
              //         // [{ text: ' ', }, { text: '', }, { text: ' ', }, { text: '', }, { text: '' }, { text: '' },]
              //       ]
              //     },
              //   },
              //   {}, {}, {}, {},
              // ],

              [
                {
                  colSpan: 5, layout: {
                    hLineWidth: () => 0.1,
                    vLineWidth: () => 0.1,
                    paddingLeft: () => 2,
                    paddingRight: () => 0,
                    paddingTop: () => 0.5,
                    paddingBottom: () => 0.5
                  }, border: [true, false, true, false],
                  table: {
                    fontSize: 9,
                    widths: ['*', 2, '*', 2, '*', 2, '*', 2, '*', 2, '*', 2, '*', 2, '*', 2, '*', 2, '*', 2, '*', 2, '*'],
                    body: [

                      [
                        { text: '1. Familiýasy*', fontSize: 9, colSpan: 11, border },
                        {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                        { text: '', border },
                        { text: '2. Doglan wagtyndaky familiýasy (ozalky familiýa(lary) sy)', fontSize: 9, colSpan: 11, border },
                        {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                      ],
                      [
                        { text: ' ', colSpan: 11, fontSize: 11, },
                        {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                        { text: '', border },
                        { text: ' ', colSpan: 11, fontSize: 11, },
                        {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                      ],


                      [
                        { text: '3. Ady *', colSpan: 11, fontSize: 9, border },
                        {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                        { text: '', border },
                        { text: '4. Doglan senesi (GG.AA.ÝÝÝÝ) *', fontSize: 9, colSpan: 5, border },
                        {}, {}, {}, {},
                        { text: '', border },
                        { text: '5. Jynsy *', colSpan: 5, fontSize: 9, border },
                        {}, {}, {}, {},
                      ], [
                        { text: ' ', fontSize: 11, colSpan: 11 },
                        {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                        { text: '', border },
                        { text: '', fontSize: 11, colSpan: 5 },
                        {}, {}, {}, {},
                        { text: '', border },
                        { text: '', fontSize: 11, colSpan: 5 },
                        {}, {}, {}, {},
                      ],


                      [
                        { text: '6. Raýatlygy *', fontSize: 9, colSpan: 7, border },
                        {}, {}, {}, {}, {}, {},
                        { text: '', border },
                        { text: '7. Doglan ýurdy *', fontSize: 9, colSpan: 7, border },
                        {}, {}, {}, {}, {}, {},
                        { text: '', border },
                        { text: '8. Doglan ýeri *', fontSize: 9, colSpan: 7, border },
                        {}, {}, {}, {}, {}, {},
                      ], [
                        { text: ' ', fontSize: 11, colSpan: 7 },
                        {}, {}, {}, {}, {}, {},
                        { text: '', border },
                        { text: '', fontSize: 11, colSpan: 7 },
                        {}, {}, {}, {}, {}, {},
                        { text: '', border },
                        { text: '', fontSize: 11, colSpan: 7 },
                        {}, {}, {}, {}, {}, {},
                      ],


                      [
                        { text: '9. Şahsy belgisi', fontSize: 9, colSpan: 5, border },
                        {}, {}, {}, {},
                        { text: '', border },
                        { text: '10. Pasportynyň görnüşi *', fontSize: 9, colSpan: 5, border },
                        {}, {}, {}, {},
                        { text: '', border },
                        { text: '11. Pasportynyň belgisi *', fontSize: 8, colSpan: 3, border },
                        {}, {},
                        { text: '', border },
                        { text: '12. Berlen senesi*', fontSize: 9, colSpan: 3, border },
                        {}, {},
                        { text: '', border },
                        { text: '13. Möhleti *', colSpan: 3, fontSize: 9, border },
                        {}, {},
                      ], [
                        { text: ' ', colSpan: 5, fontSize: 11, },
                        {}, {}, {}, {},
                        { text: '', border },
                        { text: ' ', colSpan: 5, fontSize: 11, },
                        {}, {}, {}, {},
                        { text: '', border },
                        { text: '', colSpan: 3, fontSize: 11, },
                        {}, {},
                        { text: '', border },
                        { text: ' ', colSpan: 3, fontSize: 11, },
                        {}, {},
                        { text: '', border },
                        { text: '', colSpan: 3, fontSize: 11, },
                        {}, {},
                      ],


                      [
                        { text: '14. Berlen ýeri (ýurdy)*', fontSize: 9, colSpan: 7, border },
                        {}, {}, {}, {}, {}, {},
                        { text: '', border },
                        { text: '15. Daşary ýurtdaky ýaşaýan salgysy *', colSpan: 15, fontSize: 9, border },
                        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                      ], [
                        { text: ' ', colSpan: 7, fontSize: 11, },
                        {}, {}, {}, {}, {}, {},
                        { text: '', border },
                        { text: '', colSpan: 15, fontSize: 11, },
                        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                      ],


                      [{ text: '16. E-mail', fontSize: 9, colSpan: 23, border }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: ' ', fontSize: 9, colSpan: 23 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [
                        { text: '17. Türkmenistanda jenaýat/administratiw jogapkärçiligine çekilendigi ýa-da çekilmändigi barada *', fontSize: 9, colSpan: 23, border },
                        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
                      ],
                      [{ text: ' ', fontSize: 9, colSpan: 23 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [
                        { text: '18. Maşgala ýagdaýy *', fontSize: 9, colSpan: 4, border }, {}, {}, {},
                        { text: 'Sallah/Durmuşa çykmadyk', fontSize: 9, colSpan: 5, }, {}, {}, {}, {},
                        { text: 'Äriniň/aýalynyň we çagalarynyň raýatlygy, doglan senesi, FAA', fontSize: 9, colSpan: 14, border },
                        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
                      ],
                      [{ text: ' ', fontSize: 9, colSpan: 23 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: ' ', fontSize: 9, colSpan: 23 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: ' ', fontSize: 9, colSpan: 23 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: '19. Bilimi (*-Diňe BS, IN, WP üçin)', fontSize: 9, colSpan: 23, border }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: ' ', fontSize: 9, colSpan: 23 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: '20. Hünäri (*Diňe BS, IN, WP üçin)', fontSize: 9, colSpan: 23, border }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: ' ', fontSize: 9, colSpan: 23 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: '21. Okan (okaýan) ýeri *(Diňe BS, IN, WP üçin)', fontSize: 9, colSpan: 23, border }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: ' ', fontSize: 9, colSpan: 23 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: '22. Işleýän ýeri we iş telefony, şahsy telefony *', fontSize: 9, colSpan: 23, border }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: ' ', fontSize: 9, colSpan: 23 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: '23. Wezipesi (*-Diňe BS, IN, WP üçin)', fontSize: 9, colSpan: 23, border }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: ' ', fontSize: 9, colSpan: 23 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: '24. Wezipe boýunça iş tejribesi', fontSize: 9, colSpan: 23, border }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: ' ', fontSize: 9, colSpan: 23 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                      [{ text: ' ', fontSize: 9, colSpan: 23 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],

                    ]
                  },
                },
                {}, {}, {}, {},
              ],


            ],
          },
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


/*
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
const layout = {
  hLineWidth: (i, node) => 0.1,
  vLineWidth: () => 0.1,
  paddingLeft: () => 2,
  paddingRight: () => 1,
  paddingTop: () => 1,
  paddingBottom: () => 1
};


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
      footer: (currentPage) => currentPage === 2 ? 'V015' : '',
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
                    paddingLeft: () => 2,
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
                  colSpan: 2, layout,
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
                { text: "Çagyryjy tarap - fiziki şahs:", border: [true, false, true, false], colSpan: 5, fontSize: 10 }, {}, {}, {}, {},
              ],
              [
                {
                  colSpan: 2, layout, border: [true, false, false, false],
                  table: {
                    widths: ['*',],
                    body: [
                      [{ text: 'Familiýasy *', fontSize: 10, border, margin: [0, 0, 0, 0] },],
                      [{ text: ' ' }]
                    ]
                  },
                }, {},
                {
                  colSpan: 2, border, layout,
                  table: {
                    widths: ['*',],
                    body: [
                      [{ text: 'Ady *', fontSize: 10, border: [false], margin: [0, 0, 0, 0] },],
                      [{ text: ' ' }]
                    ]
                  },
                }, {},
                {
                  layout, border: [false, false, true, false],
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
                  colSpan: 4, layout, border: [true, false, false, false],
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
                  layout, border: [false, false, true, false],
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
                  colSpan: 4, border: [true, false, false, true], layout,
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
                  layout, border: [false, false, true, true],
                  table: {
                    widths: ['*',],
                    body: [
                      [{ text: 'E-mail', fontSize: 10, border: [false], margin: [0, 0, 0, 0] },],
                      [{ text: ' ' }]
                    ]
                  },
                },
              ],


              [
                { text: "Çagyryjy tarap - ýuridik şahs (ýa-da hususy telekeçi):", border: [true, false, true, false], colSpan: 5, fontSize: 10 }, {}, {}, {}, {},
              ],
              [
                {
                  colSpan: 5, layout, border: [true, false, true, false],
                  table: {
                    widths: ['*',],
                    body: [
                      [{ text: 'Kärhananyň, edaranyň ady (hususy telekeçiniň F.A.A.)* (ENG)', fontSize: 10, border, margin: [0, 0, 0, 0] },],
                      [{ text: ' ' }]
                    ]
                  },
                },
                {}, {}, {}, {},
              ],

              [
                {
                  colSpan: 2, layout, border: [true, false, false, false],
                  table: {
                    widths: ['*',],
                    body: [
                      [{ text: 'Hukuk salgysy *:', fontSize: 10, border, margin: [0, 0, 0, 0] },],
                      [{ text: ' ' }]
                    ]
                  },
                }, {},
                {
                  colSpan: 2, layout, border,
                  table: {
                    widths: ['*',],
                    body: [
                      [{ text: 'E-mail *', fontSize: 10, border, margin: [0, 0, 0, 0] },],
                      [{ text: ' ' }]
                    ]
                  },
                }, {},
                {
                  layout, border: [false, false, true, false],
                  table: {
                    widths: ['*',],
                    body: [
                      [{ text: 'Telefon belgi (ler) *', fontSize: 10, border: [false], margin: [0, 0, 0, 0] },],
                      [{ text: ' ' }]
                    ]
                  },
                },
              ],


              [
                { text: 'II. Çagyrylýan daşary ýurt raýatynyň şahsy maglumatlary:', bold, fontSize: 11, colSpan: 5, fillColor: '#d3d3d3', }, {}, {}, {}, {},
              ],
              [
                {
                  colSpan: 5, layout: {
                    hLineWidth: () => 0.1,
                    vLineWidth: () => 0.1,
                    paddingLeft: () => 2,
                    paddingRight: () => 0,
                    paddingTop: () => 0,
                    paddingBottom: () => 0
                  }, border: [true, false, true, false],
                  table: {

                    widths: ['*', '*', 2, '*', 2, 'auto'],
                    body: [
                      [
                        { text: '1. Familiýasy *', colSpan: 3, fontSize: 9, border, },
                        { text: '', border },
                        { text: '', border },
                        { text: '2. Doglan wagtyndaky familiýasy (ozalky familiýa(lary) sy)', colSpan: 3, fontSize: 9, border },
                        { text: '', border },
                        { text: '', border },
                      ],
                      [
                        { text: ' ', colSpan: 2, }, {}, { text: ' ', border },
                        { text: '', colSpan: 3, }, {}, {},
                      ],
                      [
                        { text: '3. Ady *', colSpan: 3, fontSize: 9, border, }, {}, {},
                        { text: '', text: '4. Doglan senesi (GG.AA.ÝÝÝÝ) *', colSpan: 2, fontSize: 9, border, }, {},
                        { text: '5. Jynsy *', fontSize: 9, border, },
                      ],
                      [{ text: ' ', colSpan: 2 }, {}, { text: '', border }, { text: '', }, { text: '', border }, { text: '' },],




                      // [{ text: ' ', }, { text: '', }, { text: ' ', }, { text: '', }, { text: '' }, { text: '' },]
                    ]
                  },
                },
                {}, {}, {}, {},
              ],



            ],
          },
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
*/