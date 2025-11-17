import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Trades from './components/container/Trades';
import About from './components/common/About';
import Dashboard from './components/common/Dashboard';
import { AppContext } from '../test/store';
import { tradeRows } from './utils/constants';

import './App.css';
import type { IAppContext, IAppState } from './utils/types';
import TradeDetail from './components/container/TradeDetail';

const App = () => {
  const [appState, setAppState] = useState<IAppState>({ trades: tradeRows });

  const updateAppStateHandler = (updatedState: IAppState) => {
    setAppState({
      ...appState,
      ...updatedState,
    });
  };

  const contextValue: IAppContext = {
    appState,
    updateAppState: updateAppStateHandler,
  };

  return (
    <>
      <BrowserRouter>
        <AppContext.Provider value={contextValue}>
          <Header />
          <Routes>
            <Route path="/trade-assignment/" element={<Dashboard />} />
            <Route path="/trade-assignment/trades" element={<Trades />} />
            <Route
              path="/trade-assignment/trades/:id"
              element={<TradeDetail />}
            />
            <Route path="/trade-assignment/about" element={<About />} />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
