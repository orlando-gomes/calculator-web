import * as React from 'react';
import Calculator from './pages/Calculator';

import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <Calculator />
      <GlobalStyle />
    </>
  );
};

export default App;
