export default class Table {
    /**
     * @param {Array} thead          - array of column definitions ({ name, attr, width, style })
     * @param {Array} data           - array of objects representing each row’s data
     * @param {string|object} layout - pdfMake layout identifier or custom layout object
     * @param {object} style         - additional pdfMake styling (e.g., fontSize, margin)
     */
    constructor(thead, data, layout, style) {
        // Build an array of column widths from thead definitions or fallback to 'auto'
        const widths = thead.map(th => th.width || 'auto');

        // Construct the header row: each header cell uses the name and center alignment
        const headerRow = thead.map(th => ({ text: th.name, bold: true, alignment: 'center', ...th.style }));

        // Build the data rows
        const bodyRows = data.map((item, rowIndex) =>
            thead.map((th, colIndex) => ({
                ...th.style,
                text: th.value(item, rowIndex)
            }))
        );

        // Combine header and data rows into the final pdfMake table definition
        this.table = {
            ...style,     // Spread any top-level styling options (fontSize, margin, etc.)
            layout,       // Apply the specified layout (e.g., 'lightHorizontalLines')
            table: {
                headerRows: 1,      // Repeat the first row on every new page
                widths,             // Column widths array
                body: [
                    headerRow,        // First row: headers
                    ...bodyRows       // Subsequent rows: data
                ]
            }
        };
    }
}



// // Utility function to extract text from an item based on the given attribute(s)
// function getCellText(item, attr) {

//     // If attr is an array, join multiple fields with a space
//     if (Array.isArray(attr)) {
//         return attr.map(a => item[a] ?? '').join(' '); // safely get each property or empty string
//     }

//     // If attr is a string containing spaces, split and treat as multiple keys
//     if (typeof attr === 'string' && attr.includes(' ')) {
//         return attr.split(' ').map(a => item[a] ?? '').join(' ');
//     }

//     return item[attr] ?? ''; // Otherwise, return the single property or an empty string
// }

// export default class Table {
//     /**
//      * @param {boolean} indexFlag    - if true, insert row numbers in the first column
//      * @param {Array} thead          - array of column definitions ({ name, attr, width, style })
//      * @param {Array} data           - array of objects representing each row’s data
//      * @param {string|object} layout - pdfMake layout identifier or custom layout object
//      * @param {object} style         - additional pdfMake styling (e.g., fontSize, margin)
//      */
//     constructor(indexFlag, thead, data, layout, style) {
//         // Build an array of column widths from thead definitions or fallback to 'auto'
//         const widths = thead.map(th => th.width || 'auto');

//         // Construct the header row: each header cell uses the name and center alignment
//         const headerRow = thead.map(th => ({
//             text: th.name,
//             bold: true,
//             alignment: 'center',
//             ...th.style
//         }));

//         // Build the data rows
//         const bodyRows = data.map((item, rowIndex) =>
//             thead.map((th, colIndex) => ({
//                 ...th.style,
//                 // If indexFlag is true and this is the first column, use the row number
//                 text: th.value(item);
//                     // indexFlag && colIndex === 0
//                     //     ? String(rowIndex + 1)
//                     //     : getCellText(item, th.attr)
//             }))
//         );

//         // Combine header and data rows into the final pdfMake table definition
//         this.table = {
//             ...style,     // Spread any top-level styling options (fontSize, margin, etc.)
//             layout,       // Apply the specified layout (e.g., 'lightHorizontalLines')
//             table: {
//                 headerRows: 1,      // Repeat the first row on every new page
//                 widths,             // Column widths array
//                 body: [
//                     headerRow,        // First row: headers
//                     ...bodyRows       // Subsequent rows: data
//                 ]
//             }
//         };
//     }
// }

// // export default class Table {

// //     constructor(indexFlag, thead, data,  layout, style) {

// //         const widths = thead.map((th) => th.width);

// //         const headerRow = thead.map(th => ({ text: th.name, bold: true, alignment: 'center' }));

// //         const bodyRows = data.map((item, rowIndex) =>
// //             thead.map((th, colIndex) => ({
// //                 ...th.style,
// //                 text: indexFlag && colIndex === 0 ? String(rowIndex + 1) : (item[th.attr] || ''),
// //             }))
// //         );

// //         this.table = {
// //             ...style,
// //             layout,
// //             table: {
// //                 headerRows: 1,
// //                 widths,
// //                 body: [
// //                     headerRow,
// //                     ...bodyRows
// //                 ]
// //             }
// //         };
// //     }
// // }
