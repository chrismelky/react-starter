import React from 'react';
import { useForm } from 'react-hook-form';
import { Role, useCreateOrUpdateRole } from '.';
import { AppDialog } from '../shared/app-dialog';
import { AppInputText, AppSubmitBtn } from '../shared/app-form-controls';

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

  return (
    <AppDialog
      show={show}
      onClose={onClose}
      header="Create or Update User"
      error={error}
      isError={isError}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
        <div className="flex flex-column gap-3 mt-4">
          <AppInputText
            control={control}
            errors={errors}
            name="name"
            label="Name"
            rules={{
              required: 'Name is required',
            }}
          />
          <AppSubmitBtn />
        </div>
      </form>
    </AppDialog>
  );
};
