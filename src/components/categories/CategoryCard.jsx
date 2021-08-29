import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

import CategoryCardTitle from './CategoryCardTitle';
import CategoryCardImage from './CategoryCardImage';

const useStyles = makeStyles((theme) => ({
	card: {
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: '0',
		width: 200,
		height: 300,
		userSelect: 'none',
		overflow: 'hidden',
		'&:hover': {
			'& img.image-loaded': {
				filter: 'brightness(100%)'
			},
			'& img.image-loading': {
				filter: 'blur(30px) brightness(100%)'
			}
		}
	}
}));

export default function CategoryCard(props) {
	const { data, index, link } = props;
	const styles = useStyles();

	return (
		<Link to={link} className={styles.card} tabIndex={0}>
			<CategoryCardImage source={data.image} index={index} />
			<CategoryCardTitle title={data.name} />
		</Link>
	);
}
