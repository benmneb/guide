import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography } from '@material-ui/core';
import StarRating from './StarRating';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	productTile: {
		maxWidth: 300,
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
		maxHeight: 300,
		position: 'relative'
	},
	cardContent: {
		textAlign: 'center',
		padding: theme.spacing(3)
	},
	brandName: {
		color: theme.palette.grey[500],
		fontWeight: theme.typography.fontWeightBold
	},
	productName: {
		fontWeight: theme.typography.fontWeightRegular,
		lineHeight: 1.3
	},
	cardActions: {
		padding: `0 ${theme.spacing(3)}px ${theme.spacing(3)}px`,
		margin: 'auto',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column'
	}
}));

export default function Result(props) {
	const styles = useStyles();

	return (
		<Card className={styles.productTile} onClick={props.clicked}>
			<CardMedia className={styles.cardMedia} component="img" image={props.image} />
			<CardContent className={styles.cardContent}>
				<Typography className={styles.brandName} variant="overline" gutterBottom>
					{props.brand}
				</Typography>
				<Typography className={styles.productName} variant="h6" component="p">
					{props.name}
				</Typography>
			</CardContent>
			<CardActions className={styles.cardActions}>
				<StarRating />
			</CardActions>
		</Card>
	);
}
