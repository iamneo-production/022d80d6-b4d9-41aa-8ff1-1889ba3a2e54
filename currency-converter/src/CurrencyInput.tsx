import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Card, CardContent, Box } from '@mui/material';
import CurrencyService from './services/currency-http.service';
import ConversionResult from './ConversionResult';
import ErrorDialog from './ErrorDialog';

interface Currency {
  code: string;
  name: string;
}

interface ConversionHistoryItem {
  id: number;
  timestamp: string;
  sourceCurrency: string;
  targetCurrency: string;
  sourceAmount: number;
  convertedAmount: number;
}

interface ConversionHistoryProps {
  setConversionHistory: React.Dispatch<React.SetStateAction<ConversionHistoryItem[]>>;
}

function CurrencyInput({ setConversionHistory }: ConversionHistoryProps) {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [sourceCurrency, setSourceCurrency] = useState<string>('');
  const [targetCurrency, setTargetCurrency] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    CurrencyService.getCurrencies()
      .then(response => {
        setCurrencies(response.data);
      })
      .catch(error => {
        setErrorMessage('Error fetching currencies. Please try again.');
        setErrorDialogOpen(true);
        console.error('Error fetching currencies:', error);
      });
  }, []);

  const handleConvert = () => {
    if (sourceCurrency && targetCurrency && amount) {
      CurrencyService.performConversion(amount, sourceCurrency, targetCurrency)
        .then(response => {
          setConvertedAmount(response.data.convertedAmount);
          const historyData = {
            timestamp: new Date().toISOString(),
            sourceCurrency,
            targetCurrency,
            sourceAmount: amount,
            convertedAmount: response.data.convertedAmount,
          } as ConversionHistoryItem;

          CurrencyService.addConversionHistory(historyData)
            .then(() => {
              console.log('Conversion history added successfully.');
              CurrencyService.getConversionHistory()
                .then(response => {
                  setConversionHistory(response.data.reverse());
                })
                .catch(error => {
                  setErrorMessage('Error fetching conversion history. Please try again.');
                  setErrorDialogOpen(true);
                  console.error('Error fetching conversion history:', error);
                });
            })
            .catch(error => {
              setErrorMessage('Error adding conversion history. Please try again.');
              setErrorDialogOpen(true);
              console.error('Error adding conversion history:', error);
            });
        })
        .catch(error => {
          setErrorMessage('Error performing conversion. Please try again.');
          setErrorDialogOpen(true);
          console.error('Error performing conversion:', error);
        });
    }
  };

  const updateExchangeRates = () => {
    CurrencyService.updateExchangeRates()
      .then(() => {
        console.log('Exchange rates updated successfully.');
      })
      .catch(error => {
        setErrorMessage('Error updating Exchange rates. Please try again.');
        setErrorDialogOpen(true);
        console.error('Error updating Exchange rates:', error);
      });
  };
  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <h2>Currency Converter</h2>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
          <Box flex={1} display="flex" flexDirection="column" mb={1} gap={{ xs: 2 }}>
            <FormControl>
              <InputLabel>Source Currency</InputLabel>
              <Select
                value={sourceCurrency}
                onChange={(e) => setSourceCurrency(e.target.value as string)}
              >
                {currencies.map(currency => (
                  <MenuItem key={currency.code} value={currency.code}>
                    {currency.code}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Target Currency</InputLabel>
              <Select
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value as string)}
              >
                {currencies.map(currency => (
                  <MenuItem key={currency.code} value={currency.code}>
                    {currency.code}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box flex={1} display="flex" flexDirection="column" mb={1} gap={{ xs: 2 }}>
            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />

            <ConversionResult convertedAmount={convertedAmount} />
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConvert}
          fullWidth
          sx={{ mt: 1, mb: 1 }}
        >
          Convert
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={updateExchangeRates}
          fullWidth
          sx={{ mt: 1, mb: 1 }}
        >
          Update Exchange Rates
        </Button>
      </CardContent>
      <ErrorDialog
        open={errorDialogOpen}
        onClose={() => setErrorDialogOpen(false)}
        errorMessage={errorMessage}
      />
    </Card>
  );
}

export default CurrencyInput;
