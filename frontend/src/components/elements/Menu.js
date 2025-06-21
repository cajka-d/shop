import React from 'react';

import {isAutho, exit} from './../../functions.js';

import './Menu.css';

function Menu(props) {
  return (
    <div className="Menu">
          { isAutho() ? (
              <ul>
                <li onClick={ () => props.setPage('Catalog') }>Каталог</li>
                <li onClick={ () => props.setPage('Orders') }>Заказы</li>
                <li onClick={ () => props.setPage('Cart') }>
                  <span>Корзина</span>
                  <span className="Count">
                    {props.productCount}
                  </span>
                </li>

                <li onClick={ () => props.setPage('ProductAdd') }>Добавить товара</li>
                <li onClick={ () => exit(props) }>Выйти</li>
              </ul>
            ) : (
              <ul>
                <li onClick={ () => props.setPage('Catalog') }>Каталог</li>
                <li onClick={ () => props.setPage('Reg') }>Регистрация</li>
                <li onClick={ () => props.setPage('Login') }>Вход</li>
              </ul>
            )
          }
    </div>
  );
}

export default Menu;