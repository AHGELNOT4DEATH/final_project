import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    login: '',
    password: ''
  });
  const [showErrors, setShowErrors] = useState(false);
  
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  // Проверка заполненности формы
  const isFormFilled = formData.login.trim() && formData.password.trim();

  // Валидация логина/телефона
  const validateLogin = (login) => {
    if (!login.trim()) return 'Поле обязательно для заполнения';
    
    // Проверяем тип данных: телефон или логин
    if (login.startsWith('+')) {
      // Это телефон
      if (!/^\+[0-9]+$/.test(login)) return 'Введите корректные данные';
      if (login !== '+79111111111') return 'Неверный телефон';
    } else {
      // Это логин
      if (!/^[a-zA-Z0-9_]+$/.test(login)) return 'Введите корректные данные';
      if (login !== 'Test__1') return 'Неверный логин';
    }
    
    return '';
  };

  // Валидация пароля
  const validatePassword = (password) => {
    if (!password.trim()) return 'Поле обязательно для заполнения';
    if (password !== 'Test__password') return 'Неправильный пароль';
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormFilled) return;

    // Валидация при отправке
    const loginError = validateLogin(formData.login);
    const passwordError = validatePassword(formData.password);
    
    setErrors({
      login: loginError,
      password: passwordError
    });
    setShowErrors(true);
    
    // Если есть ошибки - не отправляем форму
    if (loginError || passwordError) {
      return;
    }

    try {
      // Успешная авторизация
      const userData = {
        username: formData.login,
        token: 'mock-token-' + Date.now()
      };
      authLogin(userData);
      navigate('/search');
    } catch (error) {
      alert('Произошла ошибка при авторизации');
    }
  };

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
                {/* Поле логина/телефона с валидацией */}
                <div className="log-in__input-container">
                  <label className={`log-in__label ${showErrors && errors.login ? 'label-error' : ''}`}>
                    Логин или номер телефона
                  </label>
                  <input 
                    className={`log-in__input ${showErrors && errors.login ? 'input-error' : ''}`}
                    type="text" 
                    name="login"
                    value={formData.login}
                    onChange={handleInputChange}
                    placeholder=" "
                  />
                  {showErrors && errors.login && (
                    <div className="error-message">{errors.login}</div>
                  )}
                </div>

                {/* Поле пароля с валидацией */}
                <div className="log-in__input-container">
                  <label className={`log-in__label ${showErrors && errors.password ? 'label-error' : ''}`}>
                    Пароль
                  </label>
                  <input 
                    className={`log-in__input ${showErrors && errors.password ? 'input-error' : ''}`}
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder=" "
                  />
                  {showErrors && errors.password && (
                    <div className="error-message">{errors.password}</div>
                  )}
                </div>
              </form>
            </div>
            
            <div className="auth_block__log-in__buttons">
              <div className="log-in__button-container">
                <button 
                  className={`log-in__button ${!isFormFilled ? 'disabled' : ''}`}
                  onClick={handleSubmit}
                  disabled={!isFormFilled}
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