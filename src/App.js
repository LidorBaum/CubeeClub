import { Header } from './cmps/Header';
import { Home } from './pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Product } from './pages/Product';
import { LoginSignup } from './pages/LoginSignup';
import { AuthProvider } from './contexts/AuthContext';
import { CartContext } from './contexts/CartContext';
import { Dashboard } from './pages/Dashboard';
import PrivateRoute from './cmps/PrivateRoute';
import { useEffect, useState } from 'react';
import Cookies, { set } from 'js-cookie';
import { Cart } from './pages/Cart';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DeliveryChoose from './pages/DeliveryChoose';
import { SnackbarHandlerContext } from './contexts/SnackbarHandlerContext';
import { SnackbarContext } from './contexts/SnackbarContext';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

const theme = createTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#ff5722',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            main: '#7c4dff',
        },
        warn: {
            main: '#4fc3f7',
        },
        cubee: {
            main: '#ffeb3b',
        },
        black: {
            main: '#212121',
        },
    },
});

function App() {
    const [cart, setCart] = useState([]);
    // const [users, setUsers] = useState([]);

    const [snack, setSnack] = useState({});
    const notificationHandler = {
        success: message => showNotification('success', message),
        error: message => showNotification('error', message),
        info: message => showNotification('info', message),
        warning: message => showNotification('warning', message),
    };
    const showNotification = (severity, message) => {
        const snackObj = { severity, message, open: true };
        if (snack.open) {
            setSnack(prevSnack => {
                return { ...prevSnack, open: false };
            });
            return setTimeout(() => {
                setSnack(snackObj);
            }, 100);
        } else setSnack(snackObj);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnack(prevSnack => {
            return { ...prevSnack, open: false };
        });
    };

    // const usersCollRef = collection(db, 'Users');

    useEffect(() => {
        if (Cookies.get('cart')) {
            const cartJson = JSON.parse(Cookies.get('cart'));
            setCart(cartJson);
        } else {
            // Cookies.set('cart', JSON.stringify([1,2,3]))
        }
    }, []);

    // useEffect(() => {
    //     const getUsers = async () => {
    //         const data = await getDocs(usersCollRef);
    //         setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    //     };
    //     getUsers();
    // }, []);

    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <CartContext.Provider value={{ cart, setCart }}>
                    <SnackbarHandlerContext.Provider
                        value={notificationHandler}
                    >
                        <SnackbarContext.Provider value={{ snack, setSnack }}>
                            {
                                <Snackbar
                                    TransitionComponent={Slide}
                                    onClose={handleClose}
                                    autoHideDuration={3000}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    dir="ltr"
                                    open={snack.open}
                                >
                                    <Alert
                                        onClose={handleClose}
                                        severity={snack.severity}
                                        sx={{ width: '100%' }}
                                    >
                                        {snack.message}
                                        {/* <Button onClick={handleClose}>Share</Button> */}
                                    </Alert>
                                </Snackbar>
                            }
                            <div className="App">
                                <Router>
                                    <Header />
                                    <div className="content">
                                        <Switch>
                                            <Route
                                                path="/"
                                                exact
                                                component={Home}
                                            />
                                            <Route
                                                path="/login"
                                                exact
                                                component={LoginSignup}
                                            />
                                            <Route
                                                path="/cart"
                                                exact
                                                component={Cart}
                                            />
                                            <Route
                                                path="/cart/delivery"
                                                exact
                                                component={DeliveryChoose}
                                            />
                                            <PrivateRoute
                                                path="/dashboard"
                                                exact
                                                component={Dashboard}
                                            />
                                            <Route
                                                path="/products/:productId"
                                                component={Product}
                                            />
                                        </Switch>
                                    </div>
                                </Router>
                            </div>
                        </SnackbarContext.Provider>
                    </SnackbarHandlerContext.Provider>
                </CartContext.Provider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
