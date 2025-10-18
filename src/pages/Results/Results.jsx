// Results.jsx - С МОБИЛЬНОЙ АДАПТАЦИЕЙ ТАБЛИЦЫ
import React, { useRef, useState, useEffect } from 'react';
import './Results.css';

// Импорт изображений
import ResultsLadyImg from '../../assets/Images/Results__lady_img.svg';
import ResultDocumentImg1 from '../../assets/Images/Result__document__img_1.png';
import ResultDocumentImg1Mobile from '../../assets/Images/Result__document__img_1__mobile.png';
import ResultDocumentImg2 from '../../assets/Images/Result__document__img_2.png';
import ResultDocumentImg2Mobile from '../../assets/Images/Result__document__img_2__mobile.png';
import LeftArrow from '../../assets/Images/Slider-arrow__left.svg';
import RightArrow from '../../assets/Images/Slider-arrow__right.svg';

const Results = () => {
  const tableDataRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  // Данные для таблицы
  const tableData = [
    { period: "10.09.2021", total: 5, risks: 0 },
    { period: "17.09.2021", total: 2, risks: 0 },
    { period: "20.09.2021", total: 6, risks: 0 },
    { period: "12.10.2021", total: 8, risks: 2 },
    { period: "15.10.2021", total: 1, risks: 0 },
    { period: "16.10.2021", total: 0, risks: 2 },
    { period: "17.10.2021", total: 4, risks: 0 },
    { period: "18.10.2021", total: 3, risks: 0 }
  ];

  // Рассчитываем максимальную прокрутку
  useEffect(() => {
    const updateMaxScroll = () => {
      if (tableDataRef.current) {
        const scrollWidth = tableDataRef.current.scrollWidth;
        const clientWidth = tableDataRef.current.clientWidth;
        setMaxScroll(Math.max(0, scrollWidth - clientWidth));
      }
    };

    updateMaxScroll();
    window.addEventListener('resize', updateMaxScroll);
    return () => window.removeEventListener('resize', updateMaxScroll);
  }, [tableData]);

  // Прокрутка влево
  const scrollTableLeft = () => {
    if (tableDataRef.current) {
      const newPosition = Math.max(scrollPosition - 150, 0);
      tableDataRef.current.scrollLeft = newPosition;
      setScrollPosition(newPosition);
    }
  };

  // Прокрутка вправо
  const scrollTableRight = () => {
    if (tableDataRef.current) {
      const newPosition = Math.min(scrollPosition + 150, maxScroll);
      tableDataRef.current.scrollLeft = newPosition;
      setScrollPosition(newPosition);
    }
  };

  // Обработчик скролла
  const handleScroll = () => {
    if (tableDataRef.current) {
      setScrollPosition(tableDataRef.current.scrollLeft);
    }
  };

  return (
    <div className="body__wrap_results">
      {/* Первая часть - заголовок и изображение */}
      <div className="Results_first-part">
        <div className="first-part__title___container">
          <h1 className="first-part__title">Ищем. Скоро будут результаты</h1>
          <h6 className="first-part__subtitle">Поиск может занять некоторое время, просим сохранять терпение.</h6>
        </div>
        <div className="first-part__img___container">
          <img src={ResultsLadyImg} alt="Поиск результатов" />
        </div>
      </div>
      
      {/* Вторая часть - общая сводка с таблицей */}
      <div className="Results_second-part">
        <div className="second-part__title__container">
          <h3 className="second-part__title">Общая сводка</h3>
          <p className="second-part__subtitle">Найдено 4 221 вариантов</p>
        </div>
        
        {/* Десктопная версия таблицы с прокруткой */}
        <div className="histogram-table-container desktop-version">
          <button 
            className="table-scroll-arrow left-arrow" 
            onClick={scrollTableLeft}
            disabled={scrollPosition === 0}
          >
            <img src={LeftArrow} alt="Прокрутить влево" />
          </button>
          
          <div className="table-scrollable-area">
            {/* Фиксированная левая колонка */}
            <div className="table-fixed-column">
              <table>
                <thead>
                  <tr>
                    <th className="fixed-header">Период</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="fixed-cell data-label">Всего</td>
                  </tr>
                  <tr>
                    <td className="fixed-cell data-label">Риски</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Прокручиваемая часть с данными */}
            <div 
              className="table-data-container"
              ref={tableDataRef}
              onScroll={handleScroll}
            >
              <table className="data-table">
                <thead>
                  <tr>
                    {tableData.map((item, index) => (
                      <th key={index} className="period-header">
                        {item.period}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {tableData.map((item, index) => (
                      <td key={index} className="data-cell total">
                        {item.total}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    {tableData.map((item, index) => (
                      <td key={index} className="data-cell risks">
                        {item.risks === 0 ? "0" : item.risks}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <button 
            className="table-scroll-arrow right-arrow" 
            onClick={scrollTableRight}
            disabled={scrollPosition >= maxScroll}
          >
            <img src={RightArrow} alt="Прокрутить вправо" />
          </button>
        </div>

        {/* Мобильная версия таблицы */}
        <div className="mobile-table-container mobile-version">
          <div className="mobile-table">
            <div className="mobile-table-header">
              <div className="mobile-period">Период</div>
              <div className="mobile-total">Всего</div>
              <div className="mobile-risks">Риски</div>
            </div>
            
            {tableData.map((item, index) => (
              <div key={index} className="mobile-table-row">
                <div className="mobile-period">{item.period}</div>
                <div className="mobile-total">{item.total}</div>
                <div className="mobile-risks">{item.risks === 0 ? "0" : item.risks}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Третья часть - список документов */}
      <div className="Results_third-part">
        <div className="third-part__title__container">
          <h3 className="third-part__title">Список документов</h3>
        </div>
        
        <div className="third-part__documents__container">
          {/* Карточка 1 */}
          <div className="third-part__card">
            <div className="card__date_and_source">
              <p className="card__date">13.09.2021</p>
              <a href="https://KP.ru" className="card__source">Комсомольская правда KP.RU</a>
            </div>
            
            <div className="card__title___container">
              <h4 className="card__title">Скиллфэктори - лучшая онлайн-школа для будущих айтишников</h4>
            </div>
            
            <div className="card__tag">Технические новости</div>
            
            <div className="card__img___container">
              <img src={ResultDocumentImg1Mobile} className="card__img__mobile" alt="Документ 1" />
              <img src={ResultDocumentImg1} className="card__img" alt="Документ 1" />
            </div>
            
            <div className="card__text___container">
              <p>SkillFactory — школа для всех, кто хочет изменить свою карьеру и жизнь...</p>
              <p>Принципы SkillFactory: акцент на практике, забота о студентах и ориентир на трудоустройство...</p>
            </div>
            
            <div className="card__button_and_word-amount">
              <button className="card__button">Читать в источнике</button>
              <p className="card__word-amount">2 543 слова</p>
            </div>
          </div>
          
          {/* Карточка 2 */}
          <div className="third-part__card">
            <div className="card__date_and_source">
              <p className="card__date">15.10.2021</p>
              <a href="https://VC.ru" className="card__source">VC.RU</a>
            </div>
            
            <div className="card__title___container">
              <h4 className="card__title">Работа в Data Science в 2022 году: тренды, навыки и обзор специализаций</h4>
            </div>
            
            <div className="card__tag">Технические новости</div>
            
            <div className="card__img___container">
              <img src={ResultDocumentImg2Mobile} className="card__img__mobile" alt="Документ 2" />
              <img src={ResultDocumentImg2} className="card__img" alt="Документ 2" />
            </div>
            
            <div className="card__text___container">
              <p>Кто такой Data Scientist и чем он занимается? Data Scientist — это специалист...</p>
              <p>В небольших компаниях и стартапах дата-сайентист делает все: собирает и очищает данные...</p>
            </div>
            
            <div className="card__button_and_word-amount">
              <button className="card__button">Читать в источнике</button>
              <p className="card__word-amount">3 233 слова</p>
            </div>
          </div>
        </div>
        
        <div className="third-part__button__container">
          <button className="third-part__button">Показать больше</button>
        </div>
      </div>
    </div>
  );
};

export default Results;