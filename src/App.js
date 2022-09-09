import './App.css';
import { default as Map } from "./Map.js";
import { default as List } from "./List.js";
import { Box, Typography } from "@mui/material";

function App() {

  return (
    <Box className="App">
      <header className="App-header">
        <Typography variant="h4" component="h1" gutterBottom> Nhan's FineAvoidanceSA2.0 </Typography>
        <Map />

        <List />

      </header>
    </Box >
  );
}

export default App;