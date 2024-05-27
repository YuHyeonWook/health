import { useState } from 'react';
import Home from '@/pages/Home';
import GlobalStyle from '@/styles/globalStyle';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <GlobalStyle />
      <Home />
    </>
  );
}

export default App;
