import { useContext, useState, useEffect } from 'react';

import { Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowBackIosRounded, ArrowForwardIosRounded } from '@material-ui/icons/';

import { VisibilityContext } from 'react-horizontal-scrolling-menu';

const useStyles = makeStyles((theme) => ({
	arrow: {
		display: 'none',
		'@media (hover: hover) and (pointer: fine)': {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: ({ placement }) => (placement === 'left' ? 'flex-start' : 'flex-end'),
			position: 'relative',
			userSelect: 'none',
			transition: `all ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
			width: 0,
			zIndex: 1000,
			left: ({ placement }) => (placement === 'left' ? 0 : 'inherit'),
			right: ({ placement }) => (placement === 'right' ? 0 : 'inherit'),
			marginLeft: ({ placement }) => (placement === 'left' ? -0 : 'inherit'),
			marginRight: ({ placement }) => (placement === 'right' ? -0 : 'inherit'),
			opacity: ({ disabled }) => (disabled ? '0' : '1'),
			visibility: ({ disabled }) => (disabled ? 'hidden' : 'visible'),
			'& .MuiFab-root': {
				margin: theme.spacing()
			}
		}
	}
}));

function Arrow(props) {
	const { children, disabled, placement } = props;
	const styles = useStyles({ disabled, placement });

	return <div className={styles.arrow}>{children}</div>;
}

export function LeftArrow() {
	const { isFirstItemVisible, scrollPrev, visibleItemsWithoutSeparators } =
		useContext(VisibilityContext);

	const [disabled, setDisabled] = useState(
		!visibleItemsWithoutSeparators.length && isFirstItemVisible
	);

	// detect if component visible
	useEffect(() => {
		if (visibleItemsWithoutSeparators.length) {
			setDisabled(isFirstItemVisible);
		}
	}, [isFirstItemVisible, visibleItemsWithoutSeparators]);

	return (
		<Arrow placement="left" disabled={disabled}>
			<Fab color="inherit" size="medium" onClick={() => scrollPrev()}>
				<ArrowBackIosRounded size="large" />
			</Fab>
		</Arrow>
	);
}

export function RightArrow() {
	const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } =
		useContext(VisibilityContext);

	const [disabled, setDisabled] = useState(
		!visibleItemsWithoutSeparators.length && isLastItemVisible
	);

	// detect if component visible
	useEffect(() => {
		if (visibleItemsWithoutSeparators.length) {
			setDisabled(isLastItemVisible);
		}
	}, [isLastItemVisible, visibleItemsWithoutSeparators]);

	return (
		<Arrow placement="right" disabled={disabled}>
			<Fab color="inherit" size="medium" onClick={() => scrollNext()}>
				<ArrowForwardIosRounded size="large" />
			</Fab>
		</Arrow>
	);
}
