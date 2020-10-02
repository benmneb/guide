import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

export const theme = responsiveFontSizes(
	createMuiTheme({
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
			},
			hero: {
				height: 375,
				'@media (min-width: 600px)': {
					height: 350
				}
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
			},
			MuiCssBaseline: {
				'@global': {
					html: {
						backgroundColor: '#fff'
					}
				}
			}
		},
		props: {
			MuiButton: {
				disableElevation: true
			}
		}
	})
);
