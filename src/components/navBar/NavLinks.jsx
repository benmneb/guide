import React, { useState } from 'react';
import More from './More';
import Advertise from '../dialogs/Advertise';
import AddProducts from '../dialogs/AddProducts';
import classes from './NavLinks.module.css';

import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

const NavLinks = () => {
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
		<div className={classes.container}>
			<ul>
				<li>
					<Tooltip title="Support us on Patreon" TransitionComponent={Zoom} arrow>
						<Button>Donate</Button>
					</Tooltip>
				</li>
				<li>
					<Tooltip
						title="Promote your brand on the Guide"
						TransitionComponent={Zoom}
						arrow
					>
						<Button onClick={openAdvertise}>Advertise</Button>
					</Tooltip>
				</li>
				<li>
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
				</li>
				<li>
					<More />
				</li>
			</ul>
			<Advertise open={openDialog === 'Advertise'} onClose={closeDialog} />
			<AddProducts open={openDialog === 'AddProducts'} onClose={closeDialog} />
		</div>
	);
};

export default NavLinks;
