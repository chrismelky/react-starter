import React from 'react';
import { Dialog } from 'primereact/dialog';
import { AppErrorMessage } from './app-error-message';
import { ProgressBar } from 'primereact/progressbar';

export const AppDialog = ({
  children,
  show,
  header,
  isError,
  isSubmiting,
  error,
  onClose,
}: any) => {
  return (
    <Dialog
      onHide={() => onClose(false)}
      visible={show}
      style={{ width: '600px' }}
      header={header || 'Dailog'}
      position="top"
      data-testid="create-update-dialog"
      modal>
      {isSubmiting && <ProgressBar mode="indeterminate" />}
      <div className="flex flex-column">
        {isError && <AppErrorMessage error={error} />}
        {children}
      </div>
    </Dialog>
  );
};
