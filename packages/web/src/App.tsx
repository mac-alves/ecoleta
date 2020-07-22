import React from 'react';
import './App.css';
import { Container } from './styles/global';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <Container>
      <Routes />
    </Container>
  );
}

export default App;
