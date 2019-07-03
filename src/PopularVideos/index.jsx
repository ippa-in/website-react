import React from 'react';
import './popularVideos.scss';

import GenericWebFeed from '../GenericWebFeed';

export default class PopularVideos extends React.PureComponent {
    // constructor(props) {
    // super(props);
    // }

    render() {
        return (
            <div className='popular--header'>
                <div className='popular--left-section'>
                    <header>Popular Videos</header>
                    <p>Find here all the information about shows, artists but also our activities.</p>
                    <div>
                        <img src='/images/slider-arrow.svg' alt='slider-arrow' />
                        <img src='/images/slider-arrow.svg' alt='slider-arrow' className='popular--left--arrow' />
                    </div>
                    <div className='popular--viewAll'>View all videos</div>
                </div>
                <div className='popular--right-section'>
                    <GenericWebFeed
                        style={{ padding: '0 30px' }}
                    />
                    <GenericWebFeed
                        style={{ padding: '0 30px' }}
                    />
                    <GenericWebFeed
                        style={{ padding: '0 30px' }}
                    />
                    <GenericWebFeed
                        style={{ padding: '0 30px' }}
                    />
                </div>
            </div>
        );
    }
}