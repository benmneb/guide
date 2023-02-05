import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogContentText,
	Link,
	Typography,
	useMediaQuery
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
	CheckRounded,
	ExpandMore,
	LockOpenRounded,
	TrendingUpRounded
} from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import { toKebabCase } from '../../utils/changeCase';
import DialogTitle from '../../utils/DialogTitle';
import PatreonIcon from '../../utils/PatreonIcon';
import {
	getEnums,
	getParams,
	useGetParameter,
	usePrepareLink
} from '../../utils/routing';
import AddProducts from './AddProducts';
import Advertise from './Advertise';
import Auth from './Auth';
import Invest from './Invest';

const useStyles = makeStyles((theme) => ({
	question: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightMedium
	},
	list: {
		margin: 0,
		padding: 0,
		listStyle: 'none',
		display: 'grid',
		gridGap: '1rem',
		'& li': {
			display: 'grid',
			gridTemplateColumns: '0 1fr',
			gridGap: '1.75em',
			alignItems: 'start',
			fontSize: '1.5rem',
			lineHeight: '1.25'
		},
		'& li::before': {
			content: 'attr(data-icon)'
		}
	}
}));

function ExpansionPanel({ children, ...props }) {
	return (
		<Accordion component="article" {...props}>
			{children}
		</Accordion>
	);
}

function Question({ children }) {
	const styles = useStyles();

	return (
		<AccordionSummary
			expandIcon={<ExpandMore />}
			aria-controls={toKebabCase(`${children}-content`)}
			id={toKebabCase(`${children}-header`)}
		>
			<Typography component="h2" variant="inherit" className={styles.question}>
				{children}
			</Typography>
		</AccordionSummary>
	);
}

function Answer({ children }) {
	return (
		<AccordionDetails>
			<Typography component="section" color="textSecondary">
				{children}
			</Typography>
		</AccordionDetails>
	);
}

export default function FAQ({ isOpened }) {
	const styles = useStyles();
	const history = useHistory();
	const location = useLocation();
	const fullScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const actionType = useGetParameter(getParams.action);
	const [action, setAction] = useState(actionType);

	// handle open second modal
	useEffect(() => {
		if (actionType) {
			setAction(actionType);
		} else setAction(null);
	}, [actionType]);

	function onClose() {
		if (isOpened) {
			history.push(location.pathname);
		}
	}

	const investorsLink = usePrepareLink({
		query: {
			[getParams.action]: getEnums.action.invest
		},
		keepOldQuery: true
	});
	const advertiseLink = usePrepareLink({
		query: {
			[getParams.action]: getEnums.action.advertise
		},
		keepOldQuery: true
	});
	const authLink = usePrepareLink({
		query: {
			[getParams.action]: getEnums.action.login
		},
		keepOldQuery: true
	});
	const addProductsLink = usePrepareLink({
		query: {
			[getParams.action]: getEnums.action.addProducts
		},
		keepOldQuery: true
	});

	return (
		<Dialog
			open={Boolean(isOpened)}
			onClose={onClose}
			aria-labelledby="faq-dialog-title"
			aria-describedby="faq-dialog-description"
			fullScreen={fullScreen}
			maxWidth="sm"
			fullWidth
		>
			<DialogTitle id="faq-dialog-title" onClose={onClose}>
				{'Vomad Guide FAQ'}
			</DialogTitle>
			<DialogContent>
				<DialogContentText component="section" id="faq-dialog-description">
					<ExpansionPanel defaultExpanded>
						<Question>What is the Vomad Guide?</Question>
						<Answer>
							<Typography paragraph>
								The Vomad Guide is a free community-driven database of vegan food, drink
								and household products.
							</Typography>
							<Typography paragraph>
								The Guide lists over 12,800 products in 212 categories, and is growing all
								the time. You can search and browse through everything from chocolates to
								eye-liner, from toothpaste to pet-food, from baby formulas to laundry
								detergents, plus hundreds more categories to find the most highly rated
								100% plant-based products near you.
							</Typography>
						</Answer>
					</ExpansionPanel>
					<ExpansionPanel>
						<Question>Where does your data come from?</Question>
						<Answer>
							<Typography paragraph>
								All the product information on the Guide comes from the brands themselves,
								the stores that stock them, and the users of the Guide who add and edit
								products and stores.
							</Typography>
							<Typography paragraph>
								We are always as thorough as we can be when it comes to displaying
								accurate and relevent product information. However, due to the impermanent
								nature of the market, product ingredients, packages, and the brands and
								products themselves often change regularly.
							</Typography>
							<Typography paragraph>
								To keep up with how quickly product information can change (you'd be
								surprised!) we allow interested users to notify us of any changes to
								existing products or of any new vegan product releases, and we encourage
								all users to report any inaccuracies on the Guide they are aware of by
								using the 'Suggest an Edit' button on every product info page.
							</Typography>
						</Answer>
					</ExpansionPanel>
					<ExpansionPanel>
						<Question>What do you qualify as "vegan"?</Question>
						<Answer>
							<Typography paragraph>
								Products on the Guide are devoid of all animal ingredients such as meat,
								fish, shellfish, insects, dairy, eggs and honey, as well as animal-derived
								materials, and are not tested on animals.
							</Typography>
							<Typography paragraph>
								We use the most common definition, penned by the Vegan Society, who
								invented the word "vegan" in 1944:
							</Typography>
							<Alert severity="info">
								<Typography variant="inherit" paragraph>
									"Veganism is a philosophy and way of living which seeks to exclude—as
									far as is possible and practicable—all forms of exploitation of, and
									cruelty to, animals for food, clothing or any other purpose; and by
									extension, promotes the development and use of animal-free alternatives
									for the benefit of animals, humans and the environment. In dietary terms
									it denotes the practice of dispensing with all products derived wholly
									or partly from animals."
								</Typography>
								<Typography variant="inherit">
									-{' '}
									<Link
										href="https://www.vegansociety.com/about-us/history"
										target="_blank"
										rel="noopener noreferrer"
										color="inherit"
										underline="always"
									>
										The Vegan Society
									</Link>
								</Typography>
							</Alert>
							<Typography paragraph />
						</Answer>
					</ExpansionPanel>
					<ExpansionPanel>
						<Question>
							Why do some products say 'may contain' a non-vegan ingredient?
						</Question>
						<Answer>
							<Typography paragraph>
								Manufacturers usaully include this on their packaging as a legal
								disclaimer and notice to people with very strong allergies.
							</Typography>
							<Typography paragraph>
								All it means is that the product was made or processed in a facility that
								also makes or processes the listed non-vegan allergen.
							</Typography>
							<Typography paragraph>
								These are not actual ingredients the product is made with, it is just a
								warning that contamination is a possibility. These products are definitely
								still suitable for vegans as their consumption does not directly cause
								demand for animals to be harmed.
							</Typography>
						</Answer>
					</ExpansionPanel>
					<ExpansionPanel>
						<Question>Why can't I find the product I'm looking for?</Question>
						<Answer>
							<Typography paragraph>
								Either because the product you are looking for is not vegan, or because it
								hasn't yet been added to the Guide.
							</Typography>
							<Typography paragraph>
								If you know of any vegan products that are missing, please help the
								community and{' '}
								<Link component={RouterLink} to={addProductsLink}>
									add the missing products
								</Link>{' '}
								so others can find them too.
							</Typography>
						</Answer>
					</ExpansionPanel>
					<ExpansionPanel>
						<Question>I love the Guide! How can I show support?</Question>
						<Answer>
							<Typography paragraph>
								If you get any value from the Guide there are a number of ways you can
								give value back.
							</Typography>
							<Box component="ul" className={styles.list}>
								<Box component="li" data-icon="💰">
									<Typography component="div">
										<Box component="span" fontWeight="fontWeightBold">
											Invest.
										</Box>{' '}
										Like what you see? It's just the beginning. With generous funding we
										can scale globally and implement the numerous game-changing features
										we have planned.
										<Box marginTop={1.5}>
											<Button
												variant="outlined"
												component={RouterLink}
												to={investorsLink}
												startIcon={<CheckRounded />}
											>
												Invest in us
											</Button>
										</Box>
									</Typography>
								</Box>
								<Box component="li" data-icon="❤️">
									<Typography component="div">
										<Box component="span" fontWeight="fontWeightBold">
											Become a patron.
										</Box>{' '}
										Pledge an amount you are comfortable with to help cover the expenses
										associated with creating and maintaining a large-scale web-app like
										this. Every little bit helps.
										<Box marginTop={1.5}>
											<Button
												variant="outlined"
												href="https://patreon.com/vomad"
												target="_blank"
												rel="noopener noreferrer"
												startIcon={<PatreonIcon />}
											>
												Support us via Patreon
											</Button>
										</Box>
									</Typography>
								</Box>
								<Box component="li" data-icon="📈">
									<Typography component="div">
										<Box component="span" fontWeight="fontWeightBold">
											Advertise.
										</Box>{' '}
										If you have a brand that would benefit from being exposed to visitors
										of the Guide then get in touch and let's start an advertising
										relationship.
										<Box marginTop={1.5}>
											<Button
												variant="outlined"
												component={RouterLink}
												to={advertiseLink}
												startIcon={<TrendingUpRounded />}
											>
												Advertise on the Guide
											</Button>
										</Box>
									</Typography>
								</Box>
								<Box component="li" data-icon="🎁">
									<Typography>
										<Box component="span" fontWeight="fontWeightBold">
											Share links.
										</Box>{' '}
										If you see someone on social media asking about vegan products, or
										enquiring if a specific vegan product is any good, then post a link to
										the Guide.
									</Typography>
								</Box>
								<Box component="li" data-icon="🗣">
									<Typography>
										<Box component="span" fontWeight="fontWeightBold">
											Mention us.
										</Box>{' '}
										Recommend the Guide to your friends and family. Show them how easy it
										is to find vegan products. A quick browse of the Guide can open their
										eyes to how convenient being vegan is in {new Date().getFullYear()}.
									</Typography>
								</Box>
								<Box component="li" data-icon="✏️">
									<Typography component="div">
										<Box component="span" fontWeight="fontWeightBold">
											Rate, review, tag and add.
										</Box>{' '}
										Leave reviews and ratings for products you've bought, tag the stores
										you've bought them in, and add any missing products so others can find
										them. The easiest way to support the Guide is just to use it.
										{!isAuthenticated && (
											<Box marginTop={1.5}>
												<Button
													variant="outlined"
													component={RouterLink}
													to={authLink}
													startIcon={<LockOpenRounded />}
												>
													Get Started
												</Button>
											</Box>
										)}
									</Typography>
								</Box>
							</Box>
						</Answer>
					</ExpansionPanel>
					<ExpansionPanel>
						<Question>Why do you ask for money?</Question>
						<Answer>
							<Typography paragraph>
								<Box component="span" fontWeight="fontWeightBold">
									Maintaining a large-scale web-app like this takes a lot of time and
									resources.
								</Box>{' '}
								Usually projects like this are run by an entire team of developers (5+
								people), and another whole marketing department, plus a dedicated business
								sector.
							</Typography>
							<Typography paragraph>
								<Box component="span" fontWeight="fontWeightBold">
									But the Vomad Guide is created, developed and maintained by only two
									people
								</Box>{' '}
								with a vision to help everyone find vegan products easier. This project
								currently has no investors or financial backers of any kind, and that's
								okay, we value the freedom of independence.
							</Typography>
							<Typography paragraph>
								But it means we're going to ask you for donations.{' '}
								<Box component="span" fontWeight="fontWeightBold">
									Without the support of our users, the Guide can not continue to exist.
								</Box>{' '}
								Time is precious and money is a necessity, and maintaining a project like
								this takes a lot of both.
							</Typography>
							<Typography paragraph>
								If you have got any value at all from using the Guide, we'd greatly
								appreciate your support with a generous monthly donation of whatever
								amount you can afford.
							</Typography>
							<Box marginTop={1.5}>
								<Button
									variant="outlined"
									href="https://patreon.com/vomad"
									target="_blank"
									rel="noopener noreferrer"
									startIcon={<PatreonIcon />}
								>
									Support us via Patreon
								</Button>
							</Box>
							<Typography paragraph />
							<Typography paragraph>
								<Box component="span" fontWeight="fontWeightBold">
									By donating you allow us to continue following our long-term plans for
									improving the Guide
								</Box>
								, and together we can continue to help everyone spend their money in the
								most ethical way they know how to by helping them find and access vegan
								products as easy as possible.
							</Typography>
						</Answer>
					</ExpansionPanel>
				</DialogContentText>
			</DialogContent>
			<Advertise isOpened={action === 'advertise'} />
			<Invest isOpened={action === 'invest'} />
			<Auth isOpened={action === 'login'} />
			<AddProducts isOpened={action === 'add-products'} />
		</Dialog>
	);
}
