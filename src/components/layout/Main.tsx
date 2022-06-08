import React, { useState } from 'react';

import { Routes, Route } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { AppBar } from './AppBar';
import { AppDrawer } from './AppDrawer';

const UserList = React.lazy(() => import('../user/user-list'));

export default function Main() {
  console.log('main rendered');
  const { user } = useAuth();

  const [visible, setVisible] = useState(true);

  const Home = () => {
    return <div>Home</div>;
  };

  return (
    <>
      <div className="flex" style={{ backgroundColor: '#e4e5e6' }}>
        <AppDrawer setVisible={() => setVisible} visible={visible} />
        <section
          className="flex flex-column flex-grow-1"
          style={{ backgroundColor: '#e4e5e6', height: '100%' }}>
          <AppBar setVisible={setVisible} visible={visible} />
          <div className="flex flex-column p-3">
            <Routes>
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
            </Routes>
          </div>
        </section>
      </div>
    </>
  );
}
