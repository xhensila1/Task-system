import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import { store } from './app/store';
import App from './App';
import './index.css';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
    <I18nextProvider i18n={i18n}>
      <App />
      </I18nextProvider>
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
