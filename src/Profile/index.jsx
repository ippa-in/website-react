import React from 'react';
import PropTypes from 'prop-types';

import './profile.scss';

import Header from '../Header';
import UserAccount from './userAccount';
import BankDetails from './bankDetails';
import TransactionHistory from './transactionHistory';
import Footer from '../Footer';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as profileActions from './actionCreators';

class Profile extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 0,
            tabWidth: 0,
            tabLeft: 0
        }
        this.headerList = ['User Account', 'Bank Details', 'Transaction History'];
    }

    componentDidMount() {
        this.props.getUserInfo();
        this.activeTab();
    }

    componentDidUpdate() {
        this.activeTab();
    }

    activeTab = () => {
        let { tabLeft, tabWidth } = this.state;
        let target = document.querySelector('.tab-list--item.active');
        tabLeft = target.offsetLeft - target.scrollLeft + target.clientLeft;
        tabWidth = target.getBoundingClientRect().width;
        this.setState({ tabLeft, tabWidth });
    }

    handleTabChange = (index, event) => {
        this.setState({ selectedTab: index });
    }

    showHeaderList = () => {
        let headerList = [];
        const { selectedTab } = this.state;
        headerList = this.headerList.map((list, index) =>
            <li
                className={selectedTab === index ? 'tab-list--item active' : 'tab-list--item'}
                key={`${list}`}
                onClick={() => this.handleTabChange(index)}
            >
                {list}
            </li>);
        return headerList;
    }

    renderTabsUI() {
        const { selectedTab } = this.state;
        const { kycDetails, userInfo, uploadKYC, getKYCDetails, bankList, getBankList,
            addBankAccount, getBankDetails, bankDetails, redeemPoints, getNetwork, tagNetwork, networkList,
            getTaggedNetworkList, taggedNetworks, updateUserInfo, addAchievement, getAllTransaction,
            allTransactions } = this.props;
        switch (selectedTab) {
            case 0: return <UserAccount
                userInfo={userInfo}
                redeemPoints={redeemPoints}
                getNetwork={getNetwork}
                tagNetwork={tagNetwork}
                networkList={networkList}
                getTaggedNetworkList={getTaggedNetworkList}
                taggedNetworks={taggedNetworks}
                updateUserInfo={updateUserInfo}
                addAchievement={addAchievement}
            />;
            case 1: return <BankDetails
                uploadKYC={uploadKYC}
                getKYCDetails={getKYCDetails}
                getBankList={getBankList}
                getBankDetails={getBankDetails}
                addBankAccount={addBankAccount}
                kycDetails={kycDetails}
                bankList={bankList}
                bankDetails={bankDetails}
            />;
            case 2: return <TransactionHistory
                getAllTransaction={getAllTransaction}
                allTransactions={allTransactions}
            />;
            default: return <UserAccount userInfo={userInfo} />;
        }
    }

    render() {
        const { tabLeft, tabWidth } = this.state;
        return (
            <>
                <Header style={{ boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.05)' }} />
                <div className='profile--heading'>
                    <header>Profile and Preferences</header>
                    <p>Find here all the information about shows, artists but also our activities.</p>
                </div>
                <nav className='headerList'>
                    <ul className="tab-list">
                        {this.showHeaderList()}
                    </ul>
                    <span className='active-marker' style={{ bottom: 0, left: tabLeft, width: tabWidth }}></span>
                </nav>
                <div className='profile-body-container'>
                    {this.renderTabsUI()}
                </div>
                <Footer />
            </>
        );
    }
}

Profile.propTypes = {
    userInfo: PropTypes.object,
}

Profile.defaultProps = {
    userInfo: {}
}


function mapStateToProps(state) {
    const { userInfo, kycDetails, bankList, bankDetails, networkList, taggedNetworks,
        allTransactions } = state.profileReducer;
    return {
        userInfo,
        kycDetails,
        bankList,
        bankDetails,
        networkList,
        taggedNetworks,
        allTransactions
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...profileActions
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
