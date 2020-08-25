import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import StoresList from './StoresList';
import StoresAdd from './StoresAdd';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Collapse
} from '@material-ui/core';
import { AddCircle, CancelRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	storesList: {
		width: '100%',
		backgroundColor: theme.palette.background.paper
	}
}));

export default function StoresListSection(props) {
	const styles = useStyles();

	function closeSelf() {
		props.setShowAddStore(!props.showAddStore);
	}

	return (
		<List
			component="div"
			aria-label="Stores near you"
			className={styles.storesList}
			subheader={
				<ListSubheader style={{ zIndex: '2' }} component="div">
					Stores Near You
				</ListSubheader>
			}
		>
			<ListItem button onClick={closeSelf}>
				<ListItemIcon>
					{props.showAddStore ? <CancelRounded /> : <AddCircle color="primary" />}
				</ListItemIcon>
				<ListItemText>{props.showAddStore ? 'Cancel' : 'Add a Store'}</ListItemText>
			</ListItem>
			<Collapse in={props.showAddStore} timeout="auto" unmountOnExit>
				<StoresAdd hide={closeSelf} />
			</Collapse>
			<StoresList
				data={props.stores}
				selectedStore={props.selectedStore}
				listItemClick={props.handleListItemClick}
				copyAddress={props.handleCopyAddress}
			/>
		</List>
	);
}
