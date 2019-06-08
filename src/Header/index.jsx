import React from 'react';
import './header.scss';
import { Link } from 'react-router-dom';

export default class Header extends React.PureComponent {
    constructor(props) {
        super(props);
        this.headerList = ['Home', 'Videos', 'Forums', 'News', 'Articles', 'Promotions', 'Game Finder', 'Learning Curve'];
    }

    render() {
        return (
            <div className='header'>
                <div className='d-flex'>
                    <div className='logo'>IPPA.in</div>
                    <div className='header--list'>{this.headerList.map((list, index) =>
                        <Link className={'tabs'} key={`${index}-${list}`} to={`/${list.toLowerCase().replace(' ', '-')}`}>{list}</Link>
                    )}
                    </div>
                </div>
                <div className='d-flex'>
                    <div className='signIn'>Sign In</div>
                    <div className='getStarted'>Get Started</div>
                </div>
            </div>
        );
    }
}