import React, { useEffect, useRef, useState } from 'react';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Card } from 'primereact/card';
import { TableAction } from '../shared/table-action';
import { User, UserUpdate, useDeleteUser, useFetchUsers } from '.';
import {
  IQueryParams,
  ITEMS_PER_PAGE_OPTIONS,
  stringDefaultFilter,
} from '../../utils/utils';

export default function UserList() {
  //Config column filters
  const initialOptionFilters: DataTableFilterMeta = {
    firstName: stringDefaultFilter,
    lastName: stringDefaultFilter,
  };

  const perPageOptions = ITEMS_PER_PAGE_OPTIONS;

  const [showCreateOrUpdate, setShowCreateOrUpdate] = useState(false);

  //Selected user to be updated or new user
  const [user, setUser] = useState<User>();

  /** a separeate filter state to avoid data loading on initilization, table columns that can be filtered and they options (i.e not necessary to fetch data)*/
  const [optionalFilters, setOptionalFilters] = useState<DataTableFilterMeta>();

  const toast = useRef<Toast>(null);

  /** pagination option, optional filters ,
   *  useFetchUser function observe this state and reload data when any property value is changed
   */
  const [queryParams, setQueryParams] = useState<IQueryParams>({
    first: 0,
    rows: 10,
    page: 0,
    optionalFilters: undefined,
    sortField: undefined,
    sortOrder: undefined,
  });

  const {
    isLoading,
    isError,
    refetch,
    data: users,
  } = useFetchUsers({
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

  const deteleMutation = useDeleteUser({
    onSuccess: () => {
      refetch();
      toast.current?.show({
        severity: 'success',
        summary: 'Deleted successfully',
        detail: 'User deleted',
        life: 3000,
      });
    },
  });

  const createOrEdit = (userData?: User) => {
    const data = userData || {
      ...new User(),
    };
    setUser(data);
    setShowCreateOrUpdate(true);
  };

  const closeDialog = (result: boolean) => {
    setShowCreateOrUpdate(false);
    setUser(undefined);
    if (result) {
      refetch();
      toast.current?.show({
        severity: 'success',
        summary: 'Success Message',
        detail: 'User created successfully',
        life: 3000,
      });
    }
  };

  const pageChanges = (event: any) => {
    setQueryParams({
      ...queryParams,
      page: event.page,
      first: event.first,
      rows: event.rows,
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

  const confirmDelete = (user: User) => {
    confirmDialog({
      header: 'Confirm Detele User',
      message: 'Are you sure you want to delete this user',
      accept: () => deteleMutation.mutate(user.id!),
    });
  };

  const header = () => {
    return (
      <div className="flex flex-row justify-content-between align-items-center">
        <span className="text-lg">Users</span>

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
            label="Create User"></Button>
        </div>
      </div>
    );
  };

  const actions = (rowData: User) => {
    return (
      <TableAction
        rowData={rowData}
        edit={createOrEdit}
        confirmDelete={confirmDelete}
      />
    );
  };

  return (
    <div className="flex flex-column gap-3">
      <Toast ref={toast} />
      <Card style={{ width: '100%' }}>
        {isError ? (
          <span>
            Error loading Data please referesh{' '}
            <Button onClick={() => refetch()} label="Reload"></Button>
          </span>
        ) : (
          <DataTable
            header={header}
            showGridlines
            size="small"
            lazy
            paginator
            first={queryParams.first}
            rows={queryParams.rows}
            totalRecords={users?.total}
            onPage={pageChanges}
            filters={optionalFilters}
            rowsPerPageOptions={perPageOptions}
            filterDisplay="menu"
            dataKey="id"
            onFilter={onFilter}
            value={users?.data}
            loading={isLoading}
            onSort={onSort}
            sortField={queryParams.sortField}
            sortOrder={queryParams.sortOrder}
            style={{ width: '100%' }}>
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
        {showCreateOrUpdate && (
          <UserUpdate
            show={showCreateOrUpdate}
            user={user}
            onClose={closeDialog}
          />
        )}
      </Card>
      <ConfirmDialog />
    </div>
  );
}
