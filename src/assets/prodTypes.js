export const prodType = {
	// might not need name and URL here, could be hardcoded
	name: 'Food & Drink',
	url: 'food-drink',
	// these could be done in a cron-job and then wont be needed here?
	totalProducts: 5147,
	totalCategories: 103,
	totalBrands: 285,
	categories: [
		{
			id: 1,
			name: 'Pantry',
			image: 'src.jpg',
			url: 'pantry',
			subCat1s: [
				{
					id: 1,
					name: 'Snacks & Confectionary',
					image: 'src.jpg',
					url: 'snacks-confectionary'
				},
				{
					id: 2,
					name: 'Breakfast & Spreads',
					image: 'src.jpg',
					url: 'breakfast-spreads'
				},
				{
					id: 3,
					name: 'Etc etc',
					image: 'src.jpg',
					url: 'etc-etc'
				}
			]
		},
		{
			id: 2,
			name: 'Fridge & Freezer',
			image: 'src.jpg',
			url: 'fridge-freezer',
			subCat1s: [
				{
					id: 1,
					name: 'Chilled Pasta Sauces',
					image: 'src.jpg',
					url: 'chilled-pasta-sauces'
				},
				{
					id: 2,
					name: 'Frozen Desserts',
					image: 'src.jpg',
					url: 'frozen-desserts'
				},
				{
					id: 3,
					name: 'Etc etc',
					image: 'src.jpg',
					url: 'etc-etc'
				}
			]
		},
		{
			id: 3,
			name: 'Drinks',
			image: 'src.jpg',
			url: 'drinks',
			subCat1s: [
				{
					id: 1,
					name: 'Energy Drinks',
					image: 'src.jpg',
					url: 'energy-drinks'
				},
				{
					id: 2,
					name: 'Plant Milks',
					image: 'src.jpg',
					url: 'plant-milks'
				},
				{
					id: 3,
					name: 'Etc etc',
					image: 'src.jpg',
					url: 'etc-etc'
				}
			]
		},
		{
			id: 4,
			name: 'Bakery',
			image: 'src.jpg',
			url: 'bakery',
			subCat1s: [
				{
					id: 1,
					name: 'Energy Drinks',
					image: 'src.jpg',
					url: 'energy-drinks'
				},
				{
					id: 2,
					name: 'Plant Milks',
					image: 'src.jpg',
					url: 'plant-milks'
				},
				{
					id: 3,
					name: 'Etc etc',
					image: 'src.jpg',
					url: 'etc-etc'
				}
			]
		},
		{
			id: 5,
			name: 'Baby',
			image: 'src.jpg',
			url: 'baby',
			subCat1s: [
				{
					id: 1,
					name: 'Energy Drinks',
					image: 'src.jpg',
					url: 'energy-drinks'
				},
				{
					id: 2,
					name: 'Plant Milks',
					image: 'src.jpg',
					url: 'plant-milks'
				},
				{
					id: 3,
					name: 'Etc etc',
					image: 'src.jpg',
					url: 'etc-etc'
				}
			]
		},
		{
			id: 6,
			name: 'Pet Food',
			image: 'src.jpg',
			url: 'pet-food',
			subCat1s: [
				{
					id: 1,
					name: 'Energy Drinks',
					image: 'src.jpg',
					url: 'energy-drinks'
				},
				{
					id: 2,
					name: 'Plant Milks',
					image: 'src.jpg',
					url: 'plant-milks'
				},
				{
					id: 3,
					name: 'Etc etc',
					image: 'src.jpg',
					url: 'etc-etc'
				}
			]
		}
	]
};
