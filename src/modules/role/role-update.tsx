import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Dialog } from 'primereact/dialog';
import { Message } from 'primereact/message';

import { Role, useCreateOrUpdateRole } from '.';

export const RoleUpdate = ({ role, onClose, show }: any) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: role,
  });

  const {
    mutate: createOrUpdate,
    isError,
    error,
  } = useCreateOrUpdateRole({
    onSuccess: () => {
      onClose(true);
    },
  });

  const onSubmit = async (data: Role) => {
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
      header="Create or Update Role"
      modal>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
          <div className="flex flex-column gap-2 mt-2">
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
                  name="name"
                  control={control}
                  rules={{
                    required: 'Name is required',
                  }}
                  render={({ field, fieldState }) => (
                    <InputText id={field.name} {...field} />
                  )}
                />
                <label
                  htmlFor="name"
                  className={classNames({ 'p-error': errors.name })}>
                  Name
                </label>
              </span>
              {getFormErrorMessage('name')}
            </div>
          </div>
          <Button type="submit" label="Submit" className="mt-2" />
        </form>
      </div>
    </Dialog>
  );
};
