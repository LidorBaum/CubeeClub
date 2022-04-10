import React, { useContext, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import LoginIcon from '@mui/icons-material/Login';
import FaceIcon from '@mui/icons-material/Face';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Badge, TextField } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

export const Header = () => {
    const { currentUser } = useAuth();
    const { cart } = useContext(CartContext);
    const [cartBadgeCount, setCartBadgeCount] = useState(0);

    useEffect(() => {
        let counter = 0;
        cart.forEach(product => {
            return (counter += product.quantity);
        });
        setCartBadgeCount(counter);
    }, [cart]);

    return (
        <header>
            <NavLink to="/">
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                    }}
                >
                    <img
                        alt="logo"
                        src={
                            'https://res.cloudinary.com/echoshare/image/upload/v1642510871/Cubee3D/new-logo_vqg9pl.svg'
                        }
                    />
                </Typography>
            </NavLink>
            <div className="header-btns">
                <NavLink
                    to={currentUser ? '/dashboard' : '/login'}
                    style={{ textDecoration: 'none' }}
                >
                    <AccountCircle
                        className="cart-icon"
                        color="warning"
                        fontSize="large"
                    />
                </NavLink>
                <NavLink to="/cart" style={{ textDecoration: 'none' }}>
                    <Badge
                        className="cart-icon"
                        badgeContent={cartBadgeCount}
                        color="primary"
                    >
                        {' '}
                        <ShoppingCartIcon
                            className="cart-icon"
                            color="warning"
                            fontSize="large"
                        />{' '}
                    </Badge>
                </NavLink>
                <h2>{currentUser?.email}</h2>
            </div>
        </header>
    );
};
