import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

export const Dashboard = () => {
    let history = useHistory();
    const { currentUser, logout } = useAuth();
    const onLogout = () => {
        history.push('/');
        logout();
    };
    return (
        <>
            <h1>Dashboard</h1>
            <h2>{currentUser.email}</h2>
            <Button variant="contained" type="submit" onClick={onLogout}>
                logout
            </Button>
        </>
    );
};
