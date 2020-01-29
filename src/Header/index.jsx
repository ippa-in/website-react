import React from 'react';
import './header.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class Header extends React.PureComponent {
    constructor(props) {
        super(props);
        this.centerTabs = ['Home', 'Videos', 'Forums', 'News', 'Articles', 'Promotions', 'Game Finder', 'Learning Curve'];
    }

    renderRightTabs = () => {
        const pageType = window.location.pathname;
        const { userInfo } = this.props;
        const loginToken = localStorage.getItem('playerID');
        if (!!loginToken && !['/sign-in', '/sign-up/1', '/sign-up/2', '/frgt-pass', '/reset-pass', '/admin'].includes(pageType)) {
            return (
                <Link className='profile-icon' to='./profile'>
                    <div className={'tabs d-flex align-center'} to='/'>
                    <img className='loggedInUser' src='/images/user_icon.png' alt='user_icon' />
                    {userInfo.hasOwnProperty("name") && userInfo.name || ''} <ExpandMoreIcon /></div>
                </Link>
            );
        }
        if (['/sign-in', '/frgt-pass'].includes(pageType)) {
            return (
                <>
                    <div className='loginText'>Don’t have an account?</div>
                    <Link className={'primeButton'} to='/sign-up'>Get Started</Link>
                </>
            );
        }
        if (pageType.includes('/sign-up')) {
            return (
                <>
                    <div className='loginText'>Have an account?</div>
                    <Link className={'primeButton'} to='/sign-in'>Sign In</Link>
                </>
            );
        }
        if (pageType === '/reset-pass' || pageType === '/admin') {
            return <></>;
        }
        return (<>
            <Link className={'tabs'} to='/sign-in'>Sign In</Link>
            <Link className={'getStarted'} to='/sign-up'>Get Started</Link>
        </>);
    }

    render() {
        const { showCenterTabs, style } = this.props;
        return (
            <div className='header' style={style}>
                <div className='d-flex'>
                    <Link to='/'><img className='logo' src='/images/ippa-logo.svg' alt='IPPA-logo' /></Link>
                    {showCenterTabs && <div className='header--list'>{this.centerTabs.map((list, index) =>
                        <Link className={'tabs'} key={`${index}-${list}`} to={`/${list.toLowerCase().replace(' ', '-')}`}>{list}</Link>
                    )}
                    </div>}
                </div>
                <div className='d-flex'>
                    {this.renderRightTabs()}
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    showCenterTabs: PropTypes.bool,
    style: PropTypes.object,
    pageType: PropTypes.string,
    userInfo: PropTypes.object
}

Header.defaultProps = {
    showCenterTabs: true,
    style: {},
    pageType: '',
    userInfo: {},
}

function mapStateToProps(state) {
    const { userInfo } = state.profileReducer;
    return {
        userInfo,
    };
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({
//         ...profileActions
//     }, dispatch)
// }

export default connect(mapStateToProps, null)(Header);