import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridListTile, GridList } from '@material-ui/core';
import useWidth from '../../utils/useWidth';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
	gridList: {
		flexWrap: 'nowrap',
		msOverflowStyle: 'none',
		scrollbarWidth: 'none',
		'&::-webkit-scrollbar': {
			display: 'none'
		}
	},
	image: {
		width: '100%',
		height: '100%'
	}
}));

export default function CategoryGridListSkeleton() {
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
			{[...Array(Math.ceil(cols))].map((_, i) => (
				<GridListTile key={i} cols={1}>
					<Skeleton variant="rect" className={styles.image} />
				</GridListTile>
			))}
		</GridList>
	);
}
