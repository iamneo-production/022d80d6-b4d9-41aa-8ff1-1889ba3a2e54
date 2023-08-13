import { DialogTitle, DialogContent, TextField, Dialog, DialogActions, Button } from "@mui/material";
import { useState } from "react";
import AuthService from './services/auth.service';

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

export default LoginDialog;