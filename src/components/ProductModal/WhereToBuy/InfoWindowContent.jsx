import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Link, Box } from '@material-ui/core';
import { OpenInNewRounded, FileCopyRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	infoWindowContent: {
		[theme.breakpoints.down('sm')]: {
			margin: theme.spacing(0, 1.5, 1.5, 0)
		}
	},
	infoWindowLink: {
		'&:hover': {
			cursor: 'pointer'
		}
	},
	infoWindowIcon: {
		fontSize: 'inherit'
	}
}));

export default function InfoWindowContent(props) {
	const styles = useStyles();
	const selectedStore = useSelector((state) => state.product.selectedStore);

	return (
		<Box className={styles.infoWindowContent}>
			<Typography component="span" variant="subtitle2" display="block" gutterBottom>
				{selectedStore.store_name}
			</Typography>
			<Typography component="span" variant="subtitle2">
				<Link className={styles.infoWindowLink} onClick={props.getDirections}>
					Directions <OpenInNewRounded className={styles.infoWindowIcon} />
				</Link>{' '}
				|{' '}
				<Link
					className={styles.infoWindowLink}
					onClick={() => props.copyAddress(selectedStore.address)}
				>
					Copy address <FileCopyRounded className={styles.infoWindowIcon} />
				</Link>
			</Typography>
		</Box>
	);
}
