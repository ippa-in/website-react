import React from 'react';
import './admin.scss';
import LeftNavigation from './leftNavigation';
import Header from './header.jsx';
import Dashboard from './Dashboard';
import UploadDashboard from './uploadDashboard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import _ from "lodash";

import { getNavigationBarData, getContainerData, getFilterData } from './actions';
import Transactions from './transactions';

class AdminContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.page = _.get(props.match, 'params.page', '');
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.navigationData.length !== nextProps.navigationData.length 
            // || this.props.match.params.page !== nextProps.match.params.page
            ) {
            const section = nextProps.match.params.page;
            const segmentData = nextProps.navigationData.find(data =>
                data.segment.replace(" ", "_").toLowerCase() === section
            ) || {};
            const subSegmentData = Object.keys(segmentData).length ? segmentData.sub_segment : [];
            let queryData = {};
            if (subSegmentData.length === 1) {
                queryData = { ...subSegmentData[0] }
            } else {
                queryData = {
                    ...subSegmentData.find(data =>
                        data.name.replace(" ", "_").toLowerCase() === nextProps.match.params.section
                    )
                };

            }
            const data = {
                display_name: queryData.content_type,
                sort_query: JSON.stringify(queryData.sort_key),
                ...queryData.filter_query,

            };
            nextProps.getFilterData({ display_name: queryData.content_type });
            nextProps.getContainerData(data);
        }
    }

    renderContent() {
        switch (this.page) {
            case 'login': return 'If user is already logged in then redirect him to dashboard else show login page.';
            case 'dashboard': return <Dashboard />;
            case 'approvals': return 'approvals';
            case 'points': return 'points';
            case 'dashboard_images': return <UploadDashboard />;
            case 'users': return 'users';
            case 'transaction_history': return <Transactions />;
            default: return "Congrats!"
        }
    }

    render() {
        if (this.props.match.path === '/admin/:page') {
            this.page = _.get(this.props.match, 'params.page', '');
        } else {
            this.page = _.get(this.props.match, 'params.section', '');
        }
        return (
            <div className='adm-parent'>
                <LeftNavigation page={this.page} />
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

function mapStateToProps(state) {
    const { navigationData } = state.AdminReducer;
    return { navigationData };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getNavigationBarData,
        getContainerData,
        getFilterData,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer);