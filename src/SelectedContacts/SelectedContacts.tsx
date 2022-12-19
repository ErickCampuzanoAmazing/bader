import { useEffect, useContext, useState } from 'react';
import { DataContext } from '../Contexts/DataContext';
import { ContactsContext } from '../Contexts/ContactsContext'
import '../SelectedContacts/SelectedContacts.css';
import { ActionContext } from '../Contexts/ActionContext';

declare let ZOHO:any;

function SelectedContacts(){
    const {zoho_data}: any = useContext(DataContext);
    const {contacts, setContacts}: any = useContext(ContactsContext);
    const {action, setAction}: any = useContext(ActionContext);
    const [contactsLink, setContactsLink] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        if(!zoho_data)
            return;
        setLoading(true);
        const {Entity, EntityId} = zoho_data;
        if(!Entity || !EntityId){
            setLoading(false);
            return;
        }
        const req_data ={
            "arguments": JSON.stringify({
                "module_name" : Entity,
                "record_id": EntityId.toString()
            })
        };
        ZOHO.CRM.FUNCTIONS.execute("GetContactDetails", req_data)
            .then(function(data:any){
                console.log(data);
                if(!data)
                    return;
                if(!data.details)
                    return;
                const { output } = data.details;
                
                setContacts(JSON.parse(output));
                setLoading(false);
            }); 
    }, []);

    useEffect(()=>{
        const link:any = [];
        contacts.map((c:any)=>{
            const name = `${c.first_name} ${c.last_name}`;
            link.push(name);
        });
        setContactsLink(link.join(", "));
    }, [contacts])

    return (
        <div className="row mb-3">
            <label htmlFor="selected-contacts" className="col-sm-4 col-form-label">Empfanger wahlen</label>
            <div className="col-sm-8">
                {   
                    loading ?
                    <p className="contacts fw-bold mb-0 mt-1 text-truncate">Loading...</p>
                    :
                    contacts.length == 0 ?
                    <p className="contacts fw-bold mb-0 mt-1 text-truncate" onClick={()=>{setAction("addContacts")}} data-bs-toggle="modal" data-bs-target="#modal">Add Contacts</p>
                    :
                    <p className="contacts fw-bold mb-0 mt-1 text-truncate" onClick={()=>{setAction("addContacts")}} data-bs-toggle="modal" data-bs-target="#modal">{contactsLink}</p>
                }
            </div>
        </div>
    );
}

export default SelectedContacts;