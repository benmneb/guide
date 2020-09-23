import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import reducers from './store/reducers/reducers';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

import crossBrowserListener from './utils/reduxpersist-listener';

const persistConfig = {
	key: 'root',
	storage,
	stateReconciler: hardSet,
	whiteList: ['currentUserData']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const composeEnhancers =
	process.env.NODE_ENV === 'development'
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: null || compose;

const store = createStore(persistedReducer, composeEnhancers());

const persistor = persistStore(store);

window.addEventListener('storage', crossBrowserListener(store, persistConfig));

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
