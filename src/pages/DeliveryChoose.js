import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import Lottie from 'lottie-react';
import printer from '../assets/json/63871-lottie-printer.json';
const axios = Axios.create({
    withCredentials: true,
});
export default function DeliveryChoose() {
    const history = useHistory();
    const [shippingMethods, setShippingMethods] = useState([]);
    useEffect(() => {
        const getShippingMethods = async () => {
            const res = await axios({
                url: `https://www.irisbaum.co.il/wp-json/wc/v3/shipping/zones/1/methods?consumer_key=ck_2d626f3a3f4b245ab416f1533d12a396d18bcf13
                &consumer_secret=cs_167662277e9007d6e78907a548df4b308a20ffa0`,
                method: 'get',
            });
            console.log(res.data);
            setShippingMethods(res.data);
        };
        getShippingMethods();
    }, []);

    if (!shippingMethods.length)
        return (
            <div className="loader">
                {/* <OrbitSpinner color="#fbc02d" size={300} /> */}
                <Lottie animationData={printer} loop={true} autoPlay={true} />
            </div>
        );
    return (
        <div className="delivery-choose-cont">
            <Button
                variant="contained"
                color="cubee"
                className="btn back-btn"
                onClick={() => history.push('/cart')}
            >
                חזרה לעגלה
            </Button>
            <h2>בחר את שיטת המשלוח המתאימה לך</h2>
            <div className="shipping-methods-list">
                {shippingMethods.map(method => {
                    if (method.settings.cost.value)
                        return (
                            <h3 key={method.title}>
                                {method.title}, {method.settings.cost.value}₪
                            </h3>
                        );
                    return <h3>{method.title} - חינם</h3>;
                })}
            </div>
        </div>
    );
}
