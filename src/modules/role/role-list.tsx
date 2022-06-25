import React, { useState } from 'react';
import { DataTableFilterMeta } from 'primereact/datatable';
import ErrorBoundary from '../../utils/error-boundary';
import {
  Role,
  RoleUpdate,
  useDeleteRole,
  useFetchRoles,
  roleDefaultValue,
} from '.';
import {
  DEFAULT_QUERY_PARAMS,
  IQueryParams,
  stringDefaultFilter,
} from '../../utils/utils';
import { AppTable } from '../shared/app-table';
import { useAppToast } from '../shared/toast-provider';

export default function RoleList() {
  //Config column filters
  const initialOptionFilters: DataTableFilterMeta = {
    name: stringDefaultFilter,
  };

  const columns = [{ field: 'name', header: 'Name', searchable: true }];

  const [showCreateOrUpdate, setShowCreateOrUpdate] = useState(false);

  //Selected Role to be updated or new Role
  const [role, setRole] = useState<Role>();

  const { showSuccess, showError, confirm } = useAppToast();

  /** pagination option, optional filters ,
   *  useFetchRoles function observe this state and reload data when any property value is changed
   */
  const [queryParams, setQueryParams] =
    useState<IQueryParams>(DEFAULT_QUERY_PARAMS);

  const query = useFetchRoles({
    queryParams,
  });

  const deteleMutation = useDeleteRole({
    onSuccess: () => {
      query.refetch();
      showSuccess('User deleted successfully');
    },
    onError: () => {
      showError('Something went wrong', 'Cannot delete user');
    },
  });

  const createOrEdit = (roleData?: Role) => {
    const data = roleData || roleDefaultValue;
    setRole(data);
    setShowCreateOrUpdate(true);
  };

  const closeDialog = (result: boolean) => {
    setShowCreateOrUpdate(false);
    setRole(undefined);
    if (result) {
      query.refetch();
      showSuccess('User created successfully', 'Success');
    }
  };

  const onParamChange = (changes: any) => {
    setQueryParams({
      ...queryParams,
      ...changes,
    });
  };

  const confirmDelete = (role: Role) => {
    confirm(
      'Are you sure you want to delete this Role',
      'Confirm Detele Role',
      () => deteleMutation.mutate(role.id!),
    );
  };

  return (
    <div className="flex flex-column gap-2">
      <AppTable
        columns={columns}
        initialOptionFilters={initialOptionFilters}
        query={query}
        queryParams={queryParams}
        mutation={deteleMutation}
        createOrEdit={createOrEdit}
        confirmDelete={confirmDelete}
        onParamChange={onParamChange}
      />
      {showCreateOrUpdate && (
        <ErrorBoundary>
          <RoleUpdate
            show={showCreateOrUpdate}
            role={role}
            onClose={closeDialog}
          />
        </ErrorBoundary>
      )}
    </div>
  );
}
