import { useEffect, useContext, useState } from 'react';
import { ContactsContext } from '../Contexts/ContactsContext';
import { ActionContext } from '../Contexts/ActionContext';
import { TemplatesContext } from '../Contexts/TemplatesContext';
import { CampaignsContext } from '../Contexts/CampaignsContext';
import { TemplatesTableContext } from '../Contexts/TemplatesTableContext';
import TemplatesTable from '../TemplatesTable/TemplatesTable';
import ContactsModalContent from '../ContactsModalContent/ContactsModalContent';
import CampaignsSearchAndTable from '../CampaignsSearchAndTable/CampaignsSearchAndTable';
import { SelectedContactsTableContext } from '../Contexts/SelectedContactsContext';
import { CampaignsTableContext } from '../Contexts/CampaignsTableContext';

function ActionModal(){
    const props = {tabIndex:-1};

    const {action}: any = useContext(ActionContext);
    const [title, setTitle] = useState("");
    const {template, setTemplate}: any = useContext(TemplatesContext);
    const {contacts, setContacts}: any = useContext(ContactsContext);
    const {campaign, setCampaign}: any = useContext(CampaignsContext);
    const [tableCurrentRecord, setTableCurrentRecord] = useState({id: null, name: null});
    const [selectedContacts, setSelectedContacts] = useState(contacts);
    const [selectedCampaign, setSelectedCampaign] = useState(campaign);
    const [reset, setReset] = useState(false);

    useEffect(()=>{
        console.log(action);
        switch(action){
            case "addContacts":
                setTitle("Contacts");
                break;
            case "addTemplate":
                setTitle("Template");
                break;
            case "addCampaign":
                setTitle("Campaign");
                break;
            default:
                return;
        }
    }, [action]);
    useEffect(()=>{
        setSelectedContacts(contacts);
    }, [contacts]);

    useEffect(()=>{
        if(!reset)
            return;
        setTableCurrentRecord({id: null, name: null});
        setSelectedContacts(contacts);
        setReset(false);
        
    }, [reset]);


    const handleSaveAndClose = (e:any)=>{
        e.preventDefault();
        switch(action){
            case "addContacts":
                setContacts(selectedContacts);
                break;
            case "addTemplate":
                setTemplate(tableCurrentRecord);
                break;
            case "addCampaign":
                setCampaign(selectedCampaign);
                break;
            default:
                return;
        }
        setReset(true);
    }

    return (
        <div className="modal fade" id="modal" aria-labelledby="exampleModalLabel" aria-hidden="true" {...props}>
            <div className="modal-dialog">
                <div className="modal-content rounded-0">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={()=>setReset(true)} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {
                            action == "addTemplate" && 
                                        <TemplatesTableContext.Provider value={{setTableCurrentRecord}}>
                                            <TemplatesTable />
                                        </TemplatesTableContext.Provider>
                        }
                        {
                            action == "addContacts" &&
                                <SelectedContactsTableContext.Provider value={{selectedContacts, setSelectedContacts, reset}}>
                                    <ContactsModalContent />
                                </SelectedContactsTableContext.Provider>
                        }
                        {
                            action == "addCampaign" &&
                                <CampaignsTableContext.Provider value={{setSelectedCampaign, reset}}>
                                    <CampaignsSearchAndTable />
                                </CampaignsTableContext.Provider>
                        }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal" onClick={()=>setReset(true)} >Close</button>
                        <button type="button" className="btn btn-sm btn-primary" data-bs-dismiss="modal" onClick={handleSaveAndClose}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ActionModal;