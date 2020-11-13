import { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { GridListTile, GridListTileBar, GridList } from '@material-ui/core';
import useWidth from '../../utils/useWidth';

const useStyles = makeStyles((theme) => ({
	gridList: {
		flexWrap: 'nowrap',
		transform: 'translateZ(0)', // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		msOverflowStyle: 'none',
		scrollbarWidth: 'none',
		'&::-webkit-scrollbar': {
			display: 'none'
		},
		'@media (hover: hover) and (pointer: fine)': {
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
	},
	gridListTile: {
		'@media (hover: hover) and (pointer: fine)': {
			'&:hover img': {
				filter: 'brightness(100%)'
			}
		}
	},
	image: {
		cursor: 'pointer',
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		objectPosition: 'center',
		'@media (hover: hover) and (pointer: fine)': {
			filter: 'brightness(85%)',
			transitionProperty: 'filter',
			transitionDuration: `${theme.transitions.duration.complex}ms`
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
	}
}));

function CategoryGridList({ category }) {
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
		<GridList className={styles.gridList} cols={cols} cellHeight={cellHeight} spacing={0}>
			{category.subCats.map((subCats) => (
				<GridListTile key={subCats.name} cols={1} className={styles.gridListTile}>
					<Link to={`${category.prodType}/${subCats.url}`}>
						<img src={subCats.image} alt={''} className={styles.image} />
						<GridListTileBar
							titlePosition="top"
							title={subCats.name}
							className={styles.titleBar}
							classes={{ title: styles.title }}
						/>
					</Link>
				</GridListTile>
			))}
		</GridList>
	);
}

CategoryGridList.propTypes = {
	category: PropTypes.object.isRequired
};

export default memo(CategoryGridList);
