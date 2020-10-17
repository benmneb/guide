import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConfirmProvider } from 'material-ui-confirm';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { defaultOptions } from './assets/confirmProviderOptions';
import { theme } from './assets/theme';
import AppBar from './components/AppBar/AppBar';
import Snackbars from './utils/Snackbars';
import Categories from './components/categories/Categories';
import PageNotFound from './components/categories/PageNotFound';
import AuthSuccess from './components/Dialogs/AuthSuccess';
import LoadingBar from './utils/LoadingBar';
import ResultsListSkeleton from './components/ResultsList/ResultsListSkeleton';
const ResultsList = lazy(() => import('./components/ResultsList/ResultsList'));
const GetParameterPopups = lazy(() => import('./utils/routing/getParamaterPopups'));
const SearchResultsList = lazy(() =>
	import('./components/ResultsList/SearchResultsList')
);

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
							<Suspense fallback={<ResultsListSkeleton />}>
								<SearchResultsList />
							</Suspense>
						</Route>
						<Route path="/:productType/:category">
							<Suspense fallback={<ResultsListSkeleton />}>
								<ResultsList />
							</Suspense>
						</Route>
						<Route path="/:productType">
							<Categories />
						</Route>
						<Route>
							<PageNotFound />
						</Route>
					</Switch>
				</AppBar>
				<Suspense fallback={null}>
					<GetParameterPopups />
				</Suspense>
				<Snackbars />
			</ConfirmProvider>
		</ThemeProvider>
	);
}
