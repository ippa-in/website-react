import React from 'react';

import './App.scss';
import Header from '../Header';
import Footer from '../Footer';
import Referral from '../Referral';
import Carousel from '../Carousel';
import PopularVideos from '../PopularVideos';
import PopularArticles from '../PopularArticles';
import OnlinePokerRooms from '../OnlinePokerRooms';
import PopularThreads from '../PopularThreads';

function App(props) {
  return (
    <div className="App">
      <Header />
      <div className='appBody'>
        <Carousel />
        <PopularVideos />
        <OnlinePokerRooms />
        <PopularThreads />
        <PopularArticles />
        <Referral />
        <Footer />
      </div>
    </div>
  );
}

export default App;