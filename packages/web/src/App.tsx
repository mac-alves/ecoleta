import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global';
import initial from './styles/theme/inicial';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={initial}> 
      <GlobalStyle />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
