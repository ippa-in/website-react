import React from 'react';
import './admin.scss';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     useParams,
//     useRouteMatch
// } from "react-router-dom";
import LeftNavigation from './leftNavigation';
import Header from './header';
import Dashboard from './Dashboard';

import _ from "lodash";

class AdminContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.page = _.get(props.match, 'params.page', '');
    }

    renderContent() {
        switch(this.page) {
            case 'login': return 'If nigga is already logged in then redirect him to dashboard else show login page.';
            case 'dashboard': return <Dashboard />;
            case 'approvals': return 'approvals';
            case 'uploads': return 'uploads';
            case 'users': return 'users';
            case 'transactions': return 'transactions history';
            default: return "fuck you!"
        }
    }

    render() {
        this.page = _.get(this.props.match, 'params.page', '');
        return (
            <div className='adm-parent'>
                <LeftNavigation page={this.page}/>
                <div className='right-page'>
                    <Header />
                    <div className='content-page'>
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminContainer;