import React from 'react';
import Login from './Login';
import { TokenProvider } from './TokenContext';

function App() {
  return (
    <TokenProvider>
      <Login />
    </ TokenProvider >
  );
}

export default App;





