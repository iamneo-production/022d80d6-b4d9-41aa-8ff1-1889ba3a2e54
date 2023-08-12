import React from 'react';
import { Box } from '@mui/material';
import CurrencyInput from './CurrencyInput';
import ConversionHistory from './ConversionHistory';

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

  return (
    <Box
      style={containerStyles}
    >
      <CurrencyInput />
      <div style={{padding:20}}></div>
      <ConversionHistory/>
    </Box>
  );
}

export default CurrencyConverter;
