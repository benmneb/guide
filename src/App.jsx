import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConfirmProvider } from 'material-ui-confirm';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { defaultOptions } from './assets/confirmProviderOptions';
import { theme } from './assets/theme';
import AppBar from './components/AppBar/AppBar';
import ResultsList from './components/ResultsList/ResultsList';
import Snackbars from './utils/Snackbars';
import Categories from './components/categories/Categories';
import PageNotFound from './components/categories/PageNotFound';
import GetParameterPopups from './utils/routing/getParamaterPopups';
import AuthSuccess from './components/Dialogs/AuthSuccess';
import LoadingBar from './utils/LoadingBar';
import SearchResultsList from './components/ResultsList/SearchResultsList';

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<ConfirmProvider defaultOptions={defaultOptions}>
				<CssBaseline />
				<LoadingBar />
				<AppBar>
					<Switch>
						<Route exact path="/">
							<Categories />
						</Route>
						<Route exact path="/auth/success">
							<AuthSuccess />
						</Route>
						<Route path="/search/:term">
							<SearchResultsList />
						</Route>
						<Route path="/:productType/:category">
							<ResultsList />
						</Route>
						<Route path="/:productType">
							<Categories />
						</Route>
						<Route>
							<PageNotFound />
						</Route>
					</Switch>
				</AppBar>
				<GetParameterPopups />
				<Snackbars />
			</ConfirmProvider>
		</ThemeProvider>
	);
}
