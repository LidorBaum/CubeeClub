import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';

import Axios from 'axios';
const axios = Axios.create({
    withCredentials: true,
});

export const Product = props => {
    const [product, setProduct] = useState(null);
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
    if (!product) return <h1>Loading</h1>;
    const description = parse(product.description);
    return (
        <>
            <h3>{product.name}</h3>
            {description}
        </>
    );
};
