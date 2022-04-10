import React, { useContext, useEffect, useState } from 'react';
import CartPreview from '../cmps/CartPreview';
import { CartContext } from '../contexts/CartContext';
import Cookies from 'js-cookie';

export const Cart = () => {
    const { cart, setCart } = useContext(CartContext);
    const removeProduct = productId => {
        const newCartArr = cart.filter(prod => {
            return !(prod.id === productId);
        });
        setCart(newCartArr);
        Cookies.set('cart', JSON.stringify(newCartArr));
    };
    const [total, setTotal] = useState(null);

    useEffect(() => {
        let total = 0;
        cart.forEach(product => {
            total += Number(product.price);
        });
        setTotal(total);
    }, []);

    return (
        <>
            <div className="cart-page">
                <h1>עגלת קניות</h1>
                <div className="cart-cont">
                    {cart.map(productObj => {
                        return (
                            <CartPreview
                                key={productObj.id}
                                productObj={productObj}
                                removeProduct={removeProduct}
                                // removeProduct={onRemoveProduct}
                                // editProduct={onEditProduct}
                            />
                        );
                    })}
                </div>
                {total && <h2>סך הכל: {total} ₪</h2>}
            </div>
        </>
    );
};
