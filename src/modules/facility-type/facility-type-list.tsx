import React, { useEffect, useRef, useState } from 'react';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Card } from 'primereact/card';
import { ErrorFetching, TableAction } from '../shared';
import ErrorBoundary from '../../utils/error-boundary';
import {
  FacilityType,
  FacilityTypeUpdate,
  useDeleteFacilityType,
  useFetchFacilityTypes,
  facilityTypeDefaultValue,
} from '.';
import {
  IQueryParams,
  PAGE_SIZE_OPTIONS,
  stringDefaultFilter,
} from '../../utils/utils';

export default function FacilityTypeList() {
  //Config column filters
  const initialOptionFilters: DataTableFilterMeta = {
    name: stringDefaultFilter,
    code: stringDefaultFilter,
  };

  const pageSizeOptions = PAGE_SIZE_OPTIONS;

  const [showCreateOrUpdate, setShowCreateOrUpdate] = useState(false);

  //Selected FacilityType to be updated or new FacilityType
  const [facilityType, setFacilityType] = useState<FacilityType>();

  /** a separeate filter state to avoid data loading on initilization, table columns that can be filtered and they options (i.e not necessary to fetch data)*/
  const [optionalFilters, setOptionalFilters] = useState<DataTableFilterMeta>();

  const toast = useRef<Toast>(null);

  /** pagination option, optional filters ,
   *  useFetchFacilityTypes function observe this state and reload data when any property value is changed
   */
  const [queryParams, setQueryParams] = useState<IQueryParams>({
    first: 0,
    pageSize: 10,
    page: 0,
    optionalFilters: undefined,
    sortField: undefined,
    sortOrder: undefined,
  });

  const {
    isLoading,
    isError,
    error: errorFetching,
    refetch,
    data: facilityTypes,
  } = useFetchFacilityTypes({
    queryParams,
  });

  const initFilters = () => {
    setOptionalFilters(initialOptionFilters);
  };

  // When filter cleared init filter state and update queryParam filter property
  const clearFilters = () => {
    initFilters();
    setQueryParams({
      ...queryParams,
      optionalFilters,
    });
  };

  useEffect(() => {
    initFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deteleMutation = useDeleteFacilityType({
    onSuccess: () => {
      refetch();
      toast.current?.show({
        severity: 'success',
        summary: 'Deleted successfully',
        detail: 'FacilityType deleted',
        life: 3000,
      });
    },
  });

  const createOrEdit = (facilityTypeData?: FacilityType) => {
    const data = facilityTypeData || facilityTypeDefaultValue;
    setFacilityType(data);
    setShowCreateOrUpdate(true);
  };

  const closeDialog = (result: boolean) => {
    setShowCreateOrUpdate(false);
    setFacilityType(undefined);
    if (result) {
      refetch();
      toast.current?.show({
        severity: 'success',
        summary: 'Success Message',
        detail: 'FacilityType created successfully',
        life: 3000,
      });
    }
  };

  const pageChanges = (event: any) => {
    setQueryParams({
      ...queryParams,
      page: event.page,
      first: event.first,
      pageSize: event.rows,
    });
  };

  const onSort = (event) => {
    setQueryParams({
      ...queryParams,
      sortField: event.sortField,
      sortOrder: event.sortOrder,
    });
  };

  /**When filter change update queryParam filter property */
  const onFilter = (event: any) => {
    if (Object.keys(event.filters).length) {
      event['first'] = 0;
      setQueryParams({
        ...queryParams,
        optionalFilters: { ...event.filters },
      });
    }
  };

  const confirmDelete = (facilityType: FacilityType) => {
    confirmDialog({
      header: 'Confirm Detele FacilityType',
      message: 'Are you sure you want to delete this FacilityType',
      accept: () => deteleMutation.mutate(facilityType.id!),
    });
  };

  const header = () => {
    return (
      <div className="flex flex-row justify-content-between align-items-center">
        <span className="text-lg">Facility Type</span>

        <div className="flex flex-row justify-content-start align-items-center gap-1">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear filter"
            className="p-button-text p-button-plain"
            onClick={clearFilters}
          />
          <Button
            icon="pi pi-plus"
            className="p-button-raised"
            onClick={() => createOrEdit()}
            label="Create FacilityType"></Button>
        </div>
      </div>
    );
  };

  const actions = (rowData: FacilityType) => {
    return (
      <TableAction
        rowData={rowData}
        edit={createOrEdit}
        confirmDelete={confirmDelete}
      />
    );
  };

  return (
    <div className="flex flex-column gap-2">
      <Card className="w-full">
        {isError ? (
          <ErrorFetching error={errorFetching} refetch={refetch} />
        ) : (
          <DataTable
            header={header}
            showGridlines
            size="small"
            lazy
            paginator
            first={queryParams.first}
            rows={queryParams.pageSize}
            totalRecords={facilityTypes?.total}
            onPage={pageChanges}
            filters={optionalFilters}
            rowsPerPageOptions={pageSizeOptions}
            filterDisplay="menu"
            dataKey="id"
            onFilter={onFilter}
            value={facilityTypes?.data}
            loading={isLoading}
            onSort={onSort}
            sortField={queryParams.sortField}
            sortOrder={queryParams.sortOrder}
            style={{ width: '100%' }}>
            <Column
              filter
              sortable
              filterPlaceholder="Search by Name"
              field="name"
              header="Name"
            />
            <Column
              filter
              sortable
              filterPlaceholder="Search by Code"
              field="code"
              header="Code"
            />
            <Column className="actions" body={actions} />
          </DataTable>
        )}
        {showCreateOrUpdate && (
          <ErrorBoundary>
            <FacilityTypeUpdate
              show={showCreateOrUpdate}
              facilityType={facilityType}
              onClose={closeDialog}
            />
          </ErrorBoundary>
        )}
      </Card>
      <Toast ref={toast} />
      <ConfirmDialog />
    </div>
  );
}
