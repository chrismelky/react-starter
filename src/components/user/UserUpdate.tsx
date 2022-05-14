import React, { useEffect } from 'react';
import { Controller, useForm} from 'react-hook-form';
import { User } from './User';
import { Button } from 'primereact/button';
import { InputText} from 'primereact/inputtext';
import { classNames } from 'primereact/utils';


export const UserUpdate = ({user, onClose}: any) => {

   
    const { control, formState: {errors}, handleSubmit } = useForm({
        defaultValues: user
    });
    
    useEffect(() => {
    },[])

    const onSubmit = (data: User) => {
        //Call service
        //close and resert
        console.log(data)
        onClose(true);
       // reset()
    }

    const getFormErrorMessage = (name: string) => {
       return '' //errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    return (
        <div >
           <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
               <div style={{display: 'block'}}>
                   <div className="field">
                            <span className="p-float-label">
                                <Controller name="first_name" control={control} rules={{ required: 'First name is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus />
                                )} />
                                <label htmlFor="first_name" className={classNames({ 'p-error': errors.firstName })}>Name*</label>
                            </span>
                            {getFormErrorMessage('first_name')}
                    </div>
               </div>
               <Button type="submit" label="Submit" className="mt-2" />
           </form>
        </div>
    )
}