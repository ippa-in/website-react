import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CustomTable from '../customComponents/customTable';
import CustomDropDown from '../customComponents/customDropDown';
import { getContainerData } from './actions';

class Transactions extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedFilter: {}
        }
    }

    getFilteredData = () => {
        let filterQuery = { ...JSON.parse(sessionStorage.getItem("searchContent")) };
        delete filterQuery['data_type'];
        const query = { filters: this.state.selectedFilter, ...filterQuery };
        this.props.getContainerData(query);
    }

    getDropDownValue = (value, filterData) => {

        const data = {
            ...this.state.selectedFilter,
            [filterData.id]: {
                dropdown_values: [value]
            }
        };
        if (value === 0) {
            delete data[filterData.id];
        }
        this.setState({ selectedFilter: data },
            () => this.getFilteredData()
        );
    }

    dropDownValues = (filter) => {
        let displayName = '';
        let values = filter.values.map((data, index) => {
            if (index == 0) {
                displayName = filter.display_name;
            }
            return ({ key: data, value: data })
        });
        values.unshift({ key: 0, value: displayName });
        return values;
    }

    render() {
        const { columns, filters, containerData } = this.props;
        console.log(columns, containerData, "Data");
        return (
            <>
                <div className='adFilters--wrapper'>
                    {filters.sort((a, b) => a.order - b.order).map(filter => {
                        if (filter.filter_type === "date") {
                            return (
                                <div className='filters' key={filter.field_name}>
                                    {filter.display_name}
                                    <span className='chevron'></span>
                                </div>
                            )
                        }
                        return (<CustomDropDown
                            key={filter.field_name}
                            menuList={this.dropDownValues(filter)}
                            getDropDownValue={(value) => this.getDropDownValue(value, filter)}
                        />)
                    })}
                </div>
                <CustomTable
                    headers={columns}
                    tableData={containerData}
                />
            </>
        );
    }
}

function mapStateToProps(state) {
    const { tableHelpers, containerData } = state.AdminReducer;
    const filters = tableHelpers.filters || [];
    const columns = tableHelpers.colums || [];
    return { columns, filters, containerData };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getContainerData
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);