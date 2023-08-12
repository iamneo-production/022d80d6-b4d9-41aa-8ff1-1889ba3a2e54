import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent } from '@mui/material';
import CurrencyService from './services/currency-http.service';

interface ConversionHistoryItem {
  id: number;
  timestamp: string;
  sourceCurrency: string;
  targetCurrency: string;
  sourceAmount: number;
  convertedAmount: number;
}

function ConversionHistory() {
  const [conversionHistory, setConversionHistory] = useState<ConversionHistoryItem[]>([]);

  useEffect(() => {
    CurrencyService.getConversionHistory()
      .then(response => {
        setConversionHistory(response.data);
      })
      .catch(error => {
        console.error('Error fetching conversion history:', error);
      });
  }, []);


  return (
    <Card sx={{ minWidth: 300, p: 2 }}>
      <CardContent>
        <h2>Conversion History</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>Source Currency</TableCell>
                <TableCell>Target Currency</TableCell>
                <TableCell>Source Amount</TableCell>
                <TableCell>Converted Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {conversionHistory.map(history => (
                <TableRow key={history.id}>
                  <TableCell>{history.timestamp}</TableCell>
                  <TableCell>{history.sourceCurrency}</TableCell>
                  <TableCell>{history.targetCurrency}</TableCell>
                  <TableCell>{history.sourceAmount}</TableCell>
                  <TableCell>{history.convertedAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

export default ConversionHistory;
