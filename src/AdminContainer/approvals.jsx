import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CustomTable from '../customComponents/customTable';

import { getContainerData, getFilterData, } from './actions';

class Approvals extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'kyc_verification',
            selectedFilter: 'pending',
        };
        this.tabs = ['KYC Verification', 'Withdrawals', 'Bank Info'];
        this.filters = ['Pending', 'Approved', 'Declined'];
    }

    handleClick = (type, value) => {
        if(type === 'tab') {
            this.setState({ selectedTab: value.replace(" ", "_").toLowerCase() }, this.getData);
        } else {
            this.setState({ selectedFilter: value.toLowerCase() }, this.getData);
        }
    }

    getData = () => {
        const { navigationData } = this.props;
        const { selectedFilter, selectedTab } = this.state;
        const subSegmentData = navigationData.find(data => data.segment === 'Approvals').sub_segment || [];
        const tertiarySegment = subSegmentData.find(data => data.name.replace(" ", "_").toLowerCase() === selectedTab)?.tertiary_segment || [];
        const reqTertiarySegment = tertiarySegment.find(data => data.name.toLowerCase() === selectedFilter) || {};
        
        const data = {
            display_name: reqTertiarySegment.content_type,
            sort_query: JSON.stringify(reqTertiarySegment.sort_key),
            ...reqTertiarySegment.filter_query,

        };
        this.props.getFilterData({ display_name: reqTertiarySegment.content_type });
        this.props.getContainerData(data);
        // this.props.push(`/admin/${url}`)
    }

    render() {
        const { columns, containerData } = this.props;
        const { selectedTab, selectedFilter } = this.state;
        return (<>
            <div className='approvals-tabs--wrapper'>
                {this.tabs.map(tab =>
                    <div
                        key={tab.replace(" ", "_").toLowerCase()}
                        className={tab.replace(" ", "_").toLowerCase() === selectedTab ? 'selected' : ''}
                        // onClick={() => this.setState({ selectedTab: tab.replace(" ", "_").toLowerCase() })}
                        onClick={() => this.handleClick('tab', tab)}
                    >
                        {tab}
                    </div>
                )}
            </div>
            <div className='main-content'>
                <div className='filters'>
                    {this.filters.map(filter =>
                        <span
                            key={filter.toLowerCase()}
                            className={filter.toLowerCase() === selectedFilter ? 'selected' : ''}
                            onClick={() => this.handleClick('filter', filter)}
                        >
                            {filter}
                        </span>
                    )}
                </div>
                <CustomTable
                    headers={columns}
                    tableData={containerData}
                />
            </div>
        </>);
    }
}

function mapStateToProps(state) {
    const { tableHelpers, containerData } = state.AdminReducer;
    const columns = tableHelpers.colums || [];
    return { columns, containerData };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getContainerData,
        getFilterData,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Approvals);