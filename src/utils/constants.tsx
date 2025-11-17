import { formateDate } from './helper';
import type { TradeDetail } from './types';

export const tradeRows: TradeDetail[] = [
  {
    id: 1,
    tradeId: 'T1',
    version: '1',
    counterPartyId: 'CP-1',
    bookId: 'B1',
    muturityDate: new Date('2021-05-20'),
    createdDate: new Date(formateDate()),
    expired: 'N',
  },
  {
    id: 2,
    tradeId: 'T2',
    version: '2',
    counterPartyId: 'CP-2',
    bookId: 'B1',
    muturityDate: new Date('2021-05-20'),
    createdDate: new Date(formateDate()),
    expired: 'N',
  },
  {
    id: 3,
    tradeId: 'T2',
    version: '1',
    counterPartyId: 'CP-1',
    bookId: 'B1',
    muturityDate: new Date('2021-05-20'),
    createdDate: new Date('2015-03-14'),
    expired: 'N',
  },
  {
    id: 4,
    tradeId: 'T3',
    version: '3',
    counterPartyId: 'CP-3',
    bookId: 'B2',
    muturityDate: new Date('2014-05-20'),
    createdDate: new Date(formateDate()),
    expired: 'Y',
  },
];

export const TRADE_DEFAULT_VALUES: TradeDetail = {
  tradeId: '',
  version: '',
  counterPartyId: '',
  bookId: '',
  muturityDate: null,
  createdDate: null,
  expired: '',
};

export enum OperationType {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
}

export const CONFIRM_DELETE_MESSAGE =
  'Are you sure you want to delete this trade?';
