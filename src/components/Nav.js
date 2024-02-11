import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      
      <NavLink className="navbar-brand" to="/" style={{ width: '2%'}}> <img src={process.env.PUBLIC_URL + '/cloudy.png'} alt=''/> </NavLink>
     
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">MENU 
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/" activeClassName="active" exact>Search Weather<span className="sr-only">(current)</span></NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/cities" activeClassName="active">Cities Weather</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
