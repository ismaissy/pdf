// import Profile from './componens/Profile';
// import Konselari from './componens/Konselari';
// import HasapdanChykarmak from './componens/HasapdanChykarmak';
// import ListForeignCitizens from './componens/ListForeignCitizens';
// import YashamalyYeri from './componens/YashamalyYeri';
// import BelligeAlmak from './componens/BelligeAlmak';


// const data = {
//     firstName: "Hokuto",
//     lastName: "HANDA",
//     middleName: "Amanowic",
//     birthDay: "16.05.1967",
//     bornCountry: "JPN, Tokyo/Ýaponiýa",
//     citizenship: "JPN",
//     passport: "TZ1132601, 20.50.2016 ý, 20.05.2026 ý.",
//     studyOfCountry: "Ýokary, JPN, Keio Uniwersiteti",
//     major: "Himiýa Inzenerligi",
//     position: "Infrastruktura taslamalary müdirliginiň baş menejerniň orunbasary",
//     asNo: '3/-183',
//     date: '03.03.2025',
//     severity: true,
//     border: 'Balkan welaýatynyň Garabogaz şäherinde',
//     organization: 'karbanit öndürýan zawodyny gurmak',
// };

// export default function App() {
//     return (
//         <div className="App" style={{
//             display: "flex",
//             flexDirection: "row",
//             gap: "10px",
//             flexWrap: "wrap",
//             marginBottom: "20px"
//         }}>
//             <h1>PDF Preview and Download</h1>
//             <Profile profile={data} />
//             <Konselari data={data} />
//             <HasapdanChykarmak data={data} />
//             <ListForeignCitizens data={data} />
//             <YashamalyYeri data={data} />
//             <BelligeAlmak profile={data} />
//         </div>
//     );
// };

import { useState } from "react";
import Profile from "./componens/Profile";
import Konselari from "./componens/Konselari";
import HasapdanChykarmak from "./componens/HasapdanChykarmak";
import ListForeignCitizens from "./componens/ListForeignCitizens";
import YashamalyYeri from "./componens/YashamalyYeri";
import BelligeAlmak from "./componens/BelligeAlmak";
import { Button } from "react-bootstrap";

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
    asNo: "3/-183",
    date: "03.03.2025",
    severity: true,
    border: "Balkan welaýatynyň Garabogaz şäherinde",
    organization: "karbanit öndürýan zawodyny gurmak",
};

const componentMap = {
    Profile,
    Konselari,
    HasapdanChykarmak,
    ListForeignCitizens,
    YashamalyYeri,
    BelligeAlmak,
};

export default function App() {
    const [selectedComponent, setSelectedComponent] = useState(null);

    const handleSelect = (name) => {
        setSelectedComponent(name);
    };

    const SelectedComponent = selectedComponent ? componentMap[selectedComponent] : null;

    return (
        <div>
            <h1>PDF Preview and Download</h1>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
                {Object.keys(componentMap).map((key) => (
                    <Button variant="primary" key={key} onClick={() => handleSelect(key)}>
                        {key}
                    </Button>
                ))}
            </div>

            <div style={{ height: "100vh", width: "100%" }}>
                {/* 📄 Отображение выбранного компонента */}
                {SelectedComponent && <SelectedComponent data={data} />}
            </div>
        </div>
    );
}
