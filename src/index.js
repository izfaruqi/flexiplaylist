import '@szhsin/react-menu/dist/index.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import rootStore from './state/store/root'
import { loadAllMediaFromDB } from './controllers/library';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={rootStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

loadAllMediaFromDB()
