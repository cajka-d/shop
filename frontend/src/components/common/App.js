import React, {useState, useEffect} from 'react';

import './App.css';

import Header from './Header';
import Catalog from './Catalog';
import Orders from './Orders';
import Cart from '../cart/Cart';
import Reg from './Reg';
import Login from './Login';
import ProductAdd from '../products/ProductAdd'
import Footer from './Footer';

import {getCountProductsCart} from './../../functions.js';

function App() {
  const [count, setCountCart] = useState(0);
  const [page, setPage] = useState('Catalog');
  const pages = {
      Catalog: <Catalog setCountCart={setCountCart} countCart={count} />,
      Orders: <Orders />,
      Cart: <Cart setCountCart={setCountCart} />,
      Reg: <Reg />,
      Login: <Login setPage={setPage} />,
      ProductAdd: <ProductAdd />
  };

    useEffect(() => {
      getCountProductsCart(setCountCart)
    }, []);

    return (
    <div className="App">
      <Header 
        setPage={setPage}
        productCount={count}
      />
      <div className="Content">{ pages[page] }</div>
      <Footer 
        setPage={setPage}
        productCount={count}
      />
    </div>
  );
}

export default App;
