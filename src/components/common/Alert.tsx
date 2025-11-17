import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

interface AlertDialogProps {
  content: string;
  isOpen: boolean;
  actions?: string[];
  handleClose?: (action: string) => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  content,
  isOpen,
  handleClose,
  actions,
}) => {
  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        disableEscapeKeyDown
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          {actions && Array.isArray(actions)
            ? // render buttons for each action
              actions.map((action, index) => (
                <Button
                  key={index}
                  onClick={() => handleClose?.(action)}
                  autoFocus={index === 0}
                >
                  {action}
                </Button>
              ))
            : null}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AlertDialog;
