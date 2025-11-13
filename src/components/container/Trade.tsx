import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

const Trade = () => {
  const VISIBLE_FIELDS = [
    'name',
    'rating',
    'country',
    'dateCreated',
    'isAdmin',
  ];
  const { data, loading } = useDemoData({
    dataSet: 'Employee',
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });
  return (
    <div>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid {...data} loading={loading} showToolbar />
      </div>
    </div>
  );
};

export default Trade;
