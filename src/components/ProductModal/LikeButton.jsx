import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, IconButton } from '@material-ui/core';
import { ThumbUpAltRounded } from '@material-ui/icons';

export default function LikeButton({ tooltip, tooltipPlacement, ariaLabel, size }) {
	const [hasBeenClicked, setHasBeenClicked] = useState(false);

	function handleClick() {
		setHasBeenClicked(!hasBeenClicked);
	}

	const color = hasBeenClicked ? 'primary' : 'inherit';

	return (
		<Tooltip title={tooltip} placement={tooltipPlacement}>
			<IconButton aria-label={ariaLabel} onClick={handleClick}>
				<ThumbUpAltRounded color={color} fontSize={size} />
			</IconButton>
		</Tooltip>
	);
}

LikeButton.propTypes = {
	tooltip: PropTypes.string.isRequired,
	tooltipPlacement: PropTypes.oneOf([
		'bottom-end',
		'bottom-start',
		'bottom',
		'left-end',
		'left-start',
		'left',
		'right-end',
		'right-start',
		'right',
		'top-end',
		'top-start',
		'top'
	]),
	ariaLabel: PropTypes.string.isRequired,
	size: PropTypes.oneOf(['inherit', 'default', 'small', 'large'])
};

LikeButton.defaultProps = {
	tooltipPlacement: 'bottom',
	size: 'default'
};
