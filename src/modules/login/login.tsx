import React from 'react';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../reducers/authentication';
import { Card } from 'primereact/card';
import { Controller, useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { VALID_EMAIL_PATTERN } from '../../utils/utils';
import { useLogin } from './login-api';
import { Message } from 'primereact/message';

export default function Login() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const dispatch = useDispatch();

  const navitate = useNavigate();

  const { isLoading, mutate, isError } = useLogin({
    onSuccess: (result) => {
      dispatch(login(result));
      navitate('/');
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const onSubmit = async (data) => {
    mutate(data);
  };

  const getFormErrorMessage = (name: string) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid h-full">
      <div
        className="flex flex-row justify-content-center align-items-center w-full h-full"
        style={{ backgroundColor: '#f8f9fa' }}>
        <Card className="w-11 md:w-6 lg:w-4">
          <div className="flex flex-column justify-content-start align-items-center">
            <span className="text-lg font-medium">Login</span>
            {isError && (
              <Message
                severity="error"
                content="Invalid username or password"
              />
            )}
            <div className="field w-full">
              <span className="p-float-label">
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is reauired',
                    pattern: {
                      value: VALID_EMAIL_PATTERN,
                      message: 'Email is invalid',
                    },
                  }}
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
            <div className="field w-full">
              <span className="p-float-label">
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: 'Password is reauired' }}
                  render={({ field, fieldState }) => (
                    <Password
                      feedback={false}
                      toggleMask={true}
                      id={field.name}
                      {...field}
                    />
                  )}
                />
                <label
                  htmlFor="password"
                  className={classNames({ 'p-error': errors.email })}>
                  Password*
                </label>
              </span>
              {getFormErrorMessage('password')}
            </div>

            <Button
              type="submit"
              label="login"
              icon="pi pi-exit"
              disabled={isLoading}
              className="p-button-raised w-full"
            />
          </div>
        </Card>
      </div>
    </form>
  );
}
