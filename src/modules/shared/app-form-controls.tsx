import React from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { classNames } from 'primereact/utils';
import { Control, Controller } from 'react-hook-form';
import { InputSwitch } from 'primereact/inputswitch';

type AppInputProps = {
  control: Control<any, any>;
  errors?: any;
  name: string;
  label: string;
  rules?: any;
};

type AppSelectProps = {
  control: Control<any, any>;
  errors?: any;
  name: string;
  label: string;
  rules?: any;
  options: any[];
  optionLabel: string;
  optionValue?: string;
  isLoading?: boolean;
  refetch?: () => void;
};

export const AppInputText = ({
  control,
  errors,
  name,
  label,
  rules,
}: AppInputProps) => {
  const getFormErrorMessage = (name: string) => {
    return (
      errors &&
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };
  return (
    <div className="field w-full">
      <span className="p-float-label">
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <InputText id={field.name} {...field} autoComplete="off" />
          )}
        />
        <label
          htmlFor={name}
          className={errors && classNames({ 'p-error': errors[name] })}>
          {label}
        </label>
      </span>
      {getFormErrorMessage(name)}
    </div>
  );
};

export const AppMultSelect = ({
  control,
  errors,
  name,
  label,
  rules,
  options,
  optionLabel,
  optionValue,
  isLoading,
  refetch,
}: AppSelectProps) => {
  const getFormErrorMessage = (name: string) => {
    return (
      errors &&
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  return (
    <>
      <div className="field">
        <span className="p-float-label">
          <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (
              <MultiSelect
                filter={true}
                dataKey="id"
                id={field.name}
                {...field}
                options={options || []}
                optionLabel={optionLabel}
                optionValue={optionValue}
                data-testid={name}
              />
            )}
          />
          <label
            htmlFor={name}
            className={errors && classNames({ 'p-error': errors[name] })}>
            {isLoading && 'Loading'} {label}
          </label>
        </span>
        {getFormErrorMessage(name)}
      </div>
    </>
  );
};

export const AppInputSwitch = ({ control, name, label }: AppInputProps) => {
  return (
    <div className="flex flex-row gap-1 align-items-center">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <InputSwitch
            id={field.name}
            {...field}
            onChange={(e) => field.onChange(e.value)}
            checked={field.value}
          />
        )}
      />
      {label}
    </div>
  );
};

export const AppSubmitBtn = () => <Button type="submit" label="Submit" />;
