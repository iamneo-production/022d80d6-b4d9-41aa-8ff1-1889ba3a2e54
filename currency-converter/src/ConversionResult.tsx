import React from 'react';
import { Paper, Box } from '@mui/material';

interface ConversionResultProps {
  convertedAmount: number | null;
}

function ConversionResult({ convertedAmount }: ConversionResultProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Paper
        sx={{
          minWidth: 300,
          p: 2,
          mb: 2,
        }}
      >
        <h2>Conversion Result</h2>
        {convertedAmount !== null ? (
          <p>Converted Amount: {convertedAmount}</p>
        ) : (
          <p>Enter amount and select currencies to convert</p>
        )}
      </Paper>
    </Box>
  );
}

export default ConversionResult;
