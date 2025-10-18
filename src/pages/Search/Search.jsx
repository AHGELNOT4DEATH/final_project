import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Search.css';

// Импорт изображений
import SearchFolders from '../../assets/Images/Search_folders.svg';
import SearchBigImg from '../../assets/Images/Search_big-img.svg';
import SearchDocumentImg from '../../assets/Images/Document.svg';

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
  const [errors, setErrors] = useState({
    inn: '',
    documentCount: '',
    dateRange: ''
  });
  const [showErrors, setShowErrors] = useState(false);

  // Проверка авторизации
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  // Функция валидации ИНН - только цифры
  const validateInn = (inn) => {
    if (!inn.trim()) return 'Поле обязательно для заполнения';
    if (!/^\d+$/.test(inn)) return 'Введите корректные данные';
    if (!/^\d{10}$/.test(inn)) return 'ИНН должен содержать 10 цифр';
    return '';
  };

  // Функция валидации количества документов
  const validateDocumentCount = (count) => {
    if (!count.trim()) return 'Поле обязательно для заполнения';
    const num = parseInt(count);
    if (isNaN(num) || num < 1 || num > 1000) return 'От 1 до 1000';
    return '';
  };

  // Функция валидации дат
  const validateDates = (startDate, endDate) => {
    if (!startDate || !endDate) return 'Обе даты обязательны для заполнения';
    
    const today = new Date().toISOString().split('T')[0];
    const start = new Date(startDate);
    const end = new Date(endDate);
    const currentDate = new Date(today);
    
    if (start > currentDate) return 'Дата начала не может быть в будущем';
    if (end > currentDate) return 'Дата окончания не может быть в будущем';
    if (start > end) return 'Дата начала не может быть позже даты окончания';
    
    return '';
  };

  // Проверка заполненности обязательных полей (минимум 1 символ)
  const checkFormFilled = () => {
    const { inn, documentCount, startDate, endDate } = formData;
    
    return inn.trim() !== '' && 
           documentCount.trim() !== '' && 
           startDate.trim() !== '' && 
           endDate.trim() !== '';
  };

  // Проверка валидности всей формы
  useEffect(() => {
    const isFilled = checkFormFilled();
    setIsFormValid(isFilled);
  }, [formData]);

  // Обработчик ввода для ИНН - только цифры
  const handleInnChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Удаляем все не-цифры
    setFormData(prev => ({
      ...prev,
      inn: value
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Для поля ИНН используем отдельный обработчик
    if (name === 'inn') {
      handleInnChange(e);
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isFormValid) return;
    
    // Валидация при отправке формы
    const innError = validateInn(formData.inn);
    const docCountError = validateDocumentCount(formData.documentCount);
    const dateError = validateDates(formData.startDate, formData.endDate);
    
    setErrors({
      inn: innError,
      documentCount: docCountError,
      dateRange: dateError
    });
    
    // Показываем ошибки только после нажатия кнопки
    setShowErrors(true);
    
    // Если есть ошибки - не отправляем форму
    if (innError || docCountError || dateError) {
      return;
    }
    
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
          <div className="Document_img__container"> 
            <img src={SearchDocumentImg} alt="Document_img"/>
          </div>
        </div>
        
        <div className="Search_form_container">
          <form className="Search_form" onSubmit={handleSubmit}>
            <div className="Search_form_left-part">
              {/* Поле ИНН с валидацией */}
              <div className="Search_form__left-part__input____container">
                <label className={`Search_label ${showErrors && errors.inn ? 'label-error' : ''}`}>
                  ИНН компании*
                </label>
                <input 
                  className={`Search_input ${showErrors && errors.inn ? 'input-error' : ''}`}
                  type="text" 
                  name="inn"
                  value={formData.inn}
                  onChange={handleInputChange}
                  placeholder="10 цифр"
                  maxLength="10"
                />
                {showErrors && errors.inn && <div className="error-message">{errors.inn}</div>}
              </div>
              
              {/* Поле тональности */}
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
              
              {/* Поле количества документов с валидацией */}
              <div className="Search_form__left-part__input____container">
                <label className={`Search_label ${showErrors && errors.documentCount ? 'label-error' : ''}`}>
                  Количество документов в выдаче*
                </label>
                <input 
                  className={`Search_input ${showErrors && errors.documentCount ? 'input-error' : ''}`}
                  type="number" 
                  name="documentCount"
                  value={formData.documentCount}
                  onChange={handleInputChange}
                  placeholder="От 1 до 1000"
                  min="1"
                  max="1000"
                />
                {showErrors && errors.documentCount && <div className="error-message">{errors.documentCount}</div>}
              </div>
              
              {/* Поле диапазона дат с валидацией */}
              <div className="Search_form__left-part__input____container">
                <label className={`Search_label ${showErrors && errors.dateRange ? 'label-error' : ''}`}>
                  Диапазон поиска*
                </label>
                <div className="date_input__container">
                  <input 
                    className={`Search_input ${showErrors && errors.dateRange ? 'input-error' : ''}`}
                    type="date" 
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                  <input 
                    className={`Search_input ${showErrors && errors.dateRange ? 'input-error' : ''}`}
                    type="date" 
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </div>
                {showErrors && errors.dateRange && <div className="error-message">{errors.dateRange}</div>}
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
                <p className="button_subtitle">* Обязательные к заполнению поля</p>
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
      <div className="mobile_images">
        <img src={SearchBigImg} alt="Big img"/>  
      </div>
    </div>
  );
};

export default Search;