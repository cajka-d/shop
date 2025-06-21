import React from 'react';

import './Logo.css';

function Logo() {
  return (
    <div className="Logo">
        <img src="images/logo.png" alt="Интернет-магазин - Конфетка" />
        <div className="Description">
            Интернет-магазин <br />Шоколад и Конфеты
        </div>
    </div>
  );
}

export default Logo;