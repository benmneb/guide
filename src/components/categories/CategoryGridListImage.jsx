import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'react-graceful-image';

const useStyles = makeStyles((theme) => ({
	image: {
		cursor: 'pointer',
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		objectPosition: 'center'
	},
	imageLoading: {
		filter: 'blur(30px)',
		transform: 'scale(1.4)',
		'@media (hover: hover) and (pointer: fine)': {
			filter: 'blur(30px) brightness(85%)',
			transitionProperty: 'filter',
			transitionDuration: `${theme.transitions.duration.complex}ms`,
			'&:hover': {
				filter: 'blur(30px) brightness(100%)'
			}
		}
	},
	imageLoaded: {
		'@media (hover: hover) and (pointer: fine)': {
			filter: 'brightness(85%)',
			transitionProperty: 'filter',
			transitionDuration: `${theme.transitions.duration.complex}ms`,
			'&:hover': {
				filter: 'brightness(100%)'
			}
		}
	}
}));

export default function CategoryGridListImage(props) {
	const { source } = props;
	const styles = useStyles();

	return (
		<Image
			src={`${source}?width=250`}
			className={clsx(styles.image, styles.imageLoaded)}
			alt=""
			customPlaceholder={(ref) => (
				<img
					src={`${source}?width=5`}
					className={clsx(styles.image, styles.imageLoading)}
					alt=""
					ref={ref}
				/>
			)}
		/>
	);
}
