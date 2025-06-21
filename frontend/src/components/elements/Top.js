import React from 'react';

import Menu from './Menu';
import Logo from './Logo';

function Top(props) {
  return (
    <div className="Content content-top">
        <Logo />
        <Menu
          setPage={props.setPage}
          productCount={props.productCount}
        />
    </div>
  );
}

export default Top;