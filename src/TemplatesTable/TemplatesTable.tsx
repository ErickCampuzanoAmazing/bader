import { useEffect, useContext, useState } from 'react';
import { TemplatesContext } from '../Contexts/TemplatesContext';
import { ActionContext } from '../Contexts/ActionContext';
import { TemplatesTableContext } from '../Contexts/TemplatesTableContext';

declare let ZOHO:any;

function TemplatesTable(){
    const {template, setTemplate}: any = useContext(TemplatesContext);
    const [fetchedTemplates, setFetchedTemplates] = useState([]);
    const {action, setAction}: any = useContext(ActionContext);
    const {setTableCurrentRecord}: any = useContext(TemplatesTableContext);

    useEffect(()=>{
        ZOHO.CRM.FUNCTIONS.execute("FetchDealsEmailTemplates", {})
            .then(function(data:any){
                if(!data)
                    return;
                const { output } = data.details;
                setFetchedTemplates(JSON.parse(output));
            }); 
    }, []);
    /*const new_template = {
        id: "478303000000000013"
    }*/
    const handleRadioValueChanged = (e:any)=>{
        setTableCurrentRecord({id: e.target.value, name: e.target.dataset.templateName})
    }
    return (
        <form id="templates_table">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">
                            Template name
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        fetchedTemplates.map(({name, id}: any)=>{
                            return (
                                <tr key={id}>
                                    <td>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" id={id} onChange={handleRadioValueChanged} name="template" data-template-name={name} value={id} defaultChecked={template.id == id}/>
                                                <label className="form-check-label" htmlFor={id}>
                                                    {name}
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

export default TemplatesTable;