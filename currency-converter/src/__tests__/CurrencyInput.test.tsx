import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CurrencyInput from '../CurrencyInput';

jest.mock('../assets/mock-data/currencies.json')

describe('CurrencyInput component', () => {
  let mockGetCurrencies: jest.Mock;
  let mockPerformConversion: jest.Mock;
  let mockAddConversionHistory: jest.Mock;
  let mockGetConversionHistory: jest.Mock;
  let mockUpdateExchangeRates: jest.Mock;

  beforeEach(() => {
    mockGetCurrencies = jest.fn();
    mockGetCurrencies.mockResolvedValue({ data: [{ code: 'USD', name: 'US Dollar' }] });

    mockPerformConversion = jest.fn();
    mockPerformConversion.mockResolvedValue({ data: { convertedAmount: 100 } });

    mockAddConversionHistory = jest.fn();
    mockAddConversionHistory.mockResolvedValue({});

    mockGetConversionHistory = jest.fn();
    mockGetConversionHistory.mockResolvedValue({ data: [] });

    mockUpdateExchangeRates = jest.fn();
    mockUpdateExchangeRates.mockResolvedValue({});

  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays initial currency input fields and buttons', () => {
    render(<CurrencyInput setConversionHistory={jest.fn()} />);
    
    expect(screen.getByText('Currency Converter')).toBeInTheDocument();
    expect(screen.getByText('Convert')).toBeInTheDocument();
  });

});