import React from 'react';

import './App.scss';
import Header from '../Header';
import Footer from '../Footer';
import Referral from '../Referral';
import Carousel from '../Carousel';
import PopularVideos from '../PopularVideos';
import PopularArticles from '../PopularArticles';

function App(props) {
  return (
    <div className="App">
      <Header />
      <div className='appBody'>
        <Carousel />
        <PopularVideos />
        <PopularArticles />
        <Referral />
        <Footer />
      </div>
    </div>
  );
}

export default App;