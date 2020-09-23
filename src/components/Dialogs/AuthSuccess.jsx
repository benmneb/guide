import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import axios from 'axios';

const AuthSuccess = ({ setCurrentUserData, isAuthenticated }) => {
	useEffect(() => {
		let mounted = true;
		const source = axios.CancelToken.source();

		axios
			.get('https://api.vomad.guide/auth/login/success', {
				withCredentials: true,
				crossorigin: true,
				cancelToken: source.token
			})
			.then((response) => {
				if (mounted) {
					if (response.status === 200) return response.data.user;
					else throw new Error('failed to authenticate user');
				}
			})
			.then((user) => {
				if (mounted) {
					setCurrentUserData({ id: user.user_id, username: user.user_name }, true);
				}
			})
			.catch((error) => {
				if (mounted) {
					setCurrentUserData(null, false);
				}
			});

		return () => {
			mounted = false;
			source.cancel('Auth call cancelled during clean-up');
		};
	}, [setCurrentUserData]);

	if (isAuthenticated) {
		setTimeout(() => {
			window.opener.open('', '_self');
			window.opener.focus();
			window.close();
		}, 1000);
	}

	return null;
};

const mapStateToProps = (state) => {
	return {
		currentUserData: state.currentUserData,
		isAuthenticated: state.isAuthenticated
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setCurrentUserData: (user, isAuth) =>
			dispatch(actionCreators.setCurrentUserData(user, isAuth))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthSuccess);
