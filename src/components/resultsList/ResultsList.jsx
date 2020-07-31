import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import classes from './ResultsList.module.css';
import Result from './Result';

const muiBaseTheme = createMuiTheme();

const ResultsList = () => {
	return (
		<div className={classes.resultsList}>
			<MuiThemeProvider
				theme={createMuiTheme({
					typography: {
						useNextVariants: true
					},
					overrides: Result.getTheme(muiBaseTheme)
				})}
			>
				<Result
					image="https://picsum.photos/200/250"
					brand="Kraft"
					name="Peanut Butter - Crunchy"
				/>
				<Result />
				<Result />
				<Result />
				<Result />
				<Result />
				<Result />
				<Result />
				<Result />
				<Result />
				<Result />
				<Result />
			</MuiThemeProvider>
		</div>
	);
};

export default ResultsList;
