import { combineReducers } from 'redux';

import product from './product';
import results from './results';
import auth from './auth';
import ui from './UI';
import pwa from './PWA';
import addProduct from './addProduct';

export default combineReducers({
	product,
	results,
	auth,
	ui,
	pwa,
	addProduct
});
