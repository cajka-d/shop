import React from 'react';

import './Footer.css';

import Top from '../elements/Top';

function Footer(props) {
  return (
    <div className="Footer">
      <Top 
        setPage={props.setPage}
        productCount={props.productCount}
      />
    </div>
  );
}

export default Footer;