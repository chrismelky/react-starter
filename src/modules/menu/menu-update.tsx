import React from 'react';
import { useForm } from 'react-hook-form';
import { AppDialog } from '../shared/app-dialog';
import {
  AppInputSwitch,
  AppInputText,
  AppSelect,
  AppSubmitBtn,
} from '../shared/app-form-controls';

import { Menu, useCreateOrUpdateMenu, useFetchMenus } from '.';

export const MenuUpdate = ({ menu, onClose, show }: any) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: menu,
  });

  const parentsQuery = useFetchMenus({
    queryParams: { columns: 'id,name' },
  });

  const saveMutation = useCreateOrUpdateMenu({
    onSuccess: () => onClose(true),
  });

  const onSubmit = async (data: Menu) => saveMutation.mutate(data);

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
            name="label"
            label="Label"
            errors={errors}
            rules={{
              required: 'Label is required',
            }}
          />

          <AppInputText
            control={control}
            name="icon"
            label="Icon"
            errors={errors}
            rules={{}}
          />

          <AppInputSwitch
            name="separator"
            control={control}
            label="Separator"
          />
          <AppInputText
            control={control}
            name="routerLink"
            label="Router Link"
            errors={errors}
            rules={{
              required: 'Router Link is required',
            }}
          />

          <AppSelect
            control={control}
            name="parents"
            label="Parent "
            optionLabel="name"
            options={parentsQuery.data?.data}
            refetch={parentsQuery.refetch}
            isLoading={parentsQuery.isLoading}
          />

          <AppSubmitBtn />
        </div>
      </form>
    </AppDialog>
  );
};
