import { useEffect, useContext } from 'react';
import { ActionContext } from '../Contexts/ActionContext';
import { CampaignsContext } from '../Contexts/CampaignsContext';

function CampaignsForm(){
    const {action, setAction}: any = useContext(ActionContext);
    const {campaign}:any = useContext(CampaignsContext);
    const setActionOnClick = (e:any)=>{
        e.preventDefault();
        setAction("addCampaign")
    }
    useEffect(() =>{
        console.log(campaign);
    }, []);
    return (
        <div className="row mb-3">
            <label htmlFor="template-selector" className="col-sm-4 col-form-label">Kampagne wahlen</label>
            <div className="col-sm-8">
                {campaign.name}
                <button className="btn btn-light" onClick={setActionOnClick} data-bs-toggle="modal" data-bs-target="#modal">Kampagne wahlen</button>
            </div>
        </div>
    );
}

export default CampaignsForm;