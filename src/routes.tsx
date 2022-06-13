import React from 'react';
import { Route } from 'react-router-dom';
import ErrorBoundary from './utils/error-boundary';

const UserList = React.lazy(() => import('./modules/user'));

/* ====Chrispro lazy component Generator Hook: Dont Delete==== */

const Home = () => {
  return <div>Home</div>;
};

const NotFound = () => {
  return <>Not found</>;
};
export const AppRoutes = () => {
  return (
    <React.Fragment>
      <Route
        path="/"
        element={
          <React.Suspense fallback={<NotFound />}>
            <Home />
          </React.Suspense>
        }
      />
      <Route
        path="/user"
        element={
          <React.Suspense fallback={<NotFound />}>
            <ErrorBoundary>
              <UserList />
            </ErrorBoundary>
          </React.Suspense>
        }
      />
      {/* ====Chrispro router Generator Hook: Dont Delete==== */}
    </React.Fragment>
  );
};
