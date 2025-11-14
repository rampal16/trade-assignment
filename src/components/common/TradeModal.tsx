import Modal from '@mui/material/Modal';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import type { TradeDetail } from '../../utils/types';

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
  isOpen: boolean;
  handleClose?: () => void;
  submit: (data: TradeDetail) => void;
}

const TradeModal = ({ isOpen, handleClose, submit }: TradeModalProps) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tradeId: '',
      version: '',
      counterPartyId: '',
      bookId: '',
      muturityDate: null,
      createdDate: null,
      expired: '',
    },
  });

  const onSubmit = (data: TradeDetail) => {
    reset();
    submit(data);
  };
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
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
                control={control}
                rules={{ required: 'TradeId is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Trade Id"
                    variant="outlined"
                    error={!!errors.tradeId}
                    helperText={errors.tradeId?.message}
                  />
                )}
              />

              <Controller
                name="version"
                control={control}
                rules={{ required: 'Version is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Version"
                    variant="outlined"
                    error={!!errors.version}
                    helperText={errors.version?.message}
                  />
                )}
              />

              <Controller
                name="counterPartyId"
                control={control}
                rules={{ required: 'CounterParty Id is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="CounterParty Id"
                    variant="outlined"
                    error={!!errors.counterPartyId}
                    helperText={errors.counterPartyId?.message}
                  />
                )}
              />

              <Controller
                name="bookId"
                control={control}
                rules={{ required: 'BookId is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Book Id"
                    variant="outlined"
                    error={!!errors.bookId}
                    helperText={errors.bookId?.message}
                  />
                )}
              />

              <Controller
                name="muturityDate"
                control={control}
                rules={{ required: 'Muturity Date is required' }}
                render={({ field }) => (
                  <DatePicker
                    label="Muturity Date"
                    value={field.value ? dayjs(field.value) : null} // Convert to dayjs object for DatePicker
                    onChange={(newValue) =>
                      field.onChange(newValue ? newValue.toDate() : null)
                    } // Convert back to Date object for form data
                    slotProps={{
                      textField: {
                        variant: 'outlined',
                        error: !!errors.muturityDate,
                        helperText: errors.muturityDate?.message,
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="createdDate"
                control={control}
                rules={{ required: 'Created Date is required' }}
                render={({ field }) => (
                  <DatePicker
                    label="Created Date"
                    value={field.value ? dayjs(field.value) : null} // Convert to dayjs object for DatePicker
                    onChange={(newValue) =>
                      field.onChange(newValue ? newValue.toDate() : null)
                    } // Convert back to Date object for form data
                    slotProps={{
                      textField: {
                        variant: 'outlined',
                        error: !!errors.createdDate,
                        helperText: errors.createdDate?.message,
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="expired"
                control={control}
                rules={{ required: 'Expired Field is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Expired"
                    variant="outlined"
                    error={!!errors.expired}
                    helperText={errors.expired?.message}
                  />
                )}
              />

              <Button type="submit" variant="contained">
                Save
              </Button>
            </Box>
          </LocalizationProvider>
        </Box>
      </Modal>
    </div>
  );
};

export default TradeModal;
