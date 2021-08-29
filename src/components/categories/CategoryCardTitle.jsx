import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	titleBar: {
		position: 'absolute',
		height: '20%',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer',
		backgroundColor: theme.palette.action.active
	},
	titleWrap: {
		padding: theme.spacing(2),
		width: '100%'
	},
	title: {
		color: theme.palette.common.white,
		fontSize: theme.typography.h6.fontSize,
		textAlign: 'center',
		lineHeight: theme.typography.body2.lineHeight,
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis'
	}
}));

export default function CategoryCardTitle(props) {
	const { title } = props;
	const styles = useStyles();

	return (
		<div className={styles.titleBar}>
			<div className={styles.titleWrap}>
				<div className={styles.title}>{title}</div>
			</div>
		</div>
	);
}
