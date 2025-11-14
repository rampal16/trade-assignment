import { formateDate } from './helper';
import { type GridColDef } from '@mui/x-data-grid';
import type { TradeDetail } from './types';

export const tradeColumns: GridColDef<(typeof tradeRows)[number]>[] = [
  { field: 'id', headerName: 'Id', width: 50 },
  { field: 'tradeId', headerName: 'Trade Id', width: 90 },
  {
    field: 'version',
    headerName: 'Version',
    width: 150,
    editable: true,
  },
  {
    field: 'counterPartyId',
    headerName: 'Counter Party Id',
    width: 150,
    editable: true,
  },
  {
    field: 'bookId',
    headerName: 'Book Id',
    width: 110,
    editable: true,
  },
  {
    field: 'muturityDate',
    headerName: 'Maturity Date',
    type: 'date',
    width: 160,
    editable: true,
  },
  {
    field: 'createdDate',
    headerName: 'Created Date',
    type: 'date',
    width: 160,
    editable: true,
  },
  {
    field: 'expired',
    headerName: 'Expired',
    width: 160,
    editable: true,
  },
];

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
