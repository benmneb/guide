import { hydrate, render } from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './assets/axiosDefaults';


const app = (
	<Provider store={store}>
		<BrowserRouter>
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>
		</BrowserRouter>
	</Provider>
);

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
	hydrate(app, rootElement);
} else {
	render(app, rootElement);
};

serviceWorkerRegistration.register();