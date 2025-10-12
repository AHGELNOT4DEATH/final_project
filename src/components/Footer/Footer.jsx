import React from 'react';
import FooterLogo from '../../assets/images/Footer-logo.svg';

const Footer = () => {
  return (
    <footer>
      <img className="footer_logo" src={FooterLogo} alt="СКАН" />
      <div className="contact_information__container___wrap">
        <div className="contact_information__container">
          <ul className="contact_information">
            <li className="adress">г. Москва, Цветной б-р, 40</li>
            <li className="phone_number">
              <a href="tel:+74957712111">+7 495 771 21 11</a>
            </li>
            <li className="mail_box">
              <a href="mailto:info@skan.ru">info@skan.ru</a>
            </li>
          </ul>
          <div className="copyright">
            <p>Copyright. 2022</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;