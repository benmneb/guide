import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { Box, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	spinnerBox: {
		height: 150,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		[theme.breakpoints.down('sm')]: {
			marginBottom: 100
		}
	},
	spinnerBoxShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginRight: theme.mixins.filtersPanel.width
	}
}));

export default function ResultsListSpinner() {
	const styles = useStyles();
	const showFiltersPanel = useSelector((state) => state.ui.showFiltersPanel);

	return (
		<Box
			className={clsx(styles.spinnerBox, {
				[styles.spinnerBoxShift]: showFiltersPanel
			})}
		>
			<CircularProgress size={60} disableShrink />
		</Box>
	);
}
