import React from 'react';
import './header.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Header extends React.PureComponent {
    constructor(props) {
        super(props);
        this.centerTabs = ['Home', 'Videos', 'Forums', 'News', 'Articles', 'Promotions', 'Game Finder', 'Learning Curve'];
    }

    renderRightTabs = () => {
        const pageType = window.location.pathname;
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
        if(pageType === '/reset-pass') {
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
    pageType: PropTypes.string
}

Header.defaultProps = {
    showCenterTabs: true,
    style: {},
    pageType: ''
}