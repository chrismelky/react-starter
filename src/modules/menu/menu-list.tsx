import React, { useState } from 'react';
import { DataTableFilterMeta } from 'primereact/datatable';
import ErrorBoundary from '../../utils/error-boundary';
import {
  Menu,
  MenuUpdate,
  useDeleteMenu,
  useFetchMenus,
  menuDefaultValue,
} from '.';
import {
  DEFAULT_QUERY_PARAMS,
  IQueryParams,
  stringDefaultFilter,
} from '../../utils/utils';
import { useAppToast } from '../shared/toast-provider';
import { AppTable } from '../shared/app-table';

export default function MenuList() {
  const initialOptionFilters: DataTableFilterMeta = {
    label: stringDefaultFilter,
  };

  const columns = [
    { field: 'label', header: 'Label' },

    { field: 'icon', header: 'Icon' },

    { field: 'separator', header: 'Separator' },

    { field: 'routerLink', header: 'Router Link' },
  ];

  const [showCreateOrUpdate, setShowCreateOrUpdate] = useState(false);

  const [menu, setMenu] = useState<Menu>();

  const { showSuccess, showError, confirm } = useAppToast();

  const [queryParams, setQueryParams] =
    useState<IQueryParams>(DEFAULT_QUERY_PARAMS);

  const menusQuery = useFetchMenus({
    queryParams,
  });

  const deteleMutation = useDeleteMenu({
    onSuccess: () => {
      menusQuery.refetch();
      showSuccess('Menu deleted successfully');
    },
    onError: () => {
      showError('Something went wrong', 'Cannot delete Menu');
    },
  });

  const createOrEdit = (menuData?: Menu) => {
    const data = menuData || { ...menuDefaultValue };
    setMenu(data);
    setShowCreateOrUpdate(true);
  };

  const closeDialog = (result: boolean) => {
    setShowCreateOrUpdate(false);
    setMenu(undefined);
    if (result) {
      menusQuery.refetch();
      showSuccess('Menu created successfully');
    }
  };

  const onParamChange = (changes: any) => {
    setQueryParams({
      ...queryParams,
      ...changes,
    });
  };

  const confirmDelete = (menu: Menu) => {
    confirm(`Are you sure you want to delete this Menu`, 'Confirm Delete', () =>
      deteleMutation.mutate(menu.id!),
    );
  };

  return (
    <div className="flex flex-column gap-3">
      <AppTable
        columns={columns}
        query={menusQuery}
        title="Menus"
        queryParams={queryParams}
        initialOptionFilters={initialOptionFilters}
        mutation={deteleMutation}
        createOrEdit={createOrEdit}
        confirmDelete={confirmDelete}
        onParamChange={onParamChange}
      />
      {showCreateOrUpdate && (
        <ErrorBoundary>
          <MenuUpdate
            show={showCreateOrUpdate}
            menu={menu}
            onClose={closeDialog}
          />
        </ErrorBoundary>
      )}
    </div>
  );
}
