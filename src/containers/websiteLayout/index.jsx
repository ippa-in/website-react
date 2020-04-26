import React, { Component } from 'react';

import Header from '../UI/Header/header';
import Footer from '../UI/Footer/footer';

class WebsiteLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let webpageUI = <article>
        <Header />
        <main>{this.props.children}</main>
        <Footer />
    </article>;
    if(!localStorage.getItem("key") && (localStorage.getItem("key") !== "clinton")) webpageUI = <></>;
    
    return (
      webpageUI
    );
  }
}

export default WebsiteLayout;