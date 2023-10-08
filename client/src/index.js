import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


/*IMPORTS FOR REDUX STORE CONFIGURATION */
import authReducer from "./state";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";



/*Redux store configuration, setup of the central data store in a Redux application.
It involves creating the store, applying middleware, and combining multiple slices (reducers) 
to form the complete state tree. */

const persistConfig = { key:"root", storage, version: 1};
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>

        <PersistGate loading={null} persistor={persistStore(store)}>

        <App />
        </PersistGate>

    </Provider>
  </React.StrictMode>
);

