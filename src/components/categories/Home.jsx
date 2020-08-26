import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { GridList, GridListTile, GridListTileBar, Box } from '@material-ui/core';
import { subCat1s } from '../../assets/subCat1s';
import Hero, { Heading, SubHeading } from '../Hero/Hero';
import useWidth from '../../assets/useWidth';

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
		backgroundColor: theme.palette.common.white,
		marginTop: theme.spacing(2)
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
	const [cols, setCols] = useState(2);
	const width = useWidth();

	useEffect(() => {
		switch (width) {
			case 'xs':
				setCols(2);
				break;
			case 'sm':
				setCols(4);
				break;
			case 'md':
				setCols(5);
				break;
			case 'lg':
				setCols(6);
				break;
			case 'xl':
				setCols(8);
				break;
			default:
				return;
		}
	}, [width]);

	return (
		<>
			<Hero textAlign="center">
				<Heading>Find Vegan Products</Heading>
				<SubHeading>
					The Vomad Guide is a free crowd-sourced collection of 100% plant-based products.
					There are 12,815 vegan products in 212 categories in 576 stores and 54 online
					stores within Australia.
				</SubHeading>
			</Hero>
			<Box className={styles.root}>
				<GridList cellHeight={300} className={styles.gridList} cols={cols} spacing={0}>
					{subCat1s.map((image) => (
						<GridListTile key={image.img} cols={1} className={styles.gridListTile}>
							<Link to="/food-drink/nut-butters-spreads">
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
