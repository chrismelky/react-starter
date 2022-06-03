import React from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';

export const AppBar = ({ setVisible, visible }: any) => {
  const leftContents = (
    <React.Fragment>
      <Button
        onClick={(e) => setVisible(!visible)}
        icon="pi pi-bars"
        className="p-button-text p-button-icon p-button-rounded"
      />
    </React.Fragment>
  );

  return <Toolbar left={leftContents} className="shadow-1 border-noround" />;
};
