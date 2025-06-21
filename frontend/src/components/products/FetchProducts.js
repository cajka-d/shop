import { useState, useEffect } from 'react';

import Product from './Product';

const FetchProducts = (props) => {
    const apiUrl = 'http://localhost:9001';
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${apiUrl}/products`, {
            method: 'GET',
            headers: {
             'Content-Type': 'application/json'
            }
        })
        .then(resurlt => resurlt.json())
        .then((resurlt) => {
            setProducts(resurlt.data)
        })
    }, []);

    return (
        <div className="Items">
            {products.map(item => (
                <Product
                    key={item._id}
                    id={item._id}
                    photo={item.imageNane}
                    title={item.title}
                    price={item.price}
                    setCountCart={props.setCountCart}
                    countCart={props.countCart}
                />
                ))
            }
        </div>
    )
}

export default FetchProducts;