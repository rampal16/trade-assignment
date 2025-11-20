import Alert from './Alert';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

describe('App Component', () => {
  it('renders My React Application text', () => {
    const mockHandleClose = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Alert
          content="test content"
          isOpen={true}
          handleClose={mockHandleClose}
        />
      </ThemeProvider>
    );

    const appText = screen.getByText(/test content/i);
    expect(appText).toBeInTheDocument();
  });

  it('renders action buttons when actions are provided', () => {
    const mockHandleClose = jest.fn();
    const actions = ['OK', 'Cancel'];
    render(
      <ThemeProvider theme={theme}>
        <Alert
          content="test content"
          isOpen={true}
          handleClose={mockHandleClose}
          actions={actions}
        />
      </ThemeProvider>
    );

    actions.forEach((action) => {
      const button = screen.getByText(action);
      expect(button).toBeInTheDocument();
    });
  });

  it('does not render action buttons when actions are not provided', () => {
    const mockHandleClose = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Alert
          content="test content"
          isOpen={true}
          handleClose={mockHandleClose}
        />
      </ThemeProvider>
    );

    const button = screen.queryByRole('button');
    expect(button).toBeNull();
  });

  it('does not render when isOpen is false', () => {
    const mockHandleClose = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Alert
          content="test content"
          isOpen={false}
          handleClose={mockHandleClose}
        />
      </ThemeProvider>
    );

    const appText = screen.queryByText(/test content/i);
    expect(appText).toBeNull();
  });

  it('calls handleClose with correct action on button click', () => {
    const mockHandleClose = jest.fn();
    const actions = ['OK', 'Cancel'];
    render(
      <ThemeProvider theme={theme}>
        <Alert
          content="test content"
          isOpen={true}
          handleClose={mockHandleClose}
          actions={actions}
        />
      </ThemeProvider>
    );

    const okButton = screen.getByText('OK');
    okButton.click();
    expect(mockHandleClose).toHaveBeenCalledWith('OK');

    const cancelButton = screen.getByText('Cancel');
    cancelButton.click();
    expect(mockHandleClose).toHaveBeenCalledWith('Cancel');
  });
});
