import React from 'react';
import {NavLink} from 'react-router-dom';

const AppBar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <div className="container-md">
        <NavLink className="navbar-brand" to="/">Quotes Central</NavLink>
      </div>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" to="/">Quotes</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/add-quote">Submit new quote</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AppBar;