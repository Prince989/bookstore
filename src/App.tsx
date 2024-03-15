import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import DashboardMenu from './Components/DashboardMenu';
import { Provider } from 'react-redux';
import { store } from './lib/store';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <DashboardMenu />
      </div>
    </Provider>
  );
}

export default App;
