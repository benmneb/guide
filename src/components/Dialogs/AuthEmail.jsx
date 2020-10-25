import { useSelector, useDispatch } from 'react-redux';
import { setIsUsingEmailAuthRoute } from '../../store/actions';
import { Box } from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import AuthEmailLogin from './AuthEmailLogin';
import AuthEmailJoin from './AuthEmailJoin';

const useStyles = makeStyles((theme) => ({
	toggleButtonGroup: {
		width: 200,
		marginBottom: theme.spacing(2)
	},
	toggleButton: {
		width: '50%'
	}
}));

export default function AuthEmail() {
	const styles = useStyles();
	const dispatch = useDispatch();
	const route = useSelector((state) => state.auth.isUsingEmailAuthRoute);

	const handleChangeRoute = (event, newRoute) => {
		if (newRoute !== null) dispatch(setIsUsingEmailAuthRoute(newRoute));
	};

	return (
		<Box display="flex" flexDirection="column" alignItems="center">
			<ToggleButtonGroup
				value={route}
				exclusive
				onChange={handleChangeRoute}
				aria-label="login method"
				size="small"
				className={styles.toggleButtonGroup}
			>
				<ToggleButton value="login" aria-label="login" className={styles.toggleButton}>
					Login
				</ToggleButton>
				<ToggleButton value="join" aria-label="join" className={styles.toggleButton}>
					Sign up
				</ToggleButton>
			</ToggleButtonGroup>
			{route === 'login' ? <AuthEmailLogin /> : <AuthEmailJoin />}
		</Box>
	);
}
