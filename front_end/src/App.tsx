import React from 'react';
import { DAppProvider, Kovan, Config } from '@usedapp/core';
import { Header } from './components/Header'
import { Container } from '@material-ui/core';
import { Main } from './components/Main';

function App() {
  // Blockchain network configuration
  const config: Config = {
      networks: [Kovan],
      notifications: {
        expirationPeriod: 1000,
        checkInterval: 100,
      }
  }
  return (
    // DappProvider importing the network and calling components into the DappProvider
    <DAppProvider config={config}>
      <Header />
      <Container maxWidth="md">
        <Main/>
      </Container>
    </DAppProvider>
  );
}

export default App;
