import React, { useState } from 'react';
import More from './More';
import Advertise from '../dialogs/Advertise';
import AddProducts from '../dialogs/AddProducts';
import { Button, IconButton, Tooltip, Zoom, Grid, Box } from '@material-ui/core';
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
			<Box marginRight={2}>
				<Grid container spacing={1} justify="flex-end" alignItems="center">
					<Grid item>
						<Tooltip title="Support us on Patreon" TransitionComponent={Zoom} arrow>
							<Button>Donate</Button>
						</Tooltip>
					</Grid>
					<Grid item>
						<Tooltip
							title="Promote your brand on the Guide"
							TransitionComponent={Zoom}
							arrow
						>
							<Button onClick={openAdvertise}>Advertise</Button>
						</Tooltip>
					</Grid>
					<Grid item>
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
					</Grid>
					<Grid item>
						<More />
					</Grid>
				</Grid>
				<Advertise open={openDialog === 'Advertise'} onClose={closeDialog} />
				<AddProducts open={openDialog === 'AddProducts'} onClose={closeDialog} />
			</Box>
		</Box>
	);
}
