import './App.css';
import React from 'react';
import { useState } from 'react';
import { default as Map } from "./Map.js";
import { default as List } from "./List.js";
import { Box, Tab, Typography } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab"

function App() {
  const [tab, settab] = React.useState('1');

  const handleTab = (event, newtab) => {
    settab(newtab);
  };

  return (
    <Box className="App">
      <Box className="App-header">
        <Typography variant="h4" component="h1" gutterBottom> Nhan's FineAvoidanceSA2.0 </Typography>

        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'white' }}>
            <TabList onChange={handleTab} textColor="white" indicatorColor='white'>
              <Tab label="Map" value="1" />
              <Tab label="List" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1"> <Map /> </TabPanel>
          <TabPanel value="2"> <List /> </TabPanel>
        </TabContext>

      </Box>
    </Box>
  );
}

export default App;