import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Card, CardContent, Box } from '@mui/material';
import CurrencyService from './services/currency-http.service';

interface Currency {
  code: string;
  name: string;
}

interface CurrencyInputProps {
  setConvertedAmount: (amount: number | null) => void;
}

function CurrencyInput({ setConvertedAmount }: CurrencyInputProps) {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [sourceCurrency, setSourceCurrency] = useState<string>('');
  const [targetCurrency, setTargetCurrency] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

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
        })
        .catch(error => {
          console.error('Error performing conversion:', error);
        });
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Card sx={{ minWidth: 300, p: 2 }}>
        <CardContent>
          <h2>Currency Input</h2>
          <FormControl sx={{ width: '100%', mb: 2 }}>
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
          <FormControl sx={{ width: '100%', mb: 2 }}>
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
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            sx={{ width: '100%', mb: 2 }}
          />
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
    </Box>
  );
}

export default CurrencyInput;
