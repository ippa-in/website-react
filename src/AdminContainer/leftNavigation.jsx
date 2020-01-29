import React from 'react';
import PropTypes from 'prop-types';
import './admin.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import { getNavigationBarData, getContainerData, getFilterData } from './actions';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

class LeftNavigation extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            open: false,
        };
    }

    componentDidMount() {
        this.props.getNavigationBarData();
    }

    handleItemClick = (event, segmentData) => {
        const data = {
            display_name: segmentData.content_type,
            sort_query: JSON.stringify(segmentData.sort_key),
            ...segmentData.filter_query,

        };
        this.props.getFilterData({ display_name: segmentData.content_type });
        this.props.getContainerData(data);
        this.setState({ selected: event.target.id }, () => this.props.push(`/admin/${this.state.selected}`));
    };

    render() {
        const { navigationData, page } = this.props;
        const { open, selected } = this.state;
        console.log("navigationData", navigationData);
        return (
            <div className='ln--container'>
                <img src="/images/ippa-logo-white.svg" alt='ippa-logo' />
                <ul className="ln-options fa">
                    {navigationData.map(data => {
                        const segmentName = data.segment.toLowerCase();
                        const path = segmentName.replace(" ", "_").toLowerCase();
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
                                                id={subSegment.name.replace(" ", "_").toLowerCase()}
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
                                <img src={`/images/left_navigation/${segmentName}.svg`} alt={segmentName} />
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
        getFilterData,
        push,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftNavigation);