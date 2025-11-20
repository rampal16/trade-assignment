import { useState, useContext } from 'react';
import { type GridColDef, DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TradeModal from '../common/TradeModal';
import { AppContext } from '../../../test/store';
import type { TradeDetail } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import { CONFIRM_DELETE_MESSAGE, OperationType } from '../../utils/constants';
import AlertDialog from '../common/Alert';

const Trades = () => {
  const [open, setOpen] = useState(false);
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [currentTrade, setCurrentTrade] = useState({} as TradeDetail);
  const { appState, updateAppState } = useContext(AppContext);
  const navigate = useNavigate();

  const rows = appState.trades;

  const onSubmit = (operationType: OperationType, data: TradeDetail) => {
    setOpen(false);
    if (operationType === OperationType.UPDATE) {
      updateAppState({
        ...appState,
        trades: appState.trades.map((trade) =>
          trade.id === currentTrade.id ? { ...trade, ...data } : trade
        ),
      });
    } else {
      updateAppState({
        ...appState,
        trades: [
          ...appState.trades,
          { id: appState.trades.length + 1, ...data },
        ],
      });
    }
  };

  const tradeColumns: GridColDef<(typeof rows)[number]>[] = [
    { field: 'id', headerName: 'Id', width: 50 },
    { field: 'tradeId', headerName: 'Trade Id', width: 90 },
    {
      field: 'version',
      headerName: 'Version',
      width: 100,
      editable: true,
    },
    {
      field: 'counterPartyId',
      headerName: 'Counter Party Id',
      width: 100,
      editable: true,
    },
    {
      field: 'bookId',
      headerName: 'Book Id',
      width: 100,
      editable: true,
    },
    {
      field: 'muturityDate',
      headerName: 'Maturity Date',
      type: 'date',
      width: 120,
      editable: true,
    },
    {
      field: 'createdDate',
      headerName: 'Created Date',
      type: 'date',
      width: 120,
      editable: true,
    },
    {
      field: 'expired',
      headerName: 'Expired',
      width: 100,
      editable: true,
    },
    {
      field: 'viewAction',
      headerName: 'Actions',
      sortable: false,
      width: 400,
      renderCell: (params) => {
        const onView = () => {
          navigate(`/trade-assignment/trades/${params.id}`);
        };

        const onEdit = () => {
          setCurrentTrade(params.row);
          setOpen(true);
        };

        const onDelete = () => {
          setCurrentTrade(params.row);
          setAlertIsOpen(true);
        };

        return (
          <>
            <Button variant="text" onClick={onView}>
              View
            </Button>
            <Button variant="text" onClick={onEdit}>
              Edit
            </Button>
            <Button variant="text" onClick={onDelete}>
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const onAlertClose = (action: string) => {
    if (action === 'Ok') {
      updateAppState({
        ...appState,
        trades: appState.trades.filter((trade) => trade.id !== currentTrade.id),
      });
      setCurrentTrade({} as TradeDetail);
    }
    setAlertIsOpen(false);
  };

  return (
    <div>
      <h3>Trade List</h3>
      <Button
        size="small"
        onClick={() => {
          setCurrentTrade({} as TradeDetail);
          setOpen(true);
        }}
      >
        Add New Trade
      </Button>
      <TradeModal
        isOpen={open}
        handleClose={() => {
          setOpen(false);
          setCurrentTrade({} as TradeDetail);
        }}
        submit={onSubmit}
        trade={currentTrade}
      />
      <AlertDialog
        actions={['Ok', 'Cancel']}
        isOpen={alertIsOpen}
        content={CONFIRM_DELETE_MESSAGE}
        handleClose={onAlertClose}
      />
      <div className="gridDetail">
        <DataGrid rows={rows} columns={tradeColumns} showToolbar />
      </div>
    </div>
  );
};

export default Trades;
