import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Card, CardContent, Box } from '@mui/material';
import CurrencyService from './services/currency-http.service';
import ConversionResult from './ConversionResult';

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

  useEffect(() => {
    CurrencyService.getCurrencies()
      .then(response => {
        setCurrencies(response.data);
      })
      .catch(error => {
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
                  console.error('Error fetching conversion history:', error);
                });
            })
            .catch(error => {
              console.error('Error adding conversion history:', error);
            });
        })
        .catch(error => {
          console.error('Error performing conversion:', error);
        });
    }
  };

  return (
    <Card sx={{ minWidth: 300, p: 2 }}>
      <CardContent>
        <h2>Currency Converter</h2>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <FormControl sx={{ flex: 1, mr: 2 }}>
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
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            sx={{ flex: 1 }}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <FormControl sx={{ flex: 1, mr: 2 }}>
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
          <ConversionResult convertedAmount={convertedAmount} />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConvert}
          sx={{ width: '100%' }}
        >
          Convert
        </Button>
      </CardContent>
    </Card>
  );
}

export default CurrencyInput;
