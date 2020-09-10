import React from 'react';
import {
	Collapse,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListItemSecondaryAction,
	Tooltip,
	Typography,
	Box
} from '@material-ui/core';
import {
	PlaceRounded,
	EcoRounded,
	LaunchRounded,
	FileCopyRounded
} from '@material-ui/icons';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { getTimeAgo } from '../../../utils/timeAgo';
import StoresVoteButtons from './StoresVoteButtons';

const useStyles = makeStyles((theme) => ({
	nested: {
		paddingLeft: theme.spacing(4)
	},
	iconButton: {
		[theme.breakpoints.only('xs')]: {
			padding: 6
		}
	}
}));

export default function StoresList(props) {
	const styles = useStyles();

	return props.stores.map((store) => (
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
				<ListItemText
					primary={store.name}
					secondary={
						<Typography variant="body2" color="textSecondary" noWrap>
							{store.address}
						</Typography>
					}
				/>
				<Tooltip title="Seen by this many people">
					{store.likes >= 1 ? (
						<Typography component="span" variant="overline">
							+{store.likes}
						</Typography>
					) : (
						<Typography component="span" variant="overline" color="error">
							{store.likes}
						</Typography>
					)}
				</Tooltip>
			</ListItem>
			<Collapse in={props.selectedStore === store.id} timeout="auto" unmountOnExit>
				<List component="div" dense style={{ paddingTop: 0 }}>
					<ListItem className={styles.nested}>
						<ListItemText
							primary="Have you seen this product here?"
							secondary={`Last confirmed ${getTimeAgo(store.lastSeen).toLowerCase()}`}
						/>
						<ListItemSecondaryAction>
							<StoresVoteButtons />
						</ListItemSecondaryAction>
					</ListItem>
					<ListItem button className={styles.nested} onClick={props.getDirections}>
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
				</List>
			</Collapse>
		</Box>
	));
}
