import React from 'react';
import {
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
		[theme.breakpoints.up('xs')]: {
			maxWidth: 180
		},
		[theme.breakpoints.up('md')]: {
			maxWidth: 250
		},
		margin: 'auto',
		transition: `${theme.transitions.duration.complex}ms ${theme.transitions.easing.easeInOut}`,
		boxShadow: 'none',
		borderRadius: theme.shape.borderRadius,
		'&:hover': {
			transform: 'scale(1.04)',
			boxShadow: theme.shadows[11],
			cursor: 'pointer'
		}
	},
	cardMedia: {
		paddingTop: theme.spacing(),
		[theme.breakpoints.up('xs')]: {
			maxHeight: 160,
			maxWidth: 150
		},
		[theme.breakpoints.up('md')]: {
			maxHeight: 220,
			maxWidth: 200
		},
		position: 'relative'
	},
	cardContent: {
		textAlign: 'center',
		padding: theme.spacing(2)
	},
	brandName: {
		color: theme.palette.grey[500],
		fontWeight: theme.typography.fontWeightBold
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

export default function Result(props) {
	const styles = useStyles();
	const upMd = useMediaQuery((theme) => theme.breakpoints.up('md'));
	const ratingSize = upMd ? 'medium' : 'small';

	return (
		<Card component="article" className={styles.productTile} onClick={props.clicked}>
			<CardMedia className={styles.cardMedia} component="img" image={props.image} />
			<CardContent className={styles.cardContent}>
				<Typography className={styles.productName} component="h2" variant="body1">
					<Typography
						className={styles.brandName}
						component="span"
						variant="overline"
						display="block"
					>
						{props.brand}
					</Typography>
					{props.name}
				</Typography>
			</CardContent>
			<CardActions className={styles.cardActions}>
				<Rating value={props.avgRating} precision={0.1} size={ratingSize} readOnly />
				<Typography variant="body2">{props.amtRatings} ratings</Typography>
			</CardActions>
		</Card>
	);
}
