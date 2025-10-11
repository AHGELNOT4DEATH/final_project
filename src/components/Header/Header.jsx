import React, { useState } from 'react'
import './Header.css'

function Header() {
  // Временные переменные для теста - потом заменим на настоящие
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("Алексей А.")
  const [usedCompanies, setUsedCompanies] = useState(34)
  const [companyLimit, setCompanyLimit] = useState(100)
  const [isLoading, setIsLoading] = useState(false)

  // Функция для входа (временная)
  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  // Функция для выхода (временная)  
  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <div className="nav__container">
      <nav>
        {/* ЛОГОТИП - всегда одинаковый */}
        <div className="logo__nav">
          <img src="/src/assets/images/Logo.svg" alt="СКАН" />
        </div>
        
        {/* МЕНЮ - всегда одинаковое */}
        <div className="nav_menu__container">
          <ul className="nav_menu">
            <li><a href="/" className="nav_menu__link">Главная</a></li>
            <li><a href="/" className="nav_menu__link">Тарифы</a></li>
            <li><a href="/" className="nav_menu__link">FAQ</a></li>
          </ul>
        </div>

        {/* БЛОК С ЛИМИТАМИ КОМПАНИЙ - показывается только авторизованным */}
        {isLoggedIn && (
          <div className="other_info">
            <div className="company_limit">
              Использовано компаний: <span>{usedCompanies}</span><br/>
              Лимит по компаниям: <span>{companyLimit}</span>
            </div>
          </div>
        )}

        {/* БЛОК АВТОРИЗАЦИИ - меняется в зависимости от статуса */}
        <div className="registrate_or_log-in__container">
          {!isLoggedIn ? (
            // ВАРИАНТ 1: Неавторизованный пользователь
            <div className="registrate_or_log-in">
              <button className="registrate_button">Зарегистрироваться</button>
              <img src="/src/assets/images/Separator.svg" alt=""/>
              <button className="log-in_button" onClick={handleLogin}>
                Войти
              </button>
            </div>
          ) : (
            // ВАРИАНТ 2: Авторизованный пользователь
            <div className="autorized_user">
              <span className="user_name">{userName}</span>
              <button className="log-out_button" onClick={handleLogout}>
                Выйти
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Header