import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Router } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import LoginPage from './Components/LoginPage';
import { Navigate, Outlet } from "react-router-dom";
import UserPool from './Services/UserPool';
import { SnackbarProvider } from 'notistack';
/* import { Amplify } from 'aws-amplify';
import config from './amplifyconfiguration.json';

Amplify.configure(config); */

const PrivateRoute = () => {
  const user = UserPool.getCurrentUser()
  if (!user) return <Navigate to="/login" />;
  return <Outlet />;
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff5b8d"
    },
    secondary: {
      main: "#4e3350",
      dark: "#725374"
    }
  }
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path='/' element={<App />} />
            </Route>
            <Route path='/login' element={<LoginPage />} />
          </Routes >
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode >
);

reportWebVitals();
