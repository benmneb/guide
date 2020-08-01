import React from 'react';
import NavBar from './components/navBar/NavBar';
import Hero from './components/hero/Hero';
import ControlResults from './components/controlResults/ControlResults';
import ResultsList from './components/resultsList/ResultsList';
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
