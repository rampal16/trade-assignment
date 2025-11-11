import App from './App';
import { render, screen } from '@testing-library/react';

describe('App Component', () => {
  it('renders My React Application text', () => {
    render(<App />);
    const element = screen.getByText(/My React Application/i);
    expect(element).toBeInTheDocument();
  });
});
