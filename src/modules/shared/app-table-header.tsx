import React from 'react';
import { Button } from 'primereact/button';

export const AppTableHeader = ({ title, create, clearFilters }) => {
  return (
    <div className="flex flex-row justify-content-between align-items-center">
      <span className="text-lg">{title}</span>
      <div className="flex flex-row justify-content-start align-items-center gap-2">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear filter"
          className="p-button-text p-button-plain p-button-sm"
          onClick={clearFilters}
        />
        <Button
          icon="pi pi-plus"
          data-testid="btn-create"
          className="p-button-raised p-button-sm"
          onClick={create}
          label="Create User"></Button>
      </div>
    </div>
  );
};
