import axios from 'axios';

module.export = axios.defaults.baseURL =
	process.env.NODE_ENV === 'production'
		? 'https://api.vomad.guide'
		: 'http://localhost:3000';
