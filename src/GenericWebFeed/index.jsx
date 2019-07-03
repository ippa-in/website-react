import React from 'react';
import './genericWebFeed.scss';

import PropTypes from 'prop-types';

const GenericWebFeed = (props) => {
    const { style } = props;
    return (
        <div style={style}>
            <img src='/images/videos/video-1.jpg' alt='' className='feed--parent-image' />
            <div className='calendar--view--container'>
                <div>
                    <img src='/images/calendar-icon.svg' alt='calendar-icon' />
                    <span>01.05.2019</span>
                </div>
                <div>
                    <img src='/images/view-icon.svg' alt='view-icon' />
                    <span>100 views</span>
                </div>
            </div>
            <div className='feed--header'>Beating the On Demand SNGs</div>
            <p className='feed--details'>Find here all the information about shows, artists but also our activities.</p>
            <div className='popular--tags'>
                <span>Rookie</span>
                <span>Poker Lessons</span>
            </div>
        </div>
    );
}

GenericWebFeed.propsTypes = {
    style: PropTypes.object
}

GenericWebFeed.defaultProps = {
    style: {}
}

export default GenericWebFeed;