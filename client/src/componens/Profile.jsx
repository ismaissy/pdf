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
            { type: "rect", x: 15, y: 25, w: pageSize.width - 35, h: pageSize.height - 70, lineWidth: 1, },
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
                      text: `${props.profile?.firstName || ''} ${props.profile?.lastName || ''} ${props.profile?.middleName || ''}`,
                      alignment: "center", margin: [0, 5, 0, 2],
                    },
                    { canvas: [Utils.canvasDto('line', 35, 0, 370, 0, 0.5)] },
                  ],
                },
              ],
              [
                { text: "Doglan senesi we ýeri", alignment: "left", noWrap: true },
                {
                  stack: [
                    { text: `${props.profile.birthDay} ${props.profile.bornCountry}`, alignment: "center", margin: [0, 0, 0, 2] },
                    { canvas: [Utils.canvasDto('line', -7, 0, 370, 0, 0.5)] },
                  ],
                },
              ],
              [
                { text: "Raýatlygy", alignment: "left", noWrap: true },
                {
                  stack: [
                    { text: `${props.profile.citizenship}`, alignment: "center", margin: [0, 0, 0, 2] },
                    { canvas: [Utils.canvasDto('line', -70, 0, 370, 0, 0.5)] },
                  ],
                },
              ],
              [
                { text: "Pasportyň belgisi, berlen senesi we möhleti", alignment: "left", },
                {
                  stack: [
                    { text: `${props.profile.passport}`, alignment: "center", margin: [0, 10, 0, 2] },
                    { canvas: [Utils.canvasDto('line', -15, 0, 370, 0, 0.5)] },
                  ],
                },
              ],
              [
                { text: "Şahsy belgisi", alignment: "left", noWrap: true },
                {
                  stack: [
                    { text: ` `, alignment: "center", margin: [0, 0, 0, 2] },
                    { canvas: [Utils.canvasDto('line', -60, 0, 370, 0, 0.5)] },
                  ],
                },
              ],
              [
                { text: "Bilimi, okan ýeri", alignment: "left", noWrap: true },
                {
                  stack: [
                    { text: `${props.profile.studyOfCountry}`, alignment: "center", margin: [0, 0, 0, 2] },
                    { canvas: [Utils.canvasDto('line', -40, 0, 370, 0, 0.5)] },
                  ],
                },
              ],
              [
                { text: "Hünäri", alignment: "left", noWrap: true },
                {
                  stack: [
                    { text: `${props.profile.major}`, alignment: "center", margin: [0, 0, 0, 2], },
                    { canvas: [Utils.canvasDto('line', -100, 0, 370, 0, 0.5)] },
                  ],
                },
              ],
              [
                { text: "Wezipesi", alignment: "left" },
                {
                  stack: [
                    { text: `${props.profile.position}`, alignment: "center", margin: [0, 0, 0, 2], },
                    { canvas: [Utils.canvasDto('line', -90, 0, 370, 0, 0.5)] },
                  ],
                },
              ],
              [
                { text: "Türkmenistanda öňki işlän ýerleri:", alignment: "left" },
                {
                  stack: [
                    { text: `vdfsvdfvs  dfv  sdfjklvvnd fvsdfvjndfsvn dfsajvk qaerw gearui SHdh`, alignment: "center", margin: [0, 5, 0, 2], },
                    { canvas: [Utils.canvasDto('line', -20, 0, 370, 0, 0.5)] },
                  ],
                },
              ],
              [
                { text: "Maşgala ýagdaýy", alignment: "left", noWrap: true },
                {
                  stack: [
                    { text: `Aýaly-Takae Handa-30.07.1965 (JPN)`, alignment: "center", margin: [0, 0, 0, 2], },
                    { canvas: [Utils.canvasDto('line', -40, 0, 370, 0, 0.5)] },
                  ],
                },
              ],
              [
                { text: "Daşary ýurtdaky ýaşaýan anyk salgysy", alignment: "left" },
                {
                  stack: [
                    { text: `JPN, 4-11-1 Kaminoge Setagaya-ku, Tokyo, Japan`, alignment: "center", margin: [0, 5, 0, 2], },
                    { canvas: [Utils.canvasDto('line', -20, 0, 370, 0, 0.5)] },
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
      <button onClick={generatePdf} disabled={!base64Image}>Profile</button>

      {pdfUrl && (
        <div style={{ height: "100vh", marginTop: "20px" }}>
          <iframe src={pdfUrl} width="100%" height="100%" title="PDF Viewer" />
        </div>
      )}
    </div>
  );
};

export default Profile;