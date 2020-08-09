import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
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

export default function OrderBy() {
	const styles = useStyles();
	const [orderBy, setOrderBy] = useState('descending');

	const handleClick = (event, newOrder) => {
		if (newOrder !== null) {
			setOrderBy(newOrder);
		}
	};

	return (
		<ToggleButtonGroup
			size="large"
			value={orderBy}
			exclusive
			onChange={handleClick}
			aria-label="order results by"
			className={styles.buttonGroup}
		>
			<ToggleButton
				value="ascending"
				aria-label="ascending"
				disableRipple
				classes={{ label: styles.label }}
			>
				<Typography variant="body1" classes={{ body1: styles.body1 }}>
					Ascending
				</Typography>
			</ToggleButton>
			<ToggleButton
				value="descending"
				aria-label="descending"
				disableRipple
				classes={{ label: styles.label }}
			>
				<Typography variant="body1" classes={{ body1: styles.body1 }}>
					Descending
				</Typography>
			</ToggleButton>
		</ToggleButtonGroup>
	);
}
