import { styled } from '@material-ui/core/styles';
import { Hidden, Typography } from '@material-ui/core';

const Container = styled('section')(({ theme }) => ({
	height: 120,
	minHeight: 'max-content',
	width: 'max-content',
	maxWidth: '89vw',
	display: 'flex',
	flexDirection: 'row',
	border: `1px solid ${theme.palette.grey[300]}`,
	borderRadius: theme.spacing(2),
	marginTop: theme.spacing(4),
	cursor: 'pointer'
}));

const ImageBox = styled('div')(({ theme }) => ({
	width: 150,
	borderRadius: theme.spacing(2, 0, 0, 2),
	backgroundImage: `url('https://picsum.photos/150/100')`,
	flexShrink: 0,
	[theme.breakpoints.down('sm')]: {
		flexShrink: 1
	}
}));

const Content = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-evenly',
	padding: theme.spacing(0, 2),
	borderRadius: theme.spacing(0, 2, 2, 0)
}));

const Disclaimer = styled(({ ...other }) => (
	<Typography component="span" variant="caption" color="textSecondary" {...other} />
))(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
	position: 'relative',
	top: theme.spacing(-2.6),
	marginBottom: theme.spacing(-4),
	alignSelf: 'flex-end',
	padding: theme.spacing(0, 1),
	border: `1px solid ${theme.palette.grey[300]}`,
	borderRadius: theme.spacing(2),
	transition: `background-color ${theme.transitions.duration.enteringScreen}ms`,
	'&:hover': {
		backgroundColor: theme.palette.grey[100]
	},
	[theme.breakpoints.only('xs')]: {
		top: theme.spacing(-3.125)
	}
}));

export default function HeroBanner() {
	function handleClick() {
		alert('$$$$$$$$$$$$$$$$$$$');
	}

	function handleOtherClick(e) {
		e.stopPropagation();
		alert('our advertise modal');
	}

	return (
		<Container onClick={handleClick}>
			<ImageBox />
			<Content>
				<Disclaimer onClick={handleOtherClick}>Promotion</Disclaimer>
				<Hidden xsDown>
					<Typography variant="h6" color="textSecondary">
						Awesome sponsor
					</Typography>
				</Hidden>
				<Typography color="textSecondary">
					Get exclusive savings on our best creations
				</Typography>
				<Typography variant="button">YourWebsite.com</Typography>
			</Content>
		</Container>
	);
}
