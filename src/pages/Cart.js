import React, { useContext, useEffect, useState } from 'react';
import CartPreview from '../cmps/CartPreview';
import { Button } from '@mui/material';
import { CartContext } from '../contexts/CartContext';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Scrollbars } from 'react-custom-scrollbars-2';

export const Cart = () => {
    const { currentUser } = useAuth();
    console.log(currentUser);
    const { cart, setCart } = useContext(CartContext);
    const history = useHistory();
    const removeProduct = productId => {
        const newCartArr = cart.filter(prod => {
            return !(prod.id === productId);
        });
        setCart(newCartArr);
        Cookies.set('cart', JSON.stringify(newCartArr));
    };
    const changeQuantity = (productId, newQuantity) => {
        const productObjIDX = cart.findIndex(prod => prod.id === productId);
        const newProductObj = { ...cart[productObjIDX], quantity: newQuantity };
        let newCartArr = [...cart];
        newCartArr.splice(productObjIDX, 1, newProductObj);
        setCart(newCartArr);
    };

    const [total, setTotal] = useState(0);
    useEffect(() => {
        let total = 0;
        cart.forEach(product => {
            total += Number(product.price * product.quantity);
        });
        setTotal(Number(total));
    }, [cart]);
    if (!cart.length)
        return (
            <div className="center">
                <h2>עגלת הקניות שלך ריקה, להעביר אותך לעמוד המוצרים?</h2>
                <Button
                    onClick={() => history.push('/')}
                    variant="contained"
                    color="cubee"
                    className="btn"
                >
                    כן, קח אותי לשם
                </Button>
            </div>
        );
    return (
        <>
            <div className="cart-page">
                <h1>עגלת קניות</h1>
                <div className="cart-list-scroll">
                    <Scrollbars
                        autoHide
                        autoHideTimeout={4000}
                        autoHideDuration={400}
                    >
                        <div className="cart-cont">
                            {cart.map(productObj => {
                                return (
                                    <CartPreview
                                        key={productObj.id}
                                        productObj={productObj}
                                        removeProduct={removeProduct}
                                        changeQuantity={changeQuantity}
                                    />
                                );
                            })}
                        </div>
                    </Scrollbars>
                </div>
                <div className={'total-cta'}>
                    {total !== 0 && <h2>סך הכל: {total} ₪</h2>}
                    {currentUser ? (
                        <Button
                            variant="contained"
                            className="btn"
                            color="cubee"
                            onClick={() => history.push('/cart/delivery')}
                        >
                            המשך לבחירת משלוח
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            className="btn"
                            color="cubee"
                            onClick={() => history.push('/login?fromCart=true')}
                        >
                            בוא נתחבר למערכת לפני שנמשיך בהזמנה
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
};
