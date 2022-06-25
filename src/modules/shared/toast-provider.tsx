import React, { createContext, useContext, useMemo, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

export type AppToastType = {
  showSuccess: (message: string, title?: string) => void;
  showError: (message: string, title?: string) => void;
  showWarning: (message: string, title?: string) => void;
  confirm: (message: string, header: string, accept: any) => void;
};

export const AppToastParam: AppToastType = {
  showSuccess: (message: string, title?: string) => {},
  showError: (message: string, title?: string) => {},
  showWarning: (message: string, title?: string) => {},
  confirm: (message: string, header: string, accept: any) => {},
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
  const confirm = (message: string, header: string, accept: any) => {
    confirmDialog({
      header: 'Confirm Detele User',
      message: 'Are you sure you want to delete this user',
      accept: accept,
    });
  };

  const value = useMemo(
    () => ({
      showSuccess,
      showError,
      showWarning,
      confirm,
    }),
    [],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast ref={toast} />
      <ConfirmDialog />
    </ToastContext.Provider>
  );
};

const useAppToast = () => useContext<AppToastType>(ToastContext);

export { AppToastProvider, useAppToast };
