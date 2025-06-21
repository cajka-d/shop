import React from 'react';

import './Header.css';

import Top from '../elements/Top';

function Header(props) {
  return (
    <div className="Header">
      <Top 
        setPage={props.setPage}
        productCount={props.productCount}
      />
    </div>
  );
}

export default Header;