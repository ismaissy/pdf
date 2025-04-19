import React from 'react';
import PdfPage from './PdfPage'; // Путь укажи в зависимости от структуры проекта
import Profile from './componens/Profile';
import Konselari from './componens/Konselari';

export default function App() {
    return (
        // <div className="App">
        //     <h1>PDF Preview and Download</h1>
        //     {/* <PdfPage />  Testowy ichinde example kan shon uchin delete etmedim*/}
        // </div>

        <div className="App">
            <h1>PDF Preview and Download</h1>
            <Profile />
            <Konselari />
        </div>
    );
};