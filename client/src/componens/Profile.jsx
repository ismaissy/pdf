import React, { useState, useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import { vfs as customVfs } from "../vfs_fonts";
import jpgImage from "../4.png";

pdfMake.vfs = customVfs;
pdfMake.fonts = {
  TimesNewRoman: {
    normal: "TIMES.TTF",
    bold: "TIMESBD.TTF",
    italics: "TIMESI.TTF",
    bolditalics: "TIMESBI.TTF",
  },
};

const Profile = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [profile, setProfile] = useState({
    firstName: "Hokuto",
    lastName: "HANDA",
    middleName: "",
    birthDay: "16.05.1967",
    bornCountry: "JPN, Tokyo/Ýaponiýa",
    citizenship: "JPN",
    passport: "TZ1132601, 20.50.2016 ý, 20.05.2026 ý.",
    studyOfCountry: "Ýokary, JPN, Keio Uniwersiteti",
    major: "Himiýa Inzenerligi",
    position: "Infrastruktura taslamalary müdirliginiň baş menejerniň orunbasary"
  });


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



  const generatePdf = () => {
    if (!base64Image) return;

    const documentDefinition = {
      pageSize: "A4",
      pageOrientation: "portrait",
      pageMargins: [40, 40, 40, 40],
      defaultStyle: { font: "TimesNewRoman" },
      footer: (currentPage) => ({ text: String(currentPage), alignment: "center", margin: [0, 10, 0, 0], fontSize: 10, }),

      background: (currentPage, pageSize) => {
        return {
          canvas: [
            {
              type: "rect",
              x: 15,
              y: 25,
              w: pageSize.width - 35,
              h: pageSize.height - 70,
              lineWidth: 1,
            },
          ],
        };
      },
      content: [
        { text: "ŞAHSY KAGYZY", fontSize: 18, bold: true, margin: [180, 0, 0, 0] },
        {
          canvas: [{ type: "rect", x: 0, y: 0, w: 90, h: 115, lineWidth: 1, dash: { length: 4 }, },],
          width: 90, height: 115, margin: [400, 0, 0, 0]
        },
        { text: "\n\n", fontSize: 14 },
        {
          fontSize: 13,
          table: {
            widths: [135, "*"],
            body: [
              [
                { text: "Familiýasy, ady, atasynyň ady", alignment: "left", noWrap: true },
                {
                  stack: [
                    {
                      text: `${profile?.firstName || ''} ${profile?.lastName || ''} ${profile?.middleName || ''}`,
                      alignment: "center", margin: [0, 5, 0, 2],
                    },
                    { canvas: [{ type: 'line', x1: 35, y1: 0, x2: 370, y2: 0, lineWidth: 0.5, }] },
                  ],
                },
              ],
              [
                { text: "Doglan senesi we ýeri", alignment: "left", noWrap: true },
                {
                  stack: [
                    {
                      text: `${profile.birthDay} ${profile.bornCountry}`, alignment: "center", margin: [0, 0, 0, 2]
                    },
                    {
                      canvas: [{ type: 'line', x1: -7, y1: 0, x2: 370, y2: 0, lineWidth: 0.5, }],
                    },
                  ],
                },
              ],
              [
                { text: "Raýatlygy", alignment: "left", noWrap: true },
                {
                  stack: [
                    { text: `${profile.citizenship}`, alignment: "center", margin: [0, 0, 0, 2] },
                    {
                      canvas: [{ type: 'line', x1: -70, y1: 0, x2: 370, y2: 0, lineWidth: 0.5 }],
                    },
                  ],
                },
              ],
              [
                { text: "Pasportyň belgisi, berlen senesi we möhleti", alignment: "left", },
                {
                  stack: [
                    {
                      text: `${profile.passport}`,
                      alignment: "center",
                      margin: [0, 10, 0, 2],
                    },
                    {
                      canvas: [
                        {
                          type: 'line',
                          x1: -15, y1: 0,
                          x2: 370, y2: 0,
                          lineWidth: 0.5,
                        },
                      ],
                    },
                  ],
                },
              ],
              [
                { text: "Şahsy belgisi", alignment: "left", noWrap: true },
                {
                  stack: [
                    {
                      text: ` `,
                      alignment: "center",
                      margin: [0, 0, 0, 2],
                    },
                    {
                      canvas: [
                        {
                          type: 'line',
                          x1: -60, y1: 0,
                          x2: 370, y2: 0,
                          lineWidth: 0.5,
                        },
                      ],
                    },
                  ],
                },
              ],
              [
                { text: "Bilimi, okan ýeri", alignment: "left", noWrap: true },
                {
                  stack: [
                    {
                      text: `${profile.studyOfCountry}`,
                      alignment: "center",
                      margin: [0, 0, 0, 2],
                    },
                    {
                      canvas: [
                        {
                          type: 'line',
                          x1: -40, y1: 0,
                          x2: 370, y2: 0,
                          lineWidth: 0.5,
                        },
                      ],
                    },
                  ],
                },
              ],
              [
                { text: "Hünäri", alignment: "left", noWrap: true },
                {
                  stack: [
                    {
                      text: `${profile.major}`,
                      alignment: "center",
                      margin: [0, 0, 0, 2],
                    },
                    {
                      canvas: [
                        {
                          type: 'line',
                          x1: -100, y1: 0,
                          x2: 370, y2: 0,
                          lineWidth: 0.5,
                        },
                      ],
                    },
                  ],
                },
              ],
              [
                { text: "Wezipesi", alignment: "left" },
                {
                  stack: [
                    {
                      text: `${profile.position}`,
                      alignment: "center",
                      margin: [0, 0, 0, 2],
                    },
                    {
                      canvas: [
                        {
                          type: 'line',
                          x1: -90, y1: 0,
                          x2: 370, y2: 0,
                          lineWidth: 0.5,
                        },
                      ],
                    },
                  ],
                },
              ],
              [
                { text: "Türkmenistanda öňki işlän ýerleri:", alignment: "left" },
                {
                  stack: [
                    {
                      text: `vdfsvdfvs  dfv  sdfjklvvnd fvsdfvjndfsvn dfsajvk qaerw gearui SHdh`,
                      alignment: "center",
                      margin: [0, 5, 0, 2],
                    },
                    {
                      canvas: [
                        {
                          type: 'line',
                          x1: -20, y1: 0,
                          x2: 370, y2: 0,
                          lineWidth: 0.5,
                        },
                      ],
                    },
                  ],
                },
              ],
              [
                { text: "Maşgala ýagdaýy", alignment: "left", noWrap: true },
                {
                  stack: [
                    {
                      text: `Aýaly-Takae Handa-30.07.1965 (JPN)`,
                      alignment: "center",
                      margin: [0, 0, 0, 2],
                    },
                    {
                      canvas: [
                        {
                          type: 'line',
                          x1: -40, y1: 0,
                          x2: 370, y2: 0,
                          lineWidth: 0.5,
                        },
                      ],
                    },
                  ],
                },
              ],
              [
                { text: "Daşary ýurtdaky ýaşaýan anyk salgysy", alignment: "left" },
                {
                  stack: [
                    { text: `JPN, 4-11-1 Kaminoge Setagaya-ku, Tokyo, Japan`, alignment: "center", margin: [0, 5, 0, 2], },
                    {
                      canvas: [{ type: 'line', x1: -20, y1: 0, x2: 370, y2: 0, lineWidth: 0.5, }]
                    },
                  ],
                },
              ],
              [
                {
                  text: "Daşary ýurt raýaylary barada galp maglumatlary görkezilýan ýagdaýynda Türkmenistanyň kanunçylygyna laýyklykda doly jogapkärçiligi çekýarin.",
                  colSpan: 2, alignment: "justify",
                }, {}
              ],
              [{ text: "\n\nYgtyýarly adam.", colSpan: 2, alignment: "left", }, {}],
            ],
          },
          layout: {
            hLineWidth: () => 0,
            vLineWidth: () => 0,
            paddingLeft: () => 5,
            paddingRight: () => 5,
            paddingTop: () => 5,
            paddingBottom: () => 5,
          }
        },
        {
          fontSize: 12,
          table: {
            widths: ["*", "*"],
            body: [
              [
                { text: `\n"_____"_______________20_______ý`, alignment: "left" },
                { text: `M.Ý____________________`, alignment: "right" },
              ],
              [
                { text: "goly", colSpan: 2, alignment: "right", margin: [0, -20, 50, 0], }, {}
              ],
            ],
          },
          layout: {
            hLineWidth: () => 0,
            vLineWidth: () => 0,
            paddingLeft: () => 5,
            paddingRight: () => 5,
            paddingTop: () => 5,
            paddingBottom: () => 5,
          }
        },
      ],
    };

    pdfMake.createPdf(documentDefinition).getBlob((blob) => setPdfUrl(URL.createObjectURL(blob)));
  };

  return (
    <div>
      <button onClick={generatePdf} disabled={!base64Image}>Profile PDF</button>

      {pdfUrl && (
        <div style={{ height: "100vh", marginTop: "20px" }}>
          <iframe src={pdfUrl} width="100%" height="100%" title="PDF Viewer" />
        </div>
      )}
    </div>
  );
};

export default Profile;