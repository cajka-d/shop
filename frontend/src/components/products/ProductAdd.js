import React from 'react';
import {newProductAdd} from './../../functions.js';

import './Product.css';

function ProductAdd() {
  return (
    <div className="Reg">
      <h1>Добавить товара</h1>

      <div className="Input">
          <input type="text" placeholder="ЛоНазвание товарагин" id="title" />
      </div>
      <div className="Input">
          <input type="text" placeholder="Цена товара" id="price" />
      </div>
      <div className="Input">
          <input type="text" placeholder="Название файла изображения" id="imageNane" />
      </div>
      <div className="Input">
          <button onClick={ () => newProductAdd() }>Добавить</button>
      </div>
    </div>
  );
}

export default ProductAdd;