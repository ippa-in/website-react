import React from 'react';
import './admin.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LeftNavigation from './leftNavigation';
import Header from './header';
import Dashboard from './Dashboard';
import UploadDashboard from './uploadDashboard';
import Points from './points';
import Users from './users';
import Transactions from './transactions';
import Approvals from './approvals';

import _ from "lodash";

import { getNavigationBarData, getContainerData, getFilterData } from './actions';

class AdminContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.page = _.get(props.match, 'params.page', '');
        this.state = {
            openPointsDialog: false,
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.navigationData.length !== nextProps.navigationData.length
            || this.props.match.params.page !== nextProps.match.params.page
        ) {
            const section = nextProps.match.params.page;
            const segmentData = nextProps.navigationData.find(data =>
                data.segment.replace(" ", "_").toLowerCase() === section
            ) || {};
            const subSegmentData = Object.keys(segmentData).length ? segmentData.sub_segment : [];
            let queryData = {};
            if (!subSegmentData.length) return;
            if (subSegmentData.length === 1) {
                queryData = { ...subSegmentData[0] }
            } else {
                if(!subSegmentData[0].filter_query) {
                    queryData = subSegmentData[0].tertiary_segment[0];
                } else {
                    queryData = {
                        ...subSegmentData.find(data =>
                            data.name.replace(" ", "_").toLowerCase() === nextProps.match.params.section
                        )
                    };
                }
            }
            const data = {
                display_name: queryData.content_type,
                sort_query: JSON.stringify(queryData.sort_key),
                ...queryData.filter_query,

            };
            sessionStorage.setItem("searchContent", JSON.stringify(data));
            nextProps.getFilterData({ display_name: queryData.content_type });
            nextProps.getContainerData(data);
        }
    }

    togglePointsDialog = (value) => {
        this.setState({ openPointsDialog: value || !this.state.openPointsDialog });
    };

    renderContent() {
        let pageName = this.page;
        if(pageName.includes('kyc')) pageName = 'kyc';
        if(pageName.includes('withdrawls')) pageName = 'withdrawals';
        if(pageName.includes('bank_info')) pageName = 'bank_info';
        switch (pageName) {
            case 'login': return 'If user is already logged in then redirect him to dashboard else show login page.';
            case 'dashboard': return <Dashboard />;
            // case 'approvals': return <Approvals />;
            case 'kyc':
            case 'withdrawals':
            case 'bank_info': return <Approvals page={this.page} navigationData={this.props.navigationData}/>;
            case 'points': return <Points
                openPointsDialog={this.state.openPointsDialog}
                togglePointsDialog={this.togglePointsDialog}
            />;
            case 'dashboard_images': return <UploadDashboard />;
            case 'users': return <Users />;
            case 'transaction_history': return <Transactions />;
            default: return "404! Page not found!"
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
                    <Header
                        page={this.page}
                        togglePointsDialog={this.togglePointsDialog}
                    />
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