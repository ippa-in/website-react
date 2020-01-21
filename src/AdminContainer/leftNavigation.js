import React from 'react';
import PropTypes from 'prop-types';
import './admin.scss';

import { Link } from "react-router-dom";

function LeftNavigation(props) {
    const { page } = props;
    return (
        <div className='ln--container'>
            <img src="/images/ippa-logo-white.svg" alt='ippa-logo' />
            <ul className="ln-options fa">
                <Link className={page === "dashboard" ? "selected" : ''} to="dashboard">
                    <img src="/images/left_navigation/dashboard.svg" alt="dashboard" />
                    Dashboard
                </Link>
                <Link className={page === "approvals" ? "selected" : ''} to="approvals">
                    <img src="/images/left_navigation/approvals.svg" alt="Approvals" />
                    Approvals
                </Link>
                <Link className={page === "uploads" ? "selected" : ''} to="uploads">
                    <img src="/images/left_navigation/uploads.svg" alt="Uploads" />
                    Uploads
                </Link>
                <Link className={page === "users" ? "selected" : ''} to="users">
                    <img src="/images/left_navigation/users.svg" alt="Users" />
                    Users
                </Link>
                <Link className={page === "transactions" ? "selected" : ''} to="transactions">
                    <img src="/images/left_navigation/transaction.svg" alt="Transaction" />
                    Transaction History
                </Link>
            </ul>
        </div>
    );
}

LeftNavigation.propTypes = {
    page: PropTypes.string,
}

LeftNavigation.defaultProps = {
    page: ""
}

export default LeftNavigation;