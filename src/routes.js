import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import App from './App/App';
import NotFoundPage from './NotFoundPage';
import Videos from './Videos';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Redirect from="/home" to="/" />
                <Route path="/videos" component={Videos} />
                <Route path="/videos" component={Videos} />
                <Route path="/forums" component={Videos} />
                <Route path="/news" component={Videos} />
                <Route path="/articles" component={Videos} />
                <Route path="/promotions" component={Videos} />
                <Route path="/game-finder" component={Videos} />
                <Route path="/learning-curve" component={Videos} />
                <Route component={NotFoundPage} />
            </Switch>
        </Router>
    );
}

export default Routes;