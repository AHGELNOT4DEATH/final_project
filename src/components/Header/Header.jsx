import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import './Header.css'

// Импортируем изображения
import Logo from '../../assets/images/Logo.svg'
import Separator from '../../assets/images/Separator.svg'
import UserAvatar from '../../assets/images/user-avatar.png'

function Header() {
  const { isLoggedIn, user, limits, logout } = useAuth()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLoginClick = () => {
    navigate('/login')
    setIsMobileMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    setIsMobileMenuOpen(false)
    navigate('/')
  }

  const handleHomeClick = () => {
    navigate('/')
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="nav__container">
      <nav>
        {/* ЛОГОТИП */}
        <div className="logo__nav__container">
          <img src={Logo} alt="СКАН" onClick={handleHomeClick} style={{cursor: 'pointer'}} className="logo__nav" />
        </div>
        
        {/* ОСНОВНОЕ МЕНЮ */}
        <div className="nav_menu__container">
          <ul className="nav_menu">
            <li><a href="/" className="nav_menu__link" onClick={handleHomeClick}>Главная</a></li>
            <li><a href="#" className="nav_menu__link" onClick={(e) => e.preventDefault()}>Тарифы</a></li>
            <li><a href="#" className="nav_menu__link" onClick={(e) => e.preventDefault()}>FAQ</a></li>
          </ul>
        </div>

        {/* БЛОК С ЛИМИТАМИ КОМПАНИЙ - для авторизованных */}
        {isLoggedIn && (
          <div className="other_info">
            <div className="company_limit">
              {limits.isLoading ? (
                <div className="loader">Загрузка лимитов...</div>
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
              <button 
                className="registrate_button"
                onClick={(e) => e.preventDefault()}
              >
                Зарегистрироваться
              </button>
              <img src={Separator} alt="разделитель"/>
              <button 
                className="log-in_button"
                onClick={handleLoginClick}
              >
                Войти
              </button>
            </div>
          ) : (
            // АВТОРИЗОВАННЫЙ ПОЛЬЗОВАТЕЛЬ
            <div className="autorized_user">
              <div className="user_info">
                <span className="user_name">
                  {user?.name || user?.login || 'Алексей А.'}
                </span>
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
            <img src={Logo} className="mobile-menu-title" alt="СКАН" onClick={handleHomeClick} style={{cursor: 'pointer'}} />
          </div>
          
          <ul className="mobile-nav_menu">
            <li><a href="/" className="mobile-nav_menu__link" onClick={handleHomeClick}>Главная</a></li>
            <li><a href="#" className="mobile-nav_menu__link" onClick={(e) => e.preventDefault()}>Тарифы</a></li>
            <li><a href="#" className="mobile-nav_menu__link" onClick={(e) => e.preventDefault()}>FAQ</a></li>
          </ul>
          
          <div className="mobile-auth-buttons">
            {!isLoggedIn ? (
              <>
                <button 
                  className="mobile-registrate_button"
                  onClick={(e) => e.preventDefault()}
                >
                  Зарегистрироваться
                </button>
                <button 
                  className="mobile-log-in_button"
                  onClick={handleLoginClick}
                >
                  Войти
                </button>
              </>
            ) : (
              <div className="mobile-authorized">
                {/* БЛОК ЛИМИТОВ ДЛЯ МОБИЛЬНОЙ ВЕРСИИ */}
                <div className="mobile-company-limit">
                  {limits.isLoading ? (
                    <div className="mobile-loader">Загрузка лимитов...</div>
                  ) : (
                    <div className="mobile-limit-info">
                      <div>Использовано компаний: <span>{limits.usedCompanies}</span></div>
                      <div>Лимит по компаниям: <span>{limits.companyLimit}</span></div>
                    </div>
                  )}
                </div>
                
                <div className="mobile-user-info">
                  <img src={UserAvatar} alt="Аватар" className="mobile-avatar" />
                  <span className="mobile-user-name">
                    {user?.name || user?.login || 'Алексей А.'}
                  </span>
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