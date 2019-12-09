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

export default class App extends React.PureComponent {
  // constructor(props) {
  //   super(props);
  //   document.addEventListener('mousemove', (e) => {
  //     let custCursor = document.querySelectorAll('.cursor');
  //     // custCursor[0].setAttribute('style', `transform: matrix(1, 0, 0, 1, ${e.pageX}, ${e.pageY});`);
  //     custCursor[0].setAttribute('style', `top: ${e.pageY}px; left: ${e.pageX}px;`)
  //     custCursor[1].setAttribute('style', `top: ${e.pageY}px; left: ${e.pageX}px;`)
  //     // custCursor[1].setAttribute('style', `transform: translate3d(${e.pageX}px, ${e.pageY}px, 0px);`);
  //   });
  // }

  render() {
    return (
      <div className="App">
        <Header />
        <div className='appBody' > 
         {/* style={{ width: window.screen.width }}> */}
          <Carousel />
          <PopularVideos />
          {/* <OnlinePokerRooms /> */}
          {/* <PopularThreads /> */}
          {/* <PopularArticles /> */}
          {/* <Referral /> */}
          <Footer />
          {/* <div className="cursor cursor--inner"></div> */}
          {/* <div className="cursor cursor--outer"></div> */}
        </div>
      </div>
    );
  }
}