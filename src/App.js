import { useEffect } from 'react';
import Home from './pages/Home.js';

import './App.css';

function App() {
  useEffect(() => {
    document.title = 'Home | Doloria';
  });

  return <Home />;
}

export default App;
