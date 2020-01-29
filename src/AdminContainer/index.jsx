import React from 'react';
import './admin.scss';
import LeftNavigation from './leftNavigation';
import Header from './header.jsx';
import Dashboard from './Dashboard';
import UploadDashboard from './uploadDashboard';

import _ from "lodash";

class AdminContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.page = _.get(props.match, 'params.page', '');
    }

    renderContent() {
        switch(this.page) {
            case 'login': return 'If user is already logged in then redirect him to dashboard else show login page.';
            case 'dashboard': return <Dashboard />;
            case 'approvals': return 'approvals';
            case 'points': return 'points';
            case 'dashboard_images': return <UploadDashboard />;
            case 'users': return 'users';
            case 'transaction_history': return 'transactions history';
            default: return "Congrats!"
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