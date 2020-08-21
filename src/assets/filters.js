export const tags = [
	{ name: '🌱 Vegan Brands', tooltip: 'Show only products from vegan brands' },
	{ name: '📍 Local Brands', tooltip: 'Show only brands owned in your country' },
	{ name: '👩‍🦰 For Women', tooltip: 'Only applies to household items, not food / drink' },
	{ name: '👨 For Men', tooltip: 'Only applies to household items, not food / drink' }
];

export const ingredients = [
	{ name: '🛢 No Oil', tooltip: "Ingredients list does not contain 'oil'" },
	{ name: '🦷 No Added Sugar', tooltip: "Ingredients list does not contain 'sugar'" },
	{ name: '🧂 No Salt', tooltip: "Ingredients list does not contain 'salt' or 'sodium'" },
	{ name: '🍃 Organic', tooltip: "At least one ingredient is labelled as 'organic'" }
];

export const allergens = [
	{ name: '🍞 Gluten Free', tooltip: "Ingredients list does not contain 'gluten' etc" },
	{ name: '🌾 Wheat Free', tooltip: "Ingredients list does not contain 'wheat' etc" },
	{ name: '🥜 Peanut Free', tooltip: "Ingredients list does not contain 'peanuts' etc" },
	{
		name: '🌰 Tree-Nut Free',
		tooltip: "Ingredients list does not contain 'tree nuts' etc"
	},
	{ name: '🤢 Lupin Free', tooltip: "Ingredients list does not contain 'lupin' etc" },
	{ name: '🤮 Soy Free', tooltip: "Ingredients list does not contain 'soy' etc" },
	{ name: '🤒 Sesame Free', tooltip: "Ingredients list does not contain 'sesame' etc" },
	{ name: '🥴 Mustard Free', tooltip: "Ingredients list does not contain 'mustard' etc" },
	{ name: '😵 Alcohol Free', tooltip: "Ingredients list does not contain 'alcohol' etc" },
	{
		name: '😟 Phthalate Free',
		tooltip: "Ingredients list does not contain 'phthalate' etc"
	},
	{ name: '😳 Paraben Free', tooltip: "Ingredients list does not contain 'paraben' etc" },
	{
		name: '🤕 SLS/SLES Free',
		tooltip: "Ingredients list does not contain 'sodium laurel sulphate' etc"
	}
];

export const sortBy = [
	{
		name: '🔥 Popularity',
		tooltip: 'A combination of reviews, ratings and views (default)'
	},
	{ name: '🔤 Alphabetical', tooltip: 'Uses the product name' },
	{ name: '🏅 Rating', tooltip: 'Uses the average rating' }
];

export const orderBy = [
	{ name: '↑ Ascending', tooltip: 'Lowest first' },
	{ name: '↓ Descending', tooltip: 'Highest first (default)' }
];
