import React from 'react';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListItemSecondaryAction,
	Collapse,
	Box
} from '@material-ui/core';
import {
	PlaceRounded,
	StoreRounded,
	EcoRounded,
	LaunchRounded,
	FileCopyRounded
} from '@material-ui/icons';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import LikeButton from '../LikeButton';

const useStyles = makeStyles((theme) => ({
	nested: {
		paddingLeft: theme.spacing(4)
	}
}));

export default function StoresList(props) {
	const styles = useStyles();

	return props.data.map((store) => (
		<Box key={store.id}>
			<ListItem
				dense
				button
				onClick={() => props.listItemClick(store)}
				selected={props.selectedStore === store.id}
			>
				<ListItemIcon>
					{store.isVegan ? (
						<EcoRounded style={{ color: green[500] }} />
					) : (
						<PlaceRounded />
					)}
				</ListItemIcon>
				<ListItemText primary={store.name} secondary={store.address} />
				<ListItemSecondaryAction>
					<LikeButton
						tooltip="Have you seen this product in this store?"
						tooltipPlacement="bottom-end"
						ariaLabel="confirm"
						size="small"
					/>
				</ListItemSecondaryAction>
			</ListItem>
			<Collapse in={props.selectedStore === store.id} timeout="auto" unmountOnExit>
				<List component="div" dense style={{ paddingTop: 0 }}>
					<ListItem button className={styles.nested}>
						<ListItemIcon>
							<LaunchRounded fontSize="small" />
						</ListItemIcon>
						<ListItemText primary="Get directions in Google Maps" />
					</ListItem>
					<ListItem
						button
						onClick={() => props.copyAddress(store.address)}
						className={styles.nested}
					>
						<ListItemIcon>
							<FileCopyRounded fontSize="small" />
						</ListItemIcon>
						<ListItemText primary="Copy address to clipboard" />
					</ListItem>
					<ListItem button className={styles.nested}>
						<ListItemIcon>
							<StoreRounded />
						</ListItemIcon>
						<ListItemText primary="See all products in this store" />
					</ListItem>
				</List>
			</Collapse>
		</Box>
	));
}
