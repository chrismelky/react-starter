import React, { useEffect, useState } from 'react';
import { DataTableFilterMeta } from 'primereact/datatable';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import ErrorBoundary from '../../utils/error-boundary';
import {
  User,
  UserUpdate,
  useDeleteUser,
  useFetchUsers,
  userDefaultValue,
} from '.';
import { IQueryParams, stringDefaultFilter } from '../../utils/utils';
import { useAppToast } from '../shared/toast-provider';
import { AppTable } from '../shared/app-table';

export default function UserList() {
  //Config column filters
  const initialOptionFilters: DataTableFilterMeta = {
    firstName: stringDefaultFilter,
    lastName: stringDefaultFilter,
  };

  const [showCreateOrUpdate, setShowCreateOrUpdate] = useState(false);

  //Selected user to be updated or new user
  const [user, setUser] = useState<User>();

  /** a separeate filter state to avoid data loading on initilization, table columns that can be filtered and they options (i.e not necessary to fetch data)*/
  const [optionalFilters, setOptionalFilters] = useState<DataTableFilterMeta>();

  const { showSuccess, showError } = useAppToast();

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

  const query = useFetchUsers({
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
      query.refetch();
      showSuccess('User deleted successfully');
    },
    onError: () => {
      showError('Something went wrong', 'Cannot delete user');
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
      query.refetch();
      showSuccess('User created successfully');
    }
  };

  const onPageChange = (event: any) => {
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

  return (
    <div className="flex flex-column gap-3">
      <AppTable
        optionalFilters={optionalFilters}
        query={query}
        queryParams={queryParams}
        mutation={deteleMutation}
        createOrEdit={createOrEdit}
        confirmDelete={confirmDelete}
        onSort={onSort}
        onFilter={onFilter}
        onPageChange={onPageChange}
        clearFilters={clearFilters}
      />
      {showCreateOrUpdate && (
        <ErrorBoundary>
          <UserUpdate
            show={showCreateOrUpdate}
            user={user}
            onClose={closeDialog}
          />
        </ErrorBoundary>
      )}
      <ConfirmDialog />
    </div>
  );
}
