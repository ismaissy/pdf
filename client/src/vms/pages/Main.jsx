import React from 'react'
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const pages = [
    { name: 'Blank Adres Uytketmek Shaher Ichinde', link: '/preview-doc/blank/adres-uytketmek-shaher-ichinde' },
    { name: 'Table Adres Uytketmek Shaher Ichinde', link: '/preview-doc/table/adres-uytketmek-shaher-ichinde' },

    { name: 'Bellige Almak', link: '/preview-doc/bellige-almak' },

    { name: 'Blank Hasaba Almak', link: '/preview-doc/blank/hasaba-almak' },
    { name: 'Table Hasaba Almak', link: '/preview-doc/table/hasaba-almak' },

    { name: 'Blank Hasaba Chykarmak', link: '/preview-doc/blank/hasaba-chykarmak' },
    { name: 'Table Hasaba Chykarmak', link: '/preview-doc/table/hasaba-chykarmak' },

    { name: 'Blank Iki to One gezeklige owurmek', link: '/preview-doc/blank/iki-to-one-owurmek' },

    { name: 'Blank Ishlemane rugsot edilen yerler', link: '/preview-doc/blank/ishlemane-rugsot-edilen-yerler' },
    { name: 'Table Ishlemane rugsot edilen yerler', link: '/preview-doc/table/ishlemane-rugsot-edilen-yerler' },

    { name: 'Blank Komandirowachnye', link: '/preview-doc/blank/komandirowachnye' },
    { name: 'Table Komandirowachnye', link: '/preview-doc/table/komandirowachnye' },

    { name: 'Blank Konselari', link: '/preview-doc/blank/konselari' },
    { name: 'Table Konselari', link: '/preview-doc/table/konselari' },

    { name: 'Blank Pasport Chalshmak', link: '/preview-doc/blank/pasport-chalshmak' },
    { name: 'Table Pasport Chalshmak', link: '/preview-doc/table/pasport-chalshmak' },

    { name: 'Blank Pasport Chalshmak Hasaba Durmok', link: '/preview-doc/blank/pasport-chalshmak-hasaba-durmok' },
    { name: 'Table Pasport Chalshmak Hasaba Durmok', link: '/preview-doc/table/pasport-chalshmak-hasaba-durmok' },

    { name: 'Profile', link: '/preview-doc/profile' },

    { name: 'Blank Wiza Uzaltmak', link: '/preview-doc/blank/wiza-uzaltmak' },
    { name: 'Table Wiza Uzaltmak', link: '/preview-doc/table/wiza-uzaltmak' },

    { name: 'Blank Wiza Rugsotnama Yatyrmak', link: '/preview-doc/blank/wiza-rugsotnama-yatyrmak' },
    { name: 'Table Wiza Rugsotnama Yatyrmak', link: '/preview-doc/table/wiza-rugsotnama-yatyrmak' },

    { name: 'Blank Welayat-Shaher, Shaher-Welayat', link: '/preview-doc/blank/wshshw' },
    { name: 'Table Welayat-Shaher, Shaher-Welaya', link: '/preview-doc/table/wshshw' },

    { name: 'Blank Yashamaly Yeri', link: '/preview-doc/blank/yashamaly-yeri' },

    { name: 'Blank Taslamanyn Kepilligi', link: '/preview-doc/blank/taslamanyn-kepilligi' },
    { name: 'Table Taslamanyn Kepilligi', link: '/preview-doc/table/taslamanyn-kepilligi' },

    { name: 'Shahsy Kagyzy', link: '/preview-doc/shahsy-kagyzy' },

]

const Main = () => {

    return (<>
        <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
            <Dropdown>
                <Dropdown.Toggle variant="primary" size="sm" id="dropdown-basic">Selcet Document PDF preview</Dropdown.Toggle>

                <Dropdown.Menu>
                    {pages.map((item) => (
                        <Dropdown.Item key={item} eventKey={item}>
                            <Link to={item.link}>{item.name}</Link>
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    </>
    )
}

export default Main;