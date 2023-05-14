import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import store from "./store";
// import {positions, transitions, Provider as AlertProvider} from "react-alert";
// import {AlertTemplate}  from 'react-alert';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const options = {
    position: "bottom-center",
    autoClose: 8000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: "closeOnClick" ,
    rtl: false,
    pauseOnFocusLoss: "pauseOnFocusLoss",
    draggable: "draggable",
    pauseOnHover: "pauseOnHover",
    theme: "light"
}
root.render(
  <Provider store={store}>
    <ToastContainer {...options}/>
      <App />
  </Provider>
);

