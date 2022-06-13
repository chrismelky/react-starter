import React from 'react';
import { Button } from 'primereact/button';

export const TableAction = ({ rowData, edit, confirmDelete }: any) => {
  return (
    <React.Fragment>
      <Button
        icon="pi pi-pencil"
        className="p-button-plain p-button-rounded p-button-text p-button-icon-only"
        onClick={() => edit(rowData)}
      />
      <Button
        icon="pi pi-trash"
        className="p-button-plain p-button-rounded p-button-text p-button-icon-only"
        onClick={() => confirmDelete(rowData)}
      />
    </React.Fragment>
  );
};
