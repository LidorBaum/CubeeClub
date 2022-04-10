import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { OrbitSpinner } from 'react-epic-spinners';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

export const LoginSignup = props => {
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
        name: '',
        phoneNumber: '',
    });
    const { signup, login, currentUser } = useAuth();

    const [isFromCart, setIsFromCart] = useState(false);
    useEffect(() => {
        const search = props.location.search;
        const params = new URLSearchParams(search);
        const isFromCart = params.get('fromCart');
        setIsFromCart(isFromCart);
    }, [props.location.search]);

    const onLogin = async e => {
        e.preventDefault();
        setIsLoading(true);
        console.log('logging in');
        try {
            const res = await login(loginCred.email, loginCred.password);
            setTimeout(() => {
                if (isFromCart) return history.push('/cart');
                history.push('/dashboard');
            }, 1000);
        } catch (err) {
            console.log(err.message);
            setIsLoading(false);
        }
    };
    const onSignup = async e => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await signup(signupCred);
            setTimeout(() => {
                if (isFromCart) return history.push('/cart');
                history.push('/dashboard');
            }, 1600);
        } catch (err) {
            console.log(err.message);
            setIsLoading(false);
        }
    };

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

    useEffect(() => {
        if (currentUser) history.push('/dashboard');
    }, [currentUser]);

    const signupForm = (
        <>
            <h3>
                הירשם כדי לבצע הזמנה, לצפות בהזמנות קודמות ולעדכן פרטים אישיים
            </h3>
            <form className="signup-form" id="signup-form" onSubmit={onSignup}>
                <TextField
                    placeholder="שם מלא"
                    required
                    // label="שם מלא"
                    name="name"
                    value={signupCred.name}
                    onChange={signupHandleChange}
                />
                <TextField
                    placeholder="מספר טלפון"
                    required
                    // label="מספר טלפון"
                    name="phoneNumber"
                    value={signupCred.phoneNumber}
                    onChange={signupHandleChange}
                />
                <TextField
                    required
                    placeholder="אימייל"
                    // label="Email"
                    name="email"
                    value={signupCred.email}
                    onChange={signupHandleChange}
                    dir="ltr"
                    color="cubee"
                />
                <TextField
                    placeholder="סיסמה"
                    // label="Password"
                    name="password"
                    value={signupCred.password}
                    onChange={signupHandleChange}
                    type="password"
                    dir="ltr"
                />
                <Button
                    className="signup-btn btn"
                    variant="contained"
                    disabled={isLoading}
                    type="submit"
                >
                    הירשם
                </Button>
            </form>
            <Button
                className="switch-form-btn btn"
                variant="contained"
                onClick={() => setIsNewUser(!isNewUser)}
                color="secondary"
            >
                נרשמת כבר? לחץ כאן כדי להתחבר
            </Button>
        </>
    );

    const loginForm = (
        <>
            <h3>התחבר כדי לצפות בהזמנות הקודמות שלך ולעדכן פרטים אישיים</h3>
            <form className="login-form" id="login-form" onSubmit={onLogin}>
                <TextField
                    placeholder="אימייל"
                    required
                    // label="Email"
                    name="email"
                    value={loginCred.email}
                    onChange={handleChange}
                    dir="ltr"
                />
                <TextField
                    placeholder="סיסמה"
                    // label="Password"
                    name="password"
                    value={loginCred.password}
                    onChange={handleChange}
                    type="password"
                    dir="ltr"
                />
                <Button
                    className="login-btn btn"
                    variant="contained"
                    disabled={isLoading}
                    type="submit"
                >
                    התחבר
                </Button>
            </form>
            <Button
                className="switch-form-btn btn"
                variant="contained"
                onClick={() => setIsNewUser(!isNewUser)}
                color="secondary"
            >
                עדיין לא נרשמת? לחץ כדי להירשם
            </Button>
        </>
    );
    return (
        <>
            <div className="form-container">
                {isNewUser ? signupForm : loginForm}
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
                open={isLoading}
                // onClick={setIsLoading(false)}
            >
                <div className="loader">
                    <OrbitSpinner color="#fbc02d" size={300} />
                </div>
            </Backdrop>
        </>
    );
};
