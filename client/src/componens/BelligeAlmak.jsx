import React, { useState, useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import { vfs as customVfs } from "../vfs_fonts";
import jpgImage from "../4.png";
import Utils from "../utils";

pdfMake.vfs = customVfs;
pdfMake.fonts = {
  TimesNewRoman: {
    normal: "TIMES.TTF",
    bold: "TIMESBD.TTF",
    italics: "TIMESI.TTF",
    bolditalics: "TIMESBI.TTF",
  },
};

const Profile = ({ ...props }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  useEffect(() => {
    const toBase64 = async () => {
      const response = await fetch(jpgImage);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => setBase64Image(reader.result);
      reader.readAsDataURL(blob);
    };
    toBase64();
  }, []);

  // const qrData = {
  //   "ŞAHSY KAGYZY": "",
  //   "Familiýasy, ady, atasynyň ady": `${props.profile?.firstName || ''} ${props.profile?.lastName || ''} ${props.profile?.middleName || ''}`,
  //   "Doglan senesi we ýeri": `${props.profile.birthDay} ${props.profile.bornCountry}`,
  //   "Raýatlygy": `${props.profile.citizenship}`,
  //   "Pasportyň belgisi, berlen senesi we möhleti": `${props.profile.passport}`,
  //   "Şahsy belgisi": ``,
  //   "Bilimi, okan ýeri": `${props.profile.studyOfCountry}`,
  //   "Hünäri": `${props.profile.major}`,
  //   "Wezipesi": `${props.profile.position}`,
  //   "Türkmenistanda öňki işlän ýerleri": `vdfsvdfvs dfv sdfjklvvnd fvsdfvjndfsvn dfsajvk qaerw gearui SHdh`,
  //   "Maşgala ýagdaýy": `Aýaly-Takae Handa-30.07.1965 (JPN)`,
  //   "Daşary ýurtdaky ýaşaýan anyk salgysy": `JPN, 4-11-1 Kaminoge Setagaya-ku, Tokyo, Japan`,
  //   "Daşary ýurt raýaylary barada galp maglumatlary görkezilýän ýagdaýynda Türkmenistanyň kanunçylygyna laýyklykda doly jogapkärçiligi çekýarin.": "",
  //   "Ygtyýarly adam.": ""
  // };

  // const qrCodeContent = JSON.stringify(qrData);

  const generatePdf = () => {
    if (!base64Image) return;

    const documentDefinition = {
      pageSize: "A4",
      pageOrientation: "portrait",
      pageMargins: [20, 40, 20, 40],
      defaultStyle: { font: "TimesNewRoman", },
      content: [
        { text: "DAŞARY YURT RAÝATLARYNY BELLIGE ALYŞ NAMASY\n", fontSize: 18, bold: true, alignment: "center" },
        { text: "\n" },
        {
          table: {
            widths: [180, '*', 80],
            body: [
              [
                { text: '1 Familiýasy, ady, atasynyň ady', fontSize: 14, alignment: 'left' },
                {
                  stack: [
                    { text: `${'FirstName'}\t${'LastName'}`, italics: true, bold: true, fontSize: 14, alignment: 'center', margin: [0, 0, 0, 2] },
                    {
                      canvas: [
                        { type: 'line', x1: 0, y1: 0, x2: 262, y2: 0, lineWidth: 0.5, color: '#000000' }
                      ]
                    }
                  ]
                },
                {
                  width: "auto", width: 90, height: 115, alignment: "right",
                  canvas: [{ type: "rect", x: 0, y: 0, w: 90, h: 115, lineWidth: 1, dash: { length: 4 }, },],
                  alignment: 'center',
                  rowSpan: 8
                }
              ],
              [
                {
                  stack: [
                    {
                      text: [
                        { text: `2 Raýatlygy\t\t\t`, },
                        { text: `${'JPN'}`, italics: true, bold: true }
                      ],
                      fontSize: 14, alignment: 'left', margin: [0, 0, 0, 2]
                    },
                    { canvas: [{ type: 'line', x1: 70, y1: 0, x2: 180, y2: 0, lineWidth: 0.5, color: '#000000' }] }
                  ]
                },
                {
                  stack: [
                    {
                      text: [
                        { text: '3 Doglan senesi\t\t\t' },
                        { text: `${"16.05.1967"}`, italics: true, bold: true }
                      ],
                      fontSize: 14, alignment: 'left', margin: [0, 0, 0, 2]
                    },
                    { canvas: [{ type: 'line', x1: 100, y1: 0, x2: 262, y2: 0, lineWidth: 0.5, color: '#000000' }] }
                  ]
                }, { text: '', alignment: 'center' }
              ],
              [
                {
                  colSpan: 2,
                  fontSize: 14,
                  alignment: 'left',
                  stack: [
                    {
                      fontSize: 14, alignment: 'left',
                      text: [
                        { text: '4 Pasportynyň belgisi\t\t\t' }, { text: `${'TZ1132601'}\t\t\t`, italics: true, bold: true, }, { text: `${'20.05.2026'}`, italics: true, bold: true, }
                      ]
                    },
                    { canvas: [{ type: 'line', x1: 120, y1: 0, x2: 450, y2: 0, lineWidth: 0.5, color: '#000000' }] }
                  ]
                }, {}, { text: '', alignment: 'center' } // Column 3
              ],
              [
                {
                  stack: [
                    { text: `5 Doglan ýeri ýurdy\t`, fontSize: 14, alignment: 'left', margin: [0, 0, 0, 2] },
                    { canvas: [{ type: 'line', x1: 115, y1: 0, x2: 450, y2: 0, lineWidth: 0.5, color: '#000000' }] }
                  ]
                },
                { text: `${"JPN, Tokyo/Ýaponiýa"}`, italics: true, bold: true, fontSize: 14, margin: [40, 0, 0, 2] },
                { text: '', alignment: 'center' }
              ],
              [
                {
                  colSpan: 2, fontSize: 14, alignment: 'left',
                  stack: [
                    {
                      text: [
                        { text: `6 Jynsy\t\t\t`, }, { text: `${'Erkek'}`, italics: true, bold: true }
                      ],
                      fontSize: 14, alignment: 'left', margin: [0, 0, 0, 2]
                    },
                    { canvas: [{ type: 'line', x1: 45, y1: 0, x2: 450, y2: 0, lineWidth: 0.5, color: '#000000' }] }
                  ]
                },
                { text: '', alignment: 'center' }
              ],

              [
                {
                  colSpan: 2, fontSize: 14, alignment: 'left',
                  stack: [
                    {
                      fontSize: 14, alignment: 'left',
                      text: [
                        { text: `7 Öý salgysy\t` }, { text: `${'JPN  4-11-1 Kaminoge Setagaya-ku, Tokyo, Japan'}`, italics: true, bold: true }
                      ]
                    },
                    {
                      canvas: [
                        { type: 'line', x1: 75, y1: 0, x2: 450, y2: 0, lineWidth: 0.5, color: '#000000' }
                      ],
                    }
                  ]
                }, {}, { text: '', alignment: 'center' }
              ],
              [{ text: '(ýurt, şäher, köçe, jaý №, öý №)', colSpan: 2, fontSize: 12, alignment: 'center', }, {}, {}],
              [
                {
                  colSpan: 3, fontSize: 14, alignment: 'left',
                  stack: [
                    {
                      fontSize: 14, alignment: 'left', margin: [0, 0, 0, 2],
                      text: [
                        { text: `8 Gelmeginiň makasady\t` },
                        { text: `${'Infrastruktura taslamalary müdirliginiň baş menejeriniň orunbasary-TKF'}`, italics: true, alignment: 'center', bold: true }
                      ]
                    },
                    {
                      canvas: [
                        { type: 'line', x1: 145, y1: 0, x2: 550, y2: 0, lineWidth: 0.5, color: '#000000' }
                      ],
                    }
                  ]
                }, {}, {}
              ],

              [
                {
                  colSpan: 3, fontSize: 14, alignment: 'left',
                  stack: [
                    {
                      fontSize: 14, alignment: 'left', margin: [0, 0, 0, 2],
                      text: [
                        { text: `9 Türkmenistanda bolýan ýeri\t` },
                        { text: `${'ş.Aşgabat "Ýyldyz" myhmanhanasy'}`, alignment: 'center', italics: true, bold: true }
                      ]
                    },
                    { canvas: [{ type: 'line', x1: 175, y1: 0, x2: 550, y2: 0, lineWidth: 0.5, color: '#000000' }] }
                  ]
                }, {}, {}
              ],

              [{}, { text: '(doly salgysy)', colSpan: 2, fontSize: 12, alignment: 'center' }, {}],

              [
                {
                  colSpan: 3, fontSize: 14, alignment: 'left',
                  stack: [
                    {
                      fontSize: 14, alignment: 'left',
                      margin: [0, 0, 0, 2],
                      text: [
                        { text: `${'10 Wizanyň derejesi, görnüşi we №\t\t'}`, },
                        { text: `${'BS, iki gezeklik-A1602025'}`, alignment: 'center', bold: true, italics: true, }
                      ],
                    },
                    { canvas: [{ type: 'line', x1: 205, y1: 0, x2: 550, y2: 0, lineWidth: 0.5, color: '#000000' }] }
                  ]
                }, {}, {}
              ],
              [
                { text: `11 Wizanyň berlen ýeri (ýurdy)`, fontSize: 14, alignment: 'left', margin: [0, 0, 0, 2] },
                {
                  colSpan: 2, fontSize: 14, alignment: 'left',
                  stack: [
                    { text: `${'Aşgabat şäher howa meňzilindäli MGP'}`, fontSize: 14, alignment: 'center', bold: true, italics: true, margin: [0, 0, 0, 2] },
                    { canvas: [{ type: 'line', x1: -5, y1: 0, x2: 362, y2: 0, lineWidth: 0.5, color: '#000000' }] }
                  ]
                }, {}
              ],
              [
                {
                  colSpan: 3, fontSize: 14, alignment: 'left',
                  stack: [
                    {
                      margin: [0, 0, 0, 2],
                      text: [
                        { text: `${'12 Wizanyň berlen senesi we möhleti\t'}`, },
                        {
                          text: `${'03.03.2025'}-de\t${'03.03.2025'}-den\t${'02.04.2025'}-çenli`,
                          bold: true, italics: true,
                        }
                      ],
                    },
                    { canvas: [{ type: 'line', x1: 215, y1: 0, x2: 550, y2: 0, lineWidth: 0.5, color: '#000000' }] }
                  ]
                }, {}, {}
              ],
              [
                {
                  fontSize: 14, alignment: 'left',
                  margin: [0, 0, 0, 2],
                  text: [
                    { text: `${'13 Giren wagty'}` },
                    { text: `\t${'03.03.2025'}\t`, decoration: 'underline', bold: true, italics: true }
                  ]
                },
                {
                  colSpan: 2, fontSize: 14, alignment: 'left',
                  stack: [
                    {
                      margin: [0, 0, 0, 2],
                      text: [
                        { text: `${'14 Giren ýeri'}` },
                        { text: `\t${'Aşgabat şäher howa meňzilindäli MGP fdvdfs sdfdgfsbsr sfgbdfg dfg '}`, alignment: 'center', bold: true, italics: true }
                      ]
                    },
                    { canvas: [{ type: 'line', x1: 80, y1: 0, x2: 362, y2: 0, lineWidth: 0.5, color: '#000000' }] }
                  ]
                }, {}
              ],

              [
                {
                  colSpan: 3, fontSize: 14, alignment: 'left',
                  stack: [
                    {
                      margin: [0, 0, 0, 2],
                      text: [
                        { text: `${'15 Kabul edýän edara ýa-da şahsyýet\t'}`, },
                        {
                          bold: true, italics: true, alignment: 'right',
                          text: `${'"Gap Inşaat Ýatyrym we Dyş Tijaret A.Ş"'}`, //Aşgabat ş. B.Türkmenistan şaýoly, jaý-538
                        }
                      ],
                    },
                    { canvas: [{ type: 'line', x1: 215, y1: 0, x2: 550, y2: 0, lineWidth: 0.5, color: '#000000' }] }
                  ]
                }, {}, {}
              ],
              [{}, { text: '(familiýasy, ady, doglan ýyly, öý salgysy)', colSpan: 2, fontSize: 12, alignment: 'center', }, {}],
              [
                {
                  colSpan: 3, fontSize: 14, alignment: 'center', bold: true, italics: true,
                  stack: [
                    { margin: [0, 2, 0, 2], text: `${'Aşgabat ş. B.Türkmenistan şaýoly, jaý-538'}` },
                    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 550, y2: 0, lineWidth: 0.5, color: '#000000' }] }
                  ]
                }, {}, {}
              ],
              [
                {
                  colSpan: 3, fontSize: 14, alignment: 'left',
                  stack: [
                    {
                      text: [
                        { text: 'Dolduran edara ' },
                        { text: `${'\t\tTDMG\t\t'}`, bold: true, italics: true, decoration: 'underline' },
                        { text: ' wagty\t' },
                        { text: `${'03.03.2025'}`, bold: true, italics: true, },
                      ],
                    },
                    { canvas: [{ type: 'line', x1: 230, y1: 0, x2: 550, y2: 0, lineWidth: 5, color: '#000000' }] }
                  ]
                }, {}, {}
              ],
              [
                {
                  colSpan: 3, fontSize: 14, alignment: 'left',
                  stack: [
                    { text: 'Barlan gözegçi' },
                    { canvas: [{ type: 'line', x1: 90, y1: 0, x2: 550, y2: 0, lineWidth: 5, color: '#000000' }] }
                  ]
                }, {}, {}
              ],
              [{ text: '(goly, familiýasy, ady)', colSpan: 3, fontSize: 12, alignment: 'center', }, {}, {}],
            ]
          },
          layout: {
            hLineWidth: (i, node) => 0,
            vLineWidth: (i, node) => 0
          }
        },
        { text: '\n\n\n' },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*'],
            body: [
              // 🔹 Заголовок
              [
                { text: 'Hasaba alan, möhletini uzaldan TDMG-nyň edarasy', alignment: 'center', style: 'tableHeader' },
                { text: 'Hasaba alyş, uzaldyş belgisi', alignment: 'center', style: 'tableHeader' },
                { text: 'Hasaba alnan,', alignment: 'center', style: 'tableHeader' },
                { text: 'Möhleti', alignment: 'center', style: 'tableHeader' },
                { text: 'Esas(belgisi we wagty)', alignment: 'center', style: 'tableHeader' },
                { text: 'Jogapkär işgäriň familiýasy we goly', alignment: 'center', style: 'tableHeader' },
              ],
              [
                { text: 'TDMG', alignment: 'center', bold: true, bold: true },
                { text: ' ', alignment: 'center', bold: true },
                { text: '03.03.2025', alignment: 'center', bold: true },
                { text: '02.04.2025', alignment: 'center', bold: true },
                { text: '03.03.2025 3/-185', alignment: 'center', bold: true },
                { text: ' ', alignment: 'center', bold: true }
              ],
              [
                { text: ' ', alignment: 'center' },
                { text: ' ', alignment: 'center' },
                { text: ' ', alignment: 'center' },
                { text: ' ', alignment: 'center' },
                { text: ' ', alignment: 'center' },
                { text: ' ', alignment: 'center' }
              ],
            ]
          },
        },
        { text: '\n' },
        {
          table: {
            widths: ['*', '*', '*'],
            body: [
              // 🔹 Заголовок
              [
                { text: 'Türkmenistanyň çäginde bolýan ýeriniň salgysy', alignment: 'center', },
                { text: 'Gelen, giden ýeri', alignment: 'center', },
                { text: 'Kabul edýän edara ýa-da şahsyýet', alignment: 'center', },
              ],
              [{ text: ' ', }, { text: ' ', }, { text: ' ', }],
              [{ text: ' ', }, { text: ' ', }, { text: ' ', }],
              [{ text: ' ', }, { text: ' ', }, { text: ' ', }],
            ]
          },
        },
        { text: '\n' },
        {
          table: {
            widths: ['*'],
            body: [[{ text: 'Hasapdan aýyrmak üçin esas' }]]
          }
        },
        { text: '\n' },
        {
          table: {
            widths: ['*', '*', '*', '*'],
            body: [
              // 🔹 Заголовок
              [
                { text: 'Başga bellikler', },
                { text: ' ', colSpan: 2 }, {},
                { text: ' ', },
              ],
              [
                { text: 'Pasportynyň möhleti', },
                { text: '20.05.2016', alignment: "center", bold: true },
                { text: '20.05.2026', alignment: "center", bold: true },
                { text: ' ' },
              ],
              [
                { text: 'Milleti', },
                { text: 'JPN', alignment: "center", bold: true, colSpan: 2 }, {},
                { text: 'Esasy we ýazgyň wagty', alignment: "center" },
              ],
            ]
          },
        }
      ]
    };

    pdfMake.createPdf(documentDefinition).getBlob((blob) => setPdfUrl(URL.createObjectURL(blob)));
  };

  return (
    <div>
      <button onClick={generatePdf} disabled={!base64Image}>BelligeAlmak</button>

      {pdfUrl && (
        <div style={{ height: "100vh", marginTop: "20px" }}>
          <iframe src={pdfUrl} width="100%" height="100%" title="PDF Viewer" />
        </div>
      )}
    </div>
  );
};

export default Profile;