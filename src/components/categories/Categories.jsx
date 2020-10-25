import { useState, useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Home from './Home';
import BottomNav from './BottomNav';
import ScrollToTopOnMount from '../../utils/ScrollToTop';
import CategoriesSkeleton from './CategoriesSkeleton';
const FoodDrink = lazy(() => import('./FoodDrink'));
const Household = lazy(() => import('./Household'));

export default function Categories() {
	const location = useLocation();
	const [currentTab, setCurrentTab] = useState(0);
	const [category, setCategory] = useState(<Home />);

	const handleChangeCurrentTab = (event, newValue) => {
		setCurrentTab(newValue);
	};

	useEffect(() => {
		switch (location.pathname) {
			case '/':
				setCurrentTab(0);
				setCategory(<Home />);
				break;
			case '/food-drink':
				setCurrentTab(1);
				setCategory(<FoodDrink />);
				break;
			case '/household':
				setCurrentTab(2);
				setCategory(<Household />);
				break;
			default:
				return;
		}
	}, [location]);

	return (
		<>
			<ScrollToTopOnMount />
			<Suspense fallback={<CategoriesSkeleton />}>{category}</Suspense>
			<BottomNav currentTab={currentTab} onChange={handleChangeCurrentTab} />
		</>
	);
}
