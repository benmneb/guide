import { AppBar, Toolbar, Box, Breadcrumbs } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	toolbar: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	zIndex: {
		zIndex: theme.zIndex.appBar - 1
	},
	breadcrumbsBox: {
		overflow: 'hidden',
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
				<Toolbar className={styles.toolbar}>
					<Box className={styles.breadcrumbsBox}>
						<Breadcrumbs>
							<Skeleton width={400} />
						</Breadcrumbs>
					</Box>
					<Box display={{ xs: 'none', md: 'block' }}>
						<Skeleton width={150} height={70} />
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
