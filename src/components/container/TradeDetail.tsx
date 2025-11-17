import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../../test/store';

const TradeDetail = () => {
  const { id } = useParams();
  const { appState } = useContext(AppContext);
  const { trades } = appState;

  const trade = trades.find((t) => t.id === Number(id));

  return (
    <div>
      <h3>Detail Page for ID: {id}</h3>
      {trade ? (
        <div>
          <p>Trade ID: {trade.tradeId}</p>
          <p>Version: {trade.version}</p>
          <p>Counter Party ID: {trade.counterPartyId}</p>
          <p>Book ID: {trade.bookId}</p>
          <p>Maturity Date: {trade?.muturityDate?.toDateString()}</p>
          <p>Created Date: {trade?.createdDate?.toDateString()}</p>
          <p>Expired: {trade.expired}</p>
        </div>
      ) : (
        <p>Trade not found.</p>
      )}
    </div>
  );
};

export default TradeDetail;
