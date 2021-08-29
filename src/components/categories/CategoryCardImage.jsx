import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'react-graceful-image';

const useStyles = makeStyles((theme) => ({
	image: {
		cursor: 'pointer',
		height: '100%',
		width: '100%',
		objectFit: 'cover',
		objectPosition: 'center'
	},
	imageLoading: {
		filter: 'blur(30px)',
		transform: 'scale(1.4)',
		'@media (hover: hover) and (pointer: fine)': {
			filter: 'blur(30px) brightness(85%)',
			transitionProperty: 'filter',
			transitionDuration: `${theme.transitions.duration.complex}ms`
		}
	},
	imageLoaded: {
		'@media (hover: hover) and (pointer: fine)': {
			filter: 'brightness(85%)',
			transitionProperty: 'filter',
			transitionDuration: `${theme.transitions.duration.complex}ms`
		}
	}
}));

export default function CategoryCardImage(props) {
	const { source, index } = props;
	const styles = useStyles();

	return (
		<Image
			src={`${source}?width=250`}
			className={clsx(styles.image, styles.imageLoaded, 'image-loaded')}
			alt=""
			noLazyLoad={index === 0}
			customPlaceholder={(ref) => (
				<img
					src={`${source}?width=5`}
					className={clsx(styles.image, styles.imageLoading, 'image-loading')}
					alt=""
					ref={ref}
				/>
			)}
		/>
	);
}
