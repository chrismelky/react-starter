import React, { useEffect, useRef, useState } from 'react';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { UserUpdate } from './user-update';
import { Card } from 'primereact/card';
import { useDeleteUser, useFetchUsers } from './user-api';
import { TableAction } from '../shared/TableAction';
import { User } from './user';
import { IQueryParams, stringDefaultFilter } from '../../utils/utils';

export default function UserList() {
  const initialOptionFilters: DataTableFilterMeta = {
    firstName: stringDefaultFilter,
    lastName: stringDefaultFilter,
  };

  const [perPageOptions] = useState<number[]>([2, 5, 10]);

  const [showCreateOrUpdate, setShowCreateOrUpdate] = useState(false);

  const [user, setUser] = useState<User>();

  const [optionalFilters, setOptionalFilters] = useState<DataTableFilterMeta>();

  const [queryParams, setQueryParams] = useState<IQueryParams>({
    first: 0,
    rows: 10,
    page: 0,
    optionalFilters: undefined,
    sortField: undefined,
    sortOrder: undefined,
  });

  const toast = useRef<Toast>(null);

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

  const clearFilters = () => {
    initFilters();
    setQueryParams({
      ...queryParams,
      optionalFilters,
    });
  };

  useEffect(() => {
    initFilters();
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
