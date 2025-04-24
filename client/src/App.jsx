import { useState } from "react";
import { Button } from "react-bootstrap";
import { data } from "./utils/data";

import Profile from "./componens/Profile";
import Konselari from "./componens/Konselari";
import HasapdanChykarmak from "./componens/HasapdanChykarmak";
import ListForeignCitizens from "./componens/ListForeignCitizens";
import YashamalyYeri from "./componens/YashamalyYeri";
import BelligeAlmak from "./componens/BelligeAlmak";
import PasportChalshmakHasabaDurmok from "./componens/PasportChalshmakHasabaDurmok";

const componentMap = {
    Profile,
    Konselari,
    HasapdanChykarmak,
    ListForeignCitizens,
    YashamalyYeri,
    BelligeAlmak,
    PasportChalshmakHasabaDurmok
};

export default function App() {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const SelectedComponent = selectedComponent ? componentMap[selectedComponent] : null;
    const handleSelect = (name) => setSelectedComponent(name);

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", margin: "20px" }}>
                {Object.keys(componentMap).map((key) => (
                    <Button variant="primary" size="sm" key={key} onClick={() => handleSelect(key)}>{key}</Button>
                ))}
            </div>

            <div style={{ height: "100vh", width: "100%" }}>
                {SelectedComponent && <SelectedComponent data={data} />}
            </div>
        </div>
    );
}