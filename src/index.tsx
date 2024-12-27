import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Layout } from './Components/Layout/Layout';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store, persistor } from './store'; // Change to named import
import { PersistGate } from 'redux-persist/integration/react';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');  // Get token from localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Add token to request headers
  }
  return config;
}, (error) => {
  return Promise.reject(error); // Handle request error if any
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
