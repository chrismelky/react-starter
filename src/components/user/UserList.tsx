import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { User } from './User';
import { UserUpdate } from './UserUpdate';
import { Card } from 'primereact/card';
import { useQuery } from 'react-query';
import { getUsers } from './UserApi';

export default function UserList() {
  const [per_page] = useState<number>(5);

  const [page] = useState<number>(1);

  const { isLoading, data, isError, refetch } = useQuery(
    ['users', page, per_page],
    () => getUsers({ page, per_page }),
    {
      keepPreviousData: true,
      retry: false,
    },
  );

  const [showCreateOrUpdate, setShowCreateOrUpdate] = useState(false);

  const [user, setUser] = useState<User | null>();

  const createOrEdit = (user?: User) => {
    const data = user || {
      ...new User(),
    };
    setUser(data);
    setShowCreateOrUpdate(true);
  };

  const closeDialog = (result: boolean) => {
    setUser(null);
    setShowCreateOrUpdate(false);
    if (result) {
    }
  };

  const actions = (rowData: User) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => createOrEdit(rowData)}
        />
      </React.Fragment>
    );
  };

  return (
    <div className="flex flex-column gap-3">
      <Card></Card>
      <Card style={{ width: '100%' }}>
        {isError ? (
          <span>
            Error loading Data please referesh{' '}
            <Button onClick={() => refetch()} label="Reload"></Button>
          </span>
        ) : (
          <DataTable
            totalRecords={data?.total}
            paginator={true}
            rows={per_page}
            value={data?.data}
            loading={isLoading}
            style={{ width: '100%' }}>
            <Column field="first_name" header="First Name" />
            <Column field="last_name" header="Last Name" />
            <Column header="Email" field="email" />
            <Column body={actions} header="" />
          </DataTable>
        )}

        <Dialog
          onHide={() => closeDialog(false)}
          visible={showCreateOrUpdate}
          style={{ width: '450px' }}
          header="Create or Update User"
          modal>
          <UserUpdate user={user} onClose={closeDialog} />
        </Dialog>
      </Card>
    </div>
  );
}
