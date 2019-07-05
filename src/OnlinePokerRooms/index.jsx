import React from 'react';
import './onlinePokerRooms.scss';

import PokerDealsCard from '../PokerDealsCard';

export default class OnlinePokerRooms extends React.PureComponent {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className='onlinePokerRoom--container'>
                <div className='pokerRoom--header--container'>
                    <div className='pokerRoom--header'>
                        <header>Top Online Poker Rooms</header>
                        <p>Find here all the information about shows, artists but also our activities.</p>
                    </div>
                </div>
                <div className='pokerRoom--cardContainer'>
                    <PokerDealsCard />
                    <PokerDealsCard />
                    <PokerDealsCard />
                    <PokerDealsCard />
                    <PokerDealsCard />
                    <PokerDealsCard />
                    <PokerDealsCard />
                    <PokerDealsCard />
                </div>
                <div className='d-flex-button'>
                    <div className='viewAll--button'>6 more rooms</div>
                </div>
            </div>
        );
    }
}