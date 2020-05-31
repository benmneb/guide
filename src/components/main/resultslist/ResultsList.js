import React from 'react';
import './resultslist.css';
import Result from './Result'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const muiBaseTheme = createMuiTheme();

const ResultsList = () => {
  return (
    <div id='results-list'>
      <MuiThemeProvider
        theme={createMuiTheme({
          typography: {
            useNextVariants: true
          },
          overrides: Result.getTheme(muiBaseTheme)
        })}
      >
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
        <Result />
      </MuiThemeProvider>
    </div>
  )
}

export default ResultsList;
