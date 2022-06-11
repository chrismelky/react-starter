import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../../config/store';
import { AppBar } from './app-bar';
import { AppDrawer } from './app-drawer';

export default function Main() {
  const [visible, setVisible] = useState(true);

  const { isAuthenticated, user, sessionHasBeenFetched } = useSelector(
    (state: RootState) => state.authentication,
  );

  if (!sessionHasBeenFetched) {
    return <div>Connecting....</div>;
  } else if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="flex" style={{ backgroundColor: '#e4e5e6' }}>
        <AppDrawer setVisible={() => setVisible} visible={visible} />
        <section
          className="flex flex-column flex-grow-1"
          style={{ backgroundColor: '#e4e5e6', height: '100%' }}>
          <AppBar setVisible={setVisible} visible={visible} user={user} />
          <div className="flex flex-column p-3">
            <Outlet />
          </div>
        </section>
      </div>
    </>
  );
}
