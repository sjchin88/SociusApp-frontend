import React from 'react';
import { Outlet } from 'react-router-dom';
import '@pages/social/Social.scss';
import Header from '@components/header/Header';

const Social = () => {
  return (
    <>
      <Header />
      <div className="dashboard">
        <div className="dashboard-sidebar">Sidebar</div>
        <div className="dashboard-content">
          {/* every child will be display within the Outlet */}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Social;
