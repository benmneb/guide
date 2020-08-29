import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
	GridList,
	GridListTile,
	GridListTileBar,
	Typography,
	Toolbar,
	Button,
	Box
} from '@material-ui/core';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRight';
import { subCat1s } from '../../assets/subCat1s';
import Hero, { Heading, SubHeading, Footer } from '../Hero/Hero';
import useWidth from '../../assets/useWidth';
import BottomNav from './BottomNav';

const useStyles = makeStyles((theme) => ({
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

export default function SingleLineGridList() {
	const styles = useStyles();
	const width = useWidth();
	const [cols, setCols] = useState(null);
	const [cellHeight, setCellHeight] = useState(null);

	useEffect(() => {
		switch (width) {
			case 'xs':
				setCols(2.3);
				setCellHeight(200);
				break;
			case 'sm':
				setCols(3.3);
				setCellHeight(250);
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
			<Hero>
				<Heading>Vegan Food & Drink Products</Heading>
				<SubHeading>
					There are 5,147 vegan food & drink products in 103 categories within Australia
					from brands like Gardein, Tofurky, Linda McCartney and 285 more.
				</SubHeading>
				<Footer forCategory />
			</Hero>
			<Box marginY={-4}>
				{['Baby', 'Bakery', 'Drinks', 'Fridge & Freezer', 'Pantry', 'Pet Food'].map(
					(category) => (
						<Box marginY={4} key={category}>
							<Toolbar>
								<Box flexGrow="1">
									<Typography variant="h5" align="left">
										{category}
									</Typography>
								</Box>
								<Box flexGrow="0">
									<Link to="/food-drink/nut-butters-spreads">
										<Button
											variant="text"
											color="default"
											endIcon={<ChevronRightRoundedIcon />}
										>
											See all {category}
										</Button>
									</Link>
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
										to="/food-drink/nut-butters-spreads"
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
			<BottomNav />
		</>
	);
}
