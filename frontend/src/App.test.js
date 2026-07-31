import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the feature launcher', () => {
  render(<App />);

  expect(screen.getByText(/feature launcher/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /post mock json/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /open ai chat/i })).toBeInTheDocument();
});
