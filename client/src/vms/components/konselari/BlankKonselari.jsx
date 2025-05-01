import React, { useState, useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import { vfs as customVfs } from "../../../vfs_fonts";
import logoGapinsaat from "../../../assets/logo_gapinsaat.png";
import logoCalikEnerjiFooter from "../../../assets/logoCalikEnerjiFooter.png";
import useBase64Image from "../../../hooks/useBase64Image";
import Utils from "../../../utils";
import {
  bold, alignment, italics, fontSize, pageSize, TimesNewRomanObject, PORTRAIT,
  COMPANY_DATA, leadingIndent, pageMarginsBlank, font, fontSizeBlankHeader
} from '../../../utils/constants';

// Font Style
pdfMake.vfs = customVfs;
pdfMake.fonts = TimesNewRomanObject;


const BlankKonselari = ({ ...props }) => {
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
            { image: base64Image, width: 150, height: 40, alignment: "left", },
            { text: COMPANY_DATA.linkName, link: COMPANY_DATA.link, alignment: "right", color: '#00246b', fontSize: 10, bold, }
          ],
        },
        { text: '\n\n\n\n\n' },
        { text: `Belgi:   ${'8/-517' || ''}`, fontSize: fontSizeBlankHeader, italics, bold },
        { text: `Sene:   ${'20.08.2020' || ''}`, fontSize: fontSizeBlankHeader, italics, bold },
        { text: '\n\n' },
        {
          columns: [
            { text: 'Adaty tertipde !', italics, fontSize: 10 },
            {
              // width: 250, margin: [100, 0, 0, 0],
              fontSize, bold, alignment: "right",
              text: `Türkmenhimiýa Döwlet\nKonserniniň başlygy\nD.I. Sapbaýew`,
            },
          ],
        },
        { columns: [{ text: `\nHormatly ${'Döwrangeldi'} ${'Işangulyýewiç'}!`, alignment, fontSize, bold }] },
        { text: '\n' },
        {
          leadingIndent, fontSize, alignment: 'justify',
          text: [
            { text: 'Türkmenistanyň Prezidentiniň 2014-nji ýylyň  16-nji awgustynda, ' },
            { text: `"${props.data.border} ${props.data.organization} gurmak hakynda" ` },
            { text: 'kabul eden 13811 belgili kararyna laýyklykda, "Türkmenhimiýa" döwlet konsernine ' },
            { text: 'Ýaponiýanyň "Mitsubushi Çorporation" we Türkiýäniň "GAP Inşaat Ýatyrym we Dyş Tijaret A. Ş" ' },
            { text: 'kompaniýalar konsorsiumy bilen Balkan welaýatynyň Garabogaz ' },
            { text: 'şäherinde ýyllyk kuwwaty 1155 müň tonna karbanid öndürýän zawody gurmak ' },
            { text: 'barada şertnama baglanyşmaga ygtyýar berildi.' },
          ]
        },
        {
          leadingIndent, fontSize, alignment: 'justify',
          text: [
            { text: 'Gurluşygyň bellenilen möhletde tamamlanmagy üçin hatymyza goşundyda görkezlen sanawdaky ' },
            { text: `1 (bir) sany daşary ýurt raýatyna 1 (bir) aý `, bold },
            { text: 'möhlet bilen ' },
            { text: `iki gezeklik çakylyk we iş rugsotnamasynyň resmileşdirilmegine `, bold },
            { text: `Aşgabat şäheri we Balkan welaýatynyň Türkmenbaşy etrabynyň Gyýanly obasynda hereket eder ýaly`, bold },
            { text: `ýardam etmegiňizi Sizden haýyş edýäris.` },
          ]
        },
        {
          leadingIndent, fontSize, alignment: 'justify',
          text: [
            { text: 'Daşary ýurt raýatynyň Türkmenistana gelmeginiň, onda bolmagynyň we ondan ' },
            { text: 'gitmeginiň düzgünlerini berjaý etmegine jogapkärçiligi kompaniýamyz öz üstüne alýar.' },
          ]
        },
        { text: '\n\n\n\n' },
        {
          columns: [
            { text: 'Sebit müdiriň orunbasary', alignment: "left", fontSize, bold },
            { text: `Recep AKÇI`, alignment, fontSize, bold },
          ],
        },

      ],
    };

    pdfMake.createPdf(documentDefinition).getBlob((blob) => setPdfUrl(URL.createObjectURL(blob)));
  };

  return (
    <>
      {
        pdfUrl && (
          <iframe title="PDF Viewer" type="application/pdf" className="iframeDocument" src={pdfUrl} />
        )
      }
    </>
  );
};

export default BlankKonselari;