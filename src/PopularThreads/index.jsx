import React from 'react';
import './popularThreads.scss';

import PopularThreadsCard from '../PopularThreadsCard';

export default class PopularThreads extends React.PureComponent {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className='popularThreads--container'>
                <div className='popularThreads--header'>
                    <header>Popular Threads</header>
                    <p>Find here all the information about shows, artists but also our activities.</p>
                </div>
                <div className='popularThreadsCard--container'>
                    <PopularThreadsCard />
                    <PopularThreadsCard />
                    <PopularThreadsCard />
                    <PopularThreadsCard />
                    <PopularThreadsCard />
                </div>
                <div className='d-flex-button'>
                    <div className='viewAll--button'>View all threads</div>
                </div>
            </div>
        );
    }
}