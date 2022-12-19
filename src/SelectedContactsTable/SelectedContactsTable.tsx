import { useEffect, useContext, useState } from 'react';
import { ContactsContext } from '../Contexts/ContactsContext';
import { SelectedContactsTableContext } from '../Contexts/SelectedContactsContext';
declare let ZOHO:any;

function SelectedContactsTable(){

    const {selectedContacts, setSelectedContacts}: any = useContext(SelectedContactsTableContext);
    const handleRadioValueChanged = (e:any)=>{
       // setTableCurrentRecord({id: e.target.value, name: e.target.dataset.templateName})
    }
    const handleContactAddRemove = (e:any) =>{
        const is_checked = e.target.checked;
        console.log(e.target.dataset.firstName);
        if(is_checked){
            const contact = {
                first_name: e.target.dataset.firstName,
                last_name: e.target.dataset.lastName,
                email: e.target.dataset.email,
                id: e.target.value
            };
            console.log(contact);
            setSelectedContacts([...selectedContacts, contact]);
        }else{
            setSelectedContacts(selectedContacts.filter((c:any)=>{
                return c.id != e.target.value
            }));
        }
    }
    return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">
                            Name (email)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        selectedContacts.map(({first_name, last_name, id, email}: any)=>{
                            return (
                                <tr key={id}>
                                    <td>
                                        <div className="form-check">
                                            <input 
                                                className="form-check-input"
                                                type="checkbox" 
                                                data-first-name={first_name} 
                                                data-last-name={last_name} 
                                                data-email={email}
                                                value={id} 
                                                id={id} 
                                                defaultChecked={selectedContacts.find((element: any) => (element.id == id))}
                                                onChange={handleContactAddRemove}/>
                                            <label className="form-check-label" htmlFor={id}>
                                                {`${first_name} ${last_name} (${email})`}
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
    );
}

export default SelectedContactsTable;