import React from 'react';

import './Products.css';
import FetchProducts from './FetchProducts';

function Products(props) {
  return (
    <div className="Products">
      <FetchProducts
          setCountCart={props.setCountCart}
          countCart={props.countCart}
      />
    </div>
  )
}

export default Products;