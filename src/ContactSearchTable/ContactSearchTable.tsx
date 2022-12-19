import { useEffect, useContext, useState } from 'react';
import { SelectedContactsTableContext } from '../Contexts/SelectedContactsContext';
declare let ZOHO:any;

function ContactSearchTable(){

    const {selectedContacts, setSelectedContacts, reset}: any = useContext(SelectedContactsTableContext);
    const [searchInput, setSearchInput] = useState(undefined);
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (e:any) =>{
        console.log("here");
        e.preventDefault();
        ZOHO.CRM.API.searchRecord({Entity:"Contacts",Type:"word",Query:searchInput})
            .then(function(data:any){
                console.log(data)
                if(!data)
                    return;
                if(data.statusText == "nocontent"){
                    setSearchResults([]);
                    return;
                }
                setSearchResults(data.data);
            })
    }

    useEffect(()=>{
        setSearchInput(undefined);
        setSearchResults([]);
    }, [reset])

    const handleSearchInputOnChange = (e:any) =>{
        setSearchInput(e.target.value);
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
        <>
            <div className="row mb-3">
                <div className="col">
                    <input className="form-control form-control-sm" id="search_query" type="text" placeholder="Type your search here" onChange={handleSearchInputOnChange} aria-label="default input example"/>
                </div>
                <div className="col-2">
                    <button type="button" className="btn btn-sm btn-primary" onClick={handleSearch}>Search</button>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
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
                                
                                searchResults.map(({First_Name, Last_Name, id, Email}: any)=>{
                                    return (
                                        <tr key={id}>
                                            <td>
                                                <div className="form-check">
                                                    <input 
                                                        className="form-check-input"
                                                        type="checkbox" 
                                                        data-first-name={First_Name} 
                                                        data-last-name={Last_Name} 
                                                        data-email={Email} 
                                                        value={id} 
                                                        id={id} 
                                                        defaultChecked={selectedContacts.find((element: any) => (element.id == id))}
                                                        onChange={handleContactAddRemove}/>
                                                    <label className="form-check-label" htmlFor={id}>
                                                        {`${First_Name} ${Last_Name} (${Email})`}
                                                    </label>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
           </div>
        </>
    );
}

export default ContactSearchTable;