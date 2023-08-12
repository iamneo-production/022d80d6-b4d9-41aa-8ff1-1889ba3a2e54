import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent } from '@mui/material';

interface ConversionHistoryItem {
  id: number;
  timestamp: string;
  sourceCurrency: string;
  targetCurrency: string;
  sourceAmount: number;
  convertedAmount: number;
}
interface ConversionHistoryProps {
  conversionHistory: ConversionHistoryItem[];
}

function ConversionHistory({ conversionHistory }: ConversionHistoryProps) {

  return (
    <Card sx={{ minWidth: 300, p: 2 }}>
      <CardContent>
        <h2>Conversion History</h2>
        <div style={{ maxHeight: '200px', overflowY: 'scroll' }}>
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
        </div>
      </CardContent>
    </Card>
  );
}

export default ConversionHistory;
