import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!login || !password) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    try {
      // Временная заглушка для тестирования
      const userData = {
        username: login,
        token: 'mock-token-' + Date.now()
      };
      authLogin(userData);
      navigate('/search');
    } catch (error) {
      alert('Произошла ошибка при авторизации');
    }
  };

  const isFormValid = login.trim() && password.trim();

  return (
    <div className="login-page">
      <main className="login-main">
        <div className="title_and_img">
          <div className="title_container">
            <h1 className="title">Для оформления подписки на тариф, необходимо авторизоваться.</h1>
          </div>
          <div className="login_characters__container">
            <img src="/src/assets/Images/login_characters.svg" alt="characters" />
          </div>
        </div>
        
        <div className="auth_block__container">
          <div className="width-filler"></div>
          <div className="height-filler"></div>
          <div className="auth_block__img">
            <img src="/src/assets/Images/login_lock.svg" alt="lock" />
          </div>
          
          <div className="auth_block">
            <div className="auth_block__tabs___container">
              <div className="log-in__tab___container">
                <button className="log-in__tab active">Войти</button>
              </div>
              <div className="registrate___container">
                <button className="registrate__tab">Зарегистрироваться</button>
              </div>
            </div>
            
            <div className="auth_block__log-in__inputs">
              <form className="auth_form" onSubmit={handleSubmit}>
                <div className="log-in__input-container">
                  <label className="log-in__label">Логин или номер телефона</label>
                  <input 
                    className="log-in__input"
                    type="text" 
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder=" "
                    required
                  />
                </div>
                <div className="log-in__input-container">
                  <label className="log-in__label">Пароль</label>
                  <input 
                    className="log-in__input"
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=" "
                    required
                  />
                </div>
              </form>
            </div>
            
            <div className="auth_block__log-in__buttons">
              <div className="log-in__button-container">
                <button 
                  className={`log-in__button ${!isFormValid ? 'disabled' : ''}`}
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                >
                  Войти
                </button>
              </div>
              <div className="recover-the-password__button-container">
                <button className="recover-the-password__button">
                  Восстановить пароль
                </button>
              </div>
            </div>
            
            <div className="auth_block__log-in__other-options">
              <div className="log-in__with___container">
                <p className="log-in__with___label">Войти через:</p>
              </div>
              <div className="log-in__with___buttons">
                <button className="google_button">
                  <img src="/src/assets/Images/login_google.svg" className="google_img" alt="Google" />
                </button>
                <button className="facebook_button">
                  <img src="/src/assets/Images/login_facebook.svg" className="facebook_img" alt="Facebook" />
                </button>
                <button className="yandex_button">
                  <img src="/src/assets/Images/login_yandex.svg" className="yandex_img" alt="Yandex" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;