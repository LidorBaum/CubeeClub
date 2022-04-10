import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { OrbitSpinner } from 'react-epic-spinners';
import { CartContext } from '../contexts/CartContext';
import Cookies from 'js-cookie';
import Axios from 'axios';
import { ProductList } from '../cmps/ProductList';

const axios = Axios.create({
    withCredentials: true,
});

const categories = [
    {
        name: 'הכל',
        wooId: null,
    },
    {
        name: 'PLA Plus',
        wooId: 1,
    },
    {
        name: 'PLA eSilk',
        wooId: 1,
    },
    {
        name: 'PETG',
        wooId: 1,
    },
    {
        name: 'Prusament',
        wooId: 1,
    },
];

export const Home = props => {
    const [products, setProducts] = useState([]);
    let history = useHistory();
    const [selectedCat, setSelectedCat] = useState('הכל');
    const { cart, setCart } = useContext(CartContext);

    useEffect(() => {
        const getProducts = async () => {
            const res = await axios({
                url: `https://www.irisbaum.co.il/wp-json/wc/v3/products?consumer_key=ck_2d626f3a3f4b245ab416f1533d12a396d18bcf13
                &consumer_secret=cs_167662277e9007d6e78907a548df4b308a20ffa0&per_page=10&page=1`,
                method: 'get',
            });
            console.log(res.data);
            setProducts(res.data);
        };
        getProducts();
    }, []);

    const onProductClick = prodObj => {
        history.push(`/products/${prodObj.id}`);
    };
    const onChangeCat = catName => {
        setSelectedCat(catName);
    };
    const addToCart = product => {
        let isExist = false;
        console.log(product);
        const productToAdd = {
            id: product.id,
            name: product.name,
            image: product.images[0]?.src,
            price: product.price,
            regular_price: product.regular_price,
            quantity: 1,
        };
        // if (productToAdd.quantity < 1)
        //     return notificationHandler.error(quantity0);
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === productToAdd.id) {
                isExist = true;
                let newCartArr = [...cart];
                const productToModify = cart[i];
                productToModify.quantity =
                    cart[i].quantity + productToAdd.quantity;
                newCartArr.splice(i, 1, productToModify);
                setCart(newCartArr);
                Cookies.set('cart', JSON.stringify(newCartArr));
                break;
            }
        }
        if (!isExist) {
            setCart(prevCart => {
                return [...prevCart, productToAdd];
            });
            const cartArr = [...cart, productToAdd];
            Cookies.set('cart', JSON.stringify(cartArr));
        }
    };

    if (!products.length)
        return (
            <div className="prod-list">
                <OrbitSpinner color="blue" size={300} />
            </div>
        );
    return (
        <div>
            <ul>
                {categories.map(cat => {
                    return (
                        <li
                            key={cat.name}
                            className={cat.name === selectedCat ? 'active' : ''}
                            onClick={() => onChangeCat(cat.name)}
                        >
                            {cat.name}
                        </li>
                    );
                })}
            </ul>
            <ProductList
                products={products}
                addToCart={addToCart}
                onProductClick={onProductClick}
            />
            {/* <div className='prod-list'>
                {products.map(prod => {
                    return (
                        <div className="prod-card"
                        onClick={()=>onProductClick(prod)}
                        key={prod.id}
                        >
                            <h4>{prod.name}</h4>
                            <img src={prod.images[0]?.src}></img>
                        </div>
                    )
                })}
            </div> */}
        </div>
    );
};
