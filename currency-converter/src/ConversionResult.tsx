import React from 'react';
import { TextField } from '@mui/material';

interface ConversionResultProps {
  convertedAmount: number | null;
}

function ConversionResult({ convertedAmount }: ConversionResultProps) {
  return (
    <TextField
      label="Converted Amount"
      type="number"
      focused={true}
      value={convertedAmount ?? ''}
      sx={{ flex: 1 }}
    />
  );
}

export default ConversionResult;
