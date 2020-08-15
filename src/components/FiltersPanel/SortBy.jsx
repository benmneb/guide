import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	buttonGroup: {
		height: 37,
		margin: theme.spacing(0.5, 0)
	},
	label: {
		color: theme.palette.common.black
	},
	body1: {
		fontSize: theme.typography.button.fontSize
	}
}));

export default function SortBy() {
	const styles = useStyles();
	const [sortBy, setSortBy] = useState('popularity');

	const handleClick = (event, newSort) => {
		if (newSort !== null) {
			setSortBy(newSort);
		}
	};

	return (
		<ToggleButtonGroup
			size="large"
			value={sortBy}
			exclusive
			onChange={handleClick}
			aria-label="sort results by"
			className={styles.buttonGroup}
		>
			<ToggleButton
				value="popularity"
				aria-label="left aligned"
				disableRipple
				classes={{ label: styles.label }}
			>
				<Typography variant="body1" classes={{ body1: styles.body1 }}>
					Popularity
				</Typography>
			</ToggleButton>
			<ToggleButton
				value="alphabetical"
				aria-label="centered"
				disableRipple
				classes={{ label: styles.label }}
			>
				<Typography variant="body1" classes={{ body1: styles.body1 }}>
					Alphabetical
				</Typography>
			</ToggleButton>
			<ToggleButton
				value="rating"
				aria-label="right aligned"
				disableRipple
				classes={{ label: styles.label }}
			>
				<Typography variant="body1" classes={{ body1: styles.body1 }}>
					Rating
				</Typography>
			</ToggleButton>
		</ToggleButtonGroup>
	);
}
