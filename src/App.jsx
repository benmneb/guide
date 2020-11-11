import { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConfirmProvider } from 'material-ui-confirm';
import { create } from 'jss';
import preset from 'jss-preset-default';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
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

const createGenerateClassName = () => {
	let counter = 0;
	return (rule, sheet) =>
		`c${
			Math.random().toString(36).substring(2, 4) +
			Math.random().toString(36).substring(2, 4)
		}-${rule.key}-${counter++}`;
};

const jss = create(preset());
jss.options.createGenerateClassName = createGenerateClassName;

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<ConfirmProvider defaultOptions={defaultOptions}>
				<StylesProvider jss={jss}>
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
				</StylesProvider>
			</ConfirmProvider>
		</ThemeProvider>
	);
}
