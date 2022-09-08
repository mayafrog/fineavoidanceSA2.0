import './App.css';
import { default as Map } from "./Map.js";
import { default as List } from "./List.js";
import { Box } from "@mui/material";

function App() {

  return (
    <Box className="App">
      <header className="App-header">
        <h4> Nhan's FineAvoidanceSA2.0 </h4>
        <Map />

        <List />

      </header>
    </Box >
  );
}

export default App;