import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Toolbar, Button } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
	categoryName: {
		width: 150,
		[theme.breakpoints.up('md')]: {
			width: 250
		}
	},
	button: {
		width: 75,
		[theme.breakpoints.up('md')]: {
			width: 150
		}
	},
	buttonText: {
		margin: theme.spacing(0, -1)
	}
}));

export default function CategoryTitleBarSkeleton() {
	const styles = useStyles();

	return (
		<Toolbar component="header">
			<Box flexGrow="1">
				<Typography component="h2" variant="h5">
					<Skeleton className={styles.categoryName} />
				</Typography>
			</Box>
			<Box flexGrow="0">
				<Button variant="text" color="default" classes={{ text: styles.buttonText }}>
					<Skeleton className={styles.button} />
				</Button>
			</Box>
		</Toolbar>
	);
}
