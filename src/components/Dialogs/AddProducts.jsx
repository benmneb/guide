import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actionCreators from '../../store/actions';
import {
	Button,
	Checkbox,
	Dialog,
	DialogContent,
	FormControlLabel,
	FormGroup,
	Stepper,
	Step,
	StepLabel,
	StepContent,
	TextField,
	Typography,
	useMediaQuery,
	Box
} from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DialogTitle from '../../utils/DialogTitle';
import { categories } from '../../assets/categories';

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
	}
}));

function AddProducts({ onShowSnackbar, isOpened }) {
	const styles = useStyles();
	const history = useHistory();
	const theme = useTheme();
	const steps = getSteps();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	const [activeStep, setActiveStep] = useState(0);
	const [confirmItsVegan, setConfirmItsVegan] = useState(false);
	const [brandname, setBrandname] = useState(null);
	const [productName, setProductName] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [inputValue, setInputValue] = useState('');

	const handleItsVeganChange = (event) => {
		setConfirmItsVegan(event.target.checked);
	};

	let formRef = useRef();

	const handleNext = () => {
		if (!formRef.current.checkValidity()) {
			return;
		}
		if (activeStep === steps.length - 1) {
			onShowSnackbar({
				snackData: {
					type: 'success',
					title: 'Submission Received',
					message: 'Thank you for helping people find vegan products easier',
					emoji: '💪'
				}
			});
			console.log(
				`user $userId suggested to add 
			brand: "${brandname.name}", 
			product: "${productName.name}" 
			category: "${selectedCategory}" 
			on ${new Date()}`
			);
		}
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
		setConfirmItsVegan(false);
		setBrandname(null);
		setProductName(null);
		setSelectedCategory(null);
		setInputValue('');
	};

	const onClose = () => {
		setTimeout(() => {
			handleReset();
		}, theme.transitions.duration.leavingScreen);
		history.goBack();
	};

	const categoriesMapped = categories.map((category) => {
		return category.name;
	});

	const filter = createFilterOptions();

	function getSteps() {
		return [
			'Is the product you want to add vegan?',
			'Product Details',
			'Category',
			'Review & Confirm'
		];
	}

	function getStepContent(step) {
		switch (step) {
			case 0:
				return (
					<>
						<Typography paragraph>
							Vegan means it contains no animal ingredients (or ingredients derived from
							animals) and that the item was not tested on animals. Ingredients like
							honey, whey powder and fish stock are not vegan.
						</Typography>
						<Typography>Please tick the box to confirm:</Typography>
						<FormGroup row>
							<FormControlLabel
								control={
									<Checkbox
										checked={confirmItsVegan}
										onChange={handleItsVeganChange}
										color="primary"
										name="checked"
									/>
								}
								label="I confirm the product I want to add is vegan"
							/>
						</FormGroup>
					</>
				);
			case 1:
				return (
					<>
						<Typography paragraph>
							Please include details as they appear on the packaging.
						</Typography>
						<Box margin={1}>
							<Autocomplete
								value={brandname}
								onChange={(event, newValue) => {
									if (typeof newValue === 'string') {
										setBrandname({
											name: newValue
										});
									} else if (newValue && newValue.inputValue) {
										// Create a new value from the user input
										setBrandname({
											name: newValue.inputValue
										});
									} else {
										setBrandname(newValue);
									}
								}}
								filterOptions={(options, params) => {
									const filtered = filter(options, params);

									// Suggest the creation of a new value
									if (params.inputValue !== '') {
										filtered.push({
											inputValue: params.inputValue,
											name: `Add "${params.inputValue}"`
										});
									}

									return filtered;
								}}
								selectOnFocus
								clearOnBlur
								handleHomeEndKeys
								id="brandname"
								options={categories}
								getOptionLabel={(category) => {
									// Value selected with enter, right from the input
									if (typeof category === 'string') {
										return category;
									}
									// Add "xxx" option created dynamically
									if (category.inputValue) {
										return category.inputValue;
									}
									// Regular option
									return category.name;
								}}
								renderOption={(category) => category.name}
								style={{ width: 300 }}
								freeSolo
								renderInput={(params) => (
									<TextField {...params} label="Brand Name" variant="outlined" required />
								)}
							/>
						</Box>
						<Box marginY={2} marginX={1}>
							<Autocomplete
								value={productName}
								onChange={(event, newValue) => {
									if (typeof newValue === 'string') {
										setProductName({
											name: newValue
										});
									} else if (newValue && newValue.inputValue) {
										// Create a new value from the user input
										setProductName({
											name: newValue.inputValue
										});
									} else {
										setProductName(newValue);
									}
								}}
								filterOptions={(options, params) => {
									const filtered = filter(options, params);

									// Suggest the creation of a new value
									if (params.inputValue !== '') {
										filtered.push({
											inputValue: params.inputValue,
											name: `Add "${params.inputValue}"`
										});
									}

									return filtered;
								}}
								selectOnFocus
								clearOnBlur
								handleHomeEndKeys
								id="productName"
								options={categories}
								getOptionLabel={(product) => {
									// Value selected with enter, right from the input
									if (typeof product === 'string') {
										return product;
									}
									// Add "xxx" option created dynamically
									if (product.inputValue) {
										return product.inputValue;
									}
									// Regular option
									return product.name;
								}}
								renderOption={(product) => product.name}
								style={{ width: 300 }}
								freeSolo
								renderInput={(params) => (
									<TextField
										{...params}
										label="Product Name"
										variant="outlined"
										required
									/>
								)}
							/>
						</Box>
					</>
				);
			case 2:
				return (
					<>
						<Typography paragraph>Select the most appropriate category.</Typography>
						<Box margin={1}>
							<Autocomplete
								id="grouped-demo"
								value={selectedCategory}
								onChange={(event, chosenCategory) => setSelectedCategory(chosenCategory)}
								inputValue={inputValue}
								onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
								options={categoriesMapped}
								style={{ width: 300 }}
								renderInput={(params) => (
									<TextField {...params} label="Category" variant="outlined" required />
								)}
							/>
						</Box>
					</>
				);
			case 3:
				return (
					<>
						<Box>
							<Typography component="span" color="textSecondary">
								Brand name:{' '}
							</Typography>
							<Typography component="span" gutterBottom>
								{brandname && brandname.name}
							</Typography>
						</Box>
						<Box>
							<Typography component="span" color="textSecondary">
								Product name:{' '}
							</Typography>
							<Typography component="span" gutterBottom>
								{productName && productName.name}
							</Typography>
						</Box>
						<Box marginBottom={1}>
							<Typography component="span" color="textSecondary">
								Category:{' '}
							</Typography>
							<Typography component="span" gutterBottom>
								{selectedCategory && selectedCategory}
							</Typography>
						</Box>
						<Typography paragraph>
							If the above details are correct, click submit.
						</Typography>
					</>
				);
			default:
				return 'Unknown step';
		}
	}

	return (
		<Dialog
			open={Boolean(isOpened)}
			onClose={onClose}
			aria-labelledby="form-dialog-title"
			fullScreen={fullScreen}
			maxWidth="sm"
			fullWidth
			classes={{ paperFullWidth: styles.modalMaxHeight }}
		>
			<DialogTitle id="form-dialog-title" onClose={onClose}>
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
									<Box component="section">{getStepContent(index)}</Box>
									<div className={styles.actionsContainer}>
										<div>
											<Button
												disabled={activeStep === 0}
												onClick={handleBack}
												className={styles.button}
											>
												Back
											</Button>
											<Button
												variant="contained"
												color="primary"
												disabled={!confirmItsVegan}
												onClick={handleNext}
												className={styles.button}
											>
												{activeStep === steps.length - 1 ? 'Submit' : 'Next'}
											</Button>
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
						<Typography paragraph>
							Please note that for quality assurance we manually review all submissions
							before they appear on the Guide.
						</Typography>
						<Box display="flex" justifyContent="flex-end">
							<Button onClick={handleReset}>Add another product</Button>
						</Box>
					</Box>
				)}
			</DialogContent>
		</Dialog>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		onShowSnackbar: ({ snackData }) =>
			dispatch(actionCreators.showSnackbar({ snackData }))
	};
};

export default connect(null, mapDispatchToProps)(AddProducts);
