import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
	loadingBar: {
		position: 'absolute',
		width: '100%',
		zIndex: theme.zIndex.tooltip
	}
}));

export default function LoadingBar() {
	const styles = useStyles();
	const isLoading = useSelector((state) => state.isLoading);

	return isLoading ? (
		<div className={styles.loadingBar}>
			<LinearProgress />
		</div>
	) : null;
}
