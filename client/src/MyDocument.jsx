// // // // import React from 'react';
// // // // import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// // // // const styles = StyleSheet.create({
// // // //     page: {
// // // //         padding: 40,
// // // //         fontSize: 12,
// // // //         flexDirection: 'column',
// // // //     },
// // // //     box: {
// // // //         border: '1pt solid black',
// // // //         padding: 10,
// // // //         minHeight: 700,
// // // //     },
// // // //     text: {
// // // //         marginBottom: 5,
// // // //         lineHeight: 1.5,
// // // //     },
// // // // });

// // // // const MyDocument = ({ longText }) => {
// // // //     const paragraphs = longText.split('\n').map((line, index) => (
// // // //         <Text key={index} style={styles.text}>
// // // //             {line}
// // // //         </Text>
// // // //     ));

// // // //     return (
// // // //         <Document>
// // // //             <Page size="A4" style={styles.page}>
// // // //                 <View style={styles.box}>{paragraphs}</View>
// // // //             </Page>
// // // //         </Document>
// // // //     );
// // // // };

// // // // export default MyDocument;


// // // import React from 'react';
// // // import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
// // // import jpgImage from './1.jpg';


// // // const styles = StyleSheet.create({
// // //     page: {
// // //         padding: 20,
// // //         fontSize: 12,
// // //         flexDirection: 'column',
// // //     },
// // //     box: {
// // //         border: '1pt solid black',
// // //         padding: 10,
// // //         height: '100%', // важное изменение — растягиваем рамку
// // //         justifyContent: 'flex-start',
// // //     },
// // //     text: {
// // //         marginBottom: 5,
// // //         lineHeight: 1.5,
// // //     },
// // // });

// // // const linesPerPage = 45; // примерно, зависит от fontSize и lineHeight

// // // const MyDocument = ({ longText }) => {
// // //     const lines = longText.split('\n');
// // //     const pages = [];

// // //     for (let i = 0; i < lines.length; i += linesPerPage) {
// // //         const chunk = lines.slice(i, i + linesPerPage);
// // //         pages.push(chunk);
// // //     }

// // //     return (
// // //         <Document>
// // //             {pages.map((pageLines, idx) => (
// // //                 <Page size="A4" style={styles.page} key={idx}>
// // //                     <View style={styles.box}>
// // //                         {pageLines.map((line, index) => (
// // //                             <Text key={index} style={styles.text}>
// // //                                 {line}
// // //                             </Text>
// // //                         ))}
// // //                     </View>
// // //                 </Page>
// // //             ))}
// // //         </Document>
// // //     );
// // // };

// // // export default MyDocument;

// // import React from 'react';
// // import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
// // import jpgImage from './1.jpg'; // Импорт изображения

// // const styles = StyleSheet.create({
// //     page: {
// //         padding: 20,
// //         fontSize: 12,
// //         flexDirection: 'column',
// //     },
// //     box: {
// //         border: '1pt solid black',
// //         padding: 10,
// //         height: '100%',
// //         justifyContent: 'flex-start',
// //         position: 'relative',
// //     },
// //     text: {
// //         marginBottom: 5,
// //         lineHeight: 1.5,
// //         zIndex: 1,
// //     },
// //     image: {
// //         position: 'absolute',
// //         top: 10,
// //         left: 10,
// //         width: 100,
// //         height: 100,
// //         opacity: 0.2, // делаем немного прозрачным для фона, можно убрать
// //         zIndex: 0,
// //     },
// // });

// // const linesPerPage = 45;

// // const MyDocument = ({ longText }) => {
// //     const lines = longText.split('\n');
// //     const pages = [];

// //     for (let i = 0; i < lines.length; i += linesPerPage) {
// //         const chunk = lines.slice(i, i + linesPerPage);
// //         pages.push(chunk);
// //     }

// //     return (
// //         <Document>
// //             {pages.map((pageLines, idx) => (
// //                 <Page size="A4" style={styles.page} key={idx}>
// //                     <View style={styles.box}>
// //                         {/* Вставляем изображение внутрь рамки */}
// //                         <Image src={jpgImage} style={styles.image} />
// //                         {pageLines.map((line, index) => (
// //                             <Text key={index} style={styles.text}>
// //                                 {line}
// //                             </Text>
// //                         ))}
// //                     </View>
// //                 </Page>
// //             ))}
// //         </Document>
// //     );
// // };
// import React from 'react';
// import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
// import jpgImage from './1.jpg'; // Импорт изображения

// const styles = StyleSheet.create({
//     page: {
//         padding: 20,
//         fontSize: 12,
//         flexDirection: 'column',
//     },
//     box: {
//         border: '1pt solid black',
//         padding: 10,
//         height: '100%',
//         justifyContent: 'flex-start',
//         position: 'relative',
//     },
//     text: {
//         marginBottom: 5,
//         lineHeight: 1.5,
//         zIndex: 1,
//     },
//     image: {
//         position: 'absolute',
//         top: 10,
//         left: 10,
//         width: 100,
//         height: 100,
//         opacity: 0.2, // можно убрать для четкости
//         zIndex: 0,
//     },
//     table: {
//         marginTop: 20,
//         border: '1pt solid black',
//         width: '100%',
//         borderCollapse: 'collapse',
//     },
//     tableHeader: {
//         backgroundColor: '#f2f2f2',
//         padding: 5,
//         fontWeight: 'bold',
//     },
//     tableRow: {
//         flexDirection: 'row',
//     },
//     tableCell: {
//         padding: 5,
//         borderBottom: '1pt solid black',
//         width: '33%',
//     },
// });

// const linesPerPage = 40;

// const MyDocument = ({ longText, person }) => {
//     const lines = longText.split('\n');
//     const pages = [];

//     for (let i = 0; i < lines.length; i += linesPerPage) {
//         const chunk = lines.slice(i, i + linesPerPage);
//         pages.push(chunk);
//     }

//     return (
//         <Document>
//             {pages.map((pageLines, idx) => (
//                 <Page size="A4" style={styles.page} key={idx}>
//                     <View style={styles.box}>
//                         {/* Вставляем изображение */}
//                         <Image src={jpgImage} style={styles.image} />

//                         {/* Текстовый контент */}
//                         {pageLines.map((line, index) => (
//                             <Text key={index} style={styles.text}>
//                                 {line}
//                             </Text>
//                         ))}

//                         {/* Таблица с данными */}
//                         <View style={styles.table}>
//                             <View style={styles.tableRow}>
//                                 <Text style={styles.tableHeader}>First Name</Text>
//                                 <Text style={styles.tableHeader}>Last Name</Text>
//                                 <Text style={styles.tableHeader}>Age</Text>
//                             </View>
//                             <View style={styles.tableRow}>
//                                 <Text style={styles.tableCell}>{person.firstName}</Text>
//                                 <Text style={styles.tableCell}>{person.lastName}</Text>
//                                 <Text style={styles.tableCell}>{person.age}</Text>
//                             </View>
//                         </View>
//                     </View>
//                 </Page>
//             ))}
//         </Document>
//     );
// };

// export default MyDocument;
// MyDocument.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import jpgImage from './1.jpg'; // добавили изображение

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 12,
        flexDirection: 'column',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    box: {
        border: '1pt solid black',
        padding: 10,
        marginBottom: 20,
        minHeight: 700,
    },
    text: {
        marginBottom: 5,
        lineHeight: 1.5,
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableColHeader: {
        width: '33.33%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#eee',
        padding: 5,
        fontWeight: 'bold',
    },
    tableCol: {
        width: '33.33%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
    },
});

const MyDocument = ({ longText, person = {} }) => {
    const paragraphs = longText.split('\n').map((line, index) => (
        <Text key={index} style={styles.text}>
            {line}
        </Text>
    ));

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Image src={jpgImage} style={styles.image} />
                <View style={styles.box}>{paragraphs}</View>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableColHeader}>Ady</Text>
                        <Text style={styles.tableColHeader}>Familiýasy</Text>
                        <Text style={styles.tableColHeader}>Ýaşy</Text>
                        <Text style={styles.tableColHeader}>Age</Text>
                        <Text style={styles.tableColHeader}>Age</Text>
                        <Text style={styles.tableColHeader}>Age</Text>
                        <Text style={styles.tableColHeader}>Age</Text>
                        <Text style={styles.tableColHeader}>Age</Text>
                        <Text style={styles.tableColHeader}>Age</Text>
                        <Text style={styles.tableColHeader}>Age</Text>
                        <Text style={styles.tableColHeader}>Age</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCol}>{'Azat'}</Text>
                        <Text style={styles.tableCol}>{'Perhat'}</Text>
                        <Text style={styles.tableCol}>{'Juma'}</Text>
                        <Text style={styles.tableCol}>{'Juma'}</Text>
                        <Text style={styles.tableCol}>{'Juma'}</Text>
                        <Text style={styles.tableCol}>{'Juma'}</Text>
                        <Text style={styles.tableCol}>{'Juma'}</Text>
                        <Text style={styles.tableCol}>{'Juma'}</Text>
                        <Text style={styles.tableCol}>{'Juma'}</Text>
                        <Text style={styles.tableCol}>{'Juma'}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default MyDocument;
