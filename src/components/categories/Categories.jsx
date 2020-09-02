import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Home from './Home';
import ProductType from './ProductType';
import BottomNav from './BottomNav';

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
				setCategory(<ProductType />);
				break;
			case '/household':
				setCurrentTab(2);
				setCategory(<ProductType />);
				break;
			default:
				return;
		}
	}, [location]);

	return (
		<>
			{category}
			<BottomNav currentTab={currentTab} onChange={handleChangeCurrentTab} />
		</>
	);
}
