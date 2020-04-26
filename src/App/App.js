import React from 'react';

import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';

import WebsiteLayout from './../containers/websiteLayout/';
import Home from './../containers/websiteLayout/home/home';
import Rewards from './../containers/websiteLayout/rewards/rewards';
import Profile from './../Profile';

import AdminContainer from './../AdminContainer';
import SignIn from './../SignIn';
import SignUp from './../SignUp';

export default class App extends React.PureComponent {

  render() {
    // if (localStorage.getItem("key") === "clinton") {
    //   return (
    //     <div className="App">
    //       {/* <Header /> */}
    //       <div className='appBody' >
    //         {/* style={{ width: window.screen.width }}> */}
    //         {/* <Carousel /> */}
    //         {/* <PopularVideos /> */}
    //         {/* <OnlinePokerRooms /> */}
    //         {/* <PopularThreads /> */}
    //         {/* <PopularArticles /> */}
    //         {/* <Referral /> */}
    //         {/* <Footer /> */}
    //         {/* <div className="cursor cursor--inner"></div> */}
    //         {/* <div className="cursor cursor--outer"></div> */}
    //       </div>
    //     </div>
    //   );
    // } else {
    //   return(<></>);
    // }
    {/* <Route path="/admin/:path?" exact></Route> */}
    return (
      <Switch>
        <Route exact path={['/sign-in', '/frgt-pass', '/reset-pass', '/admin/login']} component={SignIn} />
        <Route path="/sign-up/:step" component={SignUp} />
        <Redirect from="/sign-up" to="/sign-up/1" />
        <Route exact path="/admin/:page" component={AdminContainer} />
        <Route path="/admin/:page/:section" component={AdminContainer} />
        {/* <Redirect from="/admin" to="/admin/dashboard" /> */}
        <Redirect from="/admin" to="/admin/approvals/pending_kyc_segment" />
        <Redirect from="/admin/dashboard" to="/admin/approvals/pending_kyc_segment" />
        <Route path="/profile" component={Profile} />
        <Route path="/:path?" exact>
          <WebsiteLayout>
            <Switch>
              <Route path="/" exact component={Home} />   
              <Route path="/rewards" exact component={Rewards} />          
              </Switch>
          </WebsiteLayout>
        </Route>
      </Switch>
    );
  }
}