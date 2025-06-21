import React, {useState} from 'react';
import {cartProductDelete} from './../../functions.js';

import './Cart.css';

function CartItem(props) {
  const setCartProducts = props.setCartProducts,
        setTotalPrica = props.setTotalPrica,
        setCountCart = props.setCountCart;

  return (
    <div className="CartItem" id={`product_${props.id}`}>
      <div className="Photo">
        <img src={`images/${props.photo}`} alt={ props.title } />
      </div>
      <div className="Title">
        { props.title }
      </div>
      <div className="Price" data-price={props.price}> 
        { props.price } руб.
      </div>
      <div className="Button-delete" onClick={ () => cartProductDelete(props.id, setCartProducts, setTotalPrica, setCountCart) }>Удалить</div>
    </div>
  );
}

export default CartItem;