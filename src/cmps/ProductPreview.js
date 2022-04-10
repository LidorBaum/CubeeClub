import React, { useState } from "react";
import { Button } from "@mui/material"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
export function ProductPreview({ product, addToCart, onProductClick }) {
    const onAddToCart = (e) => {
        e.stopPropagation()
        addToCart(product)
    }

    const [isHover, setIsHover] = useState(false)
    return (
        <div className="prod-card"
            onClick={() => onProductClick(product)}
            key={product.id}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <h4>{product.name}</h4>
            <div className='product-image-cont'>
                <img className="product-image" src={product.images[0]?.src} />
                {isHover && <div className='btn'>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={onAddToCart}
                    >
                        <AddShoppingCartIcon
                            className="cart-icon"
                            color="primary"
                            fontSize="small"
                        />
                    </Button>
                </div>}
            </div>
        </div>
    )
}