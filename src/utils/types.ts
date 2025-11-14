interface TradeDetail {
  id?: number;
  tradeId: string;
  version: string;
  counterPartyId: string;
  bookId: string;
  muturityDate: Date | null;
  createdDate: Date | null;
  expired: string;
}

interface IAppState {
  trades: TradeDetail[];
}

interface IAppContext {
  appState: IAppState;
  updateAppState: (newData: IAppState) => void;
}

export type { IAppContext, IAppState, TradeDetail };
