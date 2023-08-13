import React, { useEffect, useState } from 'react';
import {
  Box,
  useMediaQuery,
  useTheme,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import CurrencyInput from './CurrencyInput';
import ConversionHistory from './ConversionHistory';
import CurrencyService from './services/currency-http.service';
import AuthService from './services/auth.service';

interface ConversionHistoryItem {
  id: number;
  timestamp: string;
  sourceCurrency: string;
  targetCurrency: string;
  sourceAmount: number;
  convertedAmount: number;
}

function LoginDialog({ open, onClose, onLogin }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    AuthService.login(username, password)
      .then(() => {
        onLogin();
      })
      .catch(error => {
        console.error('Login error:', error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          fullWidth
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleLogin}>Login</Button>
      </DialogActions>
    </Dialog>
  );
}

function CurrencyConverter() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f6f6f6',
    background: `
      linear-gradient(45deg, #f6f6f6 25%, transparent 25%, transparent 75%, #f6f6f6 75%),
      linear-gradient(45deg, #f6f6f6 25%, transparent 25%, transparent 75%, #f6f6f6 75%)`,
    backgroundSize: '60px 60px',
    backgroundPosition: '0 0, 30px 30px',
    padding: isMobile ? '20px' : '0',
  };

  const [authenticated, setAuthenticated] = useState(false);
  const [conversionHistory, setConversionHistory] = useState<ConversionHistoryItem[]>([]);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  const openLoginDialog = () => {
    setLoginDialogOpen(true);
  };

  const closeLoginDialog = () => {
    setLoginDialogOpen(false);
  };

  useEffect(() => {
    const isAuthenticated = AuthService.isAuthenticatedUser();
    setAuthenticated(isAuthenticated);

    if (isAuthenticated) {
      CurrencyService.getConversionHistory()
        .then(response => {
          setConversionHistory(response.data.reverse());
        })
        .catch(error => {
          console.error('Error fetching conversion history:', error);
        });
    }
  }, [authenticated]);

  const handleLogin = () => {
    setAuthenticated(true);
    closeLoginDialog();
  };

  return (
    <Box style={containerStyles}>
      <CurrencyInput setConversionHistory={setConversionHistory} />
      {!isMobile && <div style={{ width: '20px' }} />}
      {authenticated ? (
        <ConversionHistory conversionHistory={conversionHistory} />
      ) : (
        <Button variant="contained" color="primary" onClick={openLoginDialog}>
          Login to View Conversion History
        </Button>
      )}
      <LoginDialog open={loginDialogOpen} onClose={closeLoginDialog} onLogin={handleLogin} />
    </Box>
  );
}

export default CurrencyConverter;
