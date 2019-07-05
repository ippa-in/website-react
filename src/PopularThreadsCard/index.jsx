import React from 'react';
import './popularThreadsCard.scss';

import PropTypes from 'prop-types';

const PopularThreadsCard = (props) => {

    return (
        <div className='popularThreadsCard--parent'>
            <header className='popularThreads--header'>Get Rich or Die Tryin' - The Bankroll Challenge - Reporting thread</header>
            <div className='popularThreads--details'>
                <div>
                    <img src='/images/calendar-icon.svg' alt='calendar-icon' />
                    <span className='popularThreads--value'>Andrew Simmon</span>
                </div>
                <div>
                    <img src='/images/calendar-icon.svg' alt='calendar-icon' />
                    <span className='popularThreads--value'>01.05.2019</span>
                </div>
                <div>
                    <img src='/images/view-icon.svg' alt='view-icon' />
                    <span className='popularThreads--value'>100 views</span>
                </div>
                <div>
                    <img src='/images/view-icon.svg' alt='view-icon' />
                    <span className='popularThreads--value'>10 likes</span>
                </div>
                <div>
                    <img src='/images/view-icon.svg' alt='view-icon' />
                    <span className='popularThreads--value'>30 replies</span>
                </div>
            </div>
        </div>
    );
}

PopularThreadsCard.propTypes = {

}

PopularThreadsCard.defaultProps = {

}

export default PopularThreadsCard;