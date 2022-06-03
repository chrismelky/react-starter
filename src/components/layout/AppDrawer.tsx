import React from 'react';
import { Sidebar } from 'primereact/sidebar';
import { MenuItem } from 'primereact/menuitem';
import { classNames } from 'primereact/utils';
import { Link, useNavigate } from 'react-router-dom';

import { PanelMenu } from 'primereact/panelmenu';
export const AppDrawer = ({ visible, setVisible }: any) => {
  let navigate = useNavigate();

  const items: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-pw pi-home',
      command: () => {
        navigate('/');
      },
    },
    {
      label: 'Setup',
      icon: 'pi pi-pw pi-cog',
      items: [
        {
          label: 'User',
          icon: 'pi',
          template: (item, options) => {
            return (
              /* custom element */
              <Link to="user" className={options.className}>
                <span
                  className={classNames(
                    options.iconClassName,
                    'pi pi-home',
                  )}></span>
                ;<span className={options.labelClassName}>{item.label}</span>;
              </Link>
            );
          },
          // command:($event)=>{ navigate("/user"); $event.originalEvent.preventDefault() }
        },
      ],
    },

    {
      label: 'Project Data Forms',
      icon: 'pi pi-fw pi-arrow-right',
    },
  ];

  return (
    <>
      <aside className="sidebar" style={{ width: visible ? 256 : 0 }}></aside>
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        modal={false}
        showCloseIcon={false}>
        {/* <Toolbar className="border-noround" /> */}
        <div className="sidenav-item">
          <PanelMenu model={items} />
        </div>
      </Sidebar>
    </>
  );
};
