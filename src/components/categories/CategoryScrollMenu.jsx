import { ScrollMenu } from 'react-horizontal-scrolling-menu';

import { makeStyles } from '@material-ui/core/styles';

import CategoryCard from './CategoryCard';
import { LeftArrow, RightArrow } from '../../utils/ScrollArrows';
import useScrollbarSize from 'react-scrollbar-size';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		'& .react-horizontal-scrolling-menu--scroll-container': {
			msOverflowStyle: 'none',
			scrollbarWidth: 'none',
			'&::-webkit-scrollbar': {
				display: 'none'
			},
			'@media (hover: hover) and (pointer: fine)': {
				marginBottom: (scrollbarHeight) => -scrollbarHeight,
				scrollbarWidth: 'auto',
				scrollbarColor: `${theme.palette.grey[300]} ${theme.palette.background.paper}`,
				'&::-webkit-scrollbar': {
					display: 'block'
				},
				'&::-webkit-scrollbar-track': {
					background: theme.palette.background.paper
				},
				'&::-webkit-scrollbar-thumb': {
					backgroundColor: theme.palette.grey[300],
					borderRadius: theme.spacing(2),
					border: `${theme.spacing(0.5)}px solid ${theme.palette.background.paper}`
				}
			}
		}
	}
}));

export default function CategoryScrollMenu(props) {
	const { category } = props;
	const { height: scrollbarHeight } = useScrollbarSize();
	const styles = useStyles(scrollbarHeight);

	return (
		<ScrollMenu
			LeftArrow={LeftArrow}
			RightArrow={RightArrow}
			wrapperClassName={styles.wrapper}
		>
			{category.subCats.map((subCat, index) => (
				<CategoryCard
					data={subCat}
					itemId={subCat.name}
					key={subCat.name}
					index={index}
					link={`/${category.prodType}/${subCat.url}`}
				/>
			))}
		</ScrollMenu>
	);
}
