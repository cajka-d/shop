import React from 'react';
import {autho} from './../../functions.js';

function Login(props) {
  return (
    <div className="Login">
      <h1>Вход</h1>

      <div className="Input">
          <input type="text" placeholder="Логин" id="login" />
      </div>
      <div className="Input">
          <input type="password" placeholder="Пароль" id="password" />
      </div>
      <div className="Input">
          <button onClick={ () => autho(props.setPage) }>Войти</button>
      </div>
    </div>
  );
}

export default Login;