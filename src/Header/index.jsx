import React from 'react';
import './header.scss';

export default class Header extends React.PureComponent {
    constructor(props) {
        super(props);
        this.headerList = ['Home', 'Videos', 'Forums', 'News', 'Articles', 'Promotions', 'Game Finder', 'Learning Curve'];
    }

    render() {
        return (
            <div className='parent'>
            <div className='d-flex'>
                <div className='logo'>IPPA.in</div>
                <ul>{this.headerList.map((list, index) =>
                    <li>{list}</li>
                )}
                </ul>
                </div>
                <div className='d-flex'>
                    <div className='signIn'>Sign In</div>
                    <div className='getStarted'>Get Started</div>
                </div>
            </div>
        );
    }
}