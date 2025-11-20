import { useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { TradeDetail } from '../../utils/types';
import { TRADE_DEFAULT_VALUES, OperationType } from '../../utils/constants';
import { resetHours } from '../../utils/helper';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface TradeModalProps {
  trade?: TradeDetail;
  isOpen: boolean;
  handleClose?: () => void;
  submit: (operationType: OperationType, data: TradeDetail) => void;
}

const tradeModelSchema = yup.object({
  tradeId: yup.string().required('TradeId is required.'),
  version: yup.string().required('Version is required.'),
  counterPartyId: yup.string().required('CounterPartyId is required.'),
  bookId: yup.string().required('BookId is required.'),
  muturityDate: yup
    .date()
    .nullable()
    .default(null)
    .min(
      resetHours(new Date()),
      'Maturity Date cannot be earlier than current date.'
    )
    .test('muturityDate', 'Muturity Date is required.', (value) => {
      if (!value) return false;

      return true;
    }),
  createdDate: yup
    .date()
    .nullable()
    .default(null)
    .test('createdDate', 'Created Date is required.', (value) => {
      if (!value) return false;

      return true;
    }),
  expired: yup.string().required('Expired is required.'),
});

const TradeModal = ({
  trade,
  isOpen,
  handleClose,
  submit,
}: TradeModalProps) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: TRADE_DEFAULT_VALUES,
    resolver: yupResolver(tradeModelSchema),
  });

  useEffect(() => {
    if (trade) reset(trade);
  }, [trade, reset]);

  const onSubmit = (data: TradeDetail) => {
    reset(TRADE_DEFAULT_VALUES);
    if (trade && trade.id) {
      submit(OperationType.UPDATE, data);
    } else {
      submit(OperationType.ADD, data);
    }
  };

  const onHandleClose = () => {
    reset(TRADE_DEFAULT_VALUES);
    if (handleClose) handleClose();
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                maxWidth: 400,
                margin: 'auto',
              }}
            >
              <Controller
                name="tradeId"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Trade Id"
                    size="small"
                    variant="outlined"
                    error={!!errors.tradeId}
                    helperText={errors.tradeId?.message}
                  />
                )}
              />

              <Controller
                name="version"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Version"
                    size="small"
                    variant="outlined"
                    error={!!errors.version}
                    helperText={errors.version?.message}
                  />
                )}
              />

              <Controller
                name="counterPartyId"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="CounterParty Id"
                    size="small"
                    variant="outlined"
                    error={!!errors.counterPartyId}
                    helperText={errors.counterPartyId?.message}
                  />
                )}
              />

              <Controller
                name="bookId"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Book Id"
                    size="small"
                    variant="outlined"
                    error={!!errors.bookId}
                    helperText={errors.bookId?.message}
                  />
                )}
              />

              <Controller
                name="muturityDate"
                defaultValue={null}
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Muturity Date"
                    data-testid="date-picker-muturity-date"
                    value={field.value ? dayjs(field.value) : null} // Convert to dayjs object for DatePicker
                    onChange={(newValue) =>
                      field.onChange(newValue ? newValue.toDate() : null)
                    } // Convert back to Date object for form data
                    slotProps={{
                      textField: {
                        variant: 'outlined',
                        size: 'small',
                        error: !!errors.muturityDate,
                        helperText: errors.muturityDate?.message,
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="createdDate"
                defaultValue={null}
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Created Date"
                    data-testid="date-picker-created-date"
                    value={field.value ? dayjs(field.value) : null} // Convert to dayjs object for DatePicker
                    onChange={(newValue) =>
                      field.onChange(newValue ? newValue.toDate() : null)
                    } // Convert back to Date object for form data
                    slotProps={{
                      textField: {
                        variant: 'outlined',
                        size: 'small',
                        error: !!errors.createdDate,
                        helperText: errors.createdDate?.message,
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="expired"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Expired"
                    size="small"
                    variant="outlined"
                    error={!!errors.expired}
                    helperText={errors.expired?.message}
                  />
                )}
              />

              <Button type="submit" variant="contained">
                {trade?.id ? 'Update' : 'Save'}
              </Button>
            </Box>
          </LocalizationProvider>
        </Box>
      </Modal>
    </div>
  );
};

export default TradeModal;
