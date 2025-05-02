import React, { useState, useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import { vfs as customVfs } from "../../../vfs_fonts";
import logoGapinsaat from "../../../assets/logo_gapinsaat.png";
import logoCalikEnerjiFooter from "../../../assets/logoCalikEnerjiFooter.png";
import useBase64Image from "../../../hooks/useBase64Image";
import Utils from "../../../utils";
import {
  bold, alignment, italics, fontSize, pageSize, TimesNewRomanObject, COMPANY_POLICY_RESPONSIBILITY,
  COMPANY_DATA, leadingIndent, pageMarginsBlank, font, fontSizeBlankHeader
} from '../../../utils/constants'
import PreviewDocWrapper from "../../PreviewDoc";

// Font Style
pdfMake.vfs = customVfs;
pdfMake.fonts = TimesNewRomanObject;

const BlankWizaRugsotnamaYatyrmak = ({ ...props }) => {
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
      pageOrientation: "portrait",
      defaultStyle: { font },
      pageMargins: pageMarginsBlank,
      footer: Utils.createFooter(base64LogoFooter),
      info: Utils.documentProperties('Wiza Rugsotnama Ýatyrmak', COMPANY_DATA.name),
      content: [
        {
          columns: [
            { image: base64Image, width: 150, height: 40, alignment: "left", },
            { text: COMPANY_DATA.linkName, link: COMPANY_DATA.link, alignment: "right", color: '#00246b', fontSize: 10, bold }
          ],
        },
        { text: '\n\n\n\n\n' },
        { text: `Belgi:   ${'4/-198' || ''}`, fontSize: fontSizeBlankHeader, italics, bold },
        { text: `Sene:   ${'11.04.2024' || ''}`, fontSize: fontSizeBlankHeader, italics, bold },
        { text: '\n\n' },
        {
          columns: [
            { text: `${'Adaty tertipde!'}`, fontSize: 10, italics, },
            { text: `${'Türkmenistanyň Döwlet migrasiýa gullugynyň başlygyna'}`, fontSize, bold, width: 230 },
          ],
        },
        { text: '\n\n' },
        {
          leadingIndent, fontSize, alignment: 'justify',
          text: [
            { text: 'Türkmenistanyň Prezidentiniň kararyna laýyklykda Türkmenistanyň dürli ' },
            { text: 'pudaklarynda gurluşyk işlerini amala aşyrýan ' },
            { text: `${'Türkiýäniň'} "«${'GAP Inşaat Yatirim we Diş Ticaret A. Ş.'}»" firmasy sanawdaky ` },
            { text: `${1} (${'bir'}) sany daşary ýurt raýatynyň wizasyny we `, bold },
            { text: `${1} (${'bir'}) sany işlemek üçin rugsatnamasyny ýatyrmagyňyzy `, bold },
            { text: 'Sizden haýyş edýäris.' },
          ]
        },
        { text: '\n' },
        COMPANY_POLICY_RESPONSIBILITY,
        { text: '\n\n\n\n' },
        {
          fontSize, bold,
          columns: [
            { text: 'Sebit müdiriň orunbasary', alignment: "left" },
            { text: `Recep AKÇI`, alignment },
          ],
        },
      ]
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

export default BlankWizaRugsotnamaYatyrmak;