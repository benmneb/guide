import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HeroSkeleton from '../Hero/HeroSkeleton';
import ScrollToTopOnMount from '../../utils/ScrollToTop';
import CategoryTitleBarSkeleton from './CategoryTitleBarSkeleton';
import CategoryGridListSkeleton from './CategoryGridListSkeleton';

const useStyles = makeStyles((theme) => ({
	container: {
		marginTop: theme.spacing(-4),
		[theme.breakpoints.down('sm')]: {
			marginBottom: theme.spacing(7)
		}
	},
	content: {
		marginTop: theme.spacing(4)
	}
}));

export default function CategoriesSkeleton() {
	const styles = useStyles();

	return (
		<>
			<ScrollToTopOnMount />
			<HeroSkeleton />
			<Box className={styles.container}>
				{[...Array(3)].map((_, i) => (
					<Box key={i} component="section" className={styles.content}>
						<CategoryTitleBarSkeleton />
						<CategoryGridListSkeleton />
					</Box>
				))}
			</Box>
		</>
	);
}
