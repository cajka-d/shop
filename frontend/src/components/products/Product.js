import React, {useState} from 'react';
import {addProductCart, isAutho} from './../../functions.js';

import './Product.css';

function Product(props) {
  return (
    <div className="Product" id={`product_${props.id}`}>
      <div className="Photo">
        <img src={`images/${props.photo}`} alt={ props.title } />
      </div>
      <div className="Title">
        { props.title }
      </div>
      <div className="Price">
        { props.price } руб.
      </div>
      
      { isAutho() ? (
          <div className="Button" onClick={ () => addProductCart(props.id, props.setCountCart, props.countCart) }>В корзину</div>
        ) : (
          <div className='reg-buy'>
            Зарегистрируйтесь<br/>
            или войдите чтобы купить
          </div>
        )
      }
    </div>
  );
}

export default Product;