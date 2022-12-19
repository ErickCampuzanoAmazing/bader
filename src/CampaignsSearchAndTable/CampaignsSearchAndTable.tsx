import { useContext, useState } from 'react';
import { CampaignsTableContext } from '../Contexts/CampaignsTableContext';
import { CampaignsContext } from '../Contexts/CampaignsContext';


declare let ZOHO:any;

function CampaignsSearchAndTable(){
    const {campaign}: any = useContext(CampaignsContext);
    const {setSelectedCampaign}: any = useContext(CampaignsTableContext);
    const [searchInput, setSearchInput] = useState(undefined);
    const [searchResults, setSearchResults] = useState([]);

    const handleRadioValueChanged = (e:any)=>{
        setSelectedCampaign({id: e.target.value, name: e.target.dataset.campaignName})
    }
    const handleSearchInputOnChange = (e:any) =>{
        setSearchInput(e.target.value);
    }
    const handleSearch = (e:any) =>{
        e.preventDefault();
        ZOHO.CRM.API.searchRecord({Entity:"Campaigns_API",Type:"word",Query:searchInput})
            .then(function(data:any){
                if(!data)
                    return;
                if(data.statusText == "nocontent"){
                    ([]);
                    return;
                }
                console.log(data)
                setSearchResults(data.data);
            })
    }
    return (
        <form id="templates_table">
            <div className="row mb-3">
                <div className="col">
                    <input className="form-control form-control-sm" id="search_query" type="text" placeholder="Type your search here" onChange={handleSearchInputOnChange} aria-label="default input example"/>
                </div>
                <div className="col-2">
                    <button type="button" className="btn btn-sm btn-primary" onClick={handleSearch}>Search</button>
                </div>
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">
                            Campaign name
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        searchResults.map(({Name, id}: any)=>{
                            return (
                                <tr key={id}>
                                    <td>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" id={id} onChange={handleRadioValueChanged} name="campaign" data-campaign-name={Name} value={id} defaultChecked={campaign && (campaign.id == id)}/>
                                                <label className="form-check-label" htmlFor={id}>
                                                    {Name}
                                                </label>
                                            </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </form>
    );
}

export default CampaignsSearchAndTable;