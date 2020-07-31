import React from 'react';
import NavBar from './components/navBar/NavBar';
import Hero from './components/hero/Hero';
import ControlResults from './components/controlResults/ControlResults';
import ResultsList from './components/resultsList/ResultsList';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

const theme = createMuiTheme({
	palette: {
		primary: orange
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

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<>
				<NavBar />
				<Hero />
				<ControlResults />
				<ResultsList />
			</>
		</ThemeProvider>
	);
};

export default App;
