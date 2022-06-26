import React, { lazy, useEffect } from 'react';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './app.scss';
import { Route, Routes } from 'react-router-dom';
import { getSession } from './reducers/authentication';
import Main from './modules/layout/main';
import Login from './modules/login/login';
import PrivateRouteComponent from './private-route';
import { useAppDispatch } from './config/store';

const Dashboard = lazy(() => import('./modules/dashboard'));
const UserList = lazy(() => import('./modules/user'));
const RoleList = lazy(() => import('./modules/role'));
/* ====Chrispro lazy component Generator Hook: Dont Delete==== */

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSession());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route
          path="/"
          element={<PrivateRouteComponent component={Dashboard} />}
        />
        <Route
          path="/user"
          element={
            <PrivateRouteComponent
              component={UserList}
              hasAnyAuthorities={[]}
            />
          }
        />
        <Route
          path="/role"
          element={
            <PrivateRouteComponent
              component={RoleList}
              hasAnyAuthorities={[]}
            />
          }
        />
        {/* ====Chrispro router Generator Hook: Dont Delete==== */}
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
