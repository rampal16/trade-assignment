import { useState, useContext } from 'react';
import { tradeColumns } from '../../utils/constants';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TradeModal from '../common/TradeModal';
import { AppContext } from '../../../test/store';
import type { TradeDetail } from '../../utils/types';

const Trades = () => {
  const [open, setOpen] = useState(false);
  const { appState, updateAppState } = useContext(AppContext);

  const rows = appState.trades;

  const onSubmit = (data: TradeDetail) => {
    setOpen(false);
    updateAppState({
      ...appState,
      trades: [...appState.trades, { id: appState.trades.length + 1, ...data }],
    });
  };

  return (
    <div>
      <Button size="small" onClick={() => setOpen(true)}>
        Add New Trade
      </Button>
      <TradeModal
        isOpen={open}
        handleClose={() => setOpen(false)}
        submit={onSubmit}
      />
      <div className="gridDetail">
        <DataGrid rows={rows} columns={tradeColumns} showToolbar />
      </div>
    </div>
  );
};

export default Trades;
