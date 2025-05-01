
/** This is default data for object pdfmake */

export const pageSize = 'A4';
export const PORTRAIT = 'portrait';
export const font = 'TimesNewRoman';
export const valign = 'middle';
export const alignment = 'center';
export const bold = true;
export const italics = true;
export const noWrap = true;
export const fontSize = 14;
export const fontSizeTable = 10;
export const fontSizeBlankHeader = 15; // Belgi: 8/-620 Sene: 29.08.2024 
export const fontSizeTableHeader = 12; // Belgi: 8/-620 Sene: 29.08.2024 Tablisiya dokumendyn shapkasynda ulonylya
export const leadingIndent = 20;
export const pageMarginsBlank = [40, 20, 50, 70];
export const pageMarginsTable = [10, 20, 10, 10];
export const tableBodyStyle = { alignment, valign };
export const COMPANY_POLICY_RESPONSIBILITY = {
    leadingIndent, fontSize, alignment: 'justify',
    text: [
        { text: 'Daşary ýurt raýatynyň Türkmenistana gelmeginiň, onda bolmagynyň we ondan ' },
        { text: 'gitmeginiň düzgünlerini berjaý etmegine jogapkärçiligi kompaniýamyz öz üstüne alýar.' },
    ]
};

export const TimesNewRomanObject = {
    TimesNewRoman: {
        normal: "TIMES.TTF",
        bold: "TIMESBD.TTF",
        italics: "TIMESI.TTF",
        bolditalics: "TIMESBI.TTF",
    },
};

export const COMPANY_DATA = {
    name: 'Gap inşaat',
    linkName: 'gapinsaat.com',
    link: 'https://gapinsaat.com/tr/index.html',
    email: 'info@gapinsaat.com',
    phoneNumberOne: '+993 12 75 60 70',
    phoneNumberTwo: '+993 12 75 70 57',
    fax: '+993 12 75 57 55',
    city: 'Aşgabat şäheri',
    street: 'Bitarap Türkmenistan şaýoly, 538',
};

export const layoutTable = {
    hLineWidth: () => 1,
    vLineWidth: () => 1,
    hLineColor: () => '#000000',
    vLineColor: () => '#000000',
    paddingTop: () => 5,
    paddingBottom: () => 5,
};