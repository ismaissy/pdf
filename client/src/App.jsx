import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { data } from './utils/data';
import ic_pdf from './assets/svg/ic_pdf.svg';

import Profile from './vms/components/profile/Profile';
import BelligeAlmak from "./vms/components/belligeAlmak/BelligeAlmak";
import BlankPasportChalshmakHasabaDurmok from './vms/components/pasportChalshmakHasabaDurmok/BlankPasportChalshmakHasabaDurmok';
import TablePasportChalshmakHasabaDurmok from './vms/components/pasportChalshmakHasabaDurmok/TablePasportChalshmakHasabaDurmok';
import BlankIshlemaneRugsotEdilenYerler from './vms/components/ishlemaneRugsotEdilenYerler/BlankIshlemaneRugsotEdilenYerler';
import BlankIkiToOneGezekligeOwurmek from './vms/components/ikiToOneGezekligeOwurmek/BlankIkiToOneGezekligeOwurmek';
import TableIshlemaneRugsotEdilenYerler from './vms/components/ishlemaneRugsotEdilenYerler/TableIshlemaneRugsotEdilenYerler';
import BlankWizaRugsotnamaYatyrmak from './vms/components/wizaRugsotnamaYatyrmak/BlankWizaRugsotnamaYatyrmak';
import TableWizaRugsotnamaYatyrmak from './vms/components/wizaRugsotnamaYatyrmak/TableWizaRugsotnamaYatyrmak';
import BlankAdresUytketmekShaherIchinde from './vms/components/adresUytketmekShaherIchinde/BlankAdresUytketmekShaherIchinde';
import TableAdresUytketmekShaherIchinde from './vms/components/adresUytketmekShaherIchinde/TableAdresUytketmekShaherIchinde';
import BlankWShShW from './vms/components/wShShW/BlankWShShW';
import TableWShShW from './vms/components/wShShW/TableWShShW';
import BlankHasapdanChykmak from './vms/components/hasapdanChykmak/BlankHasapdanChykmak';
import TableHasapdanChykmak from './vms/components/hasapdanChykmak/TableHasapdanChykmak';
import BlankKomandirowochnye from './vms/components/komandirowochnye/BlankKomandirowochnye';
import TableKomandirowochnye from './vms/components/komandirowochnye/TableKomandirowochnye';
import BlankPasportChalshmak from './vms/components/pasportChalshmak/BlankPasportChalshmak';
import TablePasportChalshmak from './vms/components/pasportChalshmak/TablePasportChalshmak';
import BlankVizaUzaltmak from './vms/components/vizaUzaltmak/BlankVizaUzaltmak';
import TableVizaUzaltmak from './vms/components/vizaUzaltmak/TableVizaUzaltmak';
import BlankHasabaAlmak from './vms/components/hasabaAlmak/BlankHasabaAlmak';
import TableHasabaAlmak from './vms/components/hasabaAlmak/TableHasabaAlmak';
import BlankKonselari from "./vms/components/konselari/BlankKonselari";
import BlankYashamalyYeri from "./vms/components/yashamalyYeri/BlankYashamalyYeri";

const componentMap = {
    BlankPasportChalshmakHasabaDurmok, TablePasportChalshmakHasabaDurmok,

    BlankIkiToOneGezekligeOwurmek,

    BlankIshlemaneRugsotEdilenYerler, TableIshlemaneRugsotEdilenYerler,

    BlankWizaRugsotnamaYatyrmak, TableWizaRugsotnamaYatyrmak,

    BlankAdresUytketmekShaherIchinde, TableAdresUytketmekShaherIchinde,

    BlankWShShW, TableWShShW,

    BlankHasapdanChykmak, TableHasapdanChykmak,

    BlankKomandirowochnye, TableKomandirowochnye,

    BlankPasportChalshmak, TablePasportChalshmak,

    BlankVizaUzaltmak, TableVizaUzaltmak,

    BlankHasabaAlmak, TableHasabaAlmak,

    Profile,
    BlankKonselari,
    BlankYashamalyYeri,
    BelligeAlmak,
};

export default function App() {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const SelectedComponent = selectedComponent ? componentMap[selectedComponent] : null;
    const handleSelect = (name) => setSelectedComponent(name);

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
                <Dropdown onSelect={handleSelect}>
                    <Dropdown.Toggle variant="primary" size="sm" id="dropdown-basic">
                        <img src={ic_pdf} alt="pdf icon" style={{ width: 20, height: 20, margin: 8 }} />
                        {selectedComponent?.replace(/([A-Z])/g, ' $1').trim() || <>"Selcet Document PDF preview"</>}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {Object.keys(componentMap).map((key) => (
                            <Dropdown.Item key={key} eventKey={key}>
                                <img src={ic_pdf} alt="pdf icon" style={{ width: 16, height: 16, marginRight: 8 }} />
                                {/* // ([A-Z]) - finds every capital letter. ' $1' - adds a space before it. .trim() - removes the extra space at the beginning of the line. */}
                                {key.replace(/([A-Z])/g, ' $1').trim()}
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