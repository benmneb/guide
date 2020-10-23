import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setConfirmItsVegan } from '../../store/actions';
import {
	Checkbox,
	FormControlLabel,
	FormGroup,
	Typography,
	Box
} from '@material-ui/core';
import AddProductsBrandname from './AddProductsBrandname';
import AddProductsProductname from './AddProductsProductname';
import AddProductsCategory from './AddProductsCategory';

export default function AddProductsSteps({ step }) {
	const dispatch = useDispatch();
	const confirmItsVegan = useSelector((state) => state.addProduct.confirmItsVegan);
	const brandName = useSelector((state) => state.addProduct.brandName);
	const productName = useSelector((state) => state.addProduct.productName);
	const selectedCategory = useSelector((state) => state.addProduct.selectedCategory);

	const handleItsVeganChange = (event) => {
		dispatch(setConfirmItsVegan(event.target.checked));
	};

	switch (step) {
		case 0:
			return (
				<>
					<Typography paragraph color="textSecondary">
						Vegan means it contains no animal/insect ingredients and that the item was not
						tested on animals. Ingredients like honey, shellac, gelatin and fish stock are
						not vegan.
					</Typography>
					<Typography color="textSecondary">Please tick the box to confirm:</Typography>
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
					<Typography paragraph color="textSecondary">
						Please include details as they appear on the packaging.
					</Typography>
					<Box margin={1}>
						<AddProductsBrandname />
					</Box>
					<Box marginY={2} marginX={1}>
						<AddProductsProductname />
					</Box>
				</>
			);
		case 2:
			return (
				<>
					<Typography paragraph color="textSecondary">
						Select the most appropriate category.
					</Typography>
					<Box margin={1}>
						<AddProductsCategory />
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
							{brandName && brandName.brand_name}
						</Typography>
					</Box>
					<Box>
						<Typography component="span" color="textSecondary">
							Product name:{' '}
						</Typography>
						<Typography component="span" gutterBottom>
							{productName && productName.product_name}
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
