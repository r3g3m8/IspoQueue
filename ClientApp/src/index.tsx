import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from '../src/App.tsx' // G:/Diplom/IspoQueue/ClientApp/src/App.tsx
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
console.log(baseUrl)
root.render(
  <BrowserRouter basename={baseUrl || ""}>
    <App/>
  </BrowserRouter>
     
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
