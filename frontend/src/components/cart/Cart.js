import React from 'react';
import { useState, useEffect } from 'react';
import CartItem from './CartItem';

import {getListCart, addOrder} from './../../functions.js';

function Cart(props) {
  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrica, setTotalPrica] = useState({ price:  0, count: 0 });

  useEffect(() => {
      getListCart(setCartProducts, setTotalPrica, props.setCountCart)
  }, []);

  return (
    <div className="Cart">
      <h1>Корзина</h1>

      <div className='Cart-content'>
        <div className='left'>
          <div className="Items">
              { cartProducts.length ? (
                  cartProducts.map(item => (
                    <CartItem
                        key={item._id}
                        id={item._id}
                        cartItemId={item._id}
                        photo={item.imageNane}
                        title={item.title}
                        price={item.price}
                        setCartProducts={setCartProducts}
                        setTotalPrica={setTotalPrica}
                        setCountCart={props.setCountCart}
                    />
                  ))
                ) : (
                  <div className='no-entity'>Корзина пустая</div>
                )
              }
          </div>
        </div>

        <div className='right'>
          <div className='Total'>
            <div className='Sub-title'>Информация о заказе</div>
            
            <div className='row'>
              <div className='row-item row-title'>Всего товаров: </div>
              <div className='row-item row-value'>{ totalPrica.count }</div>
            </div>

            <div className='row'>
              <div className='row-item row-title'>Всего сумма: </div>
              <div id='total' className='row-item row-value' data-total={ totalPrica.price }>{ totalPrica.price } руб.</div>
            </div>
          </div>
          <div className='button button-order' onClick={ () => addOrder() }>Оформить заказ</div>
        </div>
      </div>
    </div>
  );
}

export default Cart;