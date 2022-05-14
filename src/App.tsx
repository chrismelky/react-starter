import React, { useState } from 'react';

import "primereact/resources/primereact.min.css"; 
import "primereact/resources/themes/mdc-light-indigo/theme.css";  //theme                 //core css
import "primeicons/primeicons.css";        
import "primeflex/primeflex.css"                        //icons
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Sidebar } from 'primereact/sidebar';
import { Toolbar } from 'primereact/toolbar';

 
import './App.scss';
import { Button } from 'primereact/button';
import { PanelMenu } from 'primereact/panelmenu';
import { MenuItem } from 'primereact/menuitem';
import { useNavigate } from "react-router-dom";
import { classNames } from 'primereact/utils';


const UserList = React.lazy(() => import('./components/user/UserList'));

function App() {


  const [visible, setVisible] = useState(true)
  let navigate = useNavigate();

  const Home = () => {
    return (<div>Home</div>)
  }

  const leftContents = (
    <React.Fragment>
        <Button onClick={(e) => setVisible(!visible)}icon="pi pi-bars" className="p-button-text p-button-icon p-button-rounded" />
    </React.Fragment>
  );

  const items: MenuItem[] = [
    {
      label: "Dashboard",
      icon: "pi pi-pw pi-home",
      command:()=>{ navigate("/"); }
    },
    {
      label: "Setup",
      icon: "pi pi-pw pi-cog",
      items: [
        {
          label: "User",
          icon: "pi",
          template: (item, options) => {
            return (
                /* custom element */
                <Link  to="user" className={options.className} >
                    <span className={classNames(options.iconClassName, 'pi pi-home')}></span>;
                    <span className={options.labelClassName}>{item.label}</span>;
                </Link>
            );
        },
          // command:($event)=>{ navigate("/user"); $event.originalEvent.preventDefault() }
        },
      ]
    },
   
    {
      label: "Project Data Forms",
      icon: "pi pi-fw pi-arrow-right",
    },
  ]

  return (
    <div className="flex"> 
         <aside className="sidebar" style={{width: visible ? 256 : 0}}>
         </aside>
        <Sidebar visible={visible} onHide={() => setVisible(false)} modal={false} showCloseIcon={false} >
            <Toolbar className="border-noround" />
            <div className="sidenav-item">
               <PanelMenu model={items} />
            </div>
        </Sidebar>
     
      <section className="flex flex-column flex-grow-1" style={{backgroundColor: '#e4e5e6'}}>
        <Toolbar left={leftContents} className="shadow-1 border-noround" />
        <div className="flex flex-column p-3">
        <Routes>
          <Route path="/" element={
            <React.Suspense fallback={<>Not found</>}>
              <Home/>
            </React.Suspense>
          } />
          <Route path="/user" element={
            <React.Suspense fallback={<>Not found</>}>
              <UserList/>
            </React.Suspense>
          } />
        </Routes>
        </div>
        
      </section> 
    </div>
  );
}

export default App;
