import { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { data } from "./utils/data";

import PasportChalshmakHasabaDurmok from "./componens/PasportChalshmakHasabaDurmok";
import Profile from "./componens/Profile";
import Konselari from "./componens/Konselari";
import HasapdanChykarmak from "./componens/HasapdanChykarmak";
import ListForeignCitizens from "./componens/ListForeignCitizens";
import YashamalyYeri from "./componens/YashamalyYeri";
import BelligeAlmak from "./componens/BelligeAlmak";

const componentMap = {
    PasportChalshmakHasabaDurmok,
    Profile,
    Konselari,
    HasapdanChykarmak,
    ListForeignCitizens,
    YashamalyYeri,
    BelligeAlmak,
};

export default function AppBackup() {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const SelectedComponent = selectedComponent ? componentMap[selectedComponent] : null;
    const handleSelect = (name) => setSelectedComponent(name);

    return (
        <div>
            {/* <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", margin: "20px" }}>
                {Object.keys(componentMap).map((key) => (
                    <Button variant="primary" size="sm" key={key} onClick={() => handleSelect(key)}>{key}</Button>
                ))}
            </div> */}
            <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
                <Dropdown onSelect={handleSelect}>
                    <Dropdown.Toggle variant="primary" size="sm" id="dropdown-basic">
                        {selectedComponent || "Selcet Document PDF preview"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {Object.keys(componentMap).map((key) => (
                            <Dropdown.Item key={key} eventKey={key}>{key}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div style={{ height: "100vh", width: "100%" }}>
                {SelectedComponent && <SelectedComponent data={data} />}
            </div>
        </div>
    );
}