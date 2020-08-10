import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange, grey } from '@material-ui/core/colors';
import AppBar from './components/AppBar/AppBar';
import ResultsList from './components/resultsList/ResultsList';
import FiltersPanel from './components/UI/FiltersPanel';
import ProductModal from './components/modals/ProductModal';
import BottomNav from './components/AppBar/BottomNav';
import SubCat1s from './components/categories/SubCat1s';
import FoodDrink from './components/categories/FoodDrink';

const theme = createMuiTheme({
	palette: {
		primary: orange,
		secondary: {
			main: grey[500]
		}
	},
	typography: {
		button: {
			textTransform: 'capitalize'
		}
	},
	overrides: {
		MuiButton: {
			containedPrimary: {
				color: 'white'
			}
		}
	}
});

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<>
				<AppBar>
					<Switch>
						<Route path="/food-drink/nut-butters-spreads" component={ResultsList} />
						<Route path="/food-drink" component={FoodDrink} />
						<Route path="/" component={SubCat1s} />
					</Switch>
				</AppBar>
				<FiltersPanel />
				<ProductModal />
				<BottomNav />
			</>
		</ThemeProvider>
	);
}
