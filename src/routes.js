import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

import App from './App/App';
import NotFoundPage from './NotFoundPage';
import Videos from './Videos';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Profile from './Profile';
import AdminContainer from './AdminContainer'

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={App} />
            <Redirect from="/home" to="/" />
            <Route path="/videos" component={Videos} />
            <Route path="/forums" component={Videos} />
            <Route path="/news" component={Videos} />
            <Route path="/articles" component={Videos} />
            <Route path="/promotions" component={Videos} />
            <Route path="/game-finder" component={Videos} />
            <Route path="/learning-curve" component={Videos} />
            <Route exact path={['/sign-in', '/frgt-pass', '/reset-pass']} component={SignIn} />
            <Route path="/sign-up/:step" component={SignUp} />
            <Redirect from="/sign-up" to="/sign-up/1" />
            <Route path="/profile" component={Profile} />
            <Route path="/admin/:page" component={AdminContainer} />
            <Redirect from="/admin" to="/admin/login" />
            {/* <Route path="/admin/upload" component={AdminContainer} /> */}
            <Route path="*" component={NotFoundPage} />
        </Switch>
    );
}

export default Routes;