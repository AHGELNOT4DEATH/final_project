import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext.jsx'
import './Header.css'

// Импортируем изображения
import Logo from '../../assets/images/Logo.svg'
import Separator from '../../assets/images/Separator.svg'
import UserAvatar from '../../assets/images/user-avatar.png' // Нужно будет добавить это изображение

function Header() {
  const { isLoggedIn, user, limits, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLogout = () => {
    logout()
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="nav__container">
      <nav>
        {/* ЛОГОТИП */}
        <div className="logo__nav">
          <img src={Logo} alt="СКАН" />
        </div>
        
        {/* ОСНОВНОЕ МЕНЮ */}
        <div className="nav_menu__container">
          <ul className="nav_menu">
            <li><a href="/" className="nav_menu__link">Главная</a></li>
            <li><a href="/" className="nav_menu__link">Тарифы</a></li>
            <li><a href="/" className="nav_menu__link">FAQ</a></li>
          </ul>
        </div>

        {/* БЛОК С ЛИМИТАМИ КОМПАНИЙ - для авторизованных */}
        {isLoggedIn && (
          <div className="other_info">
            <div className="company_limit">
              {limits.isLoading ? (
                <div className="loader">Загрузка...</div>
              ) : (
                <>
                  Использовано компаний: <span>{limits.usedCompanies}</span><br/>
                  Лимит по компаниям: <span>{limits.companyLimit}</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* БЛОК АВТОРИЗАЦИИ ДЛЯ ДЕСКТОПА */}
        <div className="registrate_or_log-in__container">
          {!isLoggedIn ? (
            // НЕАВТОРИЗОВАННЫЙ ПОЛЬЗОВАТЕЛЬ
            <div className="registrate_or_log-in">
              <button className="registrate_button">Зарегистрироваться</button>
              <img src={Separator} alt="разделитель"/>
              <button 
                className="log-in_button"
                onClick={() => window.location.href = '/login'}
              >
                Войти
              </button>
            </div>
          ) : (
            // АВТОРИЗОВАННЫЙ ПОЛЬЗОВАТЕЛЬ
            <div className="autorized_user">
              <div className="user_info">
                <span className="user_name">Алексей А.</span>
                <button className="log-out_button" onClick={handleLogout}>
                  Выйти
                </button>
              </div>
              <div className="user_avatar">
                <img src={UserAvatar} alt="Аватар" />
              </div>
            </div>
          )}
        </div>

        {/* БУРГЕР-МЕНЮ ДЛЯ МОБИЛЬНЫХ */}
        <button 
          className={`burger-menu ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* МОБИЛЬНОЕ МЕНЮ */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-header">
            <img src={Logo} className="mobile-menu-title" alt="СКАН" />
          </div>
          
          <ul className="mobile-nav_menu">
            <li><a href="/" className="mobile-nav_menu__link">Главная</a></li>
            <li><a href="/" className="mobile-nav_menu__link">Тарифы</a></li>
            <li><a href="/" className="mobile-nav_menu__link">FAQ</a></li>
          </ul>
          
          <div className="mobile-auth-buttons">
            {!isLoggedIn ? (
              <>
                <button className="mobile-registrate_button">Зарегистрироваться</button>
                <button 
                  className="mobile-log-in_button"
                  onClick={() => window.location.href = '/login'}
                >
                  Войти
                </button>
              </>
            ) : (
              <div className="mobile-authorized">
                <div className="mobile-user-info">
                  <img src={UserAvatar} alt="Аватар" className="mobile-avatar" />
                  <span className="mobile-user-name">Алексей А.</span>
                </div>
                <button className="mobile-log-out_button" onClick={handleLogout}>
                  Выйти
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header