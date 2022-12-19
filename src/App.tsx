import { useEffect, useContext, useState } from 'react';
import { DataContext } from './Contexts/DataContext';
import { ContactsContext } from './Contexts/ContactsContext';
import { TemplatesContext } from './Contexts/TemplatesContext';
import { ActionContext } from './Contexts/ActionContext';
import SelectedContacts from './SelectedContacts/SelectedContacts';
import TemplatesSection from './TemplatesForm/Templates';
import ActionModal from './Modals/ActionModal';
import './App.css';
import CampaignsSection from './Campaigns/Campaigns';
import { CampaignsContext } from './Contexts/CampaignsContext';


declare let ZOHO: any;

function App() {

  const {zoho_data}:any = useContext(DataContext);
  const [contacts, setContacts] = useState([]); 
  const [template, setTemplate] = useState({});
  const [campaign, setCampaign] = useState({});
  const [creatingPotentials, setCreatingPotentials] = useState(false);
  const [success, setSuccess] = useState(false);
  const [missingData, setMissingData] = useState(false);
  const [missingDataMessage, setMissingDataMessage] = useState("");
  const [action, setAction] = useState("");
  // Fetch details when widget renders for first time
  /*useEffect(() => {
  }, []);*/
  const closeWidget = ()=>{
    ZOHO.CRM.UI.Popup.close()
    .then(function(data:any){
        console.log(data)
    })}
  const callPotentialCreatingFunction = (e:any, send_template: any)=>{
    e.preventDefault();
    if(contacts.length == 0){
      setMissingData(true);
      setMissingDataMessage("No contacts selected");
      return false;
    }
    if(Object.keys(campaign).length == 0){
      setMissingData(true);
      setMissingDataMessage("No campaign selected");
      return false;
    }
    setCreatingPotentials(true);
    setSuccess(false);
    setMissingData(false);
    console.log(JSON.stringify(contacts), template, campaign);
    const req_data ={
      "arguments": JSON.stringify({
          "contacts" : JSON.stringify(contacts),
          "template": JSON.stringify(template),
          "campaign": JSON.stringify(campaign),
          "send_template": send_template
        })
    };
    console.log(req_data)
    ZOHO.CRM.FUNCTIONS.execute("CreateProposalsAndEmails", req_data)
            .then(function(data:any){
                console.log(data);
                if(!data)
                    return;
                if(!data.details)
                    return;
                const { output } = data.details;
                setCreatingPotentials(false);
                setSuccess(true);
            }); 
  }
  useEffect(()=>{
    if(!success)
      return;
    setTimeout(()=>{
      setContacts([]); 
      setTemplate({});
      setCampaign({});
      setCreatingPotentials(false);
      setSuccess(false);
      setAction("");
      setMissingData(false);
    }, 3000)
  }, [success])
  return (
    <div className="App">
      <ActionContext.Provider value={{action, setAction}}>
      <div className="container">
        <div className="row mt-0">
          <form className="bg-white pt-3 pbb-3">
          
          <ContactsContext.Provider value={{contacts, setContacts}}>
            <SelectedContacts />
          </ContactsContext.Provider>
          <TemplatesContext.Provider value={{template, setTemplate}}>
            <TemplatesSection />
          </TemplatesContext.Provider>
          <CampaignsContext.Provider value={{campaign}}>
            <CampaignsSection />
          </CampaignsContext.Provider>
          {
            creatingPotentials &&
            <div className="row mb-3">
              <div className="col text-center bg-secondary pt-2">
                <p className="text-light mb-2">Creating potentials....</p>
              </div>
            </div>
          }
          {
            success &&
            <div className="row mb-3">
              <div className="col text-center bg-success pt-2">
                <p className="text-light mb-2">Records created successfully!</p>
              </div>
            </div>
          }
          {
            missingData &&
            <div className="row mb-3">
              <div className="col text-center bg-danger pt-2">
                <p className="text-light mb-2">{missingDataMessage}</p>
              </div>
            </div>
          }
          <div className="row mb-3">
            <div className="col-sm-2">
              <button className="btn btn-sm btn-light" onClick={closeWidget}>Abbrechen</button>
            </div>
            <div className="col-sm-4">
              <button className="btn btn-sm text-light btn-green" onClick={(e)=>(callPotentialCreatingFunction(e, false))}>Erstellen & warten</button>
            </div>
            <div className="col-sm-6">
              <button className="btn btn-sm btn-blue text-light" onClick={(e)=>(callPotentialCreatingFunction(e, true))}>Erstellen & versenden</button>
            </div>
          </div>
          </form>
        </div>
      </div>
      <TemplatesContext.Provider value={{template, setTemplate}}>
        <ContactsContext.Provider value={{contacts, setContacts}}>
          <CampaignsContext.Provider value={{campaign, setCampaign}}>
            <ActionModal />
          </CampaignsContext.Provider>
        </ContactsContext.Provider>
      </TemplatesContext.Provider>
    </ActionContext.Provider>
    </div>
  );
}

export default App;
