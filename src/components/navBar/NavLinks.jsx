import React, { useState } from 'react';
import More from './More';
import Advertise from '../dialogs/Advertise';
import AddProducts from '../dialogs/AddProducts';
import { Button, IconButton, Tooltip, Zoom, Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export default function NavLinks() {
	const [openDialog, setOpenDialog] = useState(null);

	const openAdvertise = () => {
		setOpenDialog('Advertise');
	};

	const openAddProducts = () => {
		setOpenDialog('AddProducts');
	};

	const closeDialog = () => {
		setOpenDialog(null);
	};

	return (
		<Box flex="1 0 0%">
			<Box marginRight={2} display="flex" justifyContent="flex-end" alignItems="center">
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
