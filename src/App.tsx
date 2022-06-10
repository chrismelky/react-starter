import React, { useEffect } from 'react';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/mdc-light-indigo/theme.css'; //theme                 //core css
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss'; //icons
import Main from './components/layout/Main';
import Login from './components/login/Login';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSession } from './reducers/authentication';

const UserList = React.lazy(() => import('./components/user/user-list'));

const Home = () => {
  return <div>Home</div>;
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSession());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route
          path="/"
          element={
            <React.Suspense fallback={<>Not found</>}>
              <Home />
            </React.Suspense>
          }
        />
        <Route
          path="/user"
          element={
            <React.Suspense fallback={<>Not found</>}>
              <UserList />
            </React.Suspense>
          }
        />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
