import React from 'react';
import { FaTasks } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <FaTasks className="header-icon" />
        <div>
          <h1>TaskBoard</h1>
          <p>A Simple Task Manager with Redux</p>
        </div>
      </div>
    </header>
  );
};

export default Header;