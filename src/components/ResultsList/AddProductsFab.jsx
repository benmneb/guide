import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Fab, Tooltip, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddRoundedIcon from '@material-ui/icons/Add';
import ShowOnScroll from '../../utils/ShowOnScroll';
import usePrepareLink from '../../utils/routing/usePrepareLink';
import { GET_PARAMS, GET_ENUMS } from '../../utils/routing/router';

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

function AddProductsFab({ showFiltersPanel }) {
	const styles = useStyles();

	const addProductLink = usePrepareLink({
		query: {
			[GET_PARAMS.popup]: GET_ENUMS.popup.addProducts
		}
	});

	return (
		<Box display={{ xs: 'none', md: 'block' }}>
			<ShowOnScroll threshold={300}>
				<Tooltip title="Add product(s) here" aria-label="add products" placement="left">
					<Fab
						color="primary"
						aria-label="add products"
						className={clsx(styles.fab, { [styles.displayNone]: showFiltersPanel })}
						component={Link}
						to={addProductLink}
					>
						<AddRoundedIcon />
					</Fab>
				</Tooltip>
			</ShowOnScroll>
		</Box>
	);
}

const mapStateToProps = (state) => {
	return {
		showFiltersPanel: state.showFiltersPanel
	};
};

export default connect(mapStateToProps)(AddProductsFab);
