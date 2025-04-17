// // import React from 'react';
// // import {
// //     Document,
// //     Page,
// //     Text,
// //     View,
// //     StyleSheet,
// //     PDFViewer,
// //     Image,
// // } from '@react-pdf/renderer';

// // const styles = StyleSheet.create({
// //     page: {
// //         padding: 30,
// //         fontSize: 12,
// //         position: 'relative',
// //     },
// //     pageWrapper: {
// //         border: '2px solid #000', // Рамка вокруг всей страницы
// //         height: '100%', // Высота на всю страницу
// //         padding: 20, // Отступы внутри рамки
// //     },
// //     section: {
// //         marginBottom: 20,
// //     },
// //     heading: {
// //         fontSize: 16,
// //         marginBottom: 10,
// //         fontWeight: 'bold',
// //     },
// //     table: {
// //         display: 'table',
// //         width: '100%',
// //         marginBottom: 20,
// //     },
// //     tableRow: {
// //         flexDirection: 'row',
// //     },
// //     tableColHeader: {
// //         width: '25%', // Можно подкорректировать ширину
// //         border: '1px solid #000',
// //         backgroundColor: '#eee',
// //         padding: 4,
// //         textAlign: 'center', // Выравнивание заголовка по центру
// //     },
// //     tableCol: {
// //         width: '25%', // Можно подкорректировать ширину
// //         border: '1px solid #000',
// //         padding: 4,
// //         textAlign: 'center', // Выравнивание данных по центру
// //     },
// //     image: {
// //         width: 100,
// //         height: 100,
// //         marginBottom: 10,
// //     },
// // });

// // // Пример данных
// // const users = [
// //     {
// //         firstName: 'Ivan',
// //         lastName: 'Ivanow',
// //         age: 30,
// //         address: 'Tam tut guda suda gde-tam gdeto-tut'
// //     },
// //     {
// //         firstName: 'Petr',
// //         lastName: 'Petrow',
// //         age: 25,
// //         address: 'Tam tut guda suda gde-tam gdeto-tut Tam tut guda suda gde-tam gdeto-tut Tam tut guda suda gde-tam gdeto-tut'
// //     },
// // ];

// // const orders = [
// //     { id: 1, item: 'Ноутбук', price: '2000$' },
// //     { id: 2, item: 'Монитор', price: '500$' },
// // ];

// // // PDF документ
// // const MyDocument = () => (
// //     <Document>
// //         <Page size="A4" style={styles.page}>
// //             <View style={styles.pageWrapper}>
// //                 <View style={styles.section}>
// //                     <Text style={styles.heading}>👤 List users</Text>
// //                     <View style={styles.table}>
// //                         <View style={styles.tableRow}>
// //                             <Text style={styles.tableColHeader}>Name</Text>
// //                             <Text style={styles.tableColHeader}>LastName</Text>
// //                             <Text style={styles.tableColHeader}>Age</Text>
// //                             <Text style={styles.tableColHeader}>Address</Text>
// //                         </View>
// //                         {users.map((u, i) => (
// //                             <View style={styles.tableRow} key={i}>
// //                                 <Text style={styles.tableCol}>{u.firstName}</Text>
// //                                 <Text style={styles.tableCol}>{u.lastName}</Text>
// //                                 <Text style={styles.tableCol}>{u.age}</Text>
// //                                 <Text style={styles.tableCol}>{u.address}</Text>
// //                             </View>
// //                         ))}
// //                     </View>
// //                 </View>

// //                 <View style={styles.section}>
// //                     <Text style={styles.heading}>📦 Список заказов</Text>
// //                     <View style={styles.table}>
// //                         <View style={styles.tableRow}>
// //                             <Text style={styles.tableColHeader}>ID</Text>
// //                             <Text style={styles.tableColHeader}>Товар</Text>
// //                             <Text style={styles.tableColHeader}>Цена</Text>
// //                         </View>
// //                         {orders.map((o, i) => (
// //                             <View style={styles.tableRow} key={i}>
// //                                 <Text style={styles.tableCol}>{o.id}</Text>
// //                                 <Text style={styles.tableCol}>{o.item}</Text>
// //                                 <Text style={styles.tableCol}>{o.price}</Text>
// //                             </View>
// //                         ))}
// //                     </View>
// //                 </View>

// //                 <View style={styles.section}>
// //                     <Text style={styles.heading}>🖼 Фото</Text>
// //                     <Image style={styles.image} src="https://via.placeholder.com/100" />
// //                     <Text>Описание к фото: тестовое изображение</Text>
// //                 </View>
// //             </View>
// //         </Page>
// //         {/* Дополнительные страницы можно добавить точно так же */}
// //         <Page size="A4" style={styles.page}>
// //             <View style={styles.pageWrapper}>
// //                 <Text style={{ marginBottom: 20 }}>Контент второй страницы...</Text>
// //             </View>
// //         </Page>
// //     </Document>
// // );

// // // Preview + кнопка
// // const PdfPage = () => (
// //     <div>
// //         <h2>Предпросмотр PDF</h2>
// //         <div style={{ height: '100vh', border: '1px solid #ccc' }}>
// //             <PDFViewer width="100%" height="100%">
// //                 <MyDocument />
// //             </PDFViewer>
// //         </div>
// //         <br />
// //     </div>
// // );

// // export default PdfPage;

// import jpgImage from './1.jpg';
// import React, { useState, useEffect } from 'react';
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';

// pdfMake.vfs = pdfFonts.vfs;

// const PdfPage = () => {
//     const [pdfUrl, setPdfUrl] = useState(null);
//     const [base64Image, setBase64Image] = useState(null);

//     // Конвертируем jpg в base64 при загрузке компонента
//     useEffect(() => {
//         const toBase64 = async () => {
//             const response = await fetch(jpgImage);
//             const blob = await response.blob();
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setBase64Image(reader.result);
//             };
//             reader.readAsDataURL(blob);
//         };

//         toBase64();
//     }, []);

//     const generatePdf = () => {
//         if (!base64Image) return;
//         // const documentDefinition = {
//         //     pageSize: 'A4',
//         //     pageMargins: [40, 40, 40, 40], // внутренние отступы
//         //     content: [
//         //         // Рамка
//         //         {
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

//         //         // Основной текст поверх рамки
//         //         {
//         //             text: 'Это контент внутри рамки',
//         //             pageBreak: 'after',
//         //             margin: [0, 20, 0, 0], // немного отступа сверху
//         //         },
//         //         {
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
//         //         {
//         //             text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
//         //             Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
//         //             Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
//         //             Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
//         //             Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

//         //             Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, 
//         //             est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. 
//         //             Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu 
//         //             tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. 
//         //             Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. 
//         //             Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat.

//         //             Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. 
//         //             Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst. Integer tempus convallis augue. 
//         //             Etiam facilisis. Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed gravida sollicitudin, felis odio placerat 
//         //             quam, ac pulvinar elit purus eget enim. Nunc vitae tortor. Proin tempus nibh sit amet nisl. Vivamus quis tortor vitae risus porta vehicula.

//         //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
//         //             Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
//         //             Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
//         //             Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
//         //             Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

//         //             Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, 
//         //             est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. 
//         //             Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu 
//         //             tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. 
//         //             Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. 
//         //             Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat.

//         //             Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. 
//         //             Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst. Integer tempus convallis augue. 
//         //             Etiam facilisis. Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed gravida sollicitudin, felis odio placerat 
//         //             quam, ac pulvinar elit purus eget enim. Nunc vitae tortor. Proin tempus nibh sit amet nisl. Vivamus quis tortor vitae risus porta vehicula.
//         //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
//         //             Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
//         //             Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
//         //             Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
//         //             Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

//         //             Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, 
//         //             est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. 
//         //             Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu 
//         //             tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. 
//         //             Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. 
//         //             Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat.

//         //             Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. 
//         //             Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst. Integer tempus convallis augue. 
//         //             Etiam facilisis. Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed gravida sollicitudin, felis odio placerat 
//         //             quam, ac pulvinar elit purus eget enim. Nunc vitae tortor. Proin tempus nibh sit amet nisl. Vivamus quis tortor vitae risus porta vehicula.

//         //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
//         //             Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
//         //             Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
//         //             Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
//         //             Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

//         //             Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, 
//         //             est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. 
//         //             Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu 
//         //             tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. 
//         //             Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. 
//         //             Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat.

//         //             Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. 
//         //             Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst. Integer tempus convallis augue. 
//         //             Etiam facilisis. Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed gravida sollicitudin, felis odio placerat 
//         //             quam, ac pulvinar elit purus eget enim. Nunc vitae tortor. Proin tempus nibh sit amet nisl. Vivamus quis tortor vitae risus porta vehicula.
//         //             `,
//         //             pageBreak: 'after',
//         //         },
//         //     ]
//         // };

//         const name = "Ivanjan"

//         const documentDefinition = {
//             pageSize: 'A4',
//             pageMargins: [40, 40, 40, 40], // внутренние отступы
//             background: function (currentPage, pageSize) {
//                 return {
//                     canvas: [
//                         {
//                             type: 'rect',
//                             x: 10,
//                             y: 10,
//                             w: pageSize.width - 20,
//                             h: pageSize.height - 20,
//                             lineWidth: 1,
//                         }
//                     ]
//                 };
//             },
//             content: [
//                 {
//                     text: 'Пример документа с рамками, текстами и таблицами',
//                     fontSize: 18,
//                     margin: [0, 0, 0, 20],
//                 },
//                 {
//                     text: 'Текст с рамками и автоматическим разбиением на страницы.',
//                     border: [true, true, true, true],
//                     margin: [10, 10, 10, 10],
//                     pageBreak: 'after',
//                 },
//                 {
//                     text: `Lorem ipsum dolor sit amet...`, // сократил для примера
//                     margin: [0, 20, 0, 10],
//                 },
//                 {
//                     table: {
//                         body: [
//                             ['Имя', 'Фамилия', 'Возраст'],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             ['Иван', 'Иванов', 30],
//                             ['Петр', 'Петров', 25],
//                             // ... и так далее
//                         ]
//                     }
//                 },
//                 {
//                     text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
//                                 Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
//                                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
//                                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
//                                 ${name}
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
//                 },
//             ]
//         };



//         pdfMake.createPdf(documentDefinition).getBlob((blob) => {
//             const url = URL.createObjectURL(blob);
//             setPdfUrl(url);
//         });
//     };

//     return (
//         <div>
//             <button onClick={generatePdf} disabled={!base64Image}>
//                 Создать PDF
//             </button>

//             {pdfUrl && (
//                 <div style={{ height: '80vh', marginTop: '20px' }}>
//                     <iframe
//                         src={pdfUrl}
//                         width="100%"
//                         height="100%"
//                         title="PDF Viewer"
//                     />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PdfPage;



// import React, { useState, useEffect } from 'react';
// import pdfMake from 'pdfmake/build/pdfmake';
// import { vfs as customVfs } from './vfs_fonts'; // <-- экспортируй vfs явно
// pdfMake.vfs = customVfs;

// // import pdfFonts from 'pdfmake/build/vfs_fonts';
// // import './vfs_fonts';

// // pdfMake.vfs = pdfFonts.vfs;
// import './PdfPage.css'; // если есть
import jpgImage from './1.jpg';
import React, { useState, useEffect } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import { vfs as customVfs } from './vfs_fonts'; // <-- правильно

pdfMake.vfs = customVfs;

pdfMake.fonts = {
    TimesNewRoman: {
        normal: 'TIMES.TTF',
        bold: 'TIMESBD.TTF',
        italics: 'TIMESI.TTF',
        bolditalics: 'TIMESBI.TTF',
    }
};



const PdfPage = () => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [base64Image, setBase64Image] = useState(null);

    // Конвертируем jpg в base64 при загрузке компонента
    useEffect(() => {
        const toBase64 = async () => {
            const response = await fetch(jpgImage);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64Image(reader.result);
            };
            reader.readAsDataURL(blob);
        };

        toBase64();
    }, []);

    const tab = "    ";

    const generatePdf = () => {

        if (!base64Image) return;
        const name = "Ivanjan"
        const documentDefinition = {
            pageSize: 'A4',
            pageMargins: [40, 40, 40, 40], // внутренние отступы
            defaultStyle: {
                font: 'TimesNewRoman' // <-- установить шрифт по умолчанию
            },
            // fonts: {
            //     TimesNewRoman: {
            //         normal: 'TIMES.TTF',
            //         bold: 'TIMESBD.TTF',
            //         italics: 'TIMESI.TTF',
            //         bolditalics: 'TIMESBI.TTF'
            //     }
            // },
            background: function (currentPage, pageSize) {
                return {
                    canvas: [
                        {
                            type: 'rect',
                            x: 10,
                            y: 10,
                            w: pageSize.width - 20,
                            h: pageSize.height - 20,
                            lineWidth: 1,
                        }
                    ]
                };
            },
            content: [
                {
                    leadingIndent: 20,// 👈 отступ только у первой строки
                    text: [

                        {
                            // margin: [10, 0, 0, 0],
                            text: `${tab}Пример документа с рамками, `,
                            fontSize: 18
                        },
                        { text: 'Продолжение ', fontSize: 18 },
                        { text: 'Продолжение ', fontSize: 18 },
                        { text: 'Продолжение ', fontSize: 18 },
                        { text: 'Продолжение ', fontSize: 18 },
                        { text: 'Продолжение ', fontSize: 18 },
                        { text: 'Продолжение ', fontSize: 18 },
                        { text: 'Продолжение ', fontSize: 18 },
                        { text: 'Продолжение ', fontSize: 18 },
                    ]
                },
                {
                    text: 'Пример документа с рамками,',
                    fontSize: 18,
                },
                {
                    text: 'Продолжение',
                    fontSize: 18,
                    // margin: [10, 0, 0, 0]
                },
                {
                    table: {
                        widths: ['auto', 'auto', 'auto'], //
                        body: [
                            ['Имя', 'Фамилия', 'Возраст vervijerom erjv ewrviuewrhv'],
                            ['Иван wvkasdk ', 'Иванов saivfoadfsjo sdfjnvdsjfk vsdkfjlnvvndsfnjkvlvl', 30],
                            ['Петр asdvnm ', 'Петров', 25],
                            ['Иванkm salkvjndsa asjndvj', 'Иванов', 30],
                        ]
                    },
                    layout: {
                        hLineWidth: function (i, node) {
                            return 1; // Толщина горизонтальных линий
                        },
                        vLineWidth: function (i, node) {
                            return 1; // Толщина вертикальных линий
                        },
                        hLineColor: function (i, node) {
                            return '#000000'; // Цвет горизонтальных линий
                        },
                        vLineColor: function (i, node) {
                            return '#000000'; // Цвет вертикальных линий
                        },
                        paddingLeft: function (i, node) { return 10; },
                        paddingRight: function (i, node) { return 10; },
                        paddingTop: function (i, node) { return 5; },
                        paddingBottom: function (i, node) { return 5; }
                    },
                    // widths: ['*'],
                    background: '#F0F0F0', // Цвет фона таблицы
                    fontSize: 9, // размер шрифта
                    lineHeight: 1.5, // межстрочный интервал
                    decoration: 'lineThrough', // перечеркнутый текст
                    color: 'orange', // цвет текста
                    // margin: [10, 10, 10, 10], // отступы
                    italics: true, // курсив
                    alignment: 'center' // выравнивание текста по центру
                },
                {
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                {
                                    text: 'Текст с фоном, рамками и подчеркиванием',
                                    fillColor: 'yellow',    // Цвет фона работает в таблице
                                    color: 'red',           // Цвет текста
                                    border: [true, true, true, true],
                                    margin: [10, 10, 10, 10],
                                    decoration: 'underline'
                                }
                            ]
                        ]
                    },
                    layout: 'noBorders',
                    // pageBreak: 'after'
                },
                {
                    text: [
                        'Текст с рамками и ',
                        {
                            fontSize: 14, // размер шрифта
                            // lineHeight: 2, // межстрочный интервал
                            text: 'подчеркнутым',
                            decoration: 'underline',
                            color: 'blue',
                            // alignment: 'center'
                        },
                        ' словом и автоматическим ',
                        {
                            fontSize: 15, // размер шрифта
                            // lineHeight: 1, // межстрочный интервал
                            text: 'ARSDLAN',
                            decoration: 'overline',
                            color: 'green',

                            bold: true
                        },
                        ' разбиением на страницы.'
                    ],

                    fontSize: 12, // размер шрифта
                    lineHeight: 0.5, // межстрочный интервал
                    decoration: 'lineThrough',
                    color: 'orange',
                    border: [true, true, true, true],
                    margin: [10, 10, 10, 10],
                    italics: true, // <== добавили курсив,
                    alignment: 'center'

                    // pageBreak: 'after',

                },
                {
                    text: 'Текст с рамками и автоматическим разбиением на страницы.',
                    border: [true, true, true, true],
                    margin: [10, 10, 10, 10],
                    pageBreak: 'after',
                    decoration: 'underline',
                    fillColor: 'yellow', // <-- цвет фона (можно hex или цвет по названию, например 'yellow')
                    color: 'red',
                },
                {
                    text: `Lorem ipsum dolor sit amet...`, // сократил для примера
                    margin: [0, 20, 0, 10],
                },
                {
                    table: {
                        // widths: ['*'],
                        body: [
                            [
                                {
                                    text: 'Текст с фоном',
                                    fillColor: 'yellow',
                                    color: 'black',
                                    border: [true, true, true, true],
                                    margin: [10, 10, 10, 10],
                                    decoration: 'underline'
                                }
                            ]

                        ]
                    },
                    layout: 'noBorders',
                    pageBreak: 'after'
                },
                {
                    table: {
                        // widths: ['*'],
                        widths: ['auto', 'auto', 'auto'],
                        body: [
                            ['Имя', 'Фамилия', 'Возраст'],
                            ['Иван', 'Иванов   ldfsvkmndsfv sdfvnmdfsjvn', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                        ]
                    },
                    alignment: 'center',
                    layout: {
                        hLineWidth: function (i, node) {
                            return 1; // Толщина горизонтальных линий
                        },
                        vLineWidth: function (i, node) {
                            return 1; // Толщина вертикальных линий
                        },
                        hLineColor: function (i, node) {
                            return '#000000'; // Цвет горизонтальных линий
                        },
                        vLineColor: function (i, node) {
                            return '#000000'; // Цвет вертикальных линий
                        },
                        paddingLeft: function (i, node) { return 10; },
                        paddingRight: function (i, node) { return 10; },
                        paddingTop: function (i, node) { return 5; },
                        paddingBottom: function (i, node) { return 5; }
                    },
                },
                {
                    table: {
                        body: [
                            ['Имя', 'Фамилия', 'Возраст'],
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                        ]
                    },
                    layout: {
                        hLineWidth: function (i, node) {
                            return 1; // Толщина горизонтальных линий
                        },
                        vLineWidth: function (i, node) {
                            return 1; // Толщина вертикальных линий
                        },
                        hLineColor: function (i, node) {
                            return '#000000'; // Цвет горизонтальных линий
                        },
                        vLineColor: function (i, node) {
                            return '#000000'; // Цвет вертикальных линий
                        },
                        paddingLeft: function (i, node) { return 10; },
                        paddingRight: function (i, node) { return 10; },
                        paddingTop: function (i, node) { return 5; },
                        paddingBottom: function (i, node) { return 5; }
                    },
                    background: '#F0F0F0', //
                },
                {
                    table: {
                        body: [
                            ['Иван', 'Иванов', 30],
                            ['Петр', 'Петров', 25],
                            ['Иван', 'Иванов', 30],
                        ]
                    },
                    layout: {
                        hLineWidth: function (i, node) {
                            return 1; // Толщина горизонтальных линий
                        },
                        vLineWidth: function (i, node) {
                            return 1; // Толщина вертикальных линий
                        },
                        hLineColor: function (i, node) {
                            return '#000000'; // Цвет горизонтальных линий
                        },
                        vLineColor: function (i, node) {
                            return '#000000'; // Цвет вертикальных линий
                        },
                        paddingLeft: function (i, node) { return 10; },
                        paddingRight: function (i, node) { return 10; },
                        paddingTop: function (i, node) { return 5; },
                        paddingBottom: function (i, node) { return 5; }
                    },
                },
                {
                    fontSize: 12, // размер шрифта
                    lineHeight: 1.5, // межстрочный интервал
                    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore etdolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ${name}
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, 
                                est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. 
                                Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu 
                                tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. 
                                Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. 
                                Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat.
            
                                Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. 
                                Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst. Integer tempus convallis augue. 
                                Etiam facilisis. Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed gravida sollicitudin, felis odio placerat 
                                quam, ac pulvinar elit purus eget enim. Nunc vitae tortor. Proin tempus nibh sit amet nisl. Vivamus quis tortor vitae risus porta vehicula.
            
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            
                                Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, 
                                est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. 
                                Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu 
                                tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. 
                                Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. 
                                Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat.
    
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            
                                Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, 
                                est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. 
                                Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu 
                                tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. 
                                Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. 
                                Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat.
            
                                Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. 
                                Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst. Integer tempus convallis augue. 
                                Etiam facilisis. Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed gravida sollicitudin, felis odio placerat 
                                quam, ac pulvinar elit purus eget enim. Nunc vitae tortor. Proin tempus nibh sit amet nisl. Vivamus quis tortor vitae risus porta vehicula.
                                `,
                },

            ]
        };



        pdfMake.createPdf(documentDefinition).getBlob((blob) => {
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
        });
    };

    return (
        <div>
            <button onClick={generatePdf} disabled={!base64Image}>Создать PDF</button>

            {pdfUrl && (
                <div style={{ height: '100vh', marginTop: '20px' }}>
                    <iframe
                        src={pdfUrl}
                        width="100%"
                        height="100%"
                        title="PDF Viewer"
                    />
                </div>
            )}
        </div>
    );
};

export default PdfPage;