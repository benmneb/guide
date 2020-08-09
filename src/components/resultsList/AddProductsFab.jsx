import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { Fab, Tooltip, Grow, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import * as actionCreators from '../../store/actions';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const useStyles = makeStyles((theme) => ({
	fab: {
		position: 'fixed',
		right: theme.spacing(6),
		bottom: theme.spacing(4),
		color: theme.palette.common.white
	},
	displayNone: {
		display: 'none'
	}
}));

function ShowOnScroll(props) {
	const { children } = props;

	const triggerShow = useScrollTrigger({
		disableHysteresis: true,
		threshold: 300
	});

	return (
		<Grow appear={false} in={triggerShow}>
			{children}
		</Grow>
	);
}

const AddProductsFab = (props) => {
	const styles = useStyles();

	return (
		<Box display={{ xs: 'none', md: 'block' }}>
			<ShowOnScroll>
				<Tooltip title="Add Products" aria-label="add products" placement="left">
					<Fab
						color="primary"
						aria-label="add products"
						className={clsx(styles.fab, { [styles.displayNone]: props.showFiltersPanel })}
					>
						<AddIcon />
					</Fab>
				</Tooltip>
			</ShowOnScroll>
		</Box>
	);
};

const mapStateToProps = (state) => {
	return {
		showFiltersPanel: state.showFiltersPanel,
		showProductModal: state.showProductModal
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onShowProductModal: () => dispatch(actionCreators.showProductModal())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProductsFab);
