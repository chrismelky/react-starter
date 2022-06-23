import React from 'react';
import { Button } from 'primereact/button';

export const TableAction = ({ rowData, edit, confirmDelete }: any) => {
  return (
    <React.Fragment>
      <div className="flex flex-row ">
        <Button
          icon="pi pi-pencil"
          className="p-button-plain p-button-rounded p-button-text p-button-icon-only p-button-sm"
          onClick={() => edit(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-plain p-button-rounded p-button-text p-button-icon-only p-button-sm"
          onClick={() => confirmDelete(rowData)}
        />
      </div>
    </React.Fragment>
  );
};
