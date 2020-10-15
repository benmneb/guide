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
import ScrollToTopOnMount from '../../utils/ScrollToTop';
import { householdCats } from '../../assets/categories';
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

export default function Household() {
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
				<title>Vomad Guide: Find Vegan Household Products Near You</title>
				<meta
					name="description"
					content="Find vegan household products in over 100 categories at the Vomad Guide: The Best Online Vegan Product Guide."
				/>
				<meta
					name="keywords"
					content="bath and body,personal care,household cleaning,makeup,animal care,plant based,plant-based,vegetarian,flexitarian,list,product list,shopping,grocery,shopping list,grocery list"
				/>
			</Helmet>
			<ScrollToTopOnMount />
			<Hero>
				<Heading>Vegan Household Products</Heading>
				<SubHeading>
					There are 6,143 vegan household products in 128 categories within Australia from
					312 brands.
				</SubHeading>
				<Footer forPage="prodType" />
			</Hero>
			<Box className={styles.container}>
				{householdCats.map((category) => (
					<Box key={category.name} component="section" className={styles.content}>
						<Toolbar component="header">
							<Box flexGrow="1">
								<Typography component="h2" variant="h5" align="left">
									{category.name}
								</Typography>
							</Box>
							<Box flexGrow="0">
								<Button
									component={Link}
									to={`/household/${category.url}`}
									variant="text"
									color="default"
									endIcon={<ChevronRightRoundedIcon />}
									classes={{ text: styles.buttonText }}
								>
									See all<Hidden only="xs"> {category.name}</Hidden>
								</Button>
							</Box>
						</Toolbar>
						<GridList
							className={styles.gridList}
							cols={cols}
							cellHeight={cellHeight}
							spacing={0}
						>
							{category.subCats.map((subCat) => (
								<GridListTile
									key={subCat.name}
									component={Link}
									to={`/household/${subCat.url}`}
									cols={1}
									className={styles.gridListTile}
								>
									<img src={subCat.image} alt={''} className={styles.image} />
									<GridListTileBar
										titlePosition="top"
										title={subCat.name}
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
