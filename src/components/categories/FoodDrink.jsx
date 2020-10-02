import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
	GridList,
	GridListTile,
	GridListTileBar,
	Typography,
	Toolbar,
	Button,
	Box,
	Hidden
} from '@material-ui/core';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRight';
import { subCat1s } from '../../assets/subCat1s';
import Hero, { Heading, SubHeading, Footer } from '../Hero/Hero';
import useWidth from '../../utils/useWidth';

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
	buttonText: {
		margin: theme.spacing(0, -1)
	},
	gridList: {
		flexWrap: 'nowrap',
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: 'translateZ(0)'
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
		transitionDuration: `${theme.transitions.duration.complex}ms`,
		width: '100%',
		height: '100%'
	}
}));

export default function FoodDrink() {
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
				<title>Vomad Guide: Find Vegan Food & Drink Products Near You</title>
				<meta name="description" content="Vegan food and drink products" />
				<meta
					name="keywords"
					content="pantry,fridge,freezer,bakery,drinks,baby,pet food,plant based,plant-based,vegetarian,flexitarian"
				/>
			</Helmet>
			<Hero>
				<Heading>Vegan Food & Drink Products</Heading>
				<SubHeading>
					There are 5,147 vegan food & drink products in 103 categories within Australia
					from 285 brands.
				</SubHeading>
				<Footer forPage="prodType" />
			</Hero>
			<Box className={styles.container}>
				{['Pantry', 'Fridge & Freezer', 'Bakery', 'Drinks', 'Baby', 'Pet Food'].map(
					(category) => (
						<Box key={category} component="section" className={styles.content}>
							<Toolbar component="header">
								<Box flexGrow="1">
									<Typography component="h2" variant="h5" align="left">
										{category}
									</Typography>
								</Box>
								<Box flexGrow="0">
									<Button
										component={Link}
										to="/food-drink/nut-butters-spreads"
										variant="text"
										color="default"
										endIcon={<ChevronRightRoundedIcon />}
										classes={{ text: styles.buttonText }}
									>
										See all<Hidden only="xs"> {category}</Hidden>
									</Button>
								</Box>
							</Toolbar>
							<GridList
								className={styles.gridList}
								cols={cols}
								cellHeight={cellHeight}
								spacing={0}
							>
								{subCat1s.map((image) => (
									<GridListTile
										component={Link}
										to={image.prodType + '/' + image.url}
										key={image.img}
										cols={1}
										className={styles.gridListTile}
									>
										<img src={image.img} alt={image.title} className={styles.image} />
										<GridListTileBar
											titlePosition="top"
											title={image.title}
											className={styles.titleBar}
											classes={{
												title: styles.title
											}}
										/>
									</GridListTile>
								))}
							</GridList>
						</Box>
					)
				)}
			</Box>
		</>
	);
}
