import React from 'react';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { IQueryParams, PAGE_SIZE_OPTIONS } from '../../utils/utils';
import { ErrorFetching } from './error-fetching';
import { AppTableAction } from './app-table-action';
import { AppTableHeader } from './app-table-header';
import { UseMutationResult, UseQueryResult } from 'react-query';

export type AppTableType<T> = {
  createOrEdit: (entity?: T) => void;
  clearFilters: () => void;
  confirmDelete: (entity: T) => void;
  onSort: (event: any) => void;
  onFilter: (event: any) => void;
  onPageChange: (event: any) => void;
  query: UseQueryResult<any>;
  mutation: UseMutationResult<any, any, any>;
  queryParams: IQueryParams;
  optionalFilters?: DataTableFilterMeta;
};
export const AppTable = (props: AppTableType<any>) => {
  const pageSizeOptions = PAGE_SIZE_OPTIONS;

  const header = () => {
    return (
      <AppTableHeader
        title="User"
        create={() => props.createOrEdit()}
        clearFilters={props.clearFilters}
      />
    );
  };

  const actions = (rowData: any) => {
    return (
      <AppTableAction
        rowData={rowData}
        edit={props.createOrEdit}
        confirmDelete={props.confirmDelete}
      />
    );
  };
  return (
    <Card className="shadow-5 w-full">
      {props.query.isError ? (
        <ErrorFetching
          error={props.query.error}
          refetch={props.query.refetch}
        />
      ) : (
        <DataTable
          header={header}
          size="small"
          lazy
          paginator
          first={props.queryParams.first}
          rows={props.queryParams.pageSize}
          totalRecords={props.query.data?.total}
          onPage={props.onPageChange}
          filters={props.optionalFilters}
          rowsPerPageOptions={pageSizeOptions}
          filterDisplay="menu"
          dataKey="id"
          onFilter={props.onFilter}
          value={props.query.data?.data}
          loading={props.query.isLoading}
          onSort={props.onSort}
          sortField={props.queryParams.sortField}
          sortOrder={props.queryParams.sortOrder}
          className="w-full">
          <Column
            filter
            sortable
            filterPlaceholder="Search by first name"
            field="firstName"
            header="First Name"
          />
          <Column
            filter
            sortable
            field="lastName"
            filterPlaceholder="Search by last name"
            header="Last Name"
          />
          <Column header="Email" field="email" />
          <Column className="actions" body={actions} />
        </DataTable>
      )}
    </Card>
  );
};
