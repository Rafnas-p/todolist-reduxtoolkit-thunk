import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';  
import App from './App';

// Get the root element
const container = document.getElementById('root');

// Create the root
const root = createRoot(container);

// Wrap App with the Redux Provider
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
