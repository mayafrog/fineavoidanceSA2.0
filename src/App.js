import { MantineProvider } from '@mantine/core';
import { Navbar, TabContainer } from './containers';

export default function App() {
  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <Navbar></Navbar>
      <TabContainer></TabContainer>
    </MantineProvider>
  );
}