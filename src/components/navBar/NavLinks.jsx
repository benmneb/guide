import React, { useState } from 'react';
import More from './More';
import Advertise from '../dialogs/Advertise';
import AddProducts from '../dialogs/AddProducts';
import {
	Button,
	IconButton,
	Tooltip,
	Zoom,
	Menu,
	MenuItem,
	Box
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

export default function NavLinks() {
	const [openDialog, setOpenDialog] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);

	const openAdvertise = () => {
		closeHamburger();
		setOpenDialog('Advertise');
	};

	const openAddProducts = () => {
		closeHamburger();
		setOpenDialog('AddProducts');
	};

	const closeDialog = () => {
		setOpenDialog(null);
	};

	const openHamburger = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const closeHamburger = () => {
		setAnchorEl(null);
	};

	return (
		<Box flex="1 0 0%">
			<Box
				display={{ xs: 'flex', md: 'none' }}
				justifyContent="flex-end"
				alignItems="center"
				marginRight={2}
			>
				<IconButton
					aria-controls="hamburger-menu"
					aria-haspopup="true"
					onClick={openHamburger}
				>
					<SearchIcon />
				</IconButton>
				<IconButton
					aria-controls="hamburger-menu"
					aria-haspopup="true"
					onClick={openHamburger}
				>
					<MenuIcon />
				</IconButton>
				<Menu
					id="hamburger-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={closeHamburger}
				>
					<MenuItem onClick={openAddProducts}>Add Products</MenuItem>
					<MenuItem onClick={closeHamburger}>Support Us</MenuItem>
					<MenuItem onClick={openAdvertise}>Advertise</MenuItem>
					<MenuItem onClick={closeHamburger}>Terms of Use</MenuItem>
					<MenuItem onClick={closeHamburger}>Privacy Policy</MenuItem>
				</Menu>
			</Box>
			<Box
				display={{ xs: 'none', md: 'flex' }}
				justifyContent="flex-end"
				alignItems="center"
				marginRight={2}
			>
				<Tooltip title="Support us on Patreon" TransitionComponent={Zoom} arrow>
					<Button>Donate</Button>
				</Tooltip>
				<Tooltip title="Promote your brand on the Guide" TransitionComponent={Zoom} arrow>
					<Button onClick={openAdvertise}>Advertise</Button>
				</Tooltip>
				<Tooltip title="Add products to the Guide" TransitionComponent={Zoom} arrow>
					<IconButton
						aria-label="Contribute to the Guide"
						aria-controls="add-products"
						aria-haspopup="true"
						onClick={openAddProducts}
						edge="end"
					>
						<AddIcon />
					</IconButton>
				</Tooltip>
				<More />
			</Box>
			<Advertise open={openDialog === 'Advertise'} onClose={closeDialog} />
			<AddProducts open={openDialog === 'AddProducts'} onClose={closeDialog} />
		</Box>
	);
}
