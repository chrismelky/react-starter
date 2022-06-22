import { Button } from 'primereact/button';

export const ErrorFetching = ({ error, refetch }) => {
  return (
    <div className="flex flex-column gap-2" data-testid="error-fetch">
      <span className="flex flex-row gap-2 align-items-center">
        <span> Something went wrong </span>
        <Button onClick={() => refetch()} label="Reload"></Button>
      </span>
      {JSON.stringify(error)}
    </div>
  );
};
