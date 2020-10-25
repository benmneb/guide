import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { CloseRounded } from '@material-ui/icons';
import { IconButton, Typography, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	container: {
		margin: 0,
		padding: 0
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
		zIndex: theme.zIndex.modal + 1
	}
}));

export default function DialogTitle({ children, onClose, textAlign, noTitle, ...props }) {
	const styles = useStyles();

	if (noTitle)
		return (
			<MuiDialogTitle disableTypography className={styles.container} {...props}>
				<IconButton aria-label="close" className={styles.closeButton} onClick={onClose}>
					<CloseRounded />
				</IconButton>
			</MuiDialogTitle>
		);
	else
		return (
			<MuiDialogTitle disableTypography {...props}>
				<Box component="header">
					<Typography variant="h6" component="h1" align={textAlign}>
						{children}
					</Typography>
					{onClose ? (
						<IconButton
							aria-label="close"
							className={styles.closeButton}
							onClick={onClose}
						>
							<CloseRounded />
						</IconButton>
					) : null}
				</Box>
			</MuiDialogTitle>
		);
}

DialogTitle.propTypes = {
	textAlign: PropTypes.oneOf(['left', 'center']),
	noTitle: PropTypes.bool
};

DialogTitle.defaultProps = {
	textAlign: 'left',
	noTitle: false
};
