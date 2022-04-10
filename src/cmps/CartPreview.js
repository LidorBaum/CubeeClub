import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';

export default function CartPreview({
    productObj,
    removeProduct,
    changeQuantity,
}) {
    const onRemoveProduct = () => {
        removeProduct(productObj.id);
    };
    const handleQuantityChange = (quantity, isReplace) => {
        if (isReplace) {
            if (quantity < 1 || quantity > 10) {
                console.log('please enter valid value');
                //NOTIFICATION ERROR
                return;
            } else changeQuantity(productObj.id, quantity);
        } else {
            if (
                quantity + productObj.quantity < 1 ||
                quantity + productObj.quantity > 10
            ) {
                console.log('please enter valid value');
                //NOTIFICATION ERROR
                return;
            } else
                changeQuantity(productObj.id, productObj.quantity + quantity);
        }
    };

    return (
        <div className="cart-product-card">
            <img className="cart-product-img" src={productObj.image} />
            <h5>{productObj.name}</h5>
            <div className="actions-btn">
                {productObj.regular_price !== productObj.price ? (
                    <h4>
                        {' '}
                        <span>
                            {productObj.regular_price * productObj.quantity}₪
                        </span>{' '}
                        {productObj.price * productObj.quantity}₪
                    </h4>
                ) : (
                    <h4>{productObj.price * productObj.quantity}₪</h4>
                )}
                <div className="quantity-btns">
                    <IconButton
                        variant="text"
                        size="small"
                        color="secondary"
                        onClick={() => handleQuantityChange(1, false)}
                    >
                        <AddCircleIcon
                            className="cart-icon"
                            color="black"
                            fontSize="small"
                        />
                    </IconButton>
                    <p>{productObj.quantity}</p>
                    <IconButton
                        variant="text"
                        size="small"
                        color="secondary"
                        onClick={() => handleQuantityChange(-1, false)}
                    >
                        <RemoveCircleIcon
                            className="cart-icon"
                            color="black"
                            fontSize="small"
                        />
                    </IconButton>
                </div>

                <IconButton
                    variant="text"
                    size="small"
                    onClick={onRemoveProduct}
                    color="secondary"
                >
                    <DeleteForeverIcon className="cart-icon" color="error" />
                </IconButton>
            </div>
        </div>
    );
}
