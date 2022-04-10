import React, { useContext, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Tooltip from '@mui/material/Tooltip';
import { Badge } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { blueGrey } from '@mui/material/colors';

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
                <Tooltip title="איזור אישי">
                    <NavLink
                        to={currentUser ? '/dashboard' : '/login'}
                        style={{ textDecoration: 'none' }}
                    >
                        <AccountCircle
                            className="cart-icon"
                            fontSize="large"
                            sx={{ color: blueGrey[700] }}
                        />
                    </NavLink>
                </Tooltip>
                <Tooltip title="עגלה">
                    <NavLink to="/cart" style={{ textDecoration: 'none' }}>
                        <Badge
                            className="cart-icon"
                            badgeContent={cartBadgeCount}
                            // color={yellow[800]}
                            color="cubee"
                        >
                            {' '}
                            <ShoppingCartIcon
                                className="cart-icon"
                                sx={{ color: blueGrey[700] }}
                                fontSize="large"
                            />{' '}
                        </Badge>
                    </NavLink>
                </Tooltip>
                {/* <h2>{currentUser?.email}</h2> */}
            </div>
        </header>
    );
};
