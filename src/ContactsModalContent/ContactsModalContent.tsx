import { useEffect, useContext, useState } from 'react';
import { ContactsContext } from '../Contexts/ContactsContext';
import SelectedContactsTable from '../SelectedContactsTable/SelectedContactsTable';
import ContactSearchTable from '../ContactSearchTable/ContactSearchTable';
import { SelectedContactsTableContext } from '../Contexts/SelectedContactsContext';

declare let ZOHO:any;

function ContactsModalContent(){
    const {selectedContacts}: any = useContext(SelectedContactsTableContext);
    const [displaySelectedContacts, setDisplaySelectedContacts] = useState(true);
    const [displayContactsSearchForm, setDiplayContactsSearchForm] = useState(false);
    const [navClassesSelected, setNavClassesSelected] = useState("nav-link active");
    const [navClassesSearch, setNavClassesSearch] = useState("nav-link");
    const [propsSelected, setPropsSelected] = useState({aria_current: "page"})
    const [propsSearch, setPropsSearch] = useState({})


    const handleRadioValueChanged = (e:any)=>{
       // setTableCurrentRecord({id: e.target.value, name: e.target.dataset.templateName})
    }
    const handleDisplayAddContacts = ()=>{
        setDiplayContactsSearchForm(true);
        setDisplaySelectedContacts(false);
        setNavClassesSelected("nav-link");
        setNavClassesSearch("nav-link active");
        setPropsSelected({"aria_current": ""});
        setPropsSearch({"aria_current": "page"});
    }
    const handleDisplaySelectedContacts = ()=>{
        setDiplayContactsSearchForm(false);
        setDisplaySelectedContacts(true);
        setNavClassesSelected("nav-link active");
        setNavClassesSearch("nav-link");
        setPropsSelected({"aria_current": "page"});
        setPropsSearch({"aria_current": ""});
    }
    return (
        <>
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <a className={navClassesSelected} onClick={handleDisplaySelectedContacts} {...propsSelected}>Selected Contacts ({selectedContacts.length})</a>
            </li>
            <li className="nav-item">
                <a className={navClassesSearch} onClick={handleDisplayAddContacts} {...propsSearch}>Add Contacts</a>
            </li>
        </ul>
                <form id="contacts_table">
                    {
                        displaySelectedContacts && <SelectedContactsTable />
                    }
                    {
                        displayContactsSearchForm && <ContactSearchTable />
                    }
                </form>

        </>
    );
}

export default ContactsModalContent;