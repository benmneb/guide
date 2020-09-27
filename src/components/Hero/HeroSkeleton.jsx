import React from 'react';
import clsx from 'clsx';
import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	container: {
		width: '100%',
		overflowX: 'hidden',
		backgroundColor: theme.palette.background.paper,
		zIndex: theme.zIndex.appBar + 1,
		[theme.breakpoints.only('xs')]: {
			height: 375
		},
		[theme.breakpoints.up('sm')]: {
			height: 350
		}
	},
	content: {
		top: theme.mixins.toolbar.minHeight / 2,
		zIndex: theme.zIndex.appBar + 1,
		overflowX: 'hidden',
		[theme.breakpoints.only('xs')]: {
			width: '85vw',
			margin: theme.spacing(0, 2)
		},
		[theme.breakpoints.up('sm')]: {
			width: '75vw',
			margin: theme.spacing(0, 3)
		}
	},
	displayNone: {
		display: 'none'
	}
}));

export default function HeroSkeleton({ hide }) {
	const styles = useStyles();

	return (
		<Box
			component="section"
			position="relative"
			display="flex"
			alignItems="center"
			justifyContent="flex-start"
			className={clsx(styles.container, {
				[styles.displayNone]: hide
			})}
		>
			<Box
				component="header"
				position="relative"
				minWidth={272}
				className={styles.content}
			>
				<Typography align="left" gutterBottom>
					<Skeleton width={450} height={90} />
				</Typography>
				<Typography align="left" variant="h5" paragraph>
					<Skeleton width={750} />
				</Typography>
				<Typography align="left" paragraph>
					<Skeleton width={300} />
				</Typography>
			</Box>
		</Box>
	);
}
