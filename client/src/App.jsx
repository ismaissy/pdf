import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { data } from "./utils/data";
import ic_pdf from "./assets/svg/ic_pdf.svg";

import BlankPasportChalshmakHasabaDurmok from "./vms/components/pasportChalshmakHasabaDurmok/BlankPasportChalshmakHasabaDurmok";
import TableBlankPasportChalshmakHasabaDurmok from "./vms/components/pasportChalshmakHasabaDurmok/TableBlankPasportChalshmakHasabaDurmok";
import BlankIshlemaneRugsotEdilenYerler from "./vms/components/ishlemaneRugsotEdilenYerler/BlankIshlemaneRugsotEdilenYerler";
import BlankIkiToOneGezekligeOwurmek from "./vms/components/ikiToOneGezekligeOwurmek/BlankIkiToOneGezekligeOwurmek";
import TableIkiToOneGezekligeOwurmek from "./vms/components/ikiToOneGezekligeOwurmek/TableIkiToOneGezekligeOwurmek";

import Profile from "./componens/Profile";
import Konselari from "./componens/Konselari";
import HasapdanChykarmak from "./componens/HasapdanChykarmak";
import ListForeignCitizens from "./componens/ListForeignCitizens";
import YashamalyYeri from "./componens/YashamalyYeri";
import BelligeAlmak from "./componens/BelligeAlmak";

const componentMap = {
    BlankPasportChalshmakHasabaDurmok,
    TableBlankPasportChalshmakHasabaDurmok,
    BlankIshlemaneRugsotEdilenYerler,
    BlankIkiToOneGezekligeOwurmek,
    TableIkiToOneGezekligeOwurmek,
    // Profile,
    // Konselari,
    // HasapdanChykarmak,
    // ListForeignCitizens,
    // YashamalyYeri,
    // BelligeAlmak,
};

export default function App() {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const SelectedComponent = selectedComponent ? componentMap[selectedComponent] : null;
    const handleSelect = (name) => setSelectedComponent(name);

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
                <Dropdown onSelect={handleSelect}>
                    <Dropdown.Toggle variant="primary" size="sm" id="dropdown-basic">{
                        selectedComponent || <>
                            <img src={ic_pdf} alt="pdf icon" style={{ width: 20, height: 20, margin: 8 }} />
                            "Selcet Document PDF preview"
                        </>}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {Object.keys(componentMap).map((key) => (
                            <Dropdown.Item key={key} eventKey={key}>
                                <img src={ic_pdf} alt="pdf icon" style={{ width: 16, height: 16, marginRight: 8 }} />
                                {key}
                            </Dropdown.Item>
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