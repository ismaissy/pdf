import React, { useState, useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import { vfs as customVfs } from "../vfs_fonts";

import flagTKM from "./assets/svg/ic_flag_tm.svg";

import jpgImage from "./4.png";

pdfMake.vfs = customVfs;

pdfMake.fonts = {
  TimesNewRoman: {
    normal: "TIMES.TTF",
    bold: "TIMESBD.TTF",
    italics: "TIMESI.TTF",
    bolditalics: "TIMESBI.TTF",
  },
};

const PdfPage = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  useEffect(() => {
    // Конвертируем jpg в base64 при загрузке компонента
    const toBase64 = async () => {
      const response = await fetch(jpgImage);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => setBase64Image(reader.result);
      reader.readAsDataURL(blob);
    };

    toBase64();
  }, []);

  const name = "Ivanjan";
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

  // const content = [
  //     // {
  //     //     qr: 'https://alemtilsimat.com/',
  //     //     foreground: '#00008B',
  //     //     background: '#F5F5F5',
  //     //     fit: 150,
  //     //     eccLevel: 'H'
  //     // },
  //     {
  //         text: 'Alem Tilsimat',
  //         color: 'blue',
  //         link: 'https://alemtilsimat.com/'
  //     },
  //     {
  //         columns: [
  //             {
  //                 width: 150,
  //                 alignment: 'center', // можно left / right / center
  //                 margin: [0, 0, 0, 20], // отступы [left, top, right, bottom]
  //                 svg: `<svg width="800px" height="800px" fill="none" viewBox="0 -4 28 28" xmlns="http://www.w3.org/2000/svg">
  //                                 <g clip-path="url(#f)">
  //                                 <rect width="28" height="20" rx="2" fill="#fff"/>
  //                                 <mask id="e" x="0" y="0" width="28" height="20" style="mask-type:alpha" maskUnits="userSpaceOnUse">
  //                                 <rect width="28" height="20" rx="2" fill="#fff"/>
  //                                 </mask>
  //                                 <g mask="url(#e)">
  //                                 <path d="M0 20H28V0H0V20Z" clip-rule="evenodd" fill="#30C375" fill-rule="evenodd"/>
  //                                 <rect x="4" width="4" height="20" fill="#DE414F"/>
  //                                 <path d="m6 4c1.1046 0 2-0.59695 2-1.3333s-0.89543-1.3333-2-1.3333-2 0.59695-2 1.3333 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
  //                                 <mask id="d" x="4" y="1" width="4" height="3" style="mask-type:alpha" maskUnits="userSpaceOnUse">
  //                                 <path d="m6 4c1.1046 0 2-0.59695 2-1.3333s-0.89543-1.3333-2-1.3333-2 0.59695-2 1.3333 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
  //                                 </mask>
  //                                 <g mask="url(#d)">
  //                                 <path d="m6.0002 3.3334c0.36819 0 0.66667-0.29848 0.66667-0.66667s-0.29848-0.66666-0.66667-0.66666-0.66666 0.29847-0.66666 0.66666 0.29847 0.66667 0.66666 0.66667z" clip-rule="evenodd" fill="#DD404F" fill-rule="evenodd"/>
  //                                 <rect x="4" y="1.3333" width="2" height="1.3333" fill="#FBAF29"/>
  //                                 <rect x="6" y="2.6667" width="2" height="1.3333" fill="#FBAF29"/>
  //                                 </g>
  //                                 <path d="m6 18.667c1.1046 0 2-0.597 2-1.3334 0-0.7363-0.89543-1.3333-2-1.3333s-2 0.597-2 1.3333c0 0.7364 0.89543 1.3334 2 1.3334z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
  //                                 <mask id="c" x="4" y="16" width="4" height="3" style="mask-type:alpha" maskUnits="userSpaceOnUse">
  //                                 <path d="m6 18.667c1.1046 0 2-0.597 2-1.3334 0-0.7363-0.89543-1.3333-2-1.3333s-2 0.597-2 1.3333c0 0.7364 0.89543 1.3334 2 1.3334z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
  //                                 </mask>
  //                                 <g mask="url(#c)">
  //                                 <path d="m6.0002 18c0.36819 0 0.66667-0.2985 0.66667-0.6666 0-0.3682-0.29848-0.6667-0.66667-0.6667s-0.66666 0.2985-0.66666 0.6667c0 0.3681 0.29847 0.6666 0.66666 0.6666z" clip-rule="evenodd" fill="#DD404F" fill-rule="evenodd"/>
  //                                 <rect x="4" y="16" width="2" height="1.3333" fill="#FBAF29"/>
  //                                 <rect x="6" y="17.333" width="2" height="1.3333" fill="#FBAF29"/>
  //                                 </g>
  //                                 <path d="m6 12c1.1046 0 2-0.597 2-1.3333 0-0.73642-0.89543-1.3334-2-1.3334s-2 0.59695-2 1.3334c0 0.7363 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#28AE67" fill-rule="evenodd"/>
  //                                 <mask id="b" x="4" y="9" width="4" height="3" style="mask-type:alpha" maskUnits="userSpaceOnUse">
  //                                 <path d="m6 12c1.1046 0 2-0.597 2-1.3333 0-0.73642-0.89543-1.3334-2-1.3334s-2 0.59695-2 1.3334c0 0.7363 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
  //                                 </mask>
  //                                 <g mask="url(#b)">
  //                                 <path d="m5.9998 11.333c0.73638 0 1.3333-0.2984 1.3333-0.6666s-0.59695-0.6667-1.3333-0.6667-1.3333 0.2985-1.3333 0.6667 0.59696 0.6666 1.3333 0.6666z" clip-rule="evenodd" fill="#DD404F" fill-rule="evenodd"/>
  //                                 </g>
  //                                 <path d="m6 14.667c1.1046 0 2-0.2985 2-0.6667s-0.89543-0.6667-2-0.6667-2 0.2985-2 0.6667 0.89543 0.6667 2 0.6667z" clip-rule="evenodd" fill="#28AE67" fill-rule="evenodd"/>
  //                                 <mask x="4" y="13" width="4" height="2" style="mask-type:alpha" maskUnits="userSpaceOnUse">
  //                                 <path d="m6 14.667c1.1046 0 2-0.2985 2-0.6667s-0.89543-0.6667-2-0.6667-2 0.2985-2 0.6667 0.89543 0.6667 2 0.6667z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
  //                                 </mask>
  //                                 <path d="m6 8c1.1046 0 2-0.59695 2-1.3333s-0.89543-1.3333-2-1.3333-2 0.59695-2 1.3333 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#FBAF29" fill-rule="evenodd"/>
  //                                 <mask id="a" x="4" y="5" width="4" height="3" style="mask-type:alpha" maskUnits="userSpaceOnUse">
  //                                 <path d="m6 8c1.1046 0 2-0.59695 2-1.3333s-0.89543-1.3333-2-1.3333-2 0.59695-2 1.3333 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
  //                                 </mask>
  //                                 <g mask="url(#a)">
  //                                 <path d="m6.0002 7.3334c0.36819 0 0.66667-0.29848 0.66667-0.66667s-0.29848-0.66666-0.66667-0.66666-0.66666 0.29847-0.66666 0.66666 0.29847 0.66667 0.66666 0.66667z" clip-rule="evenodd" fill="#DD404F" fill-rule="evenodd"/>
  //                                 <rect x="4" y="5.3333" width="1.3333" height="2.6667" fill="#28AE67"/>
  //                                 <rect x="6.6665" y="5.3333" width="1.3333" height="2.6667" fill="#28AE67"/>
  //                                 </g>
  //                                 <path d="m14.822 4.2382c-0.2367 0.28205-0.1999 0.70255 0.0822 0.93922 0.282 0.23667 0.7025 0.19988 0.9392-0.08217s0.1999-0.70256-0.0822-0.93922c-0.282-0.23667-0.7025-0.19988-0.9392 0.08217zm-1.7273 2.5845c-0.282-0.23666-0.7025-0.19988-0.9392 0.08217s-0.1999 0.70256 0.0822 0.93923c0.282 0.23666 0.7025 0.19987 0.9392-0.08218 0.2366-0.28205 0.1999-0.70255-0.0822-0.93922zm-1.3335-1.3333c-0.282-0.23667-0.7025-0.19988-0.9392 0.08217s-0.1999 0.70255 0.0822 0.93922c0.282 0.23667 0.7025 0.19988 0.9392-0.08217s0.1999-0.70255-0.0822-0.93922zm2.6665-2.6667c-0.282-0.23666-0.7025-0.19988-0.9392 0.08217s-0.1999 0.70256 0.0822 0.93923c0.282 0.23666 0.7025 0.19987 0.9392-0.08218s0.1999-0.70255-0.0822-0.93922zm-0.6665 2c-0.282-0.23666-0.7025-0.19988-0.9392 0.08217s-0.1999 0.70256 0.0822 0.93923c0.282 0.23666 0.7025 0.19987 0.9392-0.08218s0.1999-0.70255-0.0822-0.93922z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
  //                                 <path d="m17.476 9.4505c-1.588 1.5881-4.1628 1.5881-5.7508 0-0.1539-0.15387-0.2928-0.31702-0.4169-0.48763 1.5901 1.1562 3.829 1.0173 5.2632-0.4169s1.5731-3.6731 0.4169-5.2632c0.1706 0.12405 0.3338 0.26302 0.4876 0.4169 1.5881 1.588 1.5881 4.1628 0 5.7508z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
  //                                 </g>
  //                                 </g>
  //                                 <defs>
  //                                 <clipPath id="f">
  //                                 <rect width="28" height="20" rx="2" fill="#fff"/>
  //                                 </clipPath>
  //                                 </defs>
  //                                 </svg>`
  //             },
  //             { text: '  ', fontSize: 18 },
  //             {
  //                 width: 150,
  //                 alignment: 'center', // можно left / right / center
  //                 margin: [0, 20, 0, 20],// отступы[left, top, right, bottom]
  //                 image: base64Image,
  //             },
  //         ]
  //     },

  //     'paragraph 1',
  //     'paragraph 2',
  //     {
  //         columns: [
  //             'first column is a simple text',
  //             {
  //                 stack: [
  //                     // second column consists of paragraphs
  //                     'paragraph A',
  //                     'paragraph B',
  //                     'these paragraphs will be rendered one below another inside the column'
  //                 ],
  //                 fontSize: 15
  //             }
  //         ]
  //     },
  //     {
  //         leadingIndent: 20,// 👈 отступ только у первой строки
  //         text: [
  //             { text: `Пример документа с рамками, `, fontSize: 18 },
  //             { text: 'Продолжение ', fontSize: 18 },
  //             { text: 'Продолжение ', fontSize: 18 },
  //             { text: 'Продолжение ', fontSize: 18 },
  //             { text: 'Продолжение ', fontSize: 18 },
  //             { text: 'Продолжение ', fontSize: 18 },
  //             { text: 'Продолжение ', fontSize: 18 },
  //             { text: 'Продолжение ', fontSize: 18 },
  //             { text: 'Продолжение ', fontSize: 18 },
  //         ]
  //     },
  //     {
  //         text: 'Пример документа с рамками,',
  //         fontSize: 18,
  //     },
  //     {
  //         text: 'Продолжение',
  //         fontSize: 18,
  //         // margin: [10, 0, 0, 0]
  //     },
  //     {
  //         table: {
  //             // widths: ['auto', 'auto', 'auto'], //
  //             widths: ['*', '*', '*'], //
  //             body: [
  //                 ['Имя', 'Фамилия', 'Возраст vervijerom erjv ewrviuewrhv'],
  //                 ['Иван wvkasdk ', 'Иванов saivfoadfsjo sdfjnvdsjfk vsdkfjlnvvndsfnjkvlvl', 30],
  //                 ['Петр asdvnm ', 'Петров', 25],
  //                 ['Иванkm salkvjndsa asjndvj', 'Иванов', 30],
  //             ]
  //         },
  //         layout: {
  //             hLineWidth: (i, node) => 1,
  //             vLineWidth: (i, node) => 1,
  //             hLineColor: (i, node) => '#000000',
  //             vLineColor: (i, node) => '#000000',
  //             paddingLeft: (i, node) => 10,
  //             paddingRight: (i, node) => 10,
  //             paddingTop: (i, node) => 5,
  //             paddingBottom: (i, node) => 5
  //         },
  //         // widths: ['*'],
  //         background: '#F0F0F0', // Цвет фона таблицы
  //         fontSize: 9, // размер шрифта
  //         lineHeight: 1.5, // межстрочный интервал
  //         decoration: 'lineThrough', // перечеркнутый текст
  //         color: 'orange', // цвет текста
  //         // margin: [10, 10, 10, 10], // отступы
  //         italics: true, // курсив
  //         alignment: 'center' // выравнивание текста по центру
  //     },
  //     {
  //         table: {
  //             widths: ['*'],
  //             body: [
  //                 [
  //                     {
  //                         text: 'Текст с фоном, рамками и подчеркиванием',
  //                         fillColor: 'yellow',    // Цвет фона работает в таблице
  //                         color: 'red',           // Цвет текста
  //                         border: [true, true, true, true],
  //                         margin: [10, 10, 10, 10],
  //                         decoration: 'underline'
  //                     }
  //                 ]
  //             ]
  //         },
  //         layout: 'noBorders',
  //         // pageBreak: 'after'
  //     },
  //     {
  //         text: [
  //             'Текст с рамками и ',
  //             {
  //                 fontSize: 14, // размер шрифта
  //                 // lineHeight: 2, // межстрочный интервал
  //                 text: 'подчеркнутым',
  //                 decoration: 'underline',
  //                 color: 'blue',
  //                 // alignment: 'center'
  //             },
  //             ' словом и автоматическим ',
  //             {
  //                 fontSize: 15, // размер шрифта
  //                 // lineHeight: 1, // межстрочный интервал
  //                 text: 'ARSDLAN',
  //                 decoration: 'overline',
  //                 color: 'green',

  //                 bold: true
  //             },
  //             ' разбиением на страницы.'
  //         ],

  //         fontSize: 12, // размер шрифта
  //         lineHeight: 0.5, // межстрочный интервал
  //         decoration: 'lineThrough',
  //         color: 'orange',
  //         border: [true, true, true, true],
  //         margin: [10, 10, 10, 10],
  //         italics: true, // <== добавили курсив,
  //         alignment: 'center'

  //         // pageBreak: 'after',

  //     },
  //     {
  //         text: 'Текст с рамками и автоматическим разбиением на страницы.',
  //         border: [true, true, true, true],
  //         margin: [10, 10, 10, 10],
  //         pageBreak: 'after',
  //         decoration: 'underline',
  //         fillColor: 'yellow', // <-- цвет фона (можно hex или цвет по названию, например 'yellow')
  //         color: 'red',
  //     },
  //     {
  //         text: `Lorem ipsum dolor sit amet...`, // сократил для примера
  //         margin: [0, 20, 0, 10],
  //     },
  //     {
  //         table: {
  //             // widths: ['*'],
  //             body: [
  //                 [
  //                     {
  //                         text: 'Текст с фоном',
  //                         fillColor: 'yellow',
  //                         color: 'black',
  //                         border: [true, true, true, true],
  //                         margin: [10, 10, 10, 10],
  //                         decoration: 'underline'
  //                     }
  //                 ]

  //             ]
  //         },
  //         layout: 'noBorders',
  //         pageBreak: 'after'
  //     },
  //     {
  //         table: {
  //             // widths: ['*'],
  //             widths: ['auto', 'auto', 'auto'],
  //             body: [
  //                 ['Имя', 'Фамилия', 'Возраст'],
  //                 ['Иван', 'Иванов   ldfsvkmndsfv sdfvnmdfsjvn', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //             ]
  //         },
  //         alignment: 'center',
  //         layout: {
  //             hLineWidth: (i, node) => 1,
  //             vLineWidth: (i, node) => 1,
  //             hLineColor: (i, node) => '#000000',
  //             vLineColor: (i, node) => '#000000',
  //             paddingLeft: (i, node) => 10,
  //             paddingRight: (i, node) => 10,
  //             paddingTop: (i, node) => 5,
  //             paddingBottom: (i, node) => 5
  //         },
  //     },
  //     {
  //         table: {
  //             body: [
  //                 ['Имя', 'Фамилия', 'Возраст'],
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //             ]
  //         },
  //         layout: {
  //             hLineWidth: (i, node) => 1,
  //             vLineWidth: (i, node) => 1,
  //             hLineColor: (i, node) => '#000000',
  //             vLineColor: (i, node) => '#000000',
  //             paddingLeft: (i, node) => 10,
  //             paddingRight: (i, node) => 10,
  //             paddingTop: (i, node) => 5,
  //             paddingBottom: (i, node) => 5
  //         },
  //         background: '#F0F0F0',
  //     },
  //     {
  //         table: {
  //             body: [
  //                 ['Иван', 'Иванов', 30],
  //                 ['Петр', 'Петров', 25],
  //                 ['Иван', 'Иванов', 30],
  //             ]
  //         },
  //         layout: {
  //             hLineWidth: (i, node) => 1,
  //             vLineWidth: (i, node) => 1,
  //             hLineColor: (i, node) => '#000000',
  //             vLineColor: (i, node) => '#000000',
  //             paddingLeft: (i, node) => 10,
  //             paddingRight: (i, node) => 10,
  //             paddingTop: (i, node) => 5,
  //             paddingBottom: (i, node) => 5
  //         },
  //         background: 'red',
  //     },
  //     {
  //         fontSize: 9, // размер шрифта
  //         lineHeight: 1, // межстрочный интервал
  //         text: `
  //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore etdolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ${name}Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  //                         Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat.

  //                         Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi.
  //                         Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst. Integer tempus convallis augue.
  //                         Etiam facilisis. Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed gravida sollicitudin, felis odio placerat
  //                         quam, ac pulvinar elit purus eget enim. Nunc vitae tortor. Proin tempus nibh sit amet nisl. Vivamus quis tortor vitae risus porta vehicula.

  //                         Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  //                         Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  //                         Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  //                         Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  //                         Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

  //                         Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra,
  //                         est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.
  //                         Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu
  //                         tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.
  //                         Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque.
  //                         Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat.

  //                         Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  //                         Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  //                         Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  //                         Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  //                         Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

  //                         Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra,
  //                         est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.
  //                         Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu
  //                         tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.
  //                         Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque.
  //                         Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat.

  //                         Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi.
  //                         Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst. Integer tempus convallis augue.
  //                         Etiam facilisis. Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed gravida sollicitudin, felis odio placerat
  //                         quam, ac pulvinar elit purus eget enim. Nunc vitae tortor. Proin tempus nibh sit amet nisl. Vivamus quis tortor vitae risus porta vehicula.
  //                         `,
  //     },
  //     {
  //         pageBreak: 'after',
  //         table: {
  //             widths: ['*', '*'], // две равные колонки, можно указать фиксированные размеры, если нужно
  //             body: [
  //                 [
  //                     { text: 'Левое слово', alignment: 'left', border: [false, false, false, false] },
  //                     { text: 'Правое слово', alignment: 'right', border: [false, false, false, false] }
  //                 ]
  //             ]
  //         },
  //         layout: 'noBorders' // или убираем границы вручную, как выше
  //     },
  //     {
  //         columns: [
  //             { text: 'Левое слово', alignment: 'left' },
  //             { text: 'Правое слово', alignment: 'right' }
  //         ]
  //     },
  //     {
  //         columns: [
  //             {
  //                 // auto-sized columns have their widths based on their content
  //                 width: 'auto',
  //                 text: 'First column'
  //             },
  //             {
  //                 // star-sized columns fill the remaining space
  //                 // if there's more than one star-column, available width is divided equally
  //                 width: '*',
  //                 text: 'Second column'
  //             },
  //             {
  //                 // fixed width
  //                 width: 100,
  //                 text: 'Third column'
  //             },
  //             {
  //                 // % width
  //                 width: '20%',
  //                 text: 'Fourth column'
  //             }
  //         ],
  //         // optional space between columns
  //         columnGap: 10

  //     },
  //     {

  //         layout: 'lightHorizontalLines', // optional
  //         table: {
  //             // headers are automatically repeated if the table spans over multiple pages
  //             // you can declare how many rows should be treated as headers
  //             headerRows: 1,
  //             widths: ['*', 'auto', 100, '*'],

  //             body: [
  //                 ['First', 'Second', 'Third', 'The last one'],
  //                 ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
  //                 [{ text: 'Bold Val 1 ', bold: true }, 'Val 2', 'Val 3', 'Val 4']
  //             ]
  //         }
  //     },
  //     'Bulleted list example:',
  //     {
  //         // to treat a paragraph as a bulleted list, set an array of items under the ul key
  //         ul: [
  //             'Item 1',
  //             'Item 2',
  //             'Item 3',
  //             { text: 'Item 4', bold: true },
  //         ]
  //     },
  //     'Numbered list example:',
  //     {
  //         // for numbered lists set the ol key
  //         ol: [
  //             'Item 1',
  //             'Item 2',
  //             'Item 3'
  //         ]
  //     },

  // ]


  const content = [
    { text: "Alem Tilsimat", color: "blue", link: "https://alemtilsimat.com/" },
    {
      // info: {
      //   title: 'Request Report',
      //   author: 'Your Company Name',
      //   subject: 'Internal Document',
      //   keywords: 'requests, report, company name',
      //   creator: 'Your App Name',
      //   producer: 'pdfmake'
      // },
      columns: [
        // {
        //     width: 150,
        //     alignment: 'center', // можно left / right / center
        //     margin: [0, 0, 0, 20], // отступы [left, top, right, bottom]
        //     svg: `<svg width="800px" height="800px" fill="none" viewBox="0 -4 28 28" xmlns="http://www.w3.org/2000/svg">
        //                     <g clip-path="url(#f)">
        //                     <rect width="28" height="20" rx="2" fill="#fff"/>
        //                     <mask id="e" x="0" y="0" width="28" height="20" style="mask-type:alpha" maskUnits="userSpaceOnUse">
        //                     <rect width="28" height="20" rx="2" fill="#fff"/>
        //                     </mask>
        //                     <g mask="url(#e)">
        //                     <path d="M0 20H28V0H0V20Z" clip-rule="evenodd" fill="#30C375" fill-rule="evenodd"/>
        //                     <rect x="4" width="4" height="20" fill="#DE414F"/>
        //                     <path d="m6 4c1.1046 0 2-0.59695 2-1.3333s-0.89543-1.3333-2-1.3333-2 0.59695-2 1.3333 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
        //                     <mask id="d" x="4" y="1" width="4" height="3" style="mask-type:alpha" maskUnits="userSpaceOnUse">
        //                     <path d="m6 4c1.1046 0 2-0.59695 2-1.3333s-0.89543-1.3333-2-1.3333-2 0.59695-2 1.3333 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
        //                     </mask>
        //                     <g mask="url(#d)">
        //                     <path d="m6.0002 3.3334c0.36819 0 0.66667-0.29848 0.66667-0.66667s-0.29848-0.66666-0.66667-0.66666-0.66666 0.29847-0.66666 0.66666 0.29847 0.66667 0.66666 0.66667z" clip-rule="evenodd" fill="#DD404F" fill-rule="evenodd"/>
        //                     <rect x="4" y="1.3333" width="2" height="1.3333" fill="#FBAF29"/>
        //                     <rect x="6" y="2.6667" width="2" height="1.3333" fill="#FBAF29"/>
        //                     </g>
        //                     <path d="m6 18.667c1.1046 0 2-0.597 2-1.3334 0-0.7363-0.89543-1.3333-2-1.3333s-2 0.597-2 1.3333c0 0.7364 0.89543 1.3334 2 1.3334z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
        //                     <mask id="c" x="4" y="16" width="4" height="3" style="mask-type:alpha" maskUnits="userSpaceOnUse">
        //                     <path d="m6 18.667c1.1046 0 2-0.597 2-1.3334 0-0.7363-0.89543-1.3333-2-1.3333s-2 0.597-2 1.3333c0 0.7364 0.89543 1.3334 2 1.3334z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
        //                     </mask>
        //                     <g mask="url(#c)">
        //                     <path d="m6.0002 18c0.36819 0 0.66667-0.2985 0.66667-0.6666 0-0.3682-0.29848-0.6667-0.66667-0.6667s-0.66666 0.2985-0.66666 0.6667c0 0.3681 0.29847 0.6666 0.66666 0.6666z" clip-rule="evenodd" fill="#DD404F" fill-rule="evenodd"/>
        //                     <rect x="4" y="16" width="2" height="1.3333" fill="#FBAF29"/>
        //                     <rect x="6" y="17.333" width="2" height="1.3333" fill="#FBAF29"/>
        //                     </g>
        //                     <path d="m6 12c1.1046 0 2-0.597 2-1.3333 0-0.73642-0.89543-1.3334-2-1.3334s-2 0.59695-2 1.3334c0 0.7363 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#28AE67" fill-rule="evenodd"/>
        //                     <mask id="b" x="4" y="9" width="4" height="3" style="mask-type:alpha" maskUnits="userSpaceOnUse">
        //                     <path d="m6 12c1.1046 0 2-0.597 2-1.3333 0-0.73642-0.89543-1.3334-2-1.3334s-2 0.59695-2 1.3334c0 0.7363 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
        //                     </mask>
        //                     <g mask="url(#b)">
        //                     <path d="m5.9998 11.333c0.73638 0 1.3333-0.2984 1.3333-0.6666s-0.59695-0.6667-1.3333-0.6667-1.3333 0.2985-1.3333 0.6667 0.59696 0.6666 1.3333 0.6666z" clip-rule="evenodd" fill="#DD404F" fill-rule="evenodd"/>
        //                     </g>
        //                     <path d="m6 14.667c1.1046 0 2-0.2985 2-0.6667s-0.89543-0.6667-2-0.6667-2 0.2985-2 0.6667 0.89543 0.6667 2 0.6667z" clip-rule="evenodd" fill="#28AE67" fill-rule="evenodd"/>
        //                     <mask x="4" y="13" width="4" height="2" style="mask-type:alpha" maskUnits="userSpaceOnUse">
        //                     <path d="m6 14.667c1.1046 0 2-0.2985 2-0.6667s-0.89543-0.6667-2-0.6667-2 0.2985-2 0.6667 0.89543 0.6667 2 0.6667z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
        //                     </mask>
        //                     <path d="m6 8c1.1046 0 2-0.59695 2-1.3333s-0.89543-1.3333-2-1.3333-2 0.59695-2 1.3333 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#FBAF29" fill-rule="evenodd"/>
        //                     <mask id="a" x="4" y="5" width="4" height="3" style="mask-type:alpha" maskUnits="userSpaceOnUse">
        //                     <path d="m6 8c1.1046 0 2-0.59695 2-1.3333s-0.89543-1.3333-2-1.3333-2 0.59695-2 1.3333 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
        //                     </mask>
        //                     <g mask="url(#a)">
        //                     <path d="m6.0002 7.3334c0.36819 0 0.66667-0.29848 0.66667-0.66667s-0.29848-0.66666-0.66667-0.66666-0.66666 0.29847-0.66666 0.66666 0.29847 0.66667 0.66666 0.66667z" clip-rule="evenodd" fill="#DD404F" fill-rule="evenodd"/>
        //                     <rect x="4" y="5.3333" width="1.3333" height="2.6667" fill="#28AE67"/>
        //                     <rect x="6.6665" y="5.3333" width="1.3333" height="2.6667" fill="#28AE67"/>
        //                     </g>
        //                     <path d="m14.822 4.2382c-0.2367 0.28205-0.1999 0.70255 0.0822 0.93922 0.282 0.23667 0.7025 0.19988 0.9392-0.08217s0.1999-0.70256-0.0822-0.93922c-0.282-0.23667-0.7025-0.19988-0.9392 0.08217zm-1.7273 2.5845c-0.282-0.23666-0.7025-0.19988-0.9392 0.08217s-0.1999 0.70256 0.0822 0.93923c0.282 0.23666 0.7025 0.19987 0.9392-0.08218 0.2366-0.28205 0.1999-0.70255-0.0822-0.93922zm-1.3335-1.3333c-0.282-0.23667-0.7025-0.19988-0.9392 0.08217s-0.1999 0.70255 0.0822 0.93922c0.282 0.23667 0.7025 0.19988 0.9392-0.08217s0.1999-0.70255-0.0822-0.93922zm2.6665-2.6667c-0.282-0.23666-0.7025-0.19988-0.9392 0.08217s-0.1999 0.70256 0.0822 0.93923c0.282 0.23666 0.7025 0.19987 0.9392-0.08218s0.1999-0.70255-0.0822-0.93922zm-0.6665 2c-0.282-0.23666-0.7025-0.19988-0.9392 0.08217s-0.1999 0.70256 0.0822 0.93923c0.282 0.23666 0.7025 0.19987 0.9392-0.08218s0.1999-0.70255-0.0822-0.93922z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
        //                     <path d="m17.476 9.4505c-1.588 1.5881-4.1628 1.5881-5.7508 0-0.1539-0.15387-0.2928-0.31702-0.4169-0.48763 1.5901 1.1562 3.829 1.0173 5.2632-0.4169s1.5731-3.6731 0.4169-5.2632c0.1706 0.12405 0.3338 0.26302 0.4876 0.4169 1.5881 1.588 1.5881 4.1628 0 5.7508z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
        //                     </g>
        //                     </g>
        //                     <defs>
        //                     <clipPath id="f">
        //                     <rect width="28" height="20" rx="2" fill="#fff"/>
        //                     </clipPath>
        //                     </defs>
        //                     </svg>`
        // },
        {
          alignment: "center",
          margin: [0, 20, 0, 20],
          text: "Daşary ýurt raýatyna işewürlik (BS1, BS2), maýa goýum (IN), işçi (WP), maşgala (FM), Sport (SP1, SP2), ynsanperwerlik (HM), hususy (PR1, PR2), talyp (ST), syýahatçylyk (TU), üstaşyt (TR!, TR2) Saglygy bejeriş (HL), sürüjilik (DR)wazasyny resmileşdirmek üçin",
          fontSize: 11,
        },
        {
          alignment: "center",
          margin: [0, 20, 0, 20],
          text: "Daşary ýurt raýatyna işewürlik (BS1, BS2), maýa goýum (IN), işçi (WP), maşgala (FM), Sport (SP1, SP2), ynsanperwerlik (HM), hususy (PR1, PR2), talyp (ST), syýahatçylyk (TU), üstaşyt (TR!, TR2) Saglygy bejeriş (HL), sürüjilik (DR)wazasyny resmileşdirmek üçin",
          fontSize: 11,
        },
        {
          width: 150,
          alignment: "center", // можно left / right / center
          margin: [0, 20, 0, 20], // отступы[left, top, right, bottom]
          image: base64Image,
        },
      ],
    },
  ];
  const qrText = JSON.stringify(content);

  const generatePdf = () => {
    if (!base64Image) return;

    const documentDefinition = {
      pageSize: "A4",
      pageOrientation: "portrait", // landscape
      pageMargins: [40, 40, 40, 40], // внутренние отступы
      defaultStyle: { font: "TimesNewRoman" },
      footer: function (currentPage, pageCount) {
        return {
          text: currentPage.toString(),
          alignment: "center",
          margin: [0, 10, 0, 0], // отступ сверху, можешь подстроить
          fontSize: 10,
        };
      },
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
        {
          text: "ŞAHSY KAGYZY",
          fontSize: 18,
          bold: true,
          margin: [180, 0, 0, 0], // отступы [left, top, right, bottom]
        },
        {
          // пунктирная рамка 3x4 (в mm) | w ~ 30mm, h ~ 40mm | dash = пунктир
          canvas: [
            {
              type: "rect",
              x: 0,
              y: 0,
              w: 90,
              h: 115,
              lineWidth: 1,
              dash: { length: 4 },
            },
          ],
          // width ~ 30mm (в pdfmake 1 мм ≈ 2.83 pt) | height ~ 40mm
          width: 90,
          height: 115,
          margin: [400, 0, 0, 0],
        },
        { text: "\n\n", fontSize: 14 },
        // {
        //   lineHeight: 1.5,
        //   text: [
        //     { text: `\nFamiliýasy, ady, atasynyň ady:   `, fontSize: 14, },
        //     { text: `${profile?.firstName || ''} ${profile?.lastName || ''} ${profile?.middleName || ''}`, fontSize: 15, decoration: "underline", bold: true },

        //     { text: `\nDoglan senesi we ýeri:   `, fontSize: 14, },
        //     { text: `${profile.birthDay} ${profile.bornCountry}`, fontSize: 15, decoration: "underline", bold: true },

        //     { text: `\nRaýatlygy:   `, fontSize: 14, },
        //     { text: `${profile.citizenship}`, fontSize: 15, decoration: "underline", bold: true },

        //     { text: `\nPasportyň belgisi, berlen senesi we möhleti:   `, fontSize: 14, },
        //     { text: `${profile.passport}`, fontSize: 15, decoration: "underline", bold: true },

        //     { text: `\nŞahsy belgisi:   `, fontSize: 14, },
        //     { text: `BF-4586484`, fontSize: 15, decoration: "underline", bold: true },

        //     { text: `\nBilimi, okan ýari:   `, fontSize: 14, },
        //     { text: `${profile.studyOfCountry}`, fontSize: 15, decoration: "underline", bold: true },

        //     { text: `\nHünäri:   `, fontSize: 14, },
        //     { text: `${profile.major}`, fontSize: 15, decoration: "underline", bold: true },

        //     { text: `\nWezipesi:   `, fontSize: 14, },
        //     { text: `${profile.position}`, fontSize: 15, decoration: "underline", bold: true },

        //     { text: `\nTürkmenistanda öňki işlän ýerleri:   `, fontSize: 14, },
        //     { text: ` `, fontSize: 15, decoration: "underline", bold: true },

        //     { text: `\nMaşgala ýagdaýy:   `, fontSize: 14, },
        //     { text: `Aýaly-Takae Handa-30.07.1965 (JPN)`, fontSize: 15, decoration: "underline", bold: true },
        //   ]
        // },

        {
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
                    {
                      canvas: [
                        {
                          type: 'line',
                          x1: 35, y1: 0,
                          x2: 370, y2: 0,
                          lineWidth: 0.5,
                        },
                      ],
                    },
                  ],
                },
              ],
              [
                { text: "Doglan senesi we ýeri", alignment: "left", noWrap: true },
                {
                  stack: [
                    {
                      text: `${profile.birthDay} ${profile.bornCountry}`,
                      alignment: "center",
                      margin: [0, 0, 0, 2],
                    },
                    {
                      canvas: [
                        {
                          type: 'line',
                          x1: -7, y1: 0,
                          x2: 370, y2: 0,
                          lineWidth: 0.5,
                        },
                      ],
                    },
                  ],
                },
              ],
              [
                { text: "Raýatlygy", alignment: "left", noWrap: true },
                {
                  stack: [
                    {
                      text: `${profile.citizenship}`,
                      alignment: "center",
                      margin: [0, 0, 0, 2],
                    },
                    {
                      canvas: [
                        {
                          type: 'line',
                          x1: -70, y1: 0,
                          x2: 370, y2: 0,
                          lineWidth: 0.5,
                        },
                      ],
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
                    {
                      text: `JPN, 4-11-1 Kaminoge Setagaya-ku, Tokyo, Japan`,
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
                      ]
                    },
                  ],
                },
              ],
              [
                {
                  text: "Daşary ýurt raýaylary barada galp maglumatlary görkezilýan ýagdaýynda Türkmenistanyň kanunçylygyna laýyklykda doly jogapkärçiligi çekýarin.",
                  colSpan: 2, // объединить 2 ячейки
                  alignment: "justify", // по желанию — выравнивание
                }, {} // пустая ячейка, обязательна при colSpan!
              ],
              [
                { text: "\n\nYgtyýarly adam.", colSpan: 2, alignment: "left", },
                {} // пустая ячейка, обязательна при colSpan!
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
          },
          fontSize: 13,
        },
        {
          table: {
            widths: ["*", "*"],
            body: [
              [
                { text: `\n"_____"_______________20_______ý`, alignment: "left" },
                { text: `M.Ý____________________`, alignment: "right" },
              ],
              [
                { text: "goly", colSpan: 2, alignment: "right", margin: [0, -20, 50, 0], }, {} // пустая ячейка, обязательна при colSpan!
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
          },
          fontSize: 12,
          // pageBreak: "after",
        },

        // {
        //   columns: [
        //     {

        //       width: 100,
        //       alignment: "left", // можно left / right / center
        //       margin: [0, 0, 0, 20], // отступы [left, top, right, bottom]
        //       svg: `<svg width="800px" height="800px" fill="none" viewBox="0 -4 28 28" xmlns="http://www.w3.org/2000/svg">
        //                             <g clip-path="url(#f)">
        //                             <rect width="28" height="20" rx="2" fill="#fff"/>
        //                             <mask id="e" x="0" y="0" width="28" height="20" style="mask-type:alpha" maskUnits="userSpaceOnUse">
        //                             <rect width="28" height="20" rx="2" fill="#fff"/>
        //                             </mask>
        //                             <g mask="url(#e)">
        //                             <path d="M0 20H28V0H0V20Z" clip-rule="evenodd" fill="#30C375" fill-rule="evenodd"/>
        //                             <rect x="4" width="4" height="20" fill="#DE414F"/>
        //                             <path d="m6 4c1.1046 0 2-0.59695 2-1.3333s-0.89543-1.3333-2-1.3333-2 0.59695-2 1.3333 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
        //                             <mask id="d" x="4" y="1" width="4" height="3" style="mask-type:alpha" maskUnits="userSpaceOnUse">
        //                             <path d="m6 4c1.1046 0 2-0.59695 2-1.3333s-0.89543-1.3333-2-1.3333-2 0.59695-2 1.3333 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
        //                             </mask>
        //                             <g mask="url(#d)">
        //                             <path d="m6.0002 3.3334c0.36819 0 0.66667-0.29848 0.66667-0.66667s-0.29848-0.66666-0.66667-0.66666-0.66666 0.29847-0.66666 0.66666 0.29847 0.66667 0.66666 0.66667z" clip-rule="evenodd" fill="#DD404F" fill-rule="evenodd"/>
        //                             <rect x="4" y="1.3333" width="2" height="1.3333" fill="#FBAF29"/>
        //                             <rect x="6" y="2.6667" width="2" height="1.3333" fill="#FBAF29"/>
        //                             </g>
        //                             <path d="m6 18.667c1.1046 0 2-0.597 2-1.3334 0-0.7363-0.89543-1.3333-2-1.3333s-2 0.597-2 1.3333c0 0.7364 0.89543 1.3334 2 1.3334z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
        //                             <mask id="c" x="4" y="16" width="4" height="3" style="mask-type:alpha" maskUnits="userSpaceOnUse">
        //                             <path d="m6 18.667c1.1046 0 2-0.597 2-1.3334 0-0.7363-0.89543-1.3333-2-1.3333s-2 0.597-2 1.3333c0 0.7364 0.89543 1.3334 2 1.3334z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
        //                             </mask>
        //                             <g mask="url(#c)">
        //                             <path d="m6.0002 18c0.36819 0 0.66667-0.2985 0.66667-0.6666 0-0.3682-0.29848-0.6667-0.66667-0.6667s-0.66666 0.2985-0.66666 0.6667c0 0.3681 0.29847 0.6666 0.66666 0.6666z" clip-rule="evenodd" fill="#DD404F" fill-rule="evenodd"/>
        //                             <rect x="4" y="16" width="2" height="1.3333" fill="#FBAF29"/>
        //                             <rect x="6" y="17.333" width="2" height="1.3333" fill="#FBAF29"/>
        //                             </g>
        //                             <path d="m6 12c1.1046 0 2-0.597 2-1.3333 0-0.73642-0.89543-1.3334-2-1.3334s-2 0.59695-2 1.3334c0 0.7363 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#28AE67" fill-rule="evenodd"/>
        //                             <mask id="b" x="4" y="9" width="4" height="3" style="mask-type:alpha" maskUnits="userSpaceOnUse">
        //                             <path d="m6 12c1.1046 0 2-0.597 2-1.3333 0-0.73642-0.89543-1.3334-2-1.3334s-2 0.59695-2 1.3334c0 0.7363 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
        //                             </mask>
        //                             <g mask="url(#b)">
        //                             <path d="m5.9998 11.333c0.73638 0 1.3333-0.2984 1.3333-0.6666s-0.59695-0.6667-1.3333-0.6667-1.3333 0.2985-1.3333 0.6667 0.59696 0.6666 1.3333 0.6666z" clip-rule="evenodd" fill="#DD404F" fill-rule="evenodd"/>
        //                             </g>
        //                             <path d="m6 14.667c1.1046 0 2-0.2985 2-0.6667s-0.89543-0.6667-2-0.6667-2 0.2985-2 0.6667 0.89543 0.6667 2 0.6667z" clip-rule="evenodd" fill="#28AE67" fill-rule="evenodd"/>
        //                             <mask x="4" y="13" width="4" height="2" style="mask-type:alpha" maskUnits="userSpaceOnUse">
        //                             <path d="m6 14.667c1.1046 0 2-0.2985 2-0.6667s-0.89543-0.6667-2-0.6667-2 0.2985-2 0.6667 0.89543 0.6667 2 0.6667z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
        //                             </mask>
        //                             <path d="m6 8c1.1046 0 2-0.59695 2-1.3333s-0.89543-1.3333-2-1.3333-2 0.59695-2 1.3333 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#FBAF29" fill-rule="evenodd"/>
        //                             <mask id="a" x="4" y="5" width="4" height="3" style="mask-type:alpha" maskUnits="userSpaceOnUse">
        //                             <path d="m6 8c1.1046 0 2-0.59695 2-1.3333s-0.89543-1.3333-2-1.3333-2 0.59695-2 1.3333 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
        //                             </mask>
        //                             <g mask="url(#a)">
        //                             <path d="m6.0002 7.3334c0.36819 0 0.66667-0.29848 0.66667-0.66667s-0.29848-0.66666-0.66667-0.66666-0.66666 0.29847-0.66666 0.66666 0.29847 0.66667 0.66666 0.66667z" clip-rule="evenodd" fill="#DD404F" fill-rule="evenodd"/>
        //                             <rect x="4" y="5.3333" width="1.3333" height="2.6667" fill="#28AE67"/>
        //                             <rect x="6.6665" y="5.3333" width="1.3333" height="2.6667" fill="#28AE67"/>
        //                             </g>
        //                             <path d="m14.822 4.2382c-0.2367 0.28205-0.1999 0.70255 0.0822 0.93922 0.282 0.23667 0.7025 0.19988 0.9392-0.08217s0.1999-0.70256-0.0822-0.93922c-0.282-0.23667-0.7025-0.19988-0.9392 0.08217zm-1.7273 2.5845c-0.282-0.23666-0.7025-0.19988-0.9392 0.08217s-0.1999 0.70256 0.0822 0.93923c0.282 0.23666 0.7025 0.19987 0.9392-0.08218 0.2366-0.28205 0.1999-0.70255-0.0822-0.93922zm-1.3335-1.3333c-0.282-0.23667-0.7025-0.19988-0.9392 0.08217s-0.1999 0.70255 0.0822 0.93922c0.282 0.23667 0.7025 0.19988 0.9392-0.08217s0.1999-0.70255-0.0822-0.93922zm2.6665-2.6667c-0.282-0.23666-0.7025-0.19988-0.9392 0.08217s-0.1999 0.70256 0.0822 0.93923c0.282 0.23666 0.7025 0.19987 0.9392-0.08218s0.1999-0.70255-0.0822-0.93922zm-0.6665 2c-0.282-0.23666-0.7025-0.19988-0.9392 0.08217s-0.1999 0.70256 0.0822 0.93923c0.282 0.23666 0.7025 0.19987 0.9392-0.08218s0.1999-0.70255-0.0822-0.93922z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
        //                             <path d="m17.476 9.4505c-1.588 1.5881-4.1628 1.5881-5.7508 0-0.1539-0.15387-0.2928-0.31702-0.4169-0.48763 1.5901 1.1562 3.829 1.0173 5.2632-0.4169s1.5731-3.6731 0.4169-5.2632c0.1706 0.12405 0.3338 0.26302 0.4876 0.4169 1.5881 1.588 1.5881 4.1628 0 5.7508z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
        //                             </g>
        //                             </g>
        //                             <defs>
        //                             <clipPath id="f">
        //                             <rect width="28" height="20" rx="2" fill="#fff"/>
        //                             </clipPath>
        //                             </defs>
        //                         </svg>`,
        //     },
        //     {
        //       text: [
        //         {
        //           text: "Daşary ýurt raýatyna işewürlik (BS1, BS2), maýa goýum (IN), işçi (WP), maşgala (FM), Sport (SP1, SP2), ynsanperwerlik (HM), hususy (PR1, PR2), talyp (ST), syýahatçylyk (TU), üstaşyt (TR!, TR2) Saglygy bejeriş (HL), sürüjilik (DR)wazasyny resmileşdirmek üçin",
        //           fontSize: 14,
        //         },
        //         { text: "\n\nŞAHSY KAGYZY", fontSize: 18, bold: true },
        //       ],

        //       alignment: "center",
        //       margin: [10, 30, 10, 0],
        //       fontSize: 11,
        //     },
        //     {
        //       width: 100,
        //       height: 100,
        //       alignment: "right", // можно left / right / center
        //       margin: [0, 20, 0, 20], // отступы[left, top, right, bottom]
        //       image: base64Image,
        //       // cover: { width: 100, height: 100, valign: "bottom", align: "right" },
        //     },
        //   ],
        // },

        // "paragraph 1",
        // "paragraph 2",
        // {
        //   columns: [
        //     "first column is a simple text",
        //     {
        //       stack: [
        //         // second column consists of paragraphs
        //         "paragraph A",
        //         "paragraph B",
        //         "these paragraphs will be rendered one below another inside the column",
        //       ],
        //       fontSize: 15,
        //     },
        //   ],
        // },
        // {
        //   leadingIndent: 20, // 👈 отступ только у первой строки
        //   text: [
        //     { text: `Пример документа с рамками, `, fontSize: 18 },
        //     { text: "Продолжение ", fontSize: 18 },
        //     { text: "Продолжение ", fontSize: 18 },
        //     { text: "Продолжение ", fontSize: 18 },
        //     { text: "Продолжение ", fontSize: 18 },
        //     { text: "Продолжение ", fontSize: 18 },
        //     { text: "Продолжение ", fontSize: 18 },
        //     { text: "Продолжение ", fontSize: 18 },
        //     { text: "Продолжение ", fontSize: 18 },
        //   ],
        // },
        // {
        //   text: "Пример документа с рамками,",
        //   fontSize: 18,
        // },
        // {
        //   text: "Продолжение",
        //   fontSize: 18,
        //   // margin: [10, 0, 0, 0]
        // },
        // {
        //   table: {
        //     // widths: ['auto', 'auto', 'auto'], //
        //     widths: ["*", "*", "*"], //
        //     body: [
        //       ["Имя", "Фамилия", "Возраст vervijerom erjv ewrviuewrhv"],
        //       [
        //         "Иван wvkasdk ",
        //         "Иванов saivfoadfsjo sdfjnvdsjfk vsdkfjlnvvndsfnjkvlvl",
        //         30,
        //       ],
        //       ["Петр asdvnm ", "Петров", 25],
        //       ["Иванkm salkvjndsa asjndvj", "Иванов", 30],
        //     ],
        //   },
        //   layout: {
        //     hLineWidth: (i, node) => 1,
        //     vLineWidth: (i, node) => 1,
        //     hLineColor: (i, node) => "#000000",
        //     vLineColor: (i, node) => "#000000",
        //     paddingLeft: (i, node) => 10,
        //     paddingRight: (i, node) => 10,
        //     paddingTop: (i, node) => 5,
        //     paddingBottom: (i, node) => 5,
        //   },
        //   // widths: ['*'],
        //   background: "#F0F0F0", // Цвет фона таблицы
        //   fontSize: 9, // размер шрифта
        //   lineHeight: 1.5, // межстрочный интервал
        //   decoration: "lineThrough", // перечеркнутый текст
        //   color: "orange", // цвет текста
        //   // margin: [10, 10, 10, 10], // отступы
        //   italics: true, // курсив
        //   alignment: "center", // выравнивание текста по центру
        // },
        // {
        //   table: {
        //     widths: ["*"],
        //     body: [
        //       [
        //         {
        //           text: "Текст с фоном, рамками и подчеркиванием",
        //           fillColor: "yellow", // Цвет фона работает в таблице
        //           color: "red", // Цвет текста
        //           border: [true, true, true, true],
        //           margin: [10, 10, 10, 10],
        //           decoration: "underline",
        //         },
        //       ],
        //     ],
        //   },
        //   layout: "noBorders",
        //   // pageBreak: 'after'
        // },
        // {
        //   text: [
        //     "Текст с рамками и ",
        //     {
        //       fontSize: 14, // размер шрифта
        //       // lineHeight: 2, // межстрочный интервал
        //       text: "подчеркнутым",
        //       decoration: "underline",
        //       color: "blue",
        //       // alignment: 'center'
        //     },
        //     " словом и автоматическим ",
        //     {
        //       fontSize: 15, // размер шрифта
        //       // lineHeight: 1, // межстрочный интервал
        //       text: "ARSDLAN",
        //       decoration: "overline",
        //       color: "green",

        //       bold: true,
        //     },
        //     " разбиением на страницы.",
        //   ],

        //   fontSize: 12, // размер шрифта
        //   lineHeight: 0.5, // межстрочный интервал
        //   decoration: "lineThrough",
        //   color: "orange",
        //   border: [true, true, true, true],
        //   margin: [10, 10, 10, 10],
        //   italics: true, // <== добавили курсив,
        //   alignment: "center",

        //   // pageBreak: 'after',
        // },
        // {
        //   text: "Текст с рамками и автоматическим разбиением на страницы.",
        //   border: [true, true, true, true],
        //   margin: [10, 10, 10, 10],
        //   pageBreak: "after",
        //   decoration: "underline",
        //   fillColor: "yellow", // <-- цвет фона (можно hex или цвет по названию, например 'yellow')
        //   color: "red",
        // },
        // {
        //   text: `Lorem ipsum dolor sit amet...`, // сократил для примера
        //   margin: [0, 20, 0, 10],
        // },
        // {
        //   table: {
        //     // widths: ['*'],
        //     body: [
        //       [
        //         {
        //           text: "Текст с фоном",
        //           fillColor: "yellow",
        //           color: "black",
        //           border: [true, true, true, true],
        //           margin: [10, 10, 10, 10],
        //           decoration: "underline",
        //         },
        //       ],
        //     ],
        //   },
        //   layout: "noBorders",
        //   pageBreak: "after",
        // },
        // {
        //   table: {
        //     // widths: ['*'],
        //     widths: ["auto", "auto", "auto"],
        //     body: [
        //       ["Имя", "Фамилия", "Возраст"],
        //       ["Иван", "Иванов   ldfsvkmndsfv sdfvnmdfsjvn", 30],
        //       ["Петр", "Петров", 25],
        //       ["Иван", "Иванов", 30],
        //       ["Петр", "Петров", 25],
        //       ["Иван", "Иванов", 30],
        //       ["Петр", "Петров", 25],
        //       ["Петр", "Петров", 25],
        //       ["Иван", "Иванов", 30],
        //       ["Петр", "Петров", 25],
        //     ],
        //   },
        //   alignment: "center",
        //   layout: {
        //     hLineWidth: (i, node) => 1,
        //     vLineWidth: (i, node) => 1,
        //     hLineColor: (i, node) => "#000000",
        //     vLineColor: (i, node) => "#000000",
        //     paddingLeft: (i, node) => 10,
        //     paddingRight: (i, node) => 10,
        //     paddingTop: (i, node) => 5,
        //     paddingBottom: (i, node) => 5,
        //   },
        // },
        // {
        //   table: {
        //     body: [
        //       ["Имя", "Фамилия", "Возраст"],
        //       ["Иван", "Иванов", 30],
        //       ["Петр", "Петров", 25],
        //       ["Иван", "Иванов", 30],
        //     ],
        //   },
        //   layout: {
        //     hLineWidth: (i, node) => 1,
        //     vLineWidth: (i, node) => 1,
        //     hLineColor: (i, node) => "#000000",
        //     vLineColor: (i, node) => "#000000",
        //     paddingLeft: (i, node) => 10,
        //     paddingRight: (i, node) => 10,
        //     paddingTop: (i, node) => 5,
        //     paddingBottom: (i, node) => 5,
        //   },
        //   background: "#F0F0F0",
        // },
        // {
        //   table: {
        //     body: [
        //       ["Иван", "Иванов", 30],
        //       ["Петр", "Петров", 25],
        //       ["Иван", "Иванов", 30],
        //     ],
        //   },
        //   layout: {
        //     hLineWidth: (i, node) => 1,
        //     vLineWidth: (i, node) => 1,
        //     hLineColor: (i, node) => "#000000",
        //     vLineColor: (i, node) => "#000000",
        //     paddingLeft: (i, node) => 10,
        //     paddingRight: (i, node) => 10,
        //     paddingTop: (i, node) => 5,
        //     paddingBottom: (i, node) => 5,
        //   },
        //   background: "red",
        // },
        // {
        //   fontSize: 9, // размер шрифта
        //   lineHeight: 1, // межстрочный интервал
        //   text: `
        //                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore etdolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ${name}Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        //                             Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat.

        //                             Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. 
        //                             Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst. Integer tempus convallis augue. 
        //                             Etiam facilisis. Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed gravida sollicitudin, felis odio placerat 
        //                             quam, ac pulvinar elit purus eget enim. Nunc vitae tortor. Proin tempus nibh sit amet nisl. Vivamus quis tortor vitae risus porta vehicula.

        //                             Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        //                             Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        //                             Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        //                             Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        //                             Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

        //                             Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, 
        //                             est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. 
        //                             Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu 
        //                             tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. 
        //                             Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. 
        //                             Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat.

        //                             Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        //                             Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        //                             Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        //                             Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        //                             Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

        //                             Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, 
        //                             est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. 
        //                             Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu 
        //                             tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. 
        //                             Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. 
        //                             Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat.

        //                             Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. 
        //                             Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst. Integer tempus convallis augue. 
        //                             Etiam facilisis. Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed gravida sollicitudin, felis odio placerat 
        //                             quam, ac pulvinar elit purus eget enim. Nunc vitae tortor. Proin tempus nibh sit amet nisl. Vivamus quis tortor vitae risus porta vehicula.
        //                             `,
        // },
        // {
        //   pageBreak: "after",
        //   table: {
        //     widths: ["*", "*"], // две равные колонки, можно указать фиксированные размеры, если нужно
        //     body: [
        //       [
        //         {
        //           text: "Левое слово",
        //           alignment: "left",
        //           border: [false, false, false, false],
        //         },
        //         {
        //           text: "Правое слово",
        //           alignment: "right",
        //           border: [false, false, false, false],
        //         },
        //       ],
        //     ],
        //   },
        //   layout: "noBorders", // или убираем границы вручную, как выше
        // },
        // {
        //   columns: [
        //     { text: "Левое слово", alignment: "left" },
        //     { text: "Правое слово", alignment: "right" },
        //   ],
        // },
        // {
        //   columns: [
        //     {
        //       // auto-sized columns have their widths based on their content
        //       width: "auto",
        //       text: "First column",
        //     },
        //     {
        //       // star-sized columns fill the remaining space
        //       // if there's more than one star-column, available width is divided equally
        //       width: "*",
        //       text: "Second column",
        //     },
        //     {
        //       // fixed width
        //       width: 100,
        //       text: "Third column",
        //     },
        //     {
        //       // % width
        //       width: "20%",
        //       text: "Fourth column",
        //     },
        //   ],
        //   // optional space between columns
        //   columnGap: 10,
        // },
        // {
        //   table: {
        //     body: [
        //       // строки 0-3
        //       [
        //         "0-0",
        //         "0-1",
        //         "0-2",
        //         "0-3",
        //         "0-4",
        //         "0-5",
        //         "0-6",
        //         "0-7",
        //         "0-8",
        //         "0-9",
        //       ],
        //       [
        //         "1-0",
        //         "1-1",
        //         "1-2",
        //         "1-3",
        //         "1-4",
        //         "1-5",
        //         "1-6",
        //         "1-7",
        //         "1-8",
        //         "1-9",
        //       ],
        //       [
        //         "2-0",
        //         "2-1",
        //         "2-2",
        //         "2-3",
        //         "2-4",
        //         "2-5",
        //         "2-6",
        //         "2-7",
        //         "2-8",
        //         "2-9",
        //       ],
        //       [
        //         "3-0",
        //         "3-1",
        //         "3-2",
        //         "3-3",
        //         "3-4",
        //         "3-5",
        //         "3-6",
        //         "3-7",
        //         "3-8",
        //         "3-9",
        //       ],

        //       // строка 4 (пятая строка: объединение по colSpan и rowSpan)
        //       [
        //         "4-0",
        //         {
        //           text: "Объединено",
        //           colSpan: 2,
        //           rowSpan: 2,
        //           alignment: "center",
        //         },
        //         "",
        //         "4-3",
        //         "4-4",
        //         "4-5",
        //         "4-6",
        //         "4-7",
        //         "4-8",
        //         "4-9",
        //       ],

        //       // строка 5 (шестая строка: под объединением — оставляем пусто)
        //       ["5-0", "", "", "5-3", "5-4", "5-5", "5-6", "5-7", "5-8", "5-9"],

        //       // остальные строки
        //       [
        //         "6-0",
        //         "6-1",
        //         "6-2",
        //         "6-3",
        //         "6-4",
        //         "6-5",
        //         "6-6",
        //         "6-7",
        //         "6-8",
        //         "6-9",
        //       ],
        //       [
        //         "7-0",
        //         "7-1",
        //         "7-2",
        //         "7-3",
        //         "7-4",
        //         "7-5",
        //         "7-6",
        //         "7-7",
        //         "7-8",
        //         "7-9",
        //       ],
        //       [
        //         "8-0",
        //         "8-1",
        //         "8-2",
        //         "8-3",
        //         "8-4",
        //         "8-5",
        //         "8-6",
        //         "8-7",
        //         "8-8",
        //         "8-9",
        //       ],
        //       [
        //         "9-0",
        //         "9-1",
        //         "9-2",
        //         "9-3",
        //         "9-4",
        //         "9-5",
        //         "9-6",
        //         "9-7",
        //         "9-8",
        //         "9-9",
        //       ],
        //     ],
        //   },
        // },
        // {
        //   layout: "lightHorizontalLines", // optional
        //   table: {
        //     // headers are automatically repeated if the table spans over multiple pages
        //     // you can declare how many rows should be treated as headers
        //     headerRows: 1,
        //     widths: ["*", "auto", 100, "*"],

        //     body: [
        //       ["First", "Second", "Third", "The last one"],
        //       ["Value 1", "Value 2", "Value 3", "Value 4"],
        //       [{ text: "Bold Val 1 ", bold: true }, "Val 2", "Val 3", "Val 4"],
        //     ],
        //   },
        // },
        // "Bulleted list example:",
        // {
        //   // to treat a paragraph as a bulleted list, set an array of items under the ul key
        //   ul: ["Item 1", "Item 2", "Item 3", { text: "Item 4", bold: true }],
        // },
        // "Numbered list example:",
        // {
        //   // for numbered lists set the ol key
        //   ol: ["Item 1", "Item 2", "Item 3"],
        // },
        // {
        //   pageBreak: "before",
        //   text: "Älem Tilsimat",
        //   link: "https://alemtilsimat.com/",
        //   fontSize: 18,
        //   bold: true,
        //   color: "blue",
        //   margin: [200, 20, 0, 10],
        // },
        // {
        //   margin: [180, 10, 0, 10],
        //   qr: "https://alemtilsimat.com/",
        //   fit: 150,
        //   eccLevel: "L",
        //   // foreground: '#00008B',
        //   // background: '#F5F5F5',
        //   // version: 5,             // Версия QR-кода (от 1 до 40)
        //   // mode: 'octet',          // Способ кодирования
        //   // mask: 2
        // },
      ],
    };

    pdfMake
      .createPdf(documentDefinition)
      .getBlob((blob) => setPdfUrl(URL.createObjectURL(blob)));
    // pdfMake.createPdf(documentDefinition).getBlob((blob) => {
    //     const url = URL.createObjectURL(blob);
    //     setPdfUrl(url);
    // });
    // pdfMake.createPdf(documentDefinition).getBlob((blob) => {
    //   const url = URL.createObjectURL(blob);
    //   const link = document.createElement('a');
    //   link.href = url;
    //   link.download = 'My_Custom_Name.pdf'; // 👈 задаёшь имя
    //   link.click();
    //   URL.revokeObjectURL(url); // Очистка URL из памяти
    // });
  };

  return (
    <div>
      <button onClick={generatePdf} disabled={!base64Image}>
        Preview PDF
      </button>

      {pdfUrl && (
        <div style={{ height: "100vh", marginTop: "20px" }}>
          <iframe src={pdfUrl} width="100%" height="100%" title="PDF Viewer" />
        </div>
      )}
    </div>
  );
};

export default PdfPage;

// import React, { useState, useEffect } from 'react';
// import pdfMake from 'pdfmake/build/pdfmake';
// import { vfs as customVfs } from './vfs_fonts'; // <-- экспортируй vfs явно
// pdfMake.vfs = customVfs;

// // import pdfFonts from 'pdfmake/build/vfs_fonts';
// // import './vfs_fonts';

// // pdfMake.vfs = pdfFonts.vfs;
// import './PdfPage.css'; // если есть

// pageBreak: 'after',
// margin: [0, 20, 0, 10],

// pageSize: 'A4',
// {
//         //             canvas: [
//         //                 {
//         //                     type: 'rect',
//         //                     x: 0,
//         //                     y: 0,
//         //                     w: 515, // ширина контента страницы (A4 = 595 - 2*40)
//         //                     h: 752, // высота контента страницы (A4 = 842 - 2*40)
//         //                     lineWidth: 1,
//         //                 }
//         //             ],
//         //             absolutePosition: { x: 40, y: 40 } // соответствует отступам
//         //         },

// const content = [
//     { text: 'Alem Tilsimat',color: 'blue', link: 'https://alemtilsimat.com/'},
//     {
//         columns: [
//             // {
//             //     width: 150,
//             //     alignment: 'center', // можно left / right / center
//             //     margin: [0, 0, 0, 20], // отступы [left, top, right, bottom]
//             //     svg: `<svg width="800px" height="800px" fill="none" viewBox="0 -4 28 28" xmlns="http://www.w3.org/2000/svg">
//             //                     <g clip-path="url(#f)">
//             //                     <rect width="28" height="20" rx="2" fill="#fff"/>
//             //                     <mask id="e" x="0" y="0" width="28" height="20" style="mask-type:alpha" maskUnits="userSpaceOnUse">
//             //                     <rect width="28" height="20" rx="2" fill="#fff"/>
//             //                     </mask>
//             //                     <g mask="url(#e)">
//             //                     <path d="M0 20H28V0H0V20Z" clip-rule="evenodd" fill="#30C375" fill-rule="evenodd"/>
//             //                     <rect x="4" width="4" height="20" fill="#DE414F"/>
//             //                     <path d="m6 4c1.1046 0 2-0.59695 2-1.3333s-0.89543-1.3333-2-1.3333-2 0.59695-2 1.3333 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
//             //                     <mask id="d" x="4" y="1" width="4" height="3" style="mask-type:alpha" maskUnits="userSpaceOnUse">
//             //                     <path d="m6 4c1.1046 0 2-0.59695 2-1.3333s-0.89543-1.3333-2-1.3333-2 0.59695-2 1.3333 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
//             //                     </mask>
//             //                     <g mask="url(#d)">
//             //                     <path d="m6.0002 3.3334c0.36819 0 0.66667-0.29848 0.66667-0.66667s-0.29848-0.66666-0.66667-0.66666-0.66666 0.29847-0.66666 0.66666 0.29847 0.66667 0.66666 0.66667z" clip-rule="evenodd" fill="#DD404F" fill-rule="evenodd"/>
//             //                     <rect x="4" y="1.3333" width="2" height="1.3333" fill="#FBAF29"/>
//             //                     <rect x="6" y="2.6667" width="2" height="1.3333" fill="#FBAF29"/>
//             //                     </g>
//             //                     <path d="m6 18.667c1.1046 0 2-0.597 2-1.3334 0-0.7363-0.89543-1.3333-2-1.3333s-2 0.597-2 1.3333c0 0.7364 0.89543 1.3334 2 1.3334z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
//             //                     <mask id="c" x="4" y="16" width="4" height="3" style="mask-type:alpha" maskUnits="userSpaceOnUse">
//             //                     <path d="m6 18.667c1.1046 0 2-0.597 2-1.3334 0-0.7363-0.89543-1.3333-2-1.3333s-2 0.597-2 1.3333c0 0.7364 0.89543 1.3334 2 1.3334z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
//             //                     </mask>
//             //                     <g mask="url(#c)">
//             //                     <path d="m6.0002 18c0.36819 0 0.66667-0.2985 0.66667-0.6666 0-0.3682-0.29848-0.6667-0.66667-0.6667s-0.66666 0.2985-0.66666 0.6667c0 0.3681 0.29847 0.6666 0.66666 0.6666z" clip-rule="evenodd" fill="#DD404F" fill-rule="evenodd"/>
//             //                     <rect x="4" y="16" width="2" height="1.3333" fill="#FBAF29"/>
//             //                     <rect x="6" y="17.333" width="2" height="1.3333" fill="#FBAF29"/>
//             //                     </g>
//             //                     <path d="m6 12c1.1046 0 2-0.597 2-1.3333 0-0.73642-0.89543-1.3334-2-1.3334s-2 0.59695-2 1.3334c0 0.7363 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#28AE67" fill-rule="evenodd"/>
//             //                     <mask id="b" x="4" y="9" width="4" height="3" style="mask-type:alpha" maskUnits="userSpaceOnUse">
//             //                     <path d="m6 12c1.1046 0 2-0.597 2-1.3333 0-0.73642-0.89543-1.3334-2-1.3334s-2 0.59695-2 1.3334c0 0.7363 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
//             //                     </mask>
//             //                     <g mask="url(#b)">
//             //                     <path d="m5.9998 11.333c0.73638 0 1.3333-0.2984 1.3333-0.6666s-0.59695-0.6667-1.3333-0.6667-1.3333 0.2985-1.3333 0.6667 0.59696 0.6666 1.3333 0.6666z" clip-rule="evenodd" fill="#DD404F" fill-rule="evenodd"/>
//             //                     </g>
//             //                     <path d="m6 14.667c1.1046 0 2-0.2985 2-0.6667s-0.89543-0.6667-2-0.6667-2 0.2985-2 0.6667 0.89543 0.6667 2 0.6667z" clip-rule="evenodd" fill="#28AE67" fill-rule="evenodd"/>
//             //                     <mask x="4" y="13" width="4" height="2" style="mask-type:alpha" maskUnits="userSpaceOnUse">
//             //                     <path d="m6 14.667c1.1046 0 2-0.2985 2-0.6667s-0.89543-0.6667-2-0.6667-2 0.2985-2 0.6667 0.89543 0.6667 2 0.6667z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
//             //                     </mask>
//             //                     <path d="m6 8c1.1046 0 2-0.59695 2-1.3333s-0.89543-1.3333-2-1.3333-2 0.59695-2 1.3333 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#FBAF29" fill-rule="evenodd"/>
//             //                     <mask id="a" x="4" y="5" width="4" height="3" style="mask-type:alpha" maskUnits="userSpaceOnUse">
//             //                     <path d="m6 8c1.1046 0 2-0.59695 2-1.3333s-0.89543-1.3333-2-1.3333-2 0.59695-2 1.3333 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
//             //                     </mask>
//             //                     <g mask="url(#a)">
//             //                     <path d="m6.0002 7.3334c0.36819 0 0.66667-0.29848 0.66667-0.66667s-0.29848-0.66666-0.66667-0.66666-0.66666 0.29847-0.66666 0.66666 0.29847 0.66667 0.66666 0.66667z" clip-rule="evenodd" fill="#DD404F" fill-rule="evenodd"/>
//             //                     <rect x="4" y="5.3333" width="1.3333" height="2.6667" fill="#28AE67"/>
//             //                     <rect x="6.6665" y="5.3333" width="1.3333" height="2.6667" fill="#28AE67"/>
//             //                     </g>
//             //                     <path d="m14.822 4.2382c-0.2367 0.28205-0.1999 0.70255 0.0822 0.93922 0.282 0.23667 0.7025 0.19988 0.9392-0.08217s0.1999-0.70256-0.0822-0.93922c-0.282-0.23667-0.7025-0.19988-0.9392 0.08217zm-1.7273 2.5845c-0.282-0.23666-0.7025-0.19988-0.9392 0.08217s-0.1999 0.70256 0.0822 0.93923c0.282 0.23666 0.7025 0.19987 0.9392-0.08218 0.2366-0.28205 0.1999-0.70255-0.0822-0.93922zm-1.3335-1.3333c-0.282-0.23667-0.7025-0.19988-0.9392 0.08217s-0.1999 0.70255 0.0822 0.93922c0.282 0.23667 0.7025 0.19988 0.9392-0.08217s0.1999-0.70255-0.0822-0.93922zm2.6665-2.6667c-0.282-0.23666-0.7025-0.19988-0.9392 0.08217s-0.1999 0.70256 0.0822 0.93923c0.282 0.23666 0.7025 0.19987 0.9392-0.08218s0.1999-0.70255-0.0822-0.93922zm-0.6665 2c-0.282-0.23666-0.7025-0.19988-0.9392 0.08217s-0.1999 0.70256 0.0822 0.93923c0.282 0.23666 0.7025 0.19987 0.9392-0.08218s0.1999-0.70255-0.0822-0.93922z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
//             //                     <path d="m17.476 9.4505c-1.588 1.5881-4.1628 1.5881-5.7508 0-0.1539-0.15387-0.2928-0.31702-0.4169-0.48763 1.5901 1.1562 3.829 1.0173 5.2632-0.4169s1.5731-3.6731 0.4169-5.2632c0.1706 0.12405 0.3338 0.26302 0.4876 0.4169 1.5881 1.588 1.5881 4.1628 0 5.7508z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
//             //                     </g>
//             //                     </g>
//             //                     <defs>
//             //                     <clipPath id="f">
//             //                     <rect width="28" height="20" rx="2" fill="#fff"/>
//             //                     </clipPath>
//             //                     </defs>
//             //                     </svg>`
//             // },
//             {
//               alignment: 'center',
//               margin: [0, 20, 0, 20],
//               text: 'Daşary ýurt raýatyna işewürlik (BS1, BS2), maýa goýum (IN), işçi (WP), maşgala (FM), Sport (SP1, SP2), ynsanperwerlik (HM), hususy (PR1, PR2), talyp (ST), syýahatçylyk (TU), üstaşyt (TR!, TR2) Saglygy bejeriş (HL), sürüjilik (DR)wazasyny resmileşdirmek üçin',
//               fontSize: 11
//             },
//             {
//                 alignment: 'center',
//                 margin: [0, 20, 0, 20],
//                 text: 'Daşary ýurt raýatyna işewürlik (BS1, BS2), maýa goýum (IN), işçi (WP), maşgala (FM), Sport (SP1, SP2), ynsanperwerlik (HM), hususy (PR1, PR2), talyp (ST), syýahatçylyk (TU), üstaşyt (TR!, TR2) Saglygy bejeriş (HL), sürüjilik (DR)wazasyny resmileşdirmek üçin',
//                 fontSize: 11
//             },
//             {
//                 width: 150,
//                 alignment: 'center', // можно left / right / center
//                 margin: [0, 20, 0, 20],// отступы[left, top, right, bottom]
//                 image: base64Image,
//             },
//         ]
//     },
// ]

// const generatePdf = () => {

//     if (!base64Image) return;

//     const qrText = JSON.stringify(content);

//     const documentDefinition = {
//         pageSize: 'A4',
//         pageOrientation: 'portrait', // landscape
//         pageMargins: [40, 40, 40, 40], // внутренние отступы
//         defaultStyle: { font: 'TimesNewRoman' },
//         footer: function (currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; },
//         // header: function (currentPage, pageCount, pageSize) {
//         //     // you can apply any logic and return any valid pdfmake element

//         //     return [
//         //         { text: 'simple text', alignment: (currentPage % 2) ? 'left' : 'right' },
//         //         { canvas: [{ type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 }] }
//         //     ]
//         // },
//         background: (currentPage, pageSize) => {
//             return {
//                 canvas: [
//                     {
//                         type: 'rect',
//                         x: 15,
//                         y: 15,
//                         w: pageSize.width - 25,
//                         h: pageSize.height - 25,
//                         lineWidth: 1,
//                     }
//                 ]
//             };
//         },
//         content: [
//             {
//                 columns: [
//                     {
//                         width: 100,
//                         alignment: 'left', // можно left / right / center
//                         margin: [0, 0, 0, 20], // отступы [left, top, right, bottom]
//                         svg: `<svg width="800px" height="800px" fill="none" viewBox="0 -4 28 28" xmlns="http://www.w3.org/2000/svg">
//                                 <g clip-path="url(#f)">
//                                 <rect width="28" height="20" rx="2" fill="#fff"/>
//                                 <mask id="e" x="0" y="0" width="28" height="20" style="mask-type:alpha" maskUnits="userSpaceOnUse">
//                                 <rect width="28" height="20" rx="2" fill="#fff"/>
//                                 </mask>
//                                 <g mask="url(#e)">
//                                 <path d="M0 20H28V0H0V20Z" clip-rule="evenodd" fill="#30C375" fill-rule="evenodd"/>
//                                 <rect x="4" width="4" height="20" fill="#DE414F"/>
//                                 <path d="m6 4c1.1046 0 2-0.59695 2-1.3333s-0.89543-1.3333-2-1.3333-2 0.59695-2 1.3333 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
//                                 <mask id="d" x="4" y="1" width="4" height="3" style="mask-type:alpha" maskUnits="userSpaceOnUse">
//                                 <path d="m6 4c1.1046 0 2-0.59695 2-1.3333s-0.89543-1.3333-2-1.3333-2 0.59695-2 1.3333 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
//                                 </mask>
//                                 <g mask="url(#d)">
//                                 <path d="m6.0002 3.3334c0.36819 0 0.66667-0.29848 0.66667-0.66667s-0.29848-0.66666-0.66667-0.66666-0.66666 0.29847-0.66666 0.66666 0.29847 0.66667 0.66666 0.66667z" clip-rule="evenodd" fill="#DD404F" fill-rule="evenodd"/>
//                                 <rect x="4" y="1.3333" width="2" height="1.3333" fill="#FBAF29"/>
//                                 <rect x="6" y="2.6667" width="2" height="1.3333" fill="#FBAF29"/>
//                                 </g>
//                                 <path d="m6 18.667c1.1046 0 2-0.597 2-1.3334 0-0.7363-0.89543-1.3333-2-1.3333s-2 0.597-2 1.3333c0 0.7364 0.89543 1.3334 2 1.3334z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
//                                 <mask id="c" x="4" y="16" width="4" height="3" style="mask-type:alpha" maskUnits="userSpaceOnUse">
//                                 <path d="m6 18.667c1.1046 0 2-0.597 2-1.3334 0-0.7363-0.89543-1.3333-2-1.3333s-2 0.597-2 1.3333c0 0.7364 0.89543 1.3334 2 1.3334z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
//                                 </mask>
//                                 <g mask="url(#c)">
//                                 <path d="m6.0002 18c0.36819 0 0.66667-0.2985 0.66667-0.6666 0-0.3682-0.29848-0.6667-0.66667-0.6667s-0.66666 0.2985-0.66666 0.6667c0 0.3681 0.29847 0.6666 0.66666 0.6666z" clip-rule="evenodd" fill="#DD404F" fill-rule="evenodd"/>
//                                 <rect x="4" y="16" width="2" height="1.3333" fill="#FBAF29"/>
//                                 <rect x="6" y="17.333" width="2" height="1.3333" fill="#FBAF29"/>
//                                 </g>
//                                 <path d="m6 12c1.1046 0 2-0.597 2-1.3333 0-0.73642-0.89543-1.3334-2-1.3334s-2 0.59695-2 1.3334c0 0.7363 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#28AE67" fill-rule="evenodd"/>
//                                 <mask id="b" x="4" y="9" width="4" height="3" style="mask-type:alpha" maskUnits="userSpaceOnUse">
//                                 <path d="m6 12c1.1046 0 2-0.597 2-1.3333 0-0.73642-0.89543-1.3334-2-1.3334s-2 0.59695-2 1.3334c0 0.7363 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
//                                 </mask>
//                                 <g mask="url(#b)">
//                                 <path d="m5.9998 11.333c0.73638 0 1.3333-0.2984 1.3333-0.6666s-0.59695-0.6667-1.3333-0.6667-1.3333 0.2985-1.3333 0.6667 0.59696 0.6666 1.3333 0.6666z" clip-rule="evenodd" fill="#DD404F" fill-rule="evenodd"/>
//                                 </g>
//                                 <path d="m6 14.667c1.1046 0 2-0.2985 2-0.6667s-0.89543-0.6667-2-0.6667-2 0.2985-2 0.6667 0.89543 0.6667 2 0.6667z" clip-rule="evenodd" fill="#28AE67" fill-rule="evenodd"/>
//                                 <mask x="4" y="13" width="4" height="2" style="mask-type:alpha" maskUnits="userSpaceOnUse">
//                                 <path d="m6 14.667c1.1046 0 2-0.2985 2-0.6667s-0.89543-0.6667-2-0.6667-2 0.2985-2 0.6667 0.89543 0.6667 2 0.6667z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
//                                 </mask>
//                                 <path d="m6 8c1.1046 0 2-0.59695 2-1.3333s-0.89543-1.3333-2-1.3333-2 0.59695-2 1.3333 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#FBAF29" fill-rule="evenodd"/>
//                                 <mask id="a" x="4" y="5" width="4" height="3" style="mask-type:alpha" maskUnits="userSpaceOnUse">
//                                 <path d="m6 8c1.1046 0 2-0.59695 2-1.3333s-0.89543-1.3333-2-1.3333-2 0.59695-2 1.3333 0.89543 1.3333 2 1.3333z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
//                                 </mask>
//                                 <g mask="url(#a)">
//                                 <path d="m6.0002 7.3334c0.36819 0 0.66667-0.29848 0.66667-0.66667s-0.29848-0.66666-0.66667-0.66666-0.66666 0.29847-0.66666 0.66666 0.29847 0.66667 0.66666 0.66667z" clip-rule="evenodd" fill="#DD404F" fill-rule="evenodd"/>
//                                 <rect x="4" y="5.3333" width="1.3333" height="2.6667" fill="#28AE67"/>
//                                 <rect x="6.6665" y="5.3333" width="1.3333" height="2.6667" fill="#28AE67"/>
//                                 </g>
//                                 <path d="m14.822 4.2382c-0.2367 0.28205-0.1999 0.70255 0.0822 0.93922 0.282 0.23667 0.7025 0.19988 0.9392-0.08217s0.1999-0.70256-0.0822-0.93922c-0.282-0.23667-0.7025-0.19988-0.9392 0.08217zm-1.7273 2.5845c-0.282-0.23666-0.7025-0.19988-0.9392 0.08217s-0.1999 0.70256 0.0822 0.93923c0.282 0.23666 0.7025 0.19987 0.9392-0.08218 0.2366-0.28205 0.1999-0.70255-0.0822-0.93922zm-1.3335-1.3333c-0.282-0.23667-0.7025-0.19988-0.9392 0.08217s-0.1999 0.70255 0.0822 0.93922c0.282 0.23667 0.7025 0.19988 0.9392-0.08217s0.1999-0.70255-0.0822-0.93922zm2.6665-2.6667c-0.282-0.23666-0.7025-0.19988-0.9392 0.08217s-0.1999 0.70256 0.0822 0.93923c0.282 0.23666 0.7025 0.19987 0.9392-0.08218s0.1999-0.70255-0.0822-0.93922zm-0.6665 2c-0.282-0.23666-0.7025-0.19988-0.9392 0.08217s-0.1999 0.70256 0.0822 0.93923c0.282 0.23666 0.7025 0.19987 0.9392-0.08218s0.1999-0.70255-0.0822-0.93922z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
//                                 <path d="m17.476 9.4505c-1.588 1.5881-4.1628 1.5881-5.7508 0-0.1539-0.15387-0.2928-0.31702-0.4169-0.48763 1.5901 1.1562 3.829 1.0173 5.2632-0.4169s1.5731-3.6731 0.4169-5.2632c0.1706 0.12405 0.3338 0.26302 0.4876 0.4169 1.5881 1.588 1.5881 4.1628 0 5.7508z" clip-rule="evenodd" fill="#fff" fill-rule="evenodd"/>
//                                 </g>
//                                 </g>
//                                 <defs>
//                                 <clipPath id="f">
//                                 <rect width="28" height="20" rx="2" fill="#fff"/>
//                                 </clipPath>
//                                 </defs>
//                             </svg>`
//                     },
//                     {
//                         text: [
//                             {
//                                 text: 'Daşary ýurt raýatyna işewürlik (BS1, BS2), maýa goýum (IN), işçi (WP), maşgala (FM), Sport (SP1, SP2), ynsanperwerlik (HM), hususy (PR1, PR2), talyp (ST), syýahatçylyk (TU), üstaşyt (TR!, TR2) Saglygy bejeriş (HL), sürüjilik (DR)wazasyny resmileşdirmek üçin',
//                                 fontSize: 14
//                             },
//                             { text: '\n\nŞAHSY KAGYZY', fontSize: 18, bold: true },

//                         ],

//                       alignment: 'center',
//                       margin: [10, 30, 10, 0],
//                       fontSize: 11

//                     },
//                     {
//                         width: 100,
//                         height: 100,
//                         alignment: 'right', // можно left / right / center
//                         margin: [0, 20, 0, 20],// отступы[left, top, right, bottom]
//                         image: base64Image,
//                         // cover: { width: 100, height: 100, valign: "bottom", align: "right" },
//                     },
//                 ]
//             },

//             'paragraph 1',
//             'paragraph 2',
//             {
//                 columns: [
//                     'first column is a simple text',
//                     {
//                         stack: [
//                             // second column consists of paragraphs
//                             'paragraph A',
//                             'paragraph B',
//                             'these paragraphs will be rendered one below another inside the column'
//                         ],
//                         fontSize: 15
//                     }
//                 ]
//             },
//             {
//                 leadingIndent: 20,// 👈 отступ только у первой строки
//                 text: [
//                     { text: `Пример документа с рамками, `, fontSize: 18 },
//                     { text: 'Продолжение ', fontSize: 18 },
//                     { text: 'Продолжение ', fontSize: 18 },
//                     { text: 'Продолжение ', fontSize: 18 },
//                     { text: 'Продолжение ', fontSize: 18 },
//                     { text: 'Продолжение ', fontSize: 18 },
//                     { text: 'Продолжение ', fontSize: 18 },
//                     { text: 'Продолжение ', fontSize: 18 },
//                     { text: 'Продолжение ', fontSize: 18 },
//                 ]
//             },
//             {
//                 text: 'Пример документа с рамками,',
//                 fontSize: 18,
//             },
//             {
//                 text: 'Продолжение',
//                 fontSize: 18,
//                 // margin: [10, 0, 0, 0]
//             },
//             {
//                 table: {
//                     // widths: ['auto', 'auto', 'auto'], //
//                     widths: ['*', '*', '*'], //
//                     body: [
//                         ['Имя', 'Фамилия', 'Возраст vervijerom erjv ewrviuewrhv'],
//                         ['Иван wvkasdk ', 'Иванов saivfoadfsjo sdfjnvdsjfk vsdkfjlnvvndsfnjkvlvl', 30],
//                         ['Петр asdvnm ', 'Петров', 25],
//                         ['Иванkm salkvjndsa asjndvj', 'Иванов', 30],
//                     ]
//                 },
//                 layout: {
//                     hLineWidth: (i, node) => 1,
//                     vLineWidth: (i, node) => 1,
//                     hLineColor: (i, node) => '#000000',
//                     vLineColor: (i, node) => '#000000',
//                     paddingLeft: (i, node) => 10,
//                     paddingRight: (i, node) => 10,
//                     paddingTop: (i, node) => 5,
//                     paddingBottom: (i, node) => 5
//                 },
//                 // widths: ['*'],
//                 background: '#F0F0F0', // Цвет фона таблицы
//                 fontSize: 9, // размер шрифта
//                 lineHeight: 1.5, // межстрочный интервал
//                 decoration: 'lineThrough', // перечеркнутый текст
//                 color: 'orange', // цвет текста
//                 // margin: [10, 10, 10, 10], // отступы
//                 italics: true, // курсив
//                 alignment: 'center' // выравнивание текста по центру
//             },
//             {
//                 table: {
//                     widths: ['*'],
//                     body: [
//                         [
//                             {
//                                 text: 'Текст с фоном, рамками и подчеркиванием',
//                                 fillColor: 'yellow',    // Цвет фона работает в таблице
//                                 color: 'red',           // Цвет текста
//                                 border: [true, true, true, true],
//                                 margin: [10, 10, 10, 10],
//                                 decoration: 'underline'
//                             }
//                         ]
//                     ]
//                 },
//                 layout: 'noBorders',
//                 // pageBreak: 'after'
//             },
//             {
//                 text: [
//                     'Текст с рамками и ',
//                     {
//                         fontSize: 14, // размер шрифта
//                         // lineHeight: 2, // межстрочный интервал
//                         text: 'подчеркнутым',
//                         decoration: 'underline',
//                         color: 'blue',
//                         // alignment: 'center'
//                     },
//                     ' словом и автоматическим ',
//                     {
//                         fontSize: 15, // размер шрифта
//                         // lineHeight: 1, // межстрочный интервал
//                         text: 'ARSDLAN',
//                         decoration: 'overline',
//                         color: 'green',

//                         bold: true
//                     },
//                     ' разбиением на страницы.'
//                 ],

//                 fontSize: 12, // размер шрифта
//                 lineHeight: 0.5, // межстрочный интервал
//                 decoration: 'lineThrough',
//                 color: 'orange',
//                 border: [true, true, true, true],
//                 margin: [10, 10, 10, 10],
//                 italics: true, // <== добавили курсив,
//                 alignment: 'center'

//                 // pageBreak: 'after',

//             },
//             {
//                 text: 'Текст с рамками и автоматическим разбиением на страницы.',
//                 border: [true, true, true, true],
//                 margin: [10, 10, 10, 10],
//                 pageBreak: 'after',
//                 decoration: 'underline',
//                 fillColor: 'yellow', // <-- цвет фона (можно hex или цвет по названию, например 'yellow')
//                 color: 'red',
//             },
//             {
//                 text: `Lorem ipsum dolor sit amet...`, // сократил для примера
//                 margin: [0, 20, 0, 10],
//             },
//             {
//                 table: {
//                     // widths: ['*'],
//                     body: [
//                         [
//                             {
//                                 text: 'Текст с фоном',
//                                 fillColor: 'yellow',
//                                 color: 'black',
//                                 border: [true, true, true, true],
//                                 margin: [10, 10, 10, 10],
//                                 decoration: 'underline'
//                             }
//                         ]

//                     ]
//                 },
//                 layout: 'noBorders',
//                 pageBreak: 'after'
//             },
//             {
//                 table: {
//                     // widths: ['*'],
//                     widths: ['auto', 'auto', 'auto'],
//                     body: [
//                         ['Имя', 'Фамилия', 'Возраст'],
//                         ['Иван', 'Иванов   ldfsvkmndsfv sdfvnmdfsjvn', 30],
//                         ['Петр', 'Петров', 25],
//                         ['Иван', 'Иванов', 30],
//                         ['Петр', 'Петров', 25],
//                         ['Иван', 'Иванов', 30],
//                         ['Петр', 'Петров', 25],
//                         ['Петр', 'Петров', 25],
//                         ['Иван', 'Иванов', 30],
//                         ['Петр', 'Петров', 25],
//                     ]
//                 },
//                 alignment: 'center',
//                 layout: {
//                     hLineWidth: (i, node) => 1,
//                     vLineWidth: (i, node) => 1,
//                     hLineColor: (i, node) => '#000000',
//                     vLineColor: (i, node) => '#000000',
//                     paddingLeft: (i, node) => 10,
//                     paddingRight: (i, node) => 10,
//                     paddingTop: (i, node) => 5,
//                     paddingBottom: (i, node) => 5
//                 },
//             },
//             {
//                 table: {
//                     body: [
//                         ['Имя', 'Фамилия', 'Возраст'],
//                         ['Иван', 'Иванов', 30],
//                         ['Петр', 'Петров', 25],
//                         ['Иван', 'Иванов', 30],
//                     ]
//                 },
//                 layout: {
//                     hLineWidth: (i, node) => 1,
//                     vLineWidth: (i, node) => 1,
//                     hLineColor: (i, node) => '#000000',
//                     vLineColor: (i, node) => '#000000',
//                     paddingLeft: (i, node) => 10,
//                     paddingRight: (i, node) => 10,
//                     paddingTop: (i, node) => 5,
//                     paddingBottom: (i, node) => 5
//                 },
//                 background: '#F0F0F0',
//             },
//             {
//                 table: {
//                     body: [
//                         ['Иван', 'Иванов', 30],
//                         ['Петр', 'Петров', 25],
//                         ['Иван', 'Иванов', 30],
//                     ]
//                 },
//                 layout: {
//                     hLineWidth: (i, node) => 1,
//                     vLineWidth: (i, node) => 1,
//                     hLineColor: (i, node) => '#000000',
//                     vLineColor: (i, node) => '#000000',
//                     paddingLeft: (i, node) => 10,
//                     paddingRight: (i, node) => 10,
//                     paddingTop: (i, node) => 5,
//                     paddingBottom: (i, node) => 5
//                 },
//                 background: 'red',
//             },
//             {
//                 fontSize: 9, // размер шрифта
//                 lineHeight: 1, // межстрочный интервал
//                 text: `
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore etdolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ${name}Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//                                 Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat.

//                                 Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi.
//                                 Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst. Integer tempus convallis augue.
//                                 Etiam facilisis. Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed gravida sollicitudin, felis odio placerat
//                                 quam, ac pulvinar elit purus eget enim. Nunc vitae tortor. Proin tempus nibh sit amet nisl. Vivamus quis tortor vitae risus porta vehicula.

//                                 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                                 Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//                                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//                                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
//                                 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

//                                 Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra,
//                                 est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.
//                                 Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu
//                                 tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.
//                                 Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque.
//                                 Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat.

//                                 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                                 Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//                                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//                                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
//                                 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

//                                 Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra,
//                                 est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.
//                                 Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu
//                                 tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.
//                                 Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque.
//                                 Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat.

//                                 Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi.
//                                 Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst. Integer tempus convallis augue.
//                                 Etiam facilisis. Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed gravida sollicitudin, felis odio placerat
//                                 quam, ac pulvinar elit purus eget enim. Nunc vitae tortor. Proin tempus nibh sit amet nisl. Vivamus quis tortor vitae risus porta vehicula.
//                                 `,
//             },
//             {
//                 pageBreak: 'after',
//                 table: {
//                     widths: ['*', '*'], // две равные колонки, можно указать фиксированные размеры, если нужно
//                     body: [
//                         [
//                             { text: 'Левое слово', alignment: 'left', border: [false, false, false, false] },
//                             { text: 'Правое слово', alignment: 'right', border: [false, false, false, false] }
//                         ]
//                     ]
//                 },
//                 layout: 'noBorders' // или убираем границы вручную, как выше
//             },
//             {
//                 columns: [
//                     { text: 'Левое слово', alignment: 'left' },
//                     { text: 'Правое слово', alignment: 'right' }
//                 ]
//             },
//             {
//                 columns: [
//                     {
//                         // auto-sized columns have their widths based on their content
//                         width: 'auto',
//                         text: 'First column'
//                     },
//                     {
//                         // star-sized columns fill the remaining space
//                         // if there's more than one star-column, available width is divided equally
//                         width: '*',
//                         text: 'Second column'
//                     },
//                     {
//                         // fixed width
//                         width: 100,
//                         text: 'Third column'
//                     },
//                     {
//                         // % width
//                         width: '20%',
//                         text: 'Fourth column'
//                     }
//                 ],
//                 // optional space between columns
//                 columnGap: 10

//             },
//             {
//                 table: {
//                   body: [
//                     // строки 0-3
//                     ['0-0', '0-1', '0-2', '0-3', '0-4', '0-5', '0-6', '0-7', '0-8', '0-9'],
//                     ['1-0', '1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-7', '1-8', '1-9'],
//                     ['2-0', '2-1', '2-2', '2-3', '2-4', '2-5', '2-6', '2-7', '2-8', '2-9'],
//                     ['3-0', '3-1', '3-2', '3-3', '3-4', '3-5', '3-6', '3-7', '3-8', '3-9'],

//                     // строка 4 (пятая строка: объединение по colSpan и rowSpan)
//                     ['4-0', { text: 'Объединено', colSpan: 2, rowSpan: 2, alignment: 'center' }, '','4-3', '4-4', '4-5', '4-6', '4-7', '4-8', '4-9'
//                     ],

//                     // строка 5 (шестая строка: под объединением — оставляем пусто)
//                     ['5-0', '', '', '5-3', '5-4', '5-5', '5-6', '5-7', '5-8', '5-9'],

//                     // остальные строки
//                     ['6-0', '6-1', '6-2', '6-3', '6-4', '6-5', '6-6', '6-7', '6-8', '6-9'],
//                     ['7-0', '7-1', '7-2', '7-3', '7-4', '7-5', '7-6', '7-7', '7-8', '7-9'],
//                     ['8-0', '8-1', '8-2', '8-3', '8-4', '8-5', '8-6', '8-7', '8-8', '8-9'],
//                     ['9-0', '9-1', '9-2', '9-3', '9-4', '9-5', '9-6', '9-7', '9-8', '9-9'],
//                   ]
//                 }
//               },
//             {

//                 layout: 'lightHorizontalLines', // optional
//                 table: {
//                     // headers are automatically repeated if the table spans over multiple pages
//                     // you can declare how many rows should be treated as headers
//                     headerRows: 1,
//                     widths: ['*', 'auto', 100, '*'],

//                     body: [
//                         ['First', 'Second', 'Third', 'The last one'],
//                         ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
//                         [{ text: 'Bold Val 1 ', bold: true }, 'Val 2', 'Val 3', 'Val 4']
//                     ]
//                 }
//             },
//             'Bulleted list example:',
//             {
//                 // to treat a paragraph as a bulleted list, set an array of items under the ul key
//                 ul: [
//                     'Item 1',
//                     'Item 2',
//                     'Item 3',
//                     { text: 'Item 4', bold: true },
//                 ]
//             },
//             'Numbered list example:',
//             {
//                 // for numbered lists set the ol key
//                 ol: [
//                     'Item 1',
//                     'Item 2',
//                     'Item 3'
//                 ]
//             },
//             {
//                 pageBreak: 'before',
//                 text: 'Älem Tilsimat',
//                 link: 'https://alemtilsimat.com/',
//                 fontSize: 18,
//                 bold: true,
//                 color: 'blue',
//                 margin: [200, 20, 0, 10],
//             },
//             {
//                 margin: [180, 10, 0, 10],
//                 qr: 'https://alemtilsimat.com/',
//                 fit: 150,
//                 eccLevel: 'L',
//                 // foreground: '#00008B',
//                 // background: '#F5F5F5',
//                 // version: 5,             // Версия QR-кода (от 1 до 40)
//                 // mode: 'octet',          // Способ кодирования
//                 // mask: 2
//             },

//         ]
//     };
