import { useSelector } from 'react-redux';
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
import Alert from '@material-ui/lab/Alert';
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
	},
	veganStore: {
		color: green[500]
	},
	storeActionsList: {
		paddingTop: 0,
		backgroundColor: theme.palette.grey[100]
	}
}));

export default function StoresList(props) {
	const styles = useStyles();
	const stores = useSelector((state) => state.product.stores);
	const selectedStore = useSelector((state) => state.product.selectedStore);

	return stores.length ? (
		stores.map((store) => (
			<Box key={store.store_id}>
				<ListItem
					dense
					button
					onClick={() => props.listItemClick(store)}
					selected={selectedStore && selectedStore.store_id === store.store_id}
				>
					<ListItemIcon>
						{store.vegan_store ? (
							<EcoRounded className={styles.veganStore} />
						) : (
							<PlaceRounded />
						)}
					</ListItemIcon>
					<ListItemText
						primary={store.store_name}
						secondary={
							<Typography variant="body2" color="textSecondary" noWrap>
								{store.address}
							</Typography>
						}
					/>
					<Tooltip title="This products reputation in this store">
						{store.votes >= 1 ? (
							<Typography component="span" variant="subtitle2" color="textSecondary">
								+{store.votes}
							</Typography>
						) : (
							<Typography component="span" variant="subtitle2" color="error">
								{store.votes}
							</Typography>
						)}
					</Tooltip>
				</ListItem>
				<Collapse
					in={selectedStore && selectedStore.store_id === store.store_id}
					timeout="auto"
					unmountOnExit
				>
					<List component="div" dense className={styles.storeActionsList}>
						<ListItem className={styles.nested}>
							<ListItemText
								primary="Can you confirm this product is here?"
								secondary={`Last confirmed ${getTimeAgo(
									store.last_seen ? new Date(store.last_seen) : new Date(store.date_added)
								).toLowerCase()}`}
							/>
							<ListItemSecondaryAction>
								<StoresVoteButtons
									storeId={store.store_id}
									prodStoreId={store.prod_store_id}
									votedBy={store.voted_by}
									votedDownBy={store.voted_down_by}
								/>
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
		))
	) : (
		<Box margin={2} color="text.secondary">
			<Alert severity="error">No stores tagged within 25km of you.</Alert>
			<Typography paragraph />
			<Typography paragraph>
				If you know a store that sells this product, add it here to help other people find
				this product easier.
			</Typography>
		</Box>
	);
}
