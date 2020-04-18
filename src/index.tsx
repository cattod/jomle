import React from 'react';
import ReactDOM from 'react-dom';
import './asset/style/app/skin-default/style.scss';
import "react-alice-carousel/lib/alice-carousel.css";
import { App } from './component/app/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { persistor, Store2 } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store2}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
