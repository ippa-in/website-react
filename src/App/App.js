import React from 'react';

import './App.scss';
import Header from '../Header';
import Footer from '../Footer';

function App(props) {
  return (
    <div className="App">
      <Header />
      <div className='appBody'>
        <Footer />
      </div>
    </div>
  );
}

export default App;