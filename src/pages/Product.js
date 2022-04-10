import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { OrbitSpinner } from 'react-epic-spinners';
import { TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Axios from 'axios';
const axios = Axios.create({
    withCredentials: true,
});

export const Product = props => {
    const [product, setProduct] = useState(null);
    const [selectedQuantity, setQuantity] = useState(1);

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
    }, []);

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

    if (!product)
        return (
            <div className="loader">
                <OrbitSpinner color="blue" size={300} />
            </div>
        );
    const description = parse(product.description);
    return (
        <>
            <div className="product-hero">
                <img className="product-image" src={product.images[0]?.src} />
                <div className="details">
                    <h3>{product.name}</h3>
                    <h4>
                        {' '}
                        <span>{product.regular_price}₪</span> {product.price}₪
                    </h4>
                    <div className="quantity-btns">
                        <Button
                            variant="text"
                            onClick={() => handleQuantityChange(1, false)}
                        >
                            <AddIcon
                                className="cart-icon"
                                color="primary"
                                fontSize="small"
                            />
                        </Button>
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
                        <Button
                            variant="text"
                            onClick={() => handleQuantityChange(-1, false)}
                        >
                            <RemoveCircleIcon
                                className="cart-icon"
                                color="primary"
                                fontSize="small"
                            />
                        </Button>
                    </div>
                    {selectedQuantity > 1 ? (
                        <Button variant="contained">
                            הוסף לעגלה ({selectedQuantity * product.price}₪)
                        </Button>
                    ) : (
                        <Button variant="contained">הוסף לעגלה</Button>
                    )}
                </div>
            </div>

            <div className="product-desc">{description}</div>
        </>
    );
};
