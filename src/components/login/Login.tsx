import React from 'react';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../reducers/authentication';
import { Card } from 'primereact/card';

export default function Login() {
  const dispatch = useDispatch();

  const navitate = useNavigate();

  const ingia = () => {
    dispatch(login({ firstName: 'ChrisNew' }));
    navitate('/');
  };

  return (
    <div
      className="flex flex-row justify-content-center align-items-center w-full h-full"
      style={{ backgroundColor: '#f8f9fa' }}>
      <Card className="sm:w-11 md:w-6">
        <div className="flex flex-column justify-content-start align-items-center">
          <div>Login is working</div>
          <Button
            label="login"
            onClick={ingia}
            icon="pi pi-exit"
            className="p-button-text p-button-icon p-button-rounded"
          />
        </div>
      </Card>
    </div>
  );
}
