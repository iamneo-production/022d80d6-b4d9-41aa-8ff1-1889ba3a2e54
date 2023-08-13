import React from 'react';
import { Card, CardContent, Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

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
  const isMobile = window.innerWidth <= 600;

  if (isMobile) {
    return (
      <Card sx={{p: 2, mt:2 }}>
        <CardContent>
        <h2>Conversion History</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {conversionHistory.map(history => (
              <Card key={history.id} elevation={3} sx={{ p: 2 }}>
                <Typography variant="body2">
                  <strong>Timestamp:</strong> {history.timestamp}
                </Typography>
                <Typography variant="body2">
                  <strong>Source Currency:</strong> {history.sourceCurrency}
                </Typography>
                <Typography variant="body2">
                  <strong>Target Currency:</strong> {history.targetCurrency}
                </Typography>
                <Typography variant="body2">
                  <strong>Source Amount:</strong> {history.sourceAmount}
                </Typography>
                <Typography variant="body2">
                  <strong>Converted Amount:</strong> {history.convertedAmount}
                </Typography>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card sx={{ minWidth: 300, p: 2 }}>
        <CardContent>
        <h2>Conversion History</h2>
        <div style={{ maxHeight: '240px', overflowY: 'scroll' }}>
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
}

export default ConversionHistory;
