import { fridgeFreezer, pantry, bakery, drinks, baby, petFood } from './foodDrink';
import { bathBody, makeup, householdCleaning, personalCare, other } from './household';
import {
	snacksConfectionery,
	mockMeats,
	breakfastSpreads,
	condiments,
	plantMilks,
	sweetsDesserts,
	skinCare,
	hairCare,
	deodorantsPerfume,
	faceMakeup,
	showerBath,
	eyesBrowsMakeup,
	dentalCare,
	lipCosmetics
} from './home';

export { categories } from './categoriesAZ';

export const foodDrinkCats = [fridgeFreezer, pantry, bakery, drinks, baby, petFood];
export const householdCats = [bathBody, makeup, householdCleaning, personalCare, other];

export const homeCats = [
	// subCat2s
	snacksConfectionery,
	skinCare,
	mockMeats,
	hairCare,
	breakfastSpreads,
	deodorantsPerfume,
	condiments,
	faceMakeup,
	plantMilks,
	showerBath,
	sweetsDesserts,
	eyesBrowsMakeup,
	dentalCare,
	lipCosmetics,
	// subCat1s
	fridgeFreezer,
	bathBody,
	pantry,
	makeup,
	bakery,
	householdCleaning,
	drinks,
	personalCare,
	baby,
	petFood
];
