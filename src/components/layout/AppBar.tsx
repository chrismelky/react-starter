import React from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { logout } from '../../reducers/authentication';

export const AppBar = ({ setVisible, visible, user }: any) => {
  const dispatch = useDispatch();

  const leftContents = (
    <React.Fragment>
      <Button
        onClick={(e) => setVisible(!visible)}
        icon="pi pi-bars"
        className="p-button-text p-button-icon p-button-rounded"
      />
    </React.Fragment>
  );

  const rightContents = (
    <React.Fragment>
      <Button
        label={`(${user?.firstName}) logout`}
        onClick={() => dispatch(logout())}
        icon="pi pi-exit"
        className="p-button-text p-button-icon p-button-rounded"
      />
    </React.Fragment>
  );

  return (
    <Toolbar
      left={leftContents}
      right={rightContents}
      className="shadow-1 border-noround"
    />
  );
};
