import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify, Notification } from 'ra-core';
import { ThemeProvider } from '@material-ui/styles';

const Login = ({ theme }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();
    const submit = (e) => {
        e.preventDefault();
        login({ email, password })
            .catch(() => notify('Invalid email or password'));
    };

    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={submit}>
                <input name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} /> 
                <input name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </form>
            <Notification />
        </ThemeProvider>
    );
};

export default Login;