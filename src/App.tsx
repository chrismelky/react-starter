import React, { lazy, useEffect } from 'react';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/mdc-light-indigo/theme.css'; //theme                 //core css
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './app.scss'; //icons
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSession } from './reducers/authentication';
import Main from './modules/layout/main';
import Login from './modules/login/login';
import PrivateRouteComponent from './private-route';

const Dashboard = lazy(() => import('./modules/dashboard'));
const UserList = lazy(() => import('./modules/user'));
const FacilityTypeList = React.lazy(() => import('./modules/facility-type'));
/* ====Chrispro lazy component Generator Hook: Dont Delete==== */

function App() {
  const dispatch = useDispatch();

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
          path="/facility-type"
          element={
            <PrivateRouteComponent
              component={FacilityTypeList}
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
