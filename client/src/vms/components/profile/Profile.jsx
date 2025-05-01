import React, { useState, useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import { vfs as customVfs } from "../../../vfs_fonts";
import Utils from "../../../utils";
import { bold, alignment, pageSize, TimesNewRomanObject, font, noWrap } from '../../../utils/constants'

pdfMake.vfs = customVfs;
pdfMake.fonts = TimesNewRomanObject;

const Profile = ({ ...props }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  useEffect(() => generatePdf(), []);

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
      pageMargins: [40, 40, 40, 40],
      defaultStyle: { font },
      footer: (currentPage) => ({ text: String(currentPage), alignment, margin: [0, 10, 0, 0], fontSize: 10, }),
      background: (currentPage, pageSize) => {
        return {
          canvas: [
            {
              type: "rect", x: 15, y: 25,
              w: pageSize.width - 35,
              h: pageSize.height - 70,
              lineWidth: 1,
            },
          ],
        };
      },
      content: [
        { text: "ŞAHSY KAGYZY", fontSize: 16, bold, margin: [180, 0, 0, 0] },
        {
          canvas: [{
            type: "rect",
            x: 0, y: 0, w: 90, h: 115,
            lineWidth: 1,
            dash: { length: 4 },
          }],
          width: 90, height: 115, margin: [400, 0, 0, 0]
        },
        { text: "\n\n" },
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
            widths: [135, "*"],
            body: [
              [
                { text: "Familiýasy, ady, atasynyň ady", alignment: "left", noWrap },
                {
                  stack: [
                    {
                      text: `${props.data?.firstName || ''} ${props.data?.lastName || ''} ${props.data?.middleName || ''}`,
                      alignment, margin: [0, 5, 0, 2],
                    },
                    { canvas: [Utils.canvasDto('line', 35, 0, 370, 0, 0.5)] },
                  ],
                },
              ],
              [
                { text: "Doglan senesi we ýeri", alignment: "left", noWrap },
                {
                  stack: [
                    { text: `${props.data.birthDay} ${props.data.bornCountry}`, alignment, margin: [0, 0, 0, 2] },
                    { canvas: [Utils.canvasDto('line', -7, 0, 370, 0, 0.5)] },
                  ],
                },
              ],
              [
                { text: "Raýatlygy", alignment: "left", noWrap },
                {
                  stack: [
                    { text: `${props.data.citizenship}`, alignment, margin: [0, 0, 0, 2] },
                    { canvas: [Utils.canvasDto('line', -70, 0, 370, 0, 0.5)] },
                  ],
                },
              ],
              [
                { text: "Pasportyň belgisi, berlen senesi we möhleti", alignment: "left", },
                {
                  stack: [
                    { text: `${props.data.passport}`, alignment, margin: [0, 10, 0, 2] },
                    { canvas: [Utils.canvasDto('line', -15, 0, 370, 0, 0.5)] },
                  ],
                },
              ],
              [
                { text: "Şahsy belgisi", alignment: "left", noWrap },
                {
                  stack: [
                    { text: ` `, alignment, margin: [0, 0, 0, 2] },
                    { canvas: [Utils.canvasDto('line', -60, 0, 370, 0, 0.5)] },
                  ],
                },
              ],
              [
                { text: "Bilimi, okan ýeri", alignment: "left", noWrap },
                {
                  stack: [
                    { text: `${props.data.studyOfCountry}`, alignment, margin: [0, 0, 0, 2] },
                    { canvas: [Utils.canvasDto('line', -40, 0, 370, 0, 0.5)] },
                  ],
                },
              ],
              [
                { text: "Hünäri", alignment: "left", noWrap },
                {
                  stack: [
                    { text: `${props.data.major}`, alignment, margin: [0, 0, 0, 2], },
                    { canvas: [Utils.canvasDto('line', -100, 0, 370, 0, 0.5)] },
                  ],
                },
              ],
              [
                { text: "Wezipesi", alignment: "left" },
                {
                  stack: [
                    { text: `${props.data.position}`, alignment, margin: [0, 0, 0, 2], },
                    { canvas: [Utils.canvasDto('line', -90, 0, 370, 0, 0.5)] },
                  ],
                },
              ],
              [
                { text: "Türkmenistanda öňki işlän ýerleri:", alignment: "left" },
                {
                  stack: [
                    { text: `vdfsvdfvs  dfv  sdfjklvvnd fvsdfvjndfsvn dfsajvk qaerw gearui SHdh`, alignment, margin: [0, 5, 0, 2], },
                    { canvas: [Utils.canvasDto('line', -20, 0, 370, 0, 0.5)] },
                  ],
                },
              ],
              [
                { text: "Maşgala ýagdaýy", alignment: "left", noWrap },
                {
                  stack: [
                    { text: `Aýaly-Takae Handa-30.07.1965 (JPN)`, alignment, margin: [0, 0, 0, 2], },
                    { canvas: [Utils.canvasDto('line', -40, 0, 370, 0, 0.5)] },
                  ],
                },
              ],
              [
                { text: "Daşary ýurtdaky ýaşaýan anyk salgysy", alignment: "left" },
                {
                  stack: [
                    { text: `JPN, 4-11-1 Kaminoge Setagaya-ku, Tokyo, Japan`, alignment, margin: [0, 5, 0, 2], },
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
          }
        },
        {
          fontSize: 12,
          layout: {
            hLineWidth: () => 0,
            vLineWidth: () => 0,
            paddingLeft: () => 5,
            paddingRight: () => 5,
            paddingTop: () => 5,
            paddingBottom: () => 5,
          },
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

  return (<>
    {
      pdfUrl && (
        <iframe title="PDF Viewer" type="application/pdf" className="iframeDocument" src={pdfUrl} />
      )
    }
  </>);
};

export default Profile;