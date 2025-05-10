import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './vms/pages/Main';
import { data } from './utils/data';
import BlankAdresUytketmekShaherIchinde from './vms/components/adresUytketmekShaherIchinde/BlankAdresUytketmekShaherIchinde';
import TableAdresUytketmekShaherIchinde from './vms/components/adresUytketmekShaherIchinde/TableAdresUytketmekShaherIchinde';
import BelligeAlmak from './vms/components/belligeAlmak/BelligeAlmak';
import BlankHasabaAlmak from './vms/components/hasabaAlmak/BlankHasabaAlmak';
import TableHasabaAlmak from './vms/components/hasabaAlmak/TableHasabaAlmak';
import BlankHasapdanChykmak from './vms/components/hasapdanChykmak/BlankHasapdanChykmak';
import TableHasapdanChykmak from './vms/components/hasapdanChykmak/TableHasapdanChykmak';
import BlankIkiToOneGezekligeOwurmek from './vms/components/ikiToOneGezekligeOwurmek/BlankIkiToOneGezekligeOwurmek';
import BlankIshlemaneRugsotEdilenYerler from './vms/components/ishlemaneRugsotEdilenYerler/BlankIshlemaneRugsotEdilenYerler';
import TableIshlemaneRugsotEdilenYerler from './vms/components/ishlemaneRugsotEdilenYerler/TableIshlemaneRugsotEdilenYerler';
import BlankKomandirowochnye from './vms/components/komandirowochnye/BlankKomandirowochnye';
import TableKomandirowochnye from './vms/components/komandirowochnye/TableKomandirowochnye';
import BlankKonselari from './vms/components/konselari/BlankKonselari';
import TableKonselari from './vms/components/konselari/TableKonselari';
import BlankPasportChalshmak from './vms/components/pasportChalshmak/BlankPasportChalshmak';
import TablePasportChalshmak from './vms/components/pasportChalshmak/TablePasportChalshmak';
import BlankPasportChalshmakHasabaDurmok from './vms/components/pasportChalshmakHasabaDurmok/BlankPasportChalshmakHasabaDurmok';
import TablePasportChalshmakHasabaDurmok from './vms/components/pasportChalshmakHasabaDurmok/TablePasportChalshmakHasabaDurmok';
import Profile from './vms/components/profile/Profile';
import BlankVizaUzaltmak from './vms/components/vizaUzaltmak/BlankVizaUzaltmak';
import TableVizaUzaltmak from './vms/components/vizaUzaltmak/TableVizaUzaltmak';
import BlankWizaRugsotnamaYatyrmak from './vms/components/wizaRugsotnamaYatyrmak/BlankWizaRugsotnamaYatyrmak';
import TableWizaRugsotnamaYatyrmak from './vms/components/wizaRugsotnamaYatyrmak/TableWizaRugsotnamaYatyrmak';
import BlankWShShW from './vms/components/wShShW/BlankWShShW';
import TableWShShW from './vms/components/wShShW/TableWShShW';
import BlankYashamalyYeri from './vms/components/yashamalyYeri/BlankYashamalyYeri';


import BlankTaslamanynKepilligi from './vms/components/taslamanynKepilligi/BlankTaslamanynKepilligi';
import TableTaslamanynKepilligi from './vms/components/taslamanynKepilligi/TableTaslamanynKepilligi';


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main />} />

                <Route path='/preview-doc/blank/adres-uytketmek-shaher-ichinde' element={<BlankAdresUytketmekShaherIchinde />} />
                <Route path='/preview-doc/table/adres-uytketmek-shaher-ichinde' element={<TableAdresUytketmekShaherIchinde />} />

                <Route path='/preview-doc/bellige-almak' element={<BelligeAlmak />} />

                <Route path='/preview-doc/blank/hasaba-almak' element={<BlankHasabaAlmak />} />
                <Route path='/preview-doc/table/hasaba-almak' element={<TableHasabaAlmak />} />

                <Route path='/preview-doc/blank/hasaba-chykarmak' element={<BlankHasapdanChykmak />} />
                <Route path='/preview-doc/table/hasaba-chykarmak' element={<TableHasapdanChykmak />} />

                <Route path='/preview-doc/blank/iki-to-one-owurmek' element={<BlankIkiToOneGezekligeOwurmek />} />

                <Route path='/preview-doc/blank/ishlemane-rugsot-edilen-yerler' element={<BlankIshlemaneRugsotEdilenYerler />} />
                <Route path='/preview-doc/table/ishlemane-rugsot-edilen-yerler' element={<TableIshlemaneRugsotEdilenYerler />} />

                <Route path='/preview-doc/blank/komandirowachnye' element={<BlankKomandirowochnye />} />
                <Route path='/preview-doc/table/komandirowachnye' element={<TableKomandirowochnye />} />

                <Route path='/preview-doc/blank/konselari' element={<BlankKonselari data={data} />} />
                <Route path='/preview-doc/table/konselari' element={<TableKonselari data={data} />} />

                <Route path='/preview-doc/blank/pasport-chalshmak' element={<BlankPasportChalshmak />} />
                <Route path='/preview-doc/table/pasport-chalshmak' element={<TablePasportChalshmak />} />

                <Route path='/preview-doc/blank/pasport-chalshmak-hasaba-durmok' element={<BlankPasportChalshmakHasabaDurmok />} />
                <Route path='/preview-doc/table/pasport-chalshmak-hasaba-durmok' element={<TablePasportChalshmakHasabaDurmok />} />

                <Route path='/preview-doc/profile' element={<Profile data={data} />} />

                <Route path='/preview-doc/blank/wiza-uzaltmak' element={<BlankVizaUzaltmak />} />
                <Route path='/preview-doc/table/wiza-uzaltmak' element={<TableVizaUzaltmak />} />

                <Route path='/preview-doc/blank/wiza-rugsotnama-yatyrmak' element={<BlankWizaRugsotnamaYatyrmak />} />
                <Route path='/preview-doc/table/wiza-rugsotnama-yatyrmak' element={<TableWizaRugsotnamaYatyrmak />} />

                <Route path='/preview-doc/blank/wshshw' element={<BlankWShShW />} />
                <Route path='/preview-doc/table/wshshw' element={<TableWShShW />} />

                <Route path='/preview-doc/blank/yashamaly-yeri' element={<BlankYashamalyYeri />} />



                <Route path='/preview-doc/blank/taslamanyn-kepilligi' element={<BlankTaslamanynKepilligi />} />
                <Route path='/preview-doc/table/taslamanyn-kepilligi' element={<TableTaslamanynKepilligi />} />

            </Routes>
        </BrowserRouter>
    );
}