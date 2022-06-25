import React, { useState } from 'react';
import { DataTableFilterMeta } from 'primereact/datatable';
import ErrorBoundary from '../../utils/error-boundary';
import {
  User,
  UserUpdate,
  useDeleteUser,
  useFetchUsers,
  userDefaultValue,
} from '.';
import {
  DEFAULT_QUERY_PARAMS,
  IQueryParams,
  stringDefaultFilter,
} from '../../utils/utils';
import { useAppToast } from '../shared/toast-provider';
import { AppTable } from '../shared/app-table';

export default function UserList() {
  //Config column filters
  const initialOptionFilters: DataTableFilterMeta = {
    firstName: stringDefaultFilter,
    lastName: stringDefaultFilter,
  };

  const columns = [
    { field: 'firstName', header: 'First Name', searchable: true },
    { field: 'lastName', header: 'Last Name' },
    { field: 'email', header: 'Email' },
  ];

  const [showCreateOrUpdate, setShowCreateOrUpdate] = useState(false);

  //Selected user to be updated or new user
  const [user, setUser] = useState<User>();

  const { showSuccess, showError, confirm } = useAppToast();

  /** pagination option, optional filters ,
   *  useFetchUser function observe this state and reload data when any property value is changed
   */
  const [queryParams, setQueryParams] =
    useState<IQueryParams>(DEFAULT_QUERY_PARAMS);

  const query = useFetchUsers({
    queryParams,
  });

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

  const onParamChange = (changes: any) => {
    setQueryParams({
      ...queryParams,
      ...changes,
    });
  };

  const confirmDelete = (user: User) => {
    confirm(`Are you sure you want to delete this user`, 'Confirm Delete', () =>
      deteleMutation.mutate(user.id),
    );
  };

  return (
    <div className="flex flex-column gap-3">
      <AppTable
        columns={columns}
        query={query}
        queryParams={queryParams}
        initialOptionFilters={initialOptionFilters}
        mutation={deteleMutation}
        createOrEdit={createOrEdit}
        confirmDelete={confirmDelete}
        onParamChange={onParamChange}
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
    </div>
  );
}
