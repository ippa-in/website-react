import React, { Component } from 'react';
import './header.scss';
import { NavLink, Link } from 'react-router-dom';

import NavigationItem from './NavigationItem/navigationItem';
import { connect } from 'react-redux';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import * as actions from '../../../Profile/actionCreators';

class Header extends Component {
  constructor(props) {
    super(props);
    this.navigationTabs = [
      {
        title: 'Home',
        link: '/',
        exact: true
      },
      {
        title: 'Rewards',
        link: '/rewards',
        exact: false
      }
    ];
    this.profileDet = React.createRef();
  }

  componentDidMount () {
    this.props.getUserInfo();
  }

  profileToggleHandler = (e) => {
    e.preventDefault();
    let ele = this.profileDet.current;
    ele.classList.toggle('active');
  }

  headerUIHandler = () => {
    const { userInfo } = this.props;
    console.log(userInfo);
    const loginToken = localStorage.getItem('playerID');
    if(loginToken) {
      return (<div className="auth__profile">
        <div className="auth__profile-user" onClick={this.profileToggleHandler}>
          <span className="auth__profile-img"><img src='/images/user_icon.png' alt='user_icon' width="40"/></span>
          <label className="auth__profile-name">
            {(userInfo.hasOwnProperty("name") && userInfo.name) || ''} <span className="auth__profile-more"> <ExpandMoreIcon /></span>
          </label>
        </div>
        <div ref={this.profileDet} className="auth__profile-detail">
          <ul className="auth__detail-list">
            <li className="auth__detail-list--item">
                <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
      </div>);
    }
    return <>
      <Link to="/sign-in" className="auth__btn auth__link">Sign In</Link>
      <Link to="/sign-up" className="auth__btn auth__btn-primary">Get Started</Link>
    </>
  }

  render () {
    return (
      <header class="site__header">
        <div class="site__brand">
        <Link to="/" exact class="brand__link"><img src='/images/ippa-logo.svg' alt="IPPA.in" width="100"></img></Link>
        </div>
        <nav class="site__nav">
          <ul class="nav__list">
            {this.navigationTabs.map((lnk, i) => {
              return <NavigationItem link={lnk.link} key={i} exact={lnk.exact}>{lnk.title}</NavigationItem>
            })}
          </ul>
        </nav>
        <div class="header__authContainer">
          {this.headerUIHandler()}
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  const { userInfo } = state.profileReducer;
  return {
    userInfo,
  };
}

const mapDipatchToProps = dispatch => {
  return {
    getUserInfo: () => dispatch(actions.getUserInfo())
  }
}

export default connect(mapStateToProps, mapDipatchToProps)(Header);