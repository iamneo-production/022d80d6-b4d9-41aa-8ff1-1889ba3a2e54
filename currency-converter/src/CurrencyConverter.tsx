import React, { useState } from 'react';
import CurrencyInput from './CurrencyInput';
import ConversionResult from './ConversionResult';

function CurrencyConverter() {
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  return (
    <div>
      <CurrencyInput setConvertedAmount={setConvertedAmount} />
      <ConversionResult convertedAmount={convertedAmount} />
    </div>
  );
}

export default CurrencyConverter;
