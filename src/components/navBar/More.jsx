import React, { useState } from 'react';
import Terms from '../dialogs/Terms';
import Privacy from '../dialogs/Privacy';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const More = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [openDialog, setOpenDialog] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const openTermsDialog = () => {
		setOpenDialog('TERMS');
		handleClose();
	};

	const openPrivacyDialog = () => {
		setOpenDialog('PRIVACY');
		handleClose();
	};

	const closeDialog = () => {
		setOpenDialog(null);
	};

	return (
		<div>
			<IconButton
				aria-label="more"
				aria-controls="simple-menu"
				aria-haspopup="true"
				onClick={handleClick}
				edge="end"
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={openTermsDialog}>Terms of Use</MenuItem>
				<MenuItem onClick={openPrivacyDialog}>Privacy Policy</MenuItem>
			</Menu>
			<Terms open={openDialog === 'TERMS'} onClose={closeDialog} />
			<Privacy open={openDialog === 'PRIVACY'} onClose={closeDialog} />
		</div>
	);
};

export default More;
