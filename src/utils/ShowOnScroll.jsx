import PropTypes from 'prop-types';
import Grow from '@material-ui/core/Grow';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

export default function ShowOnScroll({ children, disableHysteresis, threshold }) {
	const triggerShow = useScrollTrigger({
		disableHysteresis,
		threshold
	});

	return (
		<Grow appear={false} in={triggerShow}>
			{children}
		</Grow>
	);
}

ShowOnScroll.propTypes = {
	children: PropTypes.any.isRequired,
	disableHysteresis: PropTypes.bool,
	threshold: PropTypes.number
};

ShowOnScroll.defaultProps = {
	disableHysteresis: true,
	threshold: 300
};
