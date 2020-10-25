import { Box, CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	loader: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		[theme.breakpoints.down('sm')]: {
			height: `calc(100vh - ${theme.spacing(27.5)}px)` // approx screen taken up by rest of UI, taken from styles.mapBox
		},
		[theme.breakpoints.up('md')]: {
			height: 538
		}
	}
}));

export default function StoresLoader({ stage }) {
	const styles = useStyles();

	return (
		<Box className={styles.loader}>
			<Box
				display="flex"
				flexDirection="column"
				alignItems="center"
				justifyContent="space-evenly"
				height={100}
			>
				<Typography color="textSecondary">Loading {stage}...</Typography>
				<CircularProgress />
			</Box>
		</Box>
	);
}
