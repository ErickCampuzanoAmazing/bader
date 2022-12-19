import { useContext } from 'react';
import { TemplatesContext } from '../Contexts/TemplatesContext';
import { ActionContext } from '../Contexts/ActionContext';

function Templates(){
    const {template, setTemplate}: any = useContext(TemplatesContext);
    const {action, setAction}: any = useContext(ActionContext);
    const setActionOnClick = (e:any)=>{
        e.preventDefault();
        setAction("addTemplate")
    }
    return (
        <div className="row mb-3">
            <label htmlFor="template-selector" className="col-sm-4 col-form-label">Absender wahlen</label>
            <div className="col-sm-8">
                {template.name}
                <button className="btn btn-light" onClick={setActionOnClick} data-bs-toggle="modal" data-bs-target="#modal">Absender wahlen</button>
            </div>
        </div>
    );
}

export default Templates;