import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
export const LoginSignup = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    const [loginCred, setLoginCred] = useState({
        email: '',
        password: '',
    });
    const [signupCred, setSignupCred] = useState({
        email: '',
        password: '',
    });
    const { signup, login, currentUser, logout } = useAuth();

    const onLogin = async e => {
        e.preventDefault();
        try {
            const res = await login(loginCred.email, loginCred.password);
            history.push('/dashboard');
            // const user = await createUserWithEmailAndPassword(auth, loginCred.email, loginCred.password)
            // console.log(user);
        } catch (err) {
            console.log(err.message);
        }
    };
    const onSignup = async e => {
        e.preventDefault();
        signup(signupCred.email, signupCred.password);
    };
    const onLogout = async () => {};

    const handleChange = e => {
        e.persist();
        const target = e.target.name;
        const value = e.target.value;
        setLoginCred(prevForm => {
            return { ...prevForm, [target]: value };
        });
    };
    const signupHandleChange = e => {
        e.persist();
        const target = e.target.name;
        const value = e.target.value;
        setSignupCred(prevForm => {
            return { ...prevForm, [target]: value };
        });
    };

    const signupForm = (
        <>
            <h1>הירשם</h1>
            <form className="signup-form" id="signup-form" onSubmit={onSignup}>
                <TextField
                    required
                    label="Email"
                    name="email"
                    value={signupCred.email}
                    onChange={signupHandleChange}
                    dir="ltr"
                />
                <TextField
                    label="Password"
                    name="password"
                    value={signupCred.password}
                    onChange={signupHandleChange}
                    type="password"
                    dir="ltr"
                />
                <Button
                    className="login-btn"
                    variant="contained"
                    disabled={isLoading}
                    type="submit"
                >
                    Login
                </Button>
            </form>
        </>
    );

    const loginForm = (
        <>
            <h1>התחבר</h1>
            <form className="login-form" id="login-form" onSubmit={onLogin}>
                <TextField
                    required
                    label="Email"
                    name="email"
                    value={loginCred.email}
                    onChange={handleChange}
                    dir="ltr"
                />
                <TextField
                    label="Password"
                    name="password"
                    value={loginCred.password}
                    onChange={handleChange}
                    type="password"
                    dir="ltr"
                />
                <Button
                    className="login-btn"
                    variant="contained"
                    disabled={isLoading}
                    type="submit"
                >
                    Login
                </Button>
            </form>
        </>
    );
    return (
        <>
            <div className="form-container">
                {isNewUser ? signupForm : loginForm}
            </div>
            <Button onClick={() => setIsNewUser(!isNewUser)}>
                Switch Form
            </Button>
            <div class>
                <h1>{currentUser?.email}</h1>
            </div>
        </>
    );
};
