import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { classNames } from 'primereact/utils';
import { useQuery } from 'react-query';
import { getRoles } from '../role/RoleApi';
import { useCreateOrUpdateUser } from './user-api';
import { Dialog } from 'primereact/dialog';
import { Message } from 'primereact/message';
import { User } from './user';

export const UserUpdate = ({ user, onClose, show }: any) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: user,
  });

  const {
    mutate: createOrUpdate,
    isError,
    error,
  } = useCreateOrUpdateUser({
    onSuccess: () => {
      onClose(true);
    },
  });

  const { data: roles } = useQuery('roles', () => getRoles());

  const onSubmit = async (data: User) => {
    createOrUpdate(data);
  };

  const getFormErrorMessage = (name: string) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  return (
    <Dialog
      onHide={() => onClose(false)}
      visible={show}
      style={{ width: '450px' }}
      header="Create or Update User"
      modal>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
          <div className="flex flex-column gap-2">
            {isError && (
              <Message
                severity="error"
                content={
                  typeof error.message === 'object'
                    ? error.message?.map((e: string) => <li key={e}>{e}</li>)
                    : error.message
                }></Message>
            )}
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: 'Email is reauired' }}
                  render={({ field, fieldState }) => (
                    <InputText id={field.name} {...field} />
                  )}
                />
                <label
                  htmlFor="email"
                  className={classNames({ 'p-error': errors.email })}>
                  Email*
                </label>
              </span>
              {getFormErrorMessage('email')}
            </div>
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="firstName"
                  control={control}
                  rules={{ required: 'First name is required.' }}
                  render={({ field, fieldState }) => (
                    <InputText id={field.name} {...field} autoFocus />
                  )}
                />
                <label
                  htmlFor="firstName"
                  className={classNames({ 'p-error': errors.firstName })}>
                  First Name*
                </label>
              </span>
              {getFormErrorMessage('firstName')}
            </div>
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <InputText id={field.name} {...field} autoFocus />
                  )}
                />
                <label
                  htmlFor="lastName"
                  className={classNames({ 'p-error': errors.lastName })}>
                  Last Name*
                </label>
              </span>
              {getFormErrorMessage('lastName')}
            </div>
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="roles"
                  control={control}
                  render={({ field }) => (
                    <MultiSelect
                      dataKey="id"
                      id={field.name}
                      {...field}
                      options={roles || []}
                      optionLabel="name"
                    />
                  )}
                />
                <label
                  htmlFor="roles"
                  className={classNames({ 'p-error': errors.roles })}>
                  Roles Name*
                </label>
              </span>
              {getFormErrorMessage('roles')}
            </div>
          </div>
          <Button type="submit" label="Submit" className="mt-2" />
        </form>
      </div>
    </Dialog>
  );
};
