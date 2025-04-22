import React, { useState } from 'react';
import Profile from './componens/Profile';
import Konselari from './componens/Konselari';
import HasapdanChykarmak from './componens/HasapdanChykarmak';
import ListForeignCitizens from './componens/ListForeignCitizens';
import YashamalyYeri from './componens/YashamalyYeri';
import BelligeAlmak from './componens/BelligeAlmak';

export default function App() {

    const data = {
        firstName: "Hokuto",
        lastName: "HANDA",
        middleName: "Amanowic",
        birthDay: "16.05.1967",
        bornCountry: "JPN, Tokyo/Ýaponiýa",
        citizenship: "JPN",
        passport: "TZ1132601, 20.50.2016 ý, 20.05.2026 ý.",
        studyOfCountry: "Ýokary, JPN, Keio Uniwersiteti",
        major: "Himiýa Inzenerligi",
        position: "Infrastruktura taslamalary müdirliginiň baş menejerniň orunbasary",
        asNo: '3/-183',
        date: '03.03.2025',
        severity: true,
        border: 'Balkan welaýatynyň Garabogaz şäherinde',
        organization: 'karbanit öndürýan zawodyny gurmak',
    };

    return (
        <div className="App">
            <h1>PDF Preview and Download</h1>
            <Profile profile={data} />
            <Konselari data={data} />
            <HasapdanChykarmak data={data} />
            <ListForeignCitizens data={data} />
            <YashamalyYeri data={data} />
            <BelligeAlmak profile={data} />
        </div>
    );
};