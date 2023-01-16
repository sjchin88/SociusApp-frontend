import { useState, useEffect } from 'react';
import logo from '@assets/images/logo.svg';
import { FaCaretDown, FaRegBell, FaRegEnvelope } from 'react-icons/fa';

import '@components/header/Header.scss';
import Avatar from '@components/avatar/Avatar';
import { Utils } from '@services/utils/utils.service';

const Header = () => {
  const [environment, setEnvironment] = useState('');
  const bgColor = `${environment === 'DEV' ? '#50b5ff' : environment === 'STG' ? '#e9710f' : ''}`;
  useEffect(() => {
    const env = Utils.appEnvironment();
    setEnvironment(env);
  }, []);
  return (
    <>
      <div className="header-nav-wrapper" data-testid="header-wrapper">
        <div className="header-navbar">
          <div className="header-image" data-testid="header-image">
            <img src={logo} className="img-fluid" alt="" />
            <div className="app-name">
              Socius
              {environment && (
                <span className="environment" style={{ backgroundColor: `${bgColor}` }}>
                  {environment}
                </span>
              )}
            </div>
          </div>
          <div className="header-menu-toggle">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <ul className="header-nav">
            <li className="header-nav-item active-item">
              <span className="header-list-name">
                <FaRegBell className="header-list-icon" />
                <span className="bg-danger-dots dots" data-testid="notification-dots">
                  5
                </span>
              </span>
              {/* display notification drop down */}
              <ul className="dropdown-ul">
                <li className="dropdown-li"></li>
              </ul>
              &nbsp;
            </li>
            <li className="header-nav-item active-item">
              <span className="header-list-name">
                <FaRegEnvelope className="header-list-icon" />
                <span className="bg-danger-dots dots" data-testid="messages-dots"></span>
              </span>
              &nbsp;
            </li>
            <li className="header-nav-item">
              <span className="header-list-name profile-image">
                <Avatar name="Testy" bgColor="green" textColor="#ffffff" size={40} avatarSrc="" />
              </span>
              <span className="header-list-name profile-name">
                Testy
                <FaCaretDown className="header-list-icon caret" />
              </span>
              <ul className="dropdown-ul">
                <li className="dropdown-li"></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Header;
