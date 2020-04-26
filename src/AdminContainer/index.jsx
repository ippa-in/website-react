import React from 'react';
import './admin.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';

import LeftNavigation from './leftNavigation';
import Header from './header';
import Dashboard from './Dashboard';
import UploadDashboard from './uploadDashboard';
import Points from './points';
import Users from './users';
import Transactions from './transactions';
import Approvals from './approvals';
import AdminRewards from './rewards';


import _ from "lodash";

import { getNavigationBarData, getContainerData, getFilterData } from './actions';
import { getUserInfo } from '../Profile/actionCreators';

class AdminContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.page = _.get(props.match, 'params.page', '');
        this.state = {
            openPointsDialog: false,
            openRewardsDialog: false
        }
    }

    componentDidMount() {
        const playerID = localStorage.getItem('playerID');
        const playerToken = localStorage.getItem('playerToken');
        if(!(playerID && playerToken)) {
            this.props.push('/admin/login');
        } else {
            this.props.getUserInfo();
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
                if (!subSegmentData[0].filter_query) {
                    let pageSection = nextProps.match.params.section;
                    if (pageSection) {
                        let pageName = '';
                        if (pageSection.includes('kyc')) pageName = 'kyc';
                        if (pageSection.includes('withdraw')) pageName = 'withdrawals';
                        if (pageSection.includes('ba')) pageName = 'bank_info';
                        const tertiarySegment = subSegmentData.find(data => data.name.toLowerCase().includes(pageName))?.tertiary_segment || [];
                        queryData = tertiarySegment.find(data => data.content_type === pageSection) || {};
                    } else {
                        queryData = subSegmentData[0].tertiary_segment[0];
                    }
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

    toggleRewardDialog = (bool) => {
        this.setState({
            openRewardsDialog: bool || !this.state.openRewardsDialog
        })
    }

    renderContent() {
        let pageName = this.page;
        if (pageName.includes('kyc')) pageName = 'kyc';
        if (pageName.includes('withdraw')) pageName = 'withdrawals';
        if (pageName.includes('ba')) pageName = 'bank_info';
        switch (pageName) {
            case 'dashboard': return <Dashboard />;
            case 'kyc':
            case 'withdrawals':
            case 'bank_info': return <Approvals page={this.page} navigationData={this.props.navigationData} />;
            case 'points': return <Points
                openPointsDialog={this.state.openPointsDialog}
                togglePointsDialog={this.togglePointsDialog}
            />;
            case 'dashboard_images': return <UploadDashboard />;
            case 'users': return <Users />;
            case 'transaction_history': return <Transactions />;
            case 'reward_uploads': return <AdminRewards
                openRewardsDialog={this.state.openRewardsDialog} 
                toggleRewardDialog={this.toggleRewardDialog}
            />;
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
                        toggleRewardDialog={this.toggleRewardDialog}
                        push={this.props.push}
                        userInfo={this.props.userInfo}
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
    const { userInfo } = state.profileReducer;
    return { navigationData, userInfo };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getNavigationBarData,
        getContainerData,
        getFilterData,
        getUserInfo,
        push,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer);