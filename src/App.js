import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbar/NavBar';
import Main from './components/main/Main'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import deepOrange from '@material-ui/core/colors/deepOrange';

const guideTheme = createMuiTheme({
  palette: {
    primary: orange,
  },
  status: {
    danger: deepOrange,
  },
  typography: {
    button: {
      textTransform: 'capitalize',
    }
  },
  overrides: {
  MuiButton: {
    containedPrimary: {
      color: 'white',
    },
  },
}
});

class App extends Component {
  render () {
    return (
      <ThemeProvider theme={guideTheme}>
        <div className="App">
          <NavBar />
          <Main />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
