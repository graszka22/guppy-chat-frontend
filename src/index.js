import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react'
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import mainSaga from "./saga";
import reducer from "./reducers";

const sagaMiddleware = createSagaMiddleware();
const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userToken', 'userId']
}

const persistedReducer = persistReducer(persistConfig, reducer)

let store = createStore(
  persistedReducer,
    compose(applyMiddleware(sagaMiddleware), reduxDevTools)
);

let persistor = persistStore(store)

sagaMiddleware.run(mainSaga);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
