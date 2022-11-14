import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import init from './init'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const vdom = init()
root.render(
  // <React.StrictMode>
    vdom
    // <App />
  // </React.StrictMode>
);

reportWebVitals();
