import React from 'react'
import { ProductPreview } from './ProductPreview'

export const ProductList = ({ products, addToCart, onProductClick }) => {
    return (
        <div className="prod-list">
                {products.map(product => (
                    <ProductPreview
                        key={product.id}
                        product={product}
                        addToCart={addToCart}
                        onProductClick={onProductClick}
                    />
                ))}
            </div>
    )
}