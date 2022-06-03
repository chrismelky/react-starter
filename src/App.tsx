import React from 'react';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/mdc-light-indigo/theme.css'; //theme                 //core css
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss'; //icons
import Main from './components/layout/Main';
import Login from './components/layout/Login';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';

const queryClient = new QueryClient();

function App() {
  console.log('App loaded');
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route path="*" element={<Main />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
