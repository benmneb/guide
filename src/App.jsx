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
import AddProducts from './components/Dialogs/AddProducts';
import Advertise from './components/Dialogs/Advertise';
import Privacy from './components/Dialogs/Privacy';
import Terms from './components/Dialogs/Terms';
import Feedback from './components/Dialogs/Feedback';
import Snackbars from './components/Dialogs/Snackbars';
import Auth from './components/Dialogs/Auth';
import UserProfile from './components/Dialogs/UserProfile';
import Categories from './components/categories/Categories';

let theme = createMuiTheme({
	palette: {
		primary: orange
	},
	mixins: {
		filtersPanel: {
			width: 395,
			'@media (max-width: 600px)': {
				width: '100vw'
			}
		},
		sideMenu: {
			width: 240
		}
	},
	typography: {
		button: {
			textTransform: 'none'
		}
	},
	overrides: {
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
						<Route exact path="/" component={Categories} />
						<Route exact path="/food-drink" component={Categories} />
						<Route exact path="/household" component={Categories} />
						<Route exact path="/:productType/:category" component={ResultsList} />
					</Switch>
				</AppBar>
				<ProductModal />
				<AddProducts />
				<Advertise />
				<Feedback />
				<Privacy />
				<Terms />
				<Auth />
				<UserProfile />
				<Snackbars />
			</>
		</ThemeProvider>
	);
}
