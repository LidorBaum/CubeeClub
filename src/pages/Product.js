import React, { useEffect, useState, useContext } from 'react';
import parse from 'html-react-parser';
import { OrbitSpinner } from 'react-epic-spinners';
import { TextField, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import { CartContext } from '../contexts/CartContext';
import Cookies from 'js-cookie';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { SnackbarHandlerContext } from '../contexts/SnackbarHandlerContext';

import Axios from 'axios';
const axios = Axios.create({
    withCredentials: true,
});

export const Product = props => {
    const notificationHandler = useContext(SnackbarHandlerContext);
    const [product, setProduct] = useState(null);
    const { cart, setCart } = useContext(CartContext);
    const [selectedQuantity, setQuantity] = useState(1);
    const [isDisabled, setIsDisabled] = useState(false);
    useEffect(() => {
        const getProduct = async () => {
            const { productId } = props.match.params;
            const res = await axios({
                url: `https://www.irisbaum.co.il/wp-json/wc/v3/products/${productId}?consumer_key=ck_2d626f3a3f4b245ab416f1533d12a396d18bcf13
                &consumer_secret=cs_167662277e9007d6e78907a548df4b308a20ffa0`,
                method: 'get',
            });
            console.log(res.data);
            setProduct(res.data);
        };
        getProduct();
    }, [props.match.params]);

    const handleQuantityChange = (quantity, isReplace) => {
        if (isReplace) {
            if (quantity < 1 || quantity > 10) {
                console.log('please enter valid value');
                //NOTIFICATION ERROR
                return;
            } else setQuantity(quantity);
        } else {
            if (
                quantity + selectedQuantity < 1 ||
                quantity + selectedQuantity > 10
            ) {
                console.log('please enter valid value');
                //NOTIFICATION ERROR
                return;
            } else setQuantity(prev => prev + quantity);
        }
    };

    const addToCart = () => {
        const productToAdd = {
            id: product.id,
            name: product.name,
            image: product.images[0]?.src,
            price: product.price,
            regular_price: product.regular_price,
            quantity: selectedQuantity,
        };
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === productToAdd.id) {
                let newCartArr = [...cart];
                const productToModify = cart[i];
                productToModify.quantity =
                    cart[i].quantity + productToAdd.quantity;
                newCartArr.splice(i, 1, productToModify);
                setCart(newCartArr);
                Cookies.set('cart', JSON.stringify(newCartArr));
                notificationHandler.success('המוצר התווסף לעגלה');
                return respawnButton();
            }
        }
        setCart(prevCart => {
            return [...prevCart, productToAdd];
        });
        const cartArr = [...cart, productToAdd];
        Cookies.set('cart', JSON.stringify(cartArr));
        respawnButton();
        notificationHandler.success('המוצר התווסף לעגלה');
        //NOTIFICATION ADDED / UPDATED CART
    };
    const respawnButton = () => {
        setIsDisabled(true);
        setQuantity(1);
        setTimeout(() => {
            setIsDisabled(false);
        }, 2000);
    };
    if (!product)
        return (
            <div className="loader">
                <OrbitSpinner color="#fbc02d" size={300} />
            </div>
        );
    const description = parse(product.description);
    return (
        <>
            <div className="product-hero">
                <img
                    alt="product"
                    className="product-image"
                    src={product.images[0]?.src}
                />
                <div className="details">
                    <h3>{product.name}</h3>
                    {product.regular_price !== product.price ? (
                        <h4>
                            {' '}
                            <span>{product.regular_price}₪</span>{' '}
                            {product.price}₪
                        </h4>
                    ) : (
                        <h4>{product.price}₪</h4>
                    )}
                    <div className="quantity-btns">
                        <IconButton
                            variant="text"
                            onClick={() => handleQuantityChange(1, false)}
                            color="primary"
                        >
                            <AddCircleIcon
                                className="cart-icon"
                                color="black"
                                fontSize="small"
                            />
                        </IconButton>
                        <TextField
                            className="quantity-field"
                            type="number"
                            onFocus={e => e.target.select()}
                            onChange={e =>
                                handleQuantityChange(
                                    Number(e.target.value),
                                    true
                                )
                            }
                            id="outlined-basic"
                            size="small"
                            value={selectedQuantity}
                            label="כמות"
                            variant="outlined"
                        />
                        <IconButton
                            variant="text"
                            color="cubee"
                            onClick={() => handleQuantityChange(-1, false)}
                        >
                            <RemoveCircleIcon
                                className="cart-icon"
                                color="black"
                                fontSize="small"
                            />
                        </IconButton>
                    </div>
                    {selectedQuantity > 1 ? (
                        <Button
                            onClick={addToCart}
                            disabled={isDisabled}
                            variant="contained"
                            color="cubee"
                            className="btn"
                        >
                            הוסף לעגלה ({selectedQuantity * product.price}₪)
                        </Button>
                    ) : (
                        <Button
                            onClick={addToCart}
                            disabled={isDisabled}
                            color="cubee"
                            className="btn"
                            variant="contained"
                        >
                            הוסף לעגלה
                        </Button>
                    )}
                </div>
            </div>

            <div className="product-desc">{description}</div>
        </>
    );
};
