<<<<<<< HEAD
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
=======
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./store.jsx";
import { Buffer } from 'buffer';
import process from 'process';

window.Buffer = Buffer;
window.process = process;

// import { positions, transitions, Provider as AlertProvider } from "react-alert";
// import AlertTemplate from "react-alert-template-basic";

// const options = {
//   timeout: 5000,
//   position: positions.BOTTOM_CENTER,
//   transition: transitions.SCALE,
// };

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
     <Provider store={Store}>
      {/* <AlertProvider template={AlertTemplate} {...options}> */}
      <App />
      {/* </AlertProvider> */}
    </Provider>
  </BrowserRouter>
);
>>>>>>> a9d5cf5 (Clean history and remove sensitive data)
