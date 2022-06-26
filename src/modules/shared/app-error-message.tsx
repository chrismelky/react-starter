import { Message } from 'primereact/message';
import React from 'react';

export const AppErrorMessage = ({ error }) => {
  return (
    <Message
      severity="error"
      content={
        typeof error.message === 'object'
          ? error.message?.map((e: string) => <li key={e}>{e}</li>)
          : error.message
      }></Message>
  );
};
