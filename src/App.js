import './App.css';
import React from 'react';
import { useState } from 'react';
import { Map, List, HistoricalList } from './components'
import { Navbar } from './containers';
import { Box, Tab, Typography } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [currentTab, setCurrentTab] = useState('1');

  const handleTab = (event, newTab) => {
    setCurrentTab(newTab);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Navbar />

      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'white' }}>
          <TabList onChange={handleTab} textColor="inherit" indicatorColor='white'>
            <Tab label="Map" value="1" />
            <Tab label="Current Data" value="2" />
            <Tab label="Historical Data" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1"> <Map /> </TabPanel>
        <TabPanel value="2"> <List /> </TabPanel>
        <TabPanel value="3"> <HistoricalList /> </TabPanel>
      </TabContext>

    </ThemeProvider>
  );
}

export default App;