import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// Импорты изображений
import AboutUsImage from '../../assets/images/About_us_main.svg';
import BigImage from '../../assets/images/Why_us_big.svg';
import TimeImage from '../../assets/images/Time_img.svg';
import MagnifierImage from '../../assets/images/magnifier_img.svg';
import SecurityImage from '../../assets/images/security_img.svg';
import LampImage from '../../assets/images/Tarrif_lamp.svg';
import DartImage from '../../assets/images/Tarrif_dart.svg';
import ComputerImage from '../../assets/images/Tarrif_computer.svg';
import TickImage from '../../assets/images/Tick.svg';
import LeftArrow from '../../assets/images/Slider-arrow__left.svg';
import RightArrow from '../../assets/images/Slider-arrow__right.svg';

const Home = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  
  // Состояние для карусели
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Данные для карусели
  const slides = [
    {
      id: 1,
      image: TimeImage,
      text: "Высокая и оперативная скорость обработки заявки"
    },
    {
      id: 2,
      image: MagnifierImage,
      text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос"
    },
    {
      id: 3,
      image: SecurityImage,
      text: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству"
    },
    {
      id: 4,
      image: TimeImage,
      text: "Дополнительная карточка 1 для тестирования карусели"
    },
    {
      id: 5,
      image: MagnifierImage,
      text: "Дополнительная карточка 2 для тестирования карусели"
    }
  ];

  // Данные для тарифов
  const tariffs = [
    {
      id: "beginner",
      name: "Beginner",
      subtitle: "Для небольшого исследования",
      icon: LampImage,
      currentPrice: "799 ₽",
      oldPrice: "1200 ₽",
      installment: "или 150 ₽/мес. при рассрочке на 24 мес.",
      features: [
        "Безлимитная история запросов",
        "Безопасная сделка",
        "Поддержка 24/7"
      ],
      headerColor: "first_header",
      isCurrent: true,
      buttonText: "Перейти в личный кабинет",
      buttonId: "beginner__button",
      containerId: "beginner__container"  // ← ДОБАВЛЕНО
    },
    {
      id: "pro",
      name: "Pro",
      subtitle: "Для HR и фрилансеров",
      icon: DartImage,
      currentPrice: "1 299 ₽",
      oldPrice: "2 600 ₽",
      installment: "или 279 ₽/мес. при рассрочке на 24 мес.",
      features: [
        "Все пункты тарифа Beginner",
        "Экспорт истории",
        "Рекомендации по приоритетам"
      ],
      headerColor: "second_header",
      isCurrent: false,
      buttonText: "Подробнее"
    },
    {
      id: "business",
      name: "Business",
      subtitle: "Для корпоративных клиентов",
      icon: ComputerImage,
      currentPrice: "2 379 ₽",
      oldPrice: "3 700 ₽",
      installment: "",
      features: [
        "Все пункты тарифа Pro",
        "Безлимитное количество запросов",
        "Приоритетная поддержка"
      ],
      headerColor: "third_header",
      isCurrent: false,
      buttonText: "Подробнее"
    }
  ];

  // Функции для карусели
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Функции навигации
  const handleRequestData = () => {
    if (isLoggedIn) {
      navigate('/search');
    } else {
      navigate('/login');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Автопрокрутка к активному слайду
  useEffect(() => {
    if (sliderRef.current) {
      const activeSlide = sliderRef.current.children[currentSlide];
      if (activeSlide) {
        activeSlide.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [currentSlide]);

  return (
    <div className="home">
      {/* Блок "О нас" */}
      <section className="about_us__main">
        <div className="about_us__main___text____container">
          <div className="about_us__main___text-title">
            <h1 id="about_us__title">Сервис по поиску публикаций о компании по его ИНН</h1>
          </div>
          <div className="about_us__main___text">
            <p id="about_us__text">
              Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.
            </p>
          </div>
          <div className="ask_for_data__button___container">
            <button 
              className="ask_for_data__button"
              onClick={handleRequestData}
            >
              Запросить данные
            </button>
          </div>
        </div>
        <div className="about_us__main___image-container">
          <img 
            className="about_us__main___image" 
            src={AboutUsImage} 
            alt="Анализ публикаций о компаниях" 
          />
        </div>
      </section>

      {/* Блок "Почему именно мы" с каруселью */}
      <section className="why_us">
        <div className="why_us_text__container">
          <h2>почему именно мы</h2>
        </div>
        
        <div className="why_us_slider__container">
          <button className="slider-arrow left-arrow" onClick={prevSlide}>
            <img src={LeftArrow} alt="Предыдущий слайд" />
          </button>
          
          <div className="slider-wrapper">
            <div className="slider_objects__container" ref={sliderRef}>
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`slider_object ${
                    index === currentSlide 
                      ? 'active' 
                      : Math.abs(index - currentSlide) === 1 
                        ? 'side' 
                        : ''
                  }`}
                >
                  <div className="slider_object__content">
                    <img 
                      className="slider_object__img" 
                      src={slide.image} 
                      alt={slide.text} 
                    />
                    <p className="slider_object__text">{slide.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button className="slider-arrow right-arrow" onClick={nextSlide}>
            <img src={RightArrow} alt="Следующий слайд" />
          </button>
        </div>
        
        {/* Индикаторы слайдов */}
        <div className="slider-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Большое изображение */}
      <div className="big-img__container">
        <img className="big_img" src={BigImage} alt="Преимущества сервиса" />
      </div>

      {/* Блок "Наши тарифы" */}
      <section className="our_tarrifs">
        <div className="our_tarrifs__text-container">
          <h2>наши тарифы</h2>
        </div>
        
        <div className="cards_container">
          {tariffs.map((tariff) => (
            <div 
              key={tariff.id} 
              className="card" 
              id={tariff.name}
              style={tariff.isCurrent ? { border: '2px solid #FFB64F' } : {}}
            >
              <div className={`card__header ${tariff.headerColor}`} id={tariff.headerColor}>
                <div className="card__content-text">
                  <h6>{tariff.name}</h6>
                  <p className="card__content-text___subtitle">{tariff.subtitle}</p>
                </div>
                <div className="card__content-img">
                  <img src={tariff.icon} alt={tariff.name} />
                </div>
              </div>
              
              <div className="card__content">
                {tariff.isCurrent && (
                  <div className="placeholder">
                    <p>Текущий тариф</p>
                  </div>
                )}
                
                <div className={`price ${tariff.id === 'pro' || tariff.id === 'business' ? 'mt-2' : ''}`}>
                  <div className="current_price__container">
                    <p className="current_price">{tariff.currentPrice}</p>
                  </div>
                  <div className="default_price__container">
                    <p className="default_price">{tariff.oldPrice}</p>
                  </div>
                </div>
                
                {tariff.installment && (
                  <div className="additional_price">
                    <p>{tariff.installment}</p>
                  </div>
                )}
                
                <div className={`advantages_list ${tariff.id === 'business' ? 'mt-2' : ''}`}>
                  <h6 className="h6_card">В тариф входит:</h6>
                  <ul className="advantages_wrap">
                    {tariff.features.map((feature, index) => (
                      <li key={index} className="advantage">
                        <img src={TickImage} alt="✓" />
                        <p>{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* КОНТЕЙНЕР КНОПКИ С ID */}
              <div 
                className="card_button__container" 
                id={tariff.containerId}  // ← ДОБАВЛЕНО ID ДЛЯ КОНТЕЙНЕРА
              >
                <button 
                  className={`card_button ${tariff.isCurrent ? 'current-tariff' : ''}`}
                  id={tariff.buttonId}  // ← ДОБАВЛЕНО ID ДЛЯ КНОПКИ
                >
                  {tariff.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;