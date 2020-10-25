import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HeroSkeleton from '../Hero/HeroSkeleton';
import FiltersBarSkeleton from './FiltersBarSkeleton';
import ResultSkeleton from './ResultSkeleton';
import ScrollToTopOnMount from '../../utils/ScrollToTop';

const useStyles = makeStyles((theme) => ({
	container: {
		backgroundColor: theme.palette.background.paper,
		flexGrow: 1,
		padding: theme.spacing(3, 0),
		display: 'grid',
		[theme.breakpoints.up('xs')]: {
			gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
			marginBottom: theme.spacing(6)
		},
		[theme.breakpoints.up('sm')]: {
			gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
			marginBottom: theme.spacing(7)
		},
		[theme.breakpoints.up('md')]: {
			gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
			gridRowGap: theme.spacing(3),
			marginBottom: theme.spacing(0)
		}
	}
}));

export default function ResultsListSkeleton() {
	const styles = useStyles();

	return (
		<>
			<ScrollToTopOnMount />
			<HeroSkeleton />
			<FiltersBarSkeleton />
			<Box className={styles.container}>
				{[...Array(12)].map((_, i) => (
					<ResultSkeleton key={i} />
				))}
			</Box>
		</>
	);
}
