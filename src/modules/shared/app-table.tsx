import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { IQueryParams, PAGE_SIZE_OPTIONS } from '../../utils/utils';
import { ErrorFetching } from './error-fetching';
import { AppTableAction } from './app-table-action';
import { UseMutationResult, UseQueryResult } from 'react-query';
import { Button } from 'primereact/button';

export type AppTableType<T> = {
  createOrEdit: (entity?: T) => void;
  confirmDelete: (entity: T) => void;
  onParamChange: (event: any) => void;
  query: UseQueryResult<any>;
  mutation: UseMutationResult<any, any, any>;
  queryParams: IQueryParams;
  columns: any[];
  title?: string;
  initialOptionFilters: DataTableFilterMeta;
};
export const AppTable = (props: AppTableType<any>) => {
  const pageSizeOptions = PAGE_SIZE_OPTIONS;

  /** a separeate filter state to avoid data loading on initilization, table columns that can be filtered and they options (i.e not necessary to fetch data)*/
  const [optionalFilters, setOptionalFilters] = useState<DataTableFilterMeta>();

  const initFilters = () => {
    setOptionalFilters(props.initialOptionFilters);
  };

  // When filter cleared init filter state and update queryParam filter property
  const clearFilters = () => {
    initFilters();
    props.onParamChange({ optionalFilters });
  };

  const onPageChange = (event: any) => {
    props.onParamChange({
      page: event.page,
      first: event.first,
      pageSize: event.rows,
    });
  };

  /**When filter change update queryParam filter property */
  const onFilter = (event: any) => {
    if (Object.keys(event.filters).length) {
      event['first'] = 0;
      props.onParamChange({
        optionalFilters: { ...event.filters },
      });
    }
  };

  const onSort = (event) => {
    props.onParamChange({
      sortField: event.sortField,
      sortOrder: event.sortOrder,
    });
  };

  useEffect(() => {
    initFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const header = () => {
    return (
      <div className="flex flex-row justify-content-between align-items-center">
        <span className="text-lg">{props.title}</span>
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
            onClick={() => props.createOrEdit()}
            label="Create"></Button>
        </div>
      </div>
    );
  };

  const dynamicColumns = props.columns.map((col, i) => {
    return col.searchable ? (
      <Column
        filter
        sortable
        filterPlaceholder={`Search by ${col.header}`}
        key={col.field}
        field={col.field}
        header={col.header}
      />
    ) : (
      <Column key={col.field} field={col.field} header={col.header} />
    );
  });

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
          onPage={onPageChange}
          filters={optionalFilters}
          rowsPerPageOptions={pageSizeOptions}
          filterDisplay="menu"
          dataKey="id"
          onFilter={onFilter}
          value={props.query.data?.data}
          loading={props.query.isLoading}
          onSort={onSort}
          sortField={props.queryParams.sortField}
          sortOrder={props.queryParams.sortOrder}
          className="w-full">
          {dynamicColumns}
          <Column className="actions" body={actions} />
        </DataTable>
      )}
    </Card>
  );
};
