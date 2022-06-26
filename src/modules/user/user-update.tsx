import React from 'react';
import { useForm } from 'react-hook-form';
import { useFetchRoles } from '../role';
import { User, useCreateOrUpdateUser } from '.';
import { VALID_EMAIL_PATTERN } from '../../utils/utils';
import { AppDialog } from '../shared/app-dialog';
import {
  AppInputSwitch,
  AppInputText,
  AppMultSelect,
  AppSubmitBtn,
} from '../shared/app-form-controls';

export const UserUpdate = ({ user, onClose, show }: any) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: user,
  });

  const rolesQuery = useFetchRoles({
    queryParams: { columns: 'id,name' },
  });

  const saveMutation = useCreateOrUpdateUser({
    onSuccess: () => onClose(true),
  });

  const onSubmit = async (data: User) => saveMutation.mutate(data);

  return (
    <AppDialog
      show={show}
      onClose={onClose}
      header="Create or Update User"
      isError={saveMutation.isError}
      isSubmiting={saveMutation.isLoading}
      error={saveMutation.error}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
        <div className="flex flex-column gap-3 mt-4">
          <AppInputText
            control={control}
            name="email"
            label="Email"
            errors={errors}
            rules={{
              required: 'Email is required',
              pattern: {
                value: VALID_EMAIL_PATTERN,
                message: 'Email is invalid',
              },
            }}
          />
          <AppInputText
            control={control}
            name="firstName"
            label="First Name"
            errors={errors}
            rules={{ required: 'First name is required.' }}
          />
          <AppInputText control={control} name="lastName" label="Last Name" />
          <AppMultSelect
            control={control}
            name="roles"
            label="Roles"
            optionLabel="name"
            options={rolesQuery.data?.data}
            refetch={rolesQuery.refetch}
            isLoading={rolesQuery.isLoading}
          />
          <AppInputSwitch name="isActive" control={control} label="Is Active" />
          <AppSubmitBtn />
        </div>
      </form>
    </AppDialog>
  );
};
