import { useState, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
	showSnackbar,
	setConfirmItsVegan,
	setBrandname,
	setProductname,
	setSelectedCategory,
	setCategoryInputValue
} from '../../store/actions';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	Stepper,
	Step,
	StepLabel,
	StepContent,
	Typography,
	useMediaQuery,
	Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '../../utils/DialogTitle';
import LoadingButton from '../../utils/LoadingButton';
import AddProductsSteps from './AddProductsSteps';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%'
	},
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	actionsContainer: {
		marginBottom: theme.spacing(2)
	},
	stepIconTextFill: {
		'& .MuiStepIcon-root': {
			'& .MuiStepIcon-text': {
				fill: theme.palette.common.white
			}
		}
	},
	modalMaxHeight: {
		[theme.breakpoints.up('sm')]: {
			height: 590
		}
	},
	finalActions: {
		padding: 0
	}
}));

export default function AddProducts({ isOpened }) {
	const styles = useStyles();
	const history = useHistory();
	const location = useLocation();
	const steps = getSteps();
	const dispatch = useDispatch();
	const fullScreen = useMediaQuery((theme) => theme.breakpoints.down('xs'));
	const currentUserData = useSelector((state) => state.auth.currentUserData);
	const confirmItsVegan = useSelector((state) => state.addProduct.confirmItsVegan);
	const brandName = useSelector((state) => state.addProduct.brandName);
	const productName = useSelector((state) => state.addProduct.productName);
	const selectedCategory = useSelector((state) => state.addProduct.selectedCategory);
	const [activeStep, setActiveStep] = useState(0);
	const [pending, setPending] = useState(false);
	let formRef = useRef();

	const handleNext = () => {
		if (!formRef.current.checkValidity()) {
			return;
		}
		if (activeStep < steps.length - 1) {
			return setActiveStep((prev) => prev + 1);
		}
		if (activeStep === steps.length - 1) {
			setPending(true);
			axios
				.post('/email/add-product', {
					body: `<p><strong>New Product Addition Request Received ${new Date()}</strong></p>
				<p>User <strong>${
					currentUserData ? currentUserData.id : 'was not logged in'
				}</strong> suggested to add...</p>
				<p>Brand: <strong> ${brandName.brand_name}</strong>
				<br>Product: <strong>${productName.product_name}</strong>
				<br>in category: <strong>${selectedCategory}</p>`
				})
				.then(() => {
					setPending(false);
					setActiveStep((prev) => prev + 1);
					return dispatch(
						showSnackbar({
							type: 'success',
							title: 'Submission received',
							message: 'Thank you for helping people find vegan products easier',
							emoji: '💪'
						})
					);
				})
				.catch((err) => {
					setPending(false);
					console.error(err.message);
					return dispatch(
						showSnackbar({
							type: 'error',
							title: 'Could not add product',
							message: `Something went wrong. Please try again soon.`
						})
					);
				});
		}
	};

	const handleBack = () => {
		setActiveStep((prev) => prev - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
		dispatch(setConfirmItsVegan(false));
		dispatch(setBrandname(null));
		dispatch(setProductname(null));
		dispatch(setSelectedCategory(null));
		dispatch(setCategoryInputValue(''));
	};

	const onClose = () => {
		if (isOpened) {
			if (location.search.includes('&')) {
				history.push(location.pathname + location.search.split('&')[0]);
			} else history.push(location.pathname);
		}
	};

	const onExited = () => {
		handleReset();
	};

	function getSteps() {
		return [
			'Is the product you want to add vegan?',
			'Product Details',
			'Category',
			'Review & Confirm'
		];
	}

	return (
		<Dialog
			open={Boolean(isOpened)}
			onClose={onClose}
			onExited={onExited}
			aria-labelledby="add-products-title"
			fullScreen={fullScreen}
			maxWidth="sm"
			fullWidth
			classes={{ paperFullWidth: styles.modalMaxHeight }}
		>
			<DialogTitle id="add-products-title" onClose={onClose}>
				Add a Product to the Guide
			</DialogTitle>
			<DialogContent>
				<form ref={formRef}>
					<Stepper activeStep={activeStep} orientation="vertical">
						{steps.map((label, index) => (
							<Step key={label}>
								<StepLabel classes={{ iconContainer: styles.stepIconTextFill }}>
									{label}
								</StepLabel>
								<StepContent>
									<Box component="section">
										<AddProductsSteps step={index} />
									</Box>
									<div className={styles.actionsContainer}>
										<div>
											<Button
												disabled={activeStep === 0}
												onClick={handleBack}
												className={styles.button}
											>
												Back
											</Button>
											<LoadingButton
												variant="contained"
												color="primary"
												disabled={!confirmItsVegan}
												pending={pending}
												onClick={handleNext}
												className={styles.button}
											>
												{activeStep === steps.length - 1 ? 'Submit' : 'Next'}
											</LoadingButton>
										</div>
									</div>
								</StepContent>
							</Step>
						))}
					</Stepper>
				</form>
				{activeStep === steps.length && (
					<Box margin={1}>
						<Typography paragraph>We have received your submission.</Typography>
						<Typography paragraph>
							Thank you for helping people find vegan products easier.
						</Typography>
						<Typography paragraph color="textSecondary">
							Please note that for quality assurance we manually review all submissions
							before they appear on the Guide.
						</Typography>
						<DialogActions className={styles.finalActions}>
							<Button onClick={onClose}>Close</Button>
							<Button onClick={handleReset} variant="contained" color="primary">
								Add another product
							</Button>
						</DialogActions>
					</Box>
				)}
			</DialogContent>
		</Dialog>
	);
}
