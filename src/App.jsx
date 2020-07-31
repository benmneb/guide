import React from 'react';
import NavBar from './components/navBar/NavBar';
import Hero from './components/hero/Hero';
import ControlResults from './components/controlResults/ControlResults';
import ResultsList from './components/resultsList/ResultsList';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange, deepOrange } from '@material-ui/core/colors';

const guideTheme = createMuiTheme({
	palette: {
		primary: orange
	},
	status: {
		danger: deepOrange
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
		<ThemeProvider theme={guideTheme}>
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
