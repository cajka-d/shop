import React from 'react';
import {addser} from './../../functions.js';

import './Form.css';

function Reg() {
  return (
    <div className="Reg">
      <h1>Регистрация</h1>

      <div className="Input">
          <input type="text" placeholder="Логин" id="login" />
      </div>
      <div className="Input">
          <input type="text" placeholder="E-mail" id="email" />
      </div>
      <div className="Input">
          <input type="password" placeholder="Пароль" id="password" />
      </div>
      <div className="Input">
          <input type="password" placeholder="Повторите пароль" id="password_repeat" />
      </div>
      <div className="Input">
          <button onClick={ () => addser() }>Зарегистрироваться</button>
      </div>
    </div>
  );
}

export default Reg;