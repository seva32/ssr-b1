/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

import App from './App';
import { ServerDataProvider } from './state/serverDataContext';

const serverData = window.__SERVER_DATA__;

export const main = () => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
      <ServerDataProvider value={serverData}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ServerDataProvider>,
      document.getElementById('root')
    );
  });
};