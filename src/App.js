import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useState } from 'react';
import { ColourButton } from './components';
import { Navbar, TabContainer } from './containers';

export default function App() {
  const [colorScheme, setColorScheme] = useState('dark');
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <Navbar></Navbar>
        <ColourButton></ColourButton>
        <TabContainer></TabContainer>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}