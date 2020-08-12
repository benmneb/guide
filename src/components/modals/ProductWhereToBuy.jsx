import React, { useState } from 'react';
import { Grid, IconButton, Tooltip } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Collapse from '@material-ui/core/Collapse';
import PlaceIcon from '@material-ui/icons/Place';
import StoreIcon from '@material-ui/icons/StoreRounded';
import EcoRoundedIcon from '@material-ui/icons/EcoRounded';
import LaunchRoundedIcon from '@material-ui/icons/LaunchRounded';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import { stores } from '../../assets/stores';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		color: theme.palette.text.secondary
	},
	heading: {
		color: theme.palette.text.primary,
		fontWeight: theme.typography.fontWeightBold
	},
	listRoot: {
		width: '100%',
		backgroundColor: theme.palette.background.paper
	},
	nested: {
		paddingLeft: theme.spacing(4)
	}
}));

export default function ProductAbout() {
	const styles = useStyles();
	const [open, setOpen] = useState('');

	const handleClick = (store) => {
		if (open === store) {
			setOpen('');
		} else {
			setOpen(store);
		}
	};

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} sm={6}>
				map goes here
			</Grid>
			<Grid item xs={12} sm={6}>
				<List component="div" aria-label="Stores near you" className={styles.listRoot}>
					{stores.map((store) => (
						<div key={store.name}>
							<ListItem button onClick={() => handleClick(store.name)}>
								<ListItemIcon>
									{store.isVegan ? (
										<EcoRoundedIcon style={{ color: green[500] }} />
									) : (
										<PlaceIcon />
									)}
								</ListItemIcon>
								<ListItemText primary={store.name} secondary={store.address} />
								<ListItemSecondaryAction>
									<Tooltip
										title="Have you seen this product in this store?"
										placement="bottom-end"
									>
										<IconButton aria-label="confirm">
											<ThumbUpRoundedIcon fontSize="small" />
										</IconButton>
									</Tooltip>
								</ListItemSecondaryAction>
							</ListItem>
							<Collapse in={open === store.name} timeout="auto" unmountOnExit>
								<List component="div" dense>
									<ListItem button className={styles.nested}>
										<ListItemIcon>
											<LaunchRoundedIcon fontSize="small" />
										</ListItemIcon>
										<ListItemText primary="Get directions in Google Maps" />
									</ListItem>
									<ListItem button className={styles.nested}>
										<ListItemIcon>
											<FileCopyRoundedIcon fontSize="small" />
										</ListItemIcon>
										<ListItemText primary="Copy address to clipboard" />
									</ListItem>
									<ListItem button className={styles.nested}>
										<ListItemIcon>
											<StoreIcon />
										</ListItemIcon>
										<ListItemText primary="See all products in this store" />
									</ListItem>
								</List>
							</Collapse>
						</div>
					))}
				</List>
			</Grid>
		</Grid>
	);
}
