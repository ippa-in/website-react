import React from 'react';
import CustomTable from '../customComponents/customTable';

export default class Transactions extends React.PureComponent {
    render() {
        return (
            <div className="adTransactions--container">
                <CustomTable />
            </div>
        );
    }
}