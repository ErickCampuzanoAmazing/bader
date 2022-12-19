import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DataContext } from './Contexts/DataContext';

declare let ZOHO: any;

const container = document.getElementById('root');

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

ZOHO.embeddedApp.on("PageLoad", (zoho_data: any)=>{
  //console.log(zoho_data);
  root.render(
    <React.StrictMode>
      <DataContext.Provider value={{zoho_data}}>
        <App />
      </DataContext.Provider>
    </React.StrictMode>,
  );  
})

ZOHO.embeddedApp.init();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
