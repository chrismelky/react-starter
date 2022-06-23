import { Toast } from 'primereact/toast';
import React, { createContext, useContext, useRef } from 'react';

export type AppToastType = {
  showSuccess: (message: string, title?: string) => void;
  showError: (message: string, title?: string) => void;
  showWarning: (message: string, title?: string) => void;
};

export const AppToastParam: AppToastType = {
  showSuccess: (message: string, title?: string) => {},
  showError: (message: string, title?: string) => {},
  showWarning: (message: string, title?: string) => {},
};

const ToastContext = createContext<AppToastType>(AppToastParam);

const AppToastProvider = ({ children }) => {
  const toast = useRef<Toast>(null);

  const showSuccess = (message: string, title?: string) => {
    toast.current?.show({
      severity: 'success',
      summary: title,
      detail: message,
      life: 3000,
    });
  };

  const showError = (message: string, title?: string) => {
    toast.current?.show({
      severity: 'error',
      summary: title,
      detail: message,
      life: 3000,
    });
  };

  const showWarning = (message: string, title?: string) => {
    toast.current?.show({
      severity: 'warning',
      summary: title,
      detail: message,
      life: 3000,
    });
  };

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showWarning }}>
      {children}
      <Toast ref={toast} />
    </ToastContext.Provider>
  );
};

const useAppToast = () => useContext<AppToastType>(ToastContext);

export { AppToastProvider, useAppToast };
