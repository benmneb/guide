import React from 'react';
import AppBar from './components/AppBar/AppBar';
import Hero from './components/hero/Hero';
import FiltersBar from './components/AppBar/FiltersBar';
import ResultsList from './components/resultsList/ResultsList';
import FiltersPanel from './components/UI/FiltersPanel';
import ProductModal from './components/modals/ProductModal';
import BottomNav from './components/AppBar/BottomNav';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange, grey } from '@material-ui/core/colors';

const theme = createMuiTheme({
	palette: {
		primary: orange,
		secondary: {
			main: grey[500]
		}
	},
	typography: {
		h1: {
			fontSize: '3rem'
		},
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
					<Hero />
					<FiltersBar />
					<FiltersPanel />
					<ResultsList />
					<BottomNav />
				</AppBar>
				<ProductModal />
			</>
		</ThemeProvider>
	);
}
