import {
	Box,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Typography,
	useMediaQuery
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
	productTile: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		borderRadius: theme.shape.borderRadius,
		margin: 'auto',
		boxShadow: 'none',
		[theme.breakpoints.up('xs')]: {
			maxWidth: 180
		},
		[theme.breakpoints.up('md')]: {
			maxWidth: 250
		},
		'@media (hover: hover) and (pointer: fine)': {
			transition: `${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
			'&:hover': {
				transform: 'scale(1.01)',
				boxShadow: theme.shadows[4],
				cursor: 'pointer'
			}
		}
	},
	cardMediaPlaceholder: {
		paddingTop: theme.spacing(1),
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		[theme.breakpoints.up('xs')]: {
			height: 160,
			width: 150
		},
		[theme.breakpoints.up('md')]: {
			height: 220,
			width: 200
		}
	},
	cardMedia: {
		position: 'relative',
		paddingTop: theme.spacing(1),
		objectFit: 'contain',
		[theme.breakpoints.up('xs')]: {
			maxHeight: 160,
			maxWidth: 150
		},
		[theme.breakpoints.up('md')]: {
			maxHeight: 220,
			maxWidth: 200
		}
	},
	cardContent: {
		textAlign: 'center',
		padding: theme.spacing(2)
	},
	brandName: {
		color: theme.palette.grey[500],
		fontWeight: theme.typography.fontWeightBold,
		lineHeight: 1.3
	},
	productName: {
		fontWeight: theme.typography.fontWeightRegular,
		lineHeight: 1.3,
		[theme.breakpoints.up('md')]: {
			fontSize: '1.1rem'
		}
	},
	cardActions: {
		padding: theme.spacing(0, 1, 1),
		margin: 'auto'
	}
}));

export default function ResultCard({ result }) {
	const styles = useStyles();
	const upMd = useMediaQuery((theme) => theme.breakpoints.up('md'));
	const ratingSize = upMd ? 'medium' : 'small';
	const constrainSize = upMd ? 200 : 150;

	return (
		<Card component="article" className={styles.productTile}>
			<Box className={styles.cardMediaPlaceholder}>
				<CardMedia
					className={styles.cardMedia}
					component="img"
					image={`${result.imageSrc}?width=${constrainSize}`}
				/>
			</Box>
			<CardContent className={styles.cardContent}>
				<Typography className={styles.productName} component="h2" variant="body1">
					<Typography
						className={styles.brandName}
						component="span"
						variant="overline"
						display="block"
						paragraph
					>
						{result.brandName}
					</Typography>
					{result.productName}
				</Typography>
			</CardContent>
			<CardActions className={styles.cardActions}>
				<Rating
					value={Number(result.averageRating)}
					precision={0.1}
					size={ratingSize}
					readOnly
				/>
				{Number(result.ratingCount) > 0 ? (
					<Typography variant="body2"> x {Number(result.ratingCount)}</Typography>
				) : null}
			</CardActions>
		</Card>
	);
}
