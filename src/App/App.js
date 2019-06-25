import React from 'react';

import './App.scss';
import Header from '../Header';
import Footer from '../Footer';
import Referral from '../Referral';

function App(props) {
  return (
    <div className="App">
      <Header />
      <div className='appBody'>
        <Referral />
        <Footer />
      </div>
    </div>
  );
}

export default App;