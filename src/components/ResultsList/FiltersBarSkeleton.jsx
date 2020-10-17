import React from 'react';
import { AppBar, Toolbar, Box, Breadcrumbs } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	zIndex: {
		zIndex: theme.zIndex.appBar - 1
	},
	breadcrumbsBox: {
		overflow: 'scroll',
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block'
		}
	}
}));

export default function FiltersBarSkeleton() {
	const styles = useStyles();

	return (
		<Box
			display={{ xs: 'none', sm: 'flex' }}
			flexGrow="1"
			top="0"
			position="sticky"
			className={styles.zIndex}
		>
			<AppBar
				position="sticky"
				color="inherit"
				elevation={0}
				classes={{ root: styles.zIndex }}
			>
				<Toolbar display="flex">
					<Box className={styles.breadcrumbsBox}>
						<Breadcrumbs>
							<Skeleton width={400} />
						</Breadcrumbs>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
