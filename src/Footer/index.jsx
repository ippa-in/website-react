import React from 'react';
import './footer.scss';

export default class Footer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.footerData = [
            {
                title: 'Services',
                links: ['Videos', 'Forums', 'News', 'Articles', 'Promotions', 'Game Finder', 'Learning Curve']
            },
            {
                title: 'Resources',
                links: ['Press', 'Blogs']
            },
            {
                title: 'Support',
                links: ['Terms', 'Policy']
            }
        ];
    }

    render() {
        return (
            <div>
                <div className='footer--parent'>
                <div className='footerData--left'>
                    <div className='multi--content'>
                        <div className='title'>
                            Where to find us
                        <div className='content'>
                                Global Maritime Forum<br />
                                Amaliegade 33B, 2nd Floor<br />
                                1256 Copenhagen K<br />
                                Denmark </div>
                        </div>
                        <div className='title'>
                            Follow us
                        <div className='content followUs'>
                                <img src='/images/facebook-logo.svg' alt='facebook' />
                                <img src='/images/twitter-logo.svg' alt='twitter' />
                                <img src='../images/instagram-logo.svg' alt='instagram' />
                                <img src='../images/youtube-logo.svg' alt='youtube' />
                            </div>
                        </div>
                    </div>
                    <div className='title'>
                        Get in touch
                    <ul className='content'>
                            <li>+45 3840 1800</li>
                            <li>info@ippa.in</li>
                        </ul>
                    </div>
                    </div>
                    <div className='footerData--right'>
                        {this.footerData.map((data, index) =>
                            <div className='title' key={`${index}-${data.title}`}>
                                {data.title}
                                <ul className='content'>
                                    {data.links.map((tags, i) => <li key={`${i}-${tags}`}>{tags}</li>)}
                                </ul>
                            </div>)}
                    </div>
                </div>
                <div className='copyRight'>Copyright © 2019 Indian Poker Players Association. All rights reserved.</div>
            </div>
        );
    }
}