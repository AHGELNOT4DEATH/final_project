import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Search.css';

// Импорт изображений
import SearchFolders from '../../assets/Images/Search_folders.svg';
import SearchBigImg from '../../assets/Images/Search_big-img.svg';

const Search = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  // Состояния формы
  const [formData, setFormData] = useState({
    inn: '',
    tone: '',
    documentCount: '',
    startDate: '',
    endDate: '',
    maxCompleteness: false,
    businessContext: false,
    mainRole: false,
    riskFactors: false,
    techNews: false,
    announcements: false,
    newsDigests: false
  });

  const [isFormValid, setIsFormValid] = useState(false);

  // Проверка авторизации
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  // Проверка валидности формы
  useEffect(() => {
    const { inn, documentCount, startDate, endDate } = formData;
    
    // Простая проверка заполненности обязательных полей
    const isValid = inn.trim() !== '' && 
                   documentCount.trim() !== '' && 
                   startDate.trim() !== '' && 
                   endDate.trim() !== '';
    
    setIsFormValid(isValid);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isFormValid) return;
    
    // Здесь будет валидация и отправка запроса
    console.log('Form data:', formData);
    
    // После успешного поиска переходим на страницу результатов
    navigate('/results');
  };

  return (
    <div className="search-page">
      <div className="Search_left_part">
        <div className="Search_title__box">
          <div className="Search_title__container">
            <h1 className="Search_title">Найдите необходимые данные в пару кликов.</h1>
          </div>
          <div className="Search_subtitle__container">
            <h6 className="Search_subtitle">Задайте параметры поиска. Чем больше заполните, тем точнее поиск</h6>
          </div>
        </div>
        
        <div className="Search_form_container">
          <form className="Search_form" onSubmit={handleSubmit}>
            <div className="Search_form_left-part">
              <div className="Search_form__left-part__input____container">
                <label className="Search_label">ИНН компании*</label>
                <input 
                  className="Search_input"
                  type="text" 
                  name="inn"
                  value={formData.inn}
                  onChange={handleInputChange}
                  placeholder="10 цифр"
                />
              </div>
              
              <div className="Search_form__left-part__input____container">
                <label className="Search_label">Тональность</label>
                <select 
                  className="Search_input"
                  name="tone"
                  value={formData.tone}
                  onChange={handleInputChange}
                >
                  <option value="">Любая</option>
                  <option value="positive">Позитивная</option>
                  <option value="negative">Негативная</option>
                </select>
              </div>
              
              <div className="Search_form__left-part__input____container">
                <label className="Search_label">Количество документов в выдаче*</label>
                <input 
                  className="Search_input"
                  type="number" 
                  name="documentCount"
                  value={formData.documentCount}
                  onChange={handleInputChange}
                  placeholder="От 1 до 1000"
                />
              </div>
              
              <div className="Search_form__left-part__input____container">
                <label className="Search_label">Диапазон поиска*</label>
                <div className="date_input__container">
                  <input 
                    className="Search_input"
                    type="date" 
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                  <input 
                    className="Search_input"
                    type="date" 
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="Search_form__right-part">
              <div className="checkboxes">
                <label className="custom-checkbox">
                  <input 
                    type="checkbox" 
                    className="checkbox-input"
                    name="maxCompleteness"
                    checked={formData.maxCompleteness}
                    onChange={handleInputChange}
                  />
                  <span className="checkbox-text">Признак максимальной полноты</span>
                </label>
                
                <label className="custom-checkbox">
                  <input 
                    type="checkbox" 
                    className="checkbox-input"
                    name="businessContext"
                    checked={formData.businessContext}
                    onChange={handleInputChange}
                  />
                  <span className="checkbox-text">Упоминания в бизнес-контексте</span>
                </label>
                
                <label className="custom-checkbox">
                  <input 
                    type="checkbox" 
                    className="checkbox-input"
                    name="mainRole"
                    checked={formData.mainRole}
                    onChange={handleInputChange}
                  />
                  <span className="checkbox-text">Главная роль в публикации</span>
                </label>
                
                <label className="custom-checkbox">
                  <input 
                    type="checkbox" 
                    className="checkbox-input"
                    name="riskFactors"
                    checked={formData.riskFactors}
                    onChange={handleInputChange}
                  />
                  <span className="checkbox-text">Публикации только с риск-факторами</span>
                </label>
                
                <label className="custom-checkbox">
                  <input 
                    type="checkbox" 
                    className="checkbox-input"
                    name="techNews"
                    checked={formData.techNews}
                    onChange={handleInputChange}
                  />
                  <span className="checkbox-text">Включать технические новости рынков</span>
                </label>
                
                <label className="custom-checkbox">
                  <input 
                    type="checkbox" 
                    className="checkbox-input"
                    name="announcements"
                    checked={formData.announcements}
                    onChange={handleInputChange}
                  />
                  <span className="checkbox-text">Включать анонсы и календари</span>
                </label>
                
                <label className="custom-checkbox">
                  <input 
                    type="checkbox" 
                    className="checkbox-input"
                    name="newsDigests"
                    checked={formData.newsDigests}
                    onChange={handleInputChange}
                  />
                  <span className="checkbox-text">Включать сводки новостей</span>
                </label>
              </div>
              
              <div className="Search_button__container">
                <button 
                  className={`Search_button ${!isFormValid ? 'disabled' : ''}`}
                  type="submit"
                  disabled={!isFormValid}
                >
                  Поиск
                </button>
                <p className="button_subitle">* Обязательные к заполнению поля</p>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <div className="Search_right_part">
        <div className="Folder_images__container">
          <img src={SearchFolders} alt="Папки документов" />
        </div>
        <div className="Search_big-img__container">
          <img src={SearchBigImg} alt="Поиск данных" />
        </div>
      </div>
    </div>
  );
};

export default Search;