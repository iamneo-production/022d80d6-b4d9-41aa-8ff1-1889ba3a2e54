import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import CurrencyInput from './CurrencyInput';
import ConversionHistory from './ConversionHistory';
import CurrencyService from './services/currency-http.service';

interface ConversionHistoryItem {
  id: number;
  timestamp: string;
  sourceCurrency: string;
  targetCurrency: string;
  sourceAmount: number;
  convertedAmount: number;
}

function CurrencyConverter() {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f6f6f6',
    background:`
    linear-gradient(45deg, #f6f6f6 25%, transparent 25%, transparent 75%, #f6f6f6 75%),
    linear-gradient(45deg, #f6f6f6 25%, transparent 25%, transparent 75%, #f6f6f6 75%)`,
    backgroundSize: '60px 60px',
    backgroundPosition: '0 0, 30px 30px',
  };

  
  const [conversionHistory, setConversionHistory] = useState<ConversionHistoryItem[]>([]);
  useEffect(() => {
    CurrencyService.getConversionHistory()
      .then(response => {
        setConversionHistory(response.data.reverse());
      })
      .catch(error => {
        console.error('Error fetching conversion history:', error);
      });
  }, []);


  return (
    <Box
      style={containerStyles}
    >
      <CurrencyInput setConversionHistory={setConversionHistory} />
      <div style={{padding:20}}></div>
      <ConversionHistory conversionHistory={conversionHistory}/>
    </Box>
  );
}

export default CurrencyConverter;
