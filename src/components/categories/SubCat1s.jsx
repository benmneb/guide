import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { GridList, GridListTile, GridListTileBar, Box } from '@material-ui/core';
import { subCat1s } from '../../assets/subCat1s';
import Hero from '../hero/Hero';

const useStyles = makeStyles((theme) => ({
	container: {
		padding: theme.spacing(3),
		display: 'grid',
		gridGap: theme.spacing(2),
		gridTemplateColumns: `repeat(auto-fit, minmax(${theme.spacing(31)}, 1fr))`
	},
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		backgroundColor: theme.palette.common.white
	},
	gridList: {
		width: '100%'
	},
	gridListTile: {
		'&:hover img': {
			filter: 'brightness(100%)'
		}
	},
	titleBar: {
		position: 'absolute',
		top: '40%',
		height: '20%',
		cursor: 'pointer'
	},
	title: {
		color: theme.palette.common.white,
		fontSize: theme.typography.h6.fontSize,
		textAlign: 'center',
		lineHeight: theme.typography.body2.lineHeight
	},
	image: {
		cursor: 'pointer',
		filter: 'brightness(85%)',
		transitionProperty: 'filter',
		transitionDuration: `${theme.transitions.duration.complex}ms`
	}
}));

const SubCat1s = () => {
	const styles = useStyles();

	return (
		<>
			<Hero
				heading="Find Vegan Products Near You"
				subheading="There are 12,834 vegan products in 212 categories within Australia from brands like Gardein, Tofurky, Linda McCartney and 573 more."
			/>
			<Box className={styles.root}>
				<GridList cellHeight={400} className={styles.gridList} cols={4} spacing={0}>
					{subCat1s.map((image) => (
						<GridListTile key={image.img} cols={1} className={styles.gridListTile}>
							<Link to="/food-drink">
								<img src={image.img} alt={image.title} className={styles.image} />
								<GridListTileBar
									titlePosition="top"
									title={image.title}
									className={styles.titleBar}
									classes={{
										title: styles.title
									}}
								/>
							</Link>
						</GridListTile>
					))}
				</GridList>
			</Box>
		</>
	);
};

export default SubCat1s;
