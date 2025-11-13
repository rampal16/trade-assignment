import App from './App';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

describe('App Component', () => {
  it('renders My React Application text', () => {
    render(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    );

    const aboutLink = screen.getByText(/About/i);
    expect(aboutLink).toBeInTheDocument();
  });
});
