import { useSelector, useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { hideSideDrawer, showSideDrawer } from '../../store/actions';
import SideDrawerContents from './SideDrawerContents';

const useStyles = makeStyles((theme) => ({
	drawer: {
		[theme.breakpoints.up('lg')]: {
			width: theme.mixins.sideMenu.width,
			flexShrink: 0
		}
	},
	drawerPaper: {
		width: theme.mixins.sideMenu.width
	}
}));

export default function SideDrawer({ window }) {
	const styles = useStyles();
	const theme = useTheme();
	const dispatch = useDispatch();
	const sideDrawerIsOpen = useSelector((state) => state.ui.showSideDrawer);
	const container = window !== undefined ? () => window().document.body : undefined;

	const handleCloseSideDrawer = () => {
		if (sideDrawerIsOpen) dispatch(hideSideDrawer());
	};

	const handleOpenSideDrawer = () => {
		dispatch(showSideDrawer());
	};

	return (
		<Box component="nav" className={styles.drawer} aria-label="main menu">
			<Hidden lgUp>
				<SwipeableDrawer
					container={container}
					anchor={theme.direction === 'rtl' ? 'right' : 'left'}
					open={sideDrawerIsOpen}
					onOpen={handleOpenSideDrawer}
					onClose={handleCloseSideDrawer}
					classes={{ paper: styles.drawerPaper }}
					ModalProps={{ keepMounted: true }} // Better open performance on mobile.
				>
					<SideDrawerContents />
				</SwipeableDrawer>
			</Hidden>
			<Hidden mdDown>
				<Drawer classes={{ paper: styles.drawerPaper }} variant="permanent" open>
					<SideDrawerContents />
				</Drawer>
			</Hidden>
		</Box>
	);
}
