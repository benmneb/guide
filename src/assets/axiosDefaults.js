import axios from 'axios';
import { rootServerUrl } from './constants';

module.export = axios.defaults.baseURL =
	process.env.NODE_ENV === 'production'
		? rootServerUrl
		: // : 'http://localhost:3000';
		  rootServerUrl; // Fly.io can't connect to Redis locally...
