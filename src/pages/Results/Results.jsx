import React from 'react';
import './Results.css';

// Импорт изображений
import ResultsLadyImg from '../../assets/Images/Results__lady_img.svg';
import ExelResults from '../../assets/Images/Exel__results.svg';
import ResultDocumentImg1 from '../../assets/Images/Result__document__img_1.png';
import ResultDocumentImg1Mobile from '../../assets/Images/Result__document__img_1__mobile.png';
import ResultDocumentImg2 from '../../assets/Images/Result__document__img_2.png';
import ResultDocumentImg2Mobile from '../../assets/Images/Result__document__img_2__mobile.png';

const Results = () => {
  return (
    <div className="body__wrap_results">
      <div className="Results_first-part">
        <div className="first-part__title___container">
          <h1 className="first-part__title">Ищем. Скоро будут результаты</h1>
          <h6 className="first-part__subtitle">Поиск может занять некоторое время, просим сохранять терпение.</h6>
        </div>
        <div className="first-part__img___container">
          <img src={ResultsLadyImg} alt="Поиск результатов" />
        </div>
      </div>
      
      <div className="Results_second-part">
        <div className="second-part__title__container">
          <h3 className="second-part__title">Общая сводка</h3>
          <p className="second-part__subtitle">Найдено 4 221 вариантов</p>
        </div>
        <div className="second-part__img___container">
          <img src={ExelResults} alt="График результатов" />
        </div>
      </div>
      
      <div className="Results_third-part">
        <div className="third-part__title__container">
          <h3 className="third-part__title">Список документов</h3>
        </div>
        
        <div className="third-part__documents__container">
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
              <p className="card__text___first-part">
                SkillFactory — школа для всех, кто хочет изменить свою карьеру и жизнь. С 2016 года обучение прошли 20 000+ человек из 40 стран с 4 континентов, самому взрослому студенту сейчас 86 лет. Выпускники работают в Сбере, Cisco, Bayer, Nvidia, МТС, Ростелекоме, Mail.ru, Яндексе, Ozon и других топовых компаниях.
              </p>
              <p className="card__text___second-part">
                Принципы SkillFactory: акцент на практике, забота о студентах и ориентир на трудоустройство. 80% обучения — выполнение упражнений и реальных проектов. Каждого студента поддерживают менторы, 2 саппорт-линии и комьюнити курса. А карьерный центр помогает составить резюме, подготовиться к собеседованиям и познакомиться с IT-рекрутерами.
              </p>
            </div>
            
            <div className="card__button_and_word-amount">
              <button className="card__button">Читать в источнике</button>
              <p className="card__word-amount">2 543 слова</p>
            </div>
          </div>
          
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
              <p className="card__text___first-part">
                Кто такой Data Scientist и чем он занимается? Data Scientist — это специалист, который работает с большими массивами данных, чтобы с их помощью решить задачи бизнеса. Простой пример использования больших данных и искусственного интеллекта — умные ленты в социальных сетях. На основе ваших просмотров и лайков алгоритм выдает рекомендации с контентом, который может быть вам интересен. Эту модель создал и обучил дата-сайентист, и скорее всего, не один.
              </p>
              <p className="card__text___second-part">
                В небольших компаниях и стартапах дата-сайентист делает все: собирает и очищает данные, создает математическую модель для их анализа, тестирует ее и презентует готовое решение бизнесу.
              </p>
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