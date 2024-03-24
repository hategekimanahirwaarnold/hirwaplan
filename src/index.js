//index.js
import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createRoot } from 'react-dom/client'
import {createFirestoreInstance, reduxFirestore, getFirestore } from 'redux-firestore'
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import firebase from 'firebase/compat/app'
import fbConfig from './config/fbConfig'

const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reduxFirestore(fbConfig),
        // reactReduxFirebase(fbConfig, { useFirestoreForProfile: true, attachAuthIsReady: true })
    )
);
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true, 
    attachAuthIsReady: true,
    // userProfile: 'users'
  }
const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
}

let root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>
);
// registerServiceWorker();
