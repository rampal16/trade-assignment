import { createContext } from 'react';
import type { IAppContext } from '../../src/utils/types';
import { tradeRows } from '../../src/utils/constants';

export const AppContext = createContext<IAppContext>({
  appState: { trades: tradeRows },
  updateAppState: () => {},
});
