// const fs = require("fs");
// const QRCode = require("qrcode");
// const {
//     Document,
//     Packer,
//     Paragraph,
//     Table,
//     TableCell,
//     TableRow,
//     WidthType,
//     TextRun,
//     PageBreak,
//     ImageRun
// } = require("docx");

// // Создание таблицы
// const createTable = (data) =>
//     new Table({
//         rows: data.map(row =>
//             new TableRow({
//                 children: row.map(cell =>
//                     new TableCell({
//                         children: [new Paragraph(cell)],
//                     })
//                 ),
//             })
//         ),
//         width: {
//             size: 100,
//             type: WidthType.PERCENTAGE,
//         },
//     });

// // Пример данных
// const userDataPage1 = [
//     ["Имя", "Иван Иванов"],
//     ["Должность", "Разработчик"],
//     ["Email", "ivan@example.com"],
//     ["Телефон", "+7 777 777 77 77"],
// ];

// const userDataPage2 = [
//     ["Адрес", "г. Алматы, ул. Примерная, 123"],
//     ["Дата рождения", "01.01.1990"],
//     ["Статус", "Активный"],
//     ["Подпись", "___________________"],
// ];

// // 🔽 Генерация QR-кода и создание документа
// QRCode.toDataURL("https://example.com/profile/ivan_ivanov", async (err, dataUrl) => {
//     if (err) throw err;

//     // Убираем prefix `data:image/png;base64,`
//     const base64Image = dataUrl.replace(/^data:image\/png;base64,/, "");
//     const imageBuffer = Buffer.from(base64Image, "base64");

//     const doc = new Document({
//         sections: [
//             {
//                 properties: {},
//                 children: [
//                     new Paragraph({ text: "Информация о пользователе (стр. 1)", heading: "Heading1" }),
//                     createTable(userDataPage1),

//                     new Paragraph({
//                         children: [
//                             new TextRun("QR-код профиля:"),
//                         ],
//                     }),
//                     new Paragraph({
//                         children: [
//                             new ImageRun({
//                                 data: imageBuffer,
//                                 transformation: {
//                                     width: 100,
//                                     height: 100,
//                                 },
//                             }),
//                         ],
//                     }),

//                     new Paragraph({ children: [new PageBreak()] }),

//                     new Paragraph({ text: "Дополнительная информация (стр. 2)", heading: "Heading1" }),
//                     createTable(userDataPage2),
//                 ],
//             },
//         ],
//     });

//     const buffer = await Packer.toBuffer(doc);
//     fs.writeFileSync("user-info-with-qr.docx", buffer);
//     console.log("Файл сохранён: user-info-with-qr.docx");
// });


const fs = require("fs");
const QRCode = require("qrcode");
const {
    Document,
    Packer,
    Paragraph,
    Table,
    TableCell,
    TableRow,
    WidthType,
    TextRun,
    PageBreak,
    ImageRun
} = require("docx");

// Создание таблицы
const createTable = (data) =>
    new Table({
        rows: data.map(row =>
            new TableRow({
                children: row.map(cell =>
                    new TableCell({
                        children: [new Paragraph(cell)],
                    })
                ),
            })
        ),
        width: {
            size: 100,
            type: WidthType.PERCENTAGE,
        },
    });

// Пример данных
const userDataPage1 = [
    ["Имя", "Иван Иванов"],
    ["Должность", "Разработчик"],
    ["Email", "ivan@example.com"],
    ["Телефон", "+7 777 777 77 77"],
];

const userDataPage2 = [
    ["Адрес", "г. Алматы, ул. Примерная, 123"],
    ["Дата рождения", "__________ (выберите дату вручную)"],
    ["Статус", "Активный"],
    ["Подпись", "___________________"],
];

// Генерация QR-кода и создание документа
QRCode.toDataURL("https://example.com/profile/ivan_ivanov", async (err, dataUrl) => {
    if (err) throw err;

    const base64Image = dataUrl.replace(/^data:image\/png;base64,/, "");
    const imageBuffer = Buffer.from(base64Image, "base64");

    const doc = new Document({
        sections: [
            {
                properties: {},
                children: [
                    new Paragraph({ text: "Информация о пользователе (стр. 1)", heading: "Heading1" }),
                    createTable(userDataPage1),

                    new Paragraph({
                        children: [
                            new TextRun("QR-код профиля:"),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new ImageRun({
                                data: imageBuffer,
                                transformation: {
                                    width: 100,
                                    height: 100,
                                },
                            }),
                        ],
                    }),

                    new Paragraph({ children: [new PageBreak()] }),

                    new Paragraph({ text: "Дополнительная информация (стр. 2)", heading: "Heading1" }),
                    createTable(userDataPage2),
                ],
            },
        ],
    });

    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync("user-info-with-datepicker.docx", buffer);
    console.log("Файл сохранён: user-info-with-datepicker.docx");
});