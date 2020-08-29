import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
	createMuiTheme,
	responsiveFontSizes,
	ThemeProvider
} from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from './components/AppBar/AppBar';
import ResultsList from './components/ResultsList/ResultsList';
import ProductModal from './components/ProductModal/ProductModal';
import Home from './components/categories/Home';
import FoodDrink from './components/categories/FoodDrink';
import AddProducts from './components/Dialogs/AddProducts';
import Advertise from './components/Dialogs/Advertise';
import Privacy from './components/Dialogs/Privacy';
import Terms from './components/Dialogs/Terms';
import Feedback from './components/Dialogs/Feedback';
import Snackbars from './components/Dialogs/Snackbars';
import Auth from './components/Dialogs/Auth';

let theme = createMuiTheme({
	palette: {
		primary: orange
	},
	typography: {
		button: {
			textTransform: 'none'
		}
	},
	overrides: {
		MuiCssBaseline: {
			'@global': {
				html: {
					WebkitFontSmoothing: 'auto'
				}
			}
		},
		MuiButton: {
			containedPrimary: {
				color: 'white'
			}
		}
	},
	props: {
		MuiButton: {
			disableElevation: true
		}
	}
});

theme = responsiveFontSizes(theme);

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<>
				<CssBaseline />
				<AppBar>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/:productType/:category" component={ResultsList} />
						<Route path="/:productType" component={FoodDrink} />
					</Switch>
				</AppBar>
				<ProductModal />
				<AddProducts />
				<Advertise />
				<Feedback />
				<Privacy />
				<Terms />
				<Auth />
				<Snackbars />
			</>
		</ThemeProvider>
	);
}
