import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth();
    console.log('entered private route', currentUser);
    if (!currentUser) return <Redirect to="/login" />;
    return <Route {...rest} component={Component} />;
}
