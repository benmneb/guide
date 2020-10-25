import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
	loadingBar: {
		position: 'fixed',
		width: '100%',
		zIndex: theme.zIndex.tooltip
	}
}));

export default function LoadingBar() {
	const styles = useStyles();
	const isLoading = useSelector((state) => state.results.isLoading);

	return (
		isLoading && (
			<div className={styles.loadingBar}>
				<LinearProgress />
			</div>
		)
	);
}
