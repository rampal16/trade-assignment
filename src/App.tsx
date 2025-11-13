import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/common/Header';
import Trade from './components/container/Trade';
import About from './components/common/About';
import Dashboard from './components/common/Dashboard';

import './App.css';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/trade-assignment/" element={<Dashboard />} />
          <Route path="/trade-assignment/trades" element={<Trade />} />
          <Route path="/trade-assignment/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
