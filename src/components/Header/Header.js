// src/components/Header/Header.js
import React from 'react';
import './Header.css';
import Logo from '../../assets/images/Logo.svg';
import Separator from '../../assets/images/Separator.svg';

const Header = ({ isAuthenticated, user }) => {
  return (
    <div className="nav__container">
      <nav>
        <div className="logo__nav">
          <img src={Logo} alt="logo" />
        </div>
        <div className="nav_menu__container">
          <ul className="nav_menu">
            <li><a className="nav_menu__link">Главная</a></li>
            <li><a className="nav_menu__link">Тарифы</a></li>
            <li><a className="nav_menu__link">FAQ</a></li>
          </ul>
        </div>
        
        {!isAuthenticated ? (
          <div className="registrate_or_log-in__container">
            <div className="registrate_or_log-in">
              <div className="registrate_button__container">
                <button className="registrate_button">Зарегистрироваться</button>
              </div>
              <img src={Separator} alt="separator" />
              <div className="log-in_button__container">
                <button className="log-in_button">Войти</button>
              </div>
            </div>  
          </div>
        ) : (
          <div className="autorized_user">
            {/* Будет добавлено позже */}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;