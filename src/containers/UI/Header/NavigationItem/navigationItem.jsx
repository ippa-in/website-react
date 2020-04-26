import React from 'react';
import { NavLink } from 'react-router-dom'
import './navigationItem.scss';

const NavigationItem = props => (
  <li className="nav__item">
    <NavLink
      to={props.link}
      exact={props.exact}
      activeClassName="nav__item--active"
     >{props.children}</NavLink>
  </li>
);

export default NavigationItem;