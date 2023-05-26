import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { sdkConfig, wxworkLogin, uniteLogin, onGetLoginParams } from './login/config';
import { openAuth, backFetchQuery } from 'oauth-teams-ts/lib';
import reportWebVitals from './reportWebVitals';
import './index.css';
const { wxworkParams, uniteParams } = onGetLoginParams(backFetchQuery(window.location.href));


const container = document.getElementById('root');
const root = createRoot(container);
const result = openAuth(
  sdkConfig,
  () => wxworkLogin(wxworkParams),
  () => uniteLogin(uniteParams),
  (e, text) => {
    console.log(e, text,  'e');
  },
);
console.log('123456798', result)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
