import React, { useCallback, useEffect, useState } from 'react';
import { DataTable} from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { User } from './User';
import { UserUpdate } from './UserUpdate';
import { UserService } from './UserService';
import { Card } from 'primereact/card';


export default function UserList() {

    const [users, setUsers] = useState<User[]>([]);

    const [showCreateOrUpdate, setShowCreateOrUpdate] = useState(false);

    const [user, setUser] = useState<User | null>();

    const [perPage] = useState<number>(10)

    const userService = new UserService();

    const [isLoading, setIsLoading] = useState(false)

    const loadPage = useCallback(() => {
        setIsLoading(true)
        userService.query({
            per_page: perPage
        }).then(resp => {
            setUsers(resp.data);
            setIsLoading(false)

        }).catch(err => {
            console.error(err);
            setIsLoading(false)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [perPage])

    useEffect(() => {
        loadPage()
    }, [loadPage])

    const createOrEdit = (user?: User) => {
        const data  = user || {
            ...new User()
        };
        setUser(data);
        setShowCreateOrUpdate(true)
    }

    const closeDialog = (result: boolean) => {
        setUser(null)
        setShowCreateOrUpdate(false)
        if (result) {

        }
    }

    const actions  = (rowData: User) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => createOrEdit(rowData)} />
            </React.Fragment>
        )
    }

    return (
        <div className="flex flex-column gap-3">
        <Card></Card>

        <Card style={{width: '100%'}}>
            <Button onClick={() => createOrEdit()} label='More'></Button>
        <DataTable value={users} loading={isLoading} style={{width: '100%'}}>
           <Column field="first_name" header="First Name"/>
           <Column field="last_name" header="Last Name"/>
           <Column header="Email" field="email"/>
           <Column body={actions} header="" />
       </DataTable>
       <Dialog onHide={() => closeDialog(false)} visible={showCreateOrUpdate} 
          style={{ width: '450px' }} header="Create or Update User" modal
       >
            <UserUpdate user={user} onClose={closeDialog} />
       </Dialog>
        </Card>
        </div>
        
       
    )
}