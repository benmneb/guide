import React, { useState } from 'react';
import classes from './ResultsInfo.module.css';

import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, FormControl, Select, ListSubheader } from '@material-ui/core';

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
	formControl: {
		margin: '0 4px'
	},
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
		<FormControl className={styles.formControl}>
			<Select
				value={category}
				onChange={handleChange}
				displayEmpty
				className={styles.selectEmpty}
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
		<div className={classes.container}>
			<span className={classes.content}>
				There are {category.products ? category.products : totalProducts} vegan products
				in {categorySelect} within {currentCountry}
			</span>
		</div>
	);
};

export default ResultsInfo;
