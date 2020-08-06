import React, { useState } from 'react';
import More from './More';
import Advertise from '../dialogs/Advertise';
import AddProducts from '../dialogs/AddProducts';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, Tooltip, Zoom, Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
	container: {
		'& ul': {
			listStyleType: 'none',
			padding: 20,
			display: 'flex',
			justifyContent: 'flex-end',
			alignItems: 'center'
		},
		'& li': {
			display: 'inline',
			margin: '0 5px 0 5px'
		},
		'& li:nth-last-child(2)': {
			marginRight: 0
		}
	}
}));

const NavLinks = () => {
	const styles = useStyles();

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
		<Box flex="1 0 0%" className={styles.container}>
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
		</Box>
	);
};

export default NavLinks;
