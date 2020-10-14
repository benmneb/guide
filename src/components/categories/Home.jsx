import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { GridListTile, GridListTileBar, Box, GridList } from '@material-ui/core';
import { homeCats } from '../../assets/categories';
import Hero, { Footer, Heading, SubHeading } from '../Hero/Hero';
import ScrollToTopOnMount from '../../utils/ScrollToTop';
import useWidth from '../../utils/useWidth';
import CategoryTitleBar from './CategoryTitleBar';

const useStyles = makeStyles((theme) => ({
	container: {
		marginTop: theme.spacing(-4),
		[theme.breakpoints.down('sm')]: {
			marginBottom: theme.spacing(7)
		}
	},
	content: {
		marginTop: theme.spacing(4)
	},
	gridList: {
		flexWrap: 'nowrap',
		transform: 'translateZ(0)', // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		msOverflowStyle: 'none',
		scrollbarWidth: 'none',
		'&::-webkit-scrollbar': {
			display: 'none'
		}
	},
	gridListTile: {
		'&:hover img': {
			filter: 'brightness(100%)'
		}
	},
	image: {
		cursor: 'pointer',
		filter: 'brightness(85%)',
		transitionProperty: 'filter',
		transitionDuration: `${theme.transitions.duration.complex}ms`,
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		objectPosition: 'center'
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
	}
}));

export default function Home() {
	const styles = useStyles();
	const width = useWidth();
	const [cols, setCols] = useState(null);
	const [cellHeight, setCellHeight] = useState(null);

	useEffect(() => {
		switch (width) {
			case 'xs':
				setCols(2.3);
				setCellHeight(220);
				break;
			case 'sm':
				setCols(3.5);
				setCellHeight(275);
				break;
			case 'md':
				setCols(5.3);
				setCellHeight(300);
				break;
			case 'lg':
				setCols(5.3);
				setCellHeight(300);
				break;
			case 'xl':
				setCols(7.3);
				setCellHeight(300);
				break;
			default:
				return;
		}
	}, [width]);

	return (
		<>
			<Helmet>
				<title>Vomad Guide: Find Vegan Products Near You</title>
				<meta
					name="description"
					content="The Original Vegan Product Guide to Australia. Browser, search, filter. Find, review, buy."
				/>
				<meta name="keywords" content="plant based,plant-based,vegetarian,flexitarian" />
			</Helmet>
			<ScrollToTopOnMount />
			<Hero>
				<Heading>Find Vegan Products</Heading>
				<SubHeading>
					The Vomad Guide is a free crowd-sourced collection of 100% plant-based products.
				</SubHeading>
				<Footer forPage="home">
					There are 12,815 vegan products in 212 categories from 663 brands in 576 stores
					and 54 online stores within Australia.
				</Footer>
			</Hero>
			<Box className={styles.container}>
				{homeCats.map((category) => (
					<Box key={category.name} component="section" className={styles.content}>
						<CategoryTitleBar
							name={category.name}
							url={`/${category.prodType}/${category.url}`}
						/>
						<GridList
							className={styles.gridList}
							cols={cols}
							cellHeight={cellHeight}
							spacing={0}
						>
							{category.subCats.map((subCats) => (
								<GridListTile
									key={subCats.name}
									component={Link}
									to={`${category.prodType}/${subCats.url}`}
									cols={1}
									className={styles.gridListTile}
								>
									<img src={subCats.image} alt={''} className={styles.image} />
									<GridListTileBar
										titlePosition="top"
										title={subCats.name}
										className={styles.titleBar}
										classes={{
											title: styles.title
										}}
									/>
								</GridListTile>
							))}
						</GridList>
					</Box>
				))}
			</Box>
		</>
	);
}
