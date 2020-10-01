import { combineReducers } from 'redux';

import product from './product';
import results from './results';
import auth from './auth';
import ui from './UI';

export default combineReducers({
	product,
	results,
	auth,
	ui
});
