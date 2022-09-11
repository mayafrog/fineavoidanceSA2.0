import './App.css';
import React from 'react';
import { Navbar, TabContainer } from './containers';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Navbar />

      <TabContainer />

    </ThemeProvider>
  );
}

export default App;