import React, { useEffect, useRef, useState } from 'react';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Card } from 'primereact/card';
import { ErrorFetching, TableAction } from '../shared';
import ErrorBoundary from '../../utils/error-boundary';
import {
  User,
  UserUpdate,
  useDeleteUser,
  useFetchUsers,
  userDefaultValue,
} from '.';
import {
  IQueryParams,
  PAGE_SIZE_OPTIONS,
  stringDefaultFilter,
} from '../../utils/utils';
import { AppTableHeader } from '../shared/table-header';

export default function UserList() {
  //Config column filters
  const initialOptionFilters: DataTableFilterMeta = {
    firstName: stringDefaultFilter,
    lastName: stringDefaultFilter,
  };

  const pageSizeOptions = PAGE_SIZE_OPTIONS;

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
    pageSize: 10,
    page: 0,
    optionalFilters: undefined,
    sortField: undefined,
    sortOrder: undefined,
  });

  const {
    isLoading,
    isError,
    refetch,
    error: errorFetching,
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
    const data = userData || { ...userDefaultValue };
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

  const confirmDelete = (user: User) => {
    confirmDialog({
      header: 'Confirm Detele User',
      message: 'Are you sure you want to delete this user',
      accept: () => deteleMutation.mutate(user.id!),
    });
  };

  const header = () => {
    return (
      <AppTableHeader
        title="User"
        create={() => createOrEdit()}
        clearFilters={() => clearFilters()}
      />
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
    <div className="flex flex-column gap-2">
      <Card className="shadow-5 w-full">
        {isError ? (
          <ErrorFetching error={errorFetching} refetch={refetch} />
        ) : (
          <DataTable
            header={header}
            size="small"
            lazy
            paginator
            first={queryParams.first}
            rows={queryParams.pageSize}
            totalRecords={users?.total}
            onPage={pageChanges}
            filters={optionalFilters}
            rowsPerPageOptions={pageSizeOptions}
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
          <ErrorBoundary>
            <UserUpdate
              show={showCreateOrUpdate}
              user={user}
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
