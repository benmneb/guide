import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUserData } from '../../store/actions';
import axios from 'axios';

export default function AuthSuccess() {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
					if (response.status === 200) return response.data;
					else throw new Error('failed to authenticate user');
				}
			})
			.then((data) => {
				if (mounted) {
					dispatch(
						setCurrentUserData(
							{
								id: data.user.user_id,
								username: data.user.user_name,
								authState: data.authState
							},
							true
						)
					);
				}
			})
			.catch((error) => {
				if (mounted) {
					dispatch(setCurrentUserData(null, false));
					console.error('failed to authenticate user', error);
				}
			});

		return () => {
			mounted = false;
			source.cancel('Auth call cancelled during clean-up');
		};
	}, [dispatch]);

	if (isAuthenticated) {
		setTimeout(() => {
			window.close();
		}, 1000);
	}

	return null;
}
