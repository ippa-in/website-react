import React from 'react';
import PropTypes from 'prop-types';
import './admin.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import { getNavigationBarData, getContainerData, setContainerData, getFilterData } from './actions';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

class LeftNavigation extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.page || '',
            open: false,
        };
    }

    componentDidMount() {
        this.props.getNavigationBarData();
    }

    handleItemClick = (event, segmentData) => {
        this.props.setContainerData([]);
        let segData = segmentData;
        let data = {};
        if(!segData.filter_query) {
            segData = segmentData.tertiary_segment[0];
        }
        data = {
            display_name: segData.content_type,
            sort_query: JSON.stringify(segData.sort_key),
            ...segData.filter_query,

        };
        sessionStorage.setItem("searchContent", JSON.stringify(data));
        this.props.getFilterData({ display_name: segData.content_type });
        this.props.getContainerData(data);
        const url = event.target.id;
        const selected = url.split("/").length === 2 ? url.split("/")[1] : url.split("/")[0];
        this.setState({ selected }, () => this.props.push(`/admin/${url}`));
    };

    render() {
        const { navigationData } = this.props;
        const { open, selected } = this.state;
        return (
            <div className='ln--container'>
                <img src="/images/ippa-logo-white.svg" alt='ippa-logo' />
                <ul className="ln-options fa">
                    {navigationData.map(data => {
                        const segmentName = data.segment.toLowerCase();
                        let path = segmentName.replace(" ", "_").toLowerCase();
                        console.log(segmentName, "Name");
                        if(segmentName === 'dashboard') return;
                        if(segmentName === "approvals") {
                            path = `approvals/${data.sub_segment[0].tertiary_segment[0].content_type.replace(" ", "_").toLowerCase()}`;
                        }
                        if (segmentName === "uploads") {
                            return (
                                <div key={segmentName}>
                                    <div className={open ? " nested open" : 'nested'} onClick={() => this.setState({ open: !open })}>
                                        <div>
                                            <img src={`/images/left_navigation/${segmentName}.svg`} alt={segmentName} />
                                            {data.segment}
                                        </div>
                                        <ChevronRightIcon
                                            className="transition"
                                            style={open ? { transform: "rotate(90deg)" } : {}}
                                        />
                                    </div>
                                    <div className={open ? "uploads--nav show" : "uploads--nav"}>
                                        {data.sub_segment.map(subSegment => 
                                            <li
                                                key={subSegment.name}
                                                className={subSegment.name.replace(" ", "_").toLowerCase() === selected ? "selected" : ''}
                                                id={`uploads/${subSegment.name.replace(" ", "_").toLowerCase()}`}
                                                onClick={(event) => this.handleItemClick(event, subSegment)}
                                            >
                                                {subSegment.name}
                                            </li>
                                        )}
                                    </div>
                                </div>
                            );
                        }
                        return (
                            <li
                                key={segmentName}
                                id={path}
                                className={path === selected ? "selected" : ''}
                                onClick={(event) => this.handleItemClick(event, data.sub_segment[0])}
                            >
                                <img src={`/images/left_navigation/${segmentName.split(' ').join('_')}.svg`} alt={segmentName} />
                                {data.segment}
                            </li>
                        )
                    })}
                </ul>
            </div >
        );
    }
}

LeftNavigation.propTypes = {
    page: PropTypes.string,
    navigationData: PropTypes.array,
}

LeftNavigation.defaultProps = {
    page: "",
    navigationData: [],
}

function mapStateToProps(state) {
    const { navigationData } = state.AdminReducer;
    return { navigationData };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getNavigationBarData,
        getContainerData,
        setContainerData,
        getFilterData,
        push,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftNavigation);