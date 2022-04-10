import { Button } from '@mui/material';
import React from 'react';
export default function CartPreview({ productObj, removeProduct }) {
    const onRemoveProduct = () => {
        removeProduct(productObj.id);
    };
    return (
        <div className="cart-product-card">
            <img className="cart-product-img" src={productObj.image} />
            <h5>{productObj.name}</h5>
            <div className="actions-btn">
                <h6>
                    {productObj.price}, {productObj.regular_price}
                </h6>
                <Button
                    variant="contained"
                    size="small"
                    onClick={onRemoveProduct}
                >
                    X
                </Button>
                <Button variant="contained" size="small">
                    +
                </Button>
                <Button variant="contained" size="small">
                    -
                </Button>
                <h6>כמות: {productObj.quantity}</h6>
            </div>
        </div>
    );
}
