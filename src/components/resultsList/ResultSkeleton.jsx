import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
	productTile: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		[theme.breakpoints.up('xs')]: {
			width: 180
		},
		[theme.breakpoints.up('md')]: {
			width: 250
		},
		margin: 'auto',
		marginTop: theme.spacing()
	},
	cardMedia: {
		paddingTop: theme.spacing(),
		[theme.breakpoints.up('xs')]: {
			height: 160,
			width: 150
		},
		[theme.breakpoints.up('md')]: {
			height: 220,
			width: 200
		},
		position: 'relative'
	},
	cardContent: {
		textAlign: 'center',
		padding: theme.spacing(2)
	}
}));

export default function Result() {
	const styles = useStyles();

	return (
		<Card className={styles.productTile} elevation={0}>
			<Skeleton variant="rect" className={styles.cardMedia} />
			<CardContent className={styles.cardContent}>
				<Skeleton width={200} />
				<Skeleton />
				<Skeleton />
			</CardContent>
		</Card>
	);
}
