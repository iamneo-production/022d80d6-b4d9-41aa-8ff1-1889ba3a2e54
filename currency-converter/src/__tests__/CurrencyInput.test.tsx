import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this to extend expect with toBeInTheDocument
import CurrencyInput from '../CurrencyInput';

test('renders CurrencyInput component', () => {
  render(<CurrencyInput />);

  expect(screen.getByText('Currency Converter')).toBeInTheDocument();
  // expect(screen.getByLabelText('Source Currency')).toBeInTheDocument();
  // expect(screen.getByLabelText('Target Currency')).toBeInTheDocument();
  // expect(screen.getByLabelText('Amount')).toBeInTheDocument();
  expect(screen.getByText('Convert')).toBeInTheDocument();
});
