import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import crossBrowserListener from '../utils/reduxpersist-listener';

const persistConfig = {
	key: 'root',
	storage,
	stateReconciler: autoMergeLevel2,
	whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const composeEnhancers =
	process.env.NODE_ENV === 'development'
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: null || compose;

export const store = createStore(
	persistedReducer,
	composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

window.addEventListener('storage', crossBrowserListener(store, persistConfig));
