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

const BlankTaslamanynKepilligi = ({ ...props }) => {
  const [pdfUrl, setPdfUrl] = useState(null);

  const base64Image = useBase64Image(logoGapinsaat);
  const base64LogoFooter = useBase64Image(logoCalikEnerjiFooter);

  useEffect(() => {
    if (base64Image && base64LogoFooter) {
      generatePdf();
    }
  }, [base64Image, base64LogoFooter]);


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
        { text: '\n\n\n\n' },
        { text: `Belgi:   ${'9/-148' || ''}`, fontSize: fontSizeBlankHeader, italics, bold },
        { text: `Sene:   ${'23.09.2021' || ''}`, fontSize: fontSizeBlankHeader, italics, bold },
        { text: '\n\n' },
        {
          columns: [
            { text: `Gyssagly tertipde?`, italics, alignment: "left", fontSize: 12 },
            { text: ' ' },
            { text: `Türkmenistanyň Döwlet\nKonserniniň başlygy\nN.M.Nyýazlyýew`, alignment: "center", fontSize, bold }
          ],
        },
        { text: '\n' },
        { text: `Hormatly ${'Nyýazly Myradowiç'}!`, bold, alignment: "center", fontSize: fontSizeBlankHeader, },
        { text: '\n' },
        {
          leadingIndent, fontSize, alignment: 'justify',
          text: [
            { text: 'Türkmenistanyň Prezidentiniň 2014-nji ýylyň 16-nji awgustynda ' },
            { text: '"Balkan welaýatynyň garabogaz şäherinde karbamid öndürýan zawodyny gurmak hakynda" ' },
            { text: `kabul eden 13811 belgili kararyna laýyklykda, "Türkmenhimiýa" döwlet konsernine Ýaponiýanyň ` },
            { text: `"Mitsubishi Corporation" we Türkiýaniň "GAP Inşaat Ýatyrym we Dyş Tijaret A. Ş" ` },
            { text: `kompaniýalar konsorsiumy bilen Balkan welaýatynyň Garabogaz şäherinde ýyllyk kuwwaty ` },
            { text: `1155 müň tonna karbamid öndürýan zawody gurmak barada şertnama baglanyşmaga ygtyýar berildi.` },
          ]
        },
        {
          leadingIndent, fontSize, alignment: 'justify',
          text: [
            { text: 'Taslamanyň kepillik möleti döwründe işlemek maksady bilen goşundyda görkezilen sanawdaky ' },
            { text: `${'11 (on bir) sany daşary ýurt raýatlarynyň wizalarny tamamlanýanlygyna garamazdan, '} `, bold },
            { text: `"Garabogazkarbamid" zawodynyň nobatdaky profilaktiki ideg işlerini doly we ` },
            { text: `dogry ýerine ýetirmek we täzeden ulanyşa  goýberilende soň ýüze çykan näsazlyklary gysga ` },
            { text: `wagtyň içinde aradan aýryp, zawodyň üznüksiz işini ýola goýmak üçin zerur hünarmenler ` },
            { text: `bolandyklaryny göz öňünde tutup, hünärmenlerimiziň wizalarnyň tamamlanýanlygy sebäpli, ` },
            { text: `${'30 günlik çykyş wizasyny hem-de Balkan welaýatynyň Garabogaz şäherinde hereket eder ýaly serhet ýaka wiza resmileşdirilmegine '} `, bold },
            { text: `${'ýardam etmegiňizi Sizden haýyş edýäris. '} `, bold },
          ]
        },
        { text: '\n' },
        COMPANY_POLICY_RESPONSIBILITY,
        { text: '\n\n' },
        { text: 'Hormatlamak bilen,', fontSize, bold, alignment: 'left' },
        { text: '\n' },
        {
          columns: [
            { text: 'Sebit müdiri', alignment, fontSize, bold, },
            { text: '' }, { text: '' },
            { text: `Ömer AYDIN`, alignment: 'left', fontSize, bold, }
          ],
        },
      ],
    };

    pdfMake.createPdf(documentDefinition).getBlob((blob) => setPdfUrl(URL.createObjectURL(blob)));
  };


  return (
    <PreviewDocWrapper title='Taslamanyň Kepilligi'>
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

export default BlankTaslamanynKepilligi;