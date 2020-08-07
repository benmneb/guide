import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	MenuItem,
	FormControl,
	Select,
	ListSubheader,
	Typography,
	Grid,
	Box
} from '@material-ui/core';

const totalProducts = '11,587';
const currentCountry = 'Australia';

const categories = [
	{ name: 'Baby', products: 112, disabled: true },
	{ name: 'Baby Food', products: 12, disabled: false },
	{ name: 'Baby Formulas', products: 54, disabled: false },
	{ name: 'Baby Snacks', products: 42, disabled: false },
	{ name: 'Bakery', products: 243, disabled: true },
	{ name: 'Bread', products: 67, disabled: false },
	{ name: 'Wraps, Flatbread & Taco-Shells', products: 8, disabled: false }
	// 'Cakes',
	// 'Crumpets & Muffins',
	// 'Pizza Bases',
	// 'Rolls & Bagels',
	// 'Soft Drinks',
	// 'Juices',
	// 'Cordials',
	// 'Iced Teas',
	// 'Sports Drinks',
	// 'Energy Drinks',
	// 'Plant Milks',
	// 'Flavoured & Coconut Water',
	// 'Non-Alcoholic',
	// 'Plant Cheese',
	// 'Plant Yogurt',
	// 'Plant Eggs',
	// 'Mock-Meats',
	// 'Tofu & Tempeh',
	// 'Chips, Hashbrowns, Wedges',
	// 'Creams, Custard, Desserts',
	// 'Butter & Margarine',
	// 'Dips, Salsa & Paste',
	// 'Chilled Ready-Meals',
	// 'Fresh Pasta & Noodles',
	// 'Ice Cream & Frozen Desserts',
	// 'Frozen Vegetables',
	// 'Frozen Fruit & Berries',
	// 'Pastries, Pies & Snacks',
	// 'Veggie Patties & Falafels',
	// 'Snacks & Confectionery',
	// 'Breakfast & Spreads',
	// 'Herbs & Spices',
	// 'Baking',
	// 'Condiments',
	// 'Canned & Long Life Food',
	// 'Pasta, Rice, Grains',
	// 'Cooking Sauces & Oils',
	// 'Sweets & Dessert',
	// 'Tea, Coffee, Cocoa',
	// 'Meat Replacements',
	// 'Meal Kits',
	// 'Simmer Sauce & Recipe Bases',
	// 'Cat & Kitten',
	// 'Dog & Puppy',
	// 'Baby',
	// 'Dental Care',
	// 'Hair Care',
	// 'Shower & Bath',
	// 'Skin Care',
	// 'Medicinal & First Aid',
	// 'Kitchen',
	// 'Bathroom',
	// 'Laundry',
	// 'Furniture Care',
	// 'Eyes & Brows',
	// 'Face',
	// 'Lips',
	// 'Nails',
	// 'Remover & Wipes',
	// 'Tools & Accessories',
	// 'Feminine Care',
	// 'Lubricants',
	// 'Contraception',
	// 'Deoderants & Perfumes',
	// 'Pest Control'
];

const useStyles = makeStyles((theme) => ({
	pointer: {
		cursor: 'pointer'
	}
}));

const ResultsInfo = () => {
	const styles = useStyles();
	const [category, setCategory] = useState('');

	const handleChange = (event) => {
		setCategory(event.target.value);
	};

	const categorySelect = (
		<FormControl component="span">
			<Select
				value={category}
				onChange={handleChange}
				displayEmpty
				inputProps={{ 'aria-label': 'Select category' }}
			>
				<MenuItem value="">All categories</MenuItem>
				{categories.map((cat) =>
					cat.disabled ? (
						<ListSubheader value={cat} key={cat.name} className={styles.pointer}>
							{cat.name}
						</ListSubheader>
					) : (
						<MenuItem value={cat} key={cat.name}>
							{cat.name}
						</MenuItem>
					)
				)}
			</Select>
		</FormControl>
	);

	return (
		<Box flex="0 1 auto">
			<Box display={{ xs: 'flex', sm: 'none' }}>
				<Grid container component="span" justify="center" spacing={1} alignItems="center">
					<Grid item>{categorySelect}</Grid>
				</Grid>
			</Box>
			<Box display={{ xs: 'none', sm: 'flex', md: 'none' }}>
				<Grid container component="span" justify="center" spacing={1} alignItems="center">
					<Grid item>
						<Typography component="span">
							{category.products ? category.products : totalProducts} results in
						</Typography>
					</Grid>
					<Grid item>{categorySelect}</Grid>
				</Grid>
			</Box>
			<Box display={{ xs: 'none', md: 'flex' }}>
				<Grid container component="span" justify="center" spacing={1} alignItems="center">
					<Grid item>
						<Typography component="span">
							There are {category.products ? category.products : totalProducts} vegan
							products in
						</Typography>
					</Grid>
					<Grid item>{categorySelect}</Grid>
					<Grid item>
						<Typography component="span">within {currentCountry}</Typography>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default ResultsInfo;
