import React from 'react';

import CustomButton from '../customComponents/CustomButton';

class UserAccount extends React.PureComponent {
    constructor(props) {
        super(props);
        this.userBasicInfoList = [
            { 'title': 'username', 'value': 'user_name' },
            { 'title': 'Date of Birth', 'value': 'dob' },
            { 'title': 'Mobile Number', 'value': 'mobile_number' },
            { 'title': 'Email Address', 'value': 'email_id' }
        ];

        this.loyaltyPoints = [
            { type: 'Current Points', points: 'current_points' },
            { type: 'Monthly Points', points: 'monthly_points' },
            { type: 'Redeemed points', points: 'redeemed_points' }
        ];
    }

    basicInfo() {
        console.log('ac', this.props);
        return (
            Object.keys(this.props.userInfo).length &&
            <div className='basicInfo--container'>
                <div className='profile-photo'></div>
                <div className='basicInfo-details--container'>
                    <span className='profile-flName'>{this.props.userInfo.name || '--'}</span>
                    <div className='profile-details'>
                        {this.userBasicInfoList.map((userInfo) =>
                            <ul key={`${userInfo.value}`}>
                                <li>{userInfo.title}</li>
                                <li>{this.props.userInfo[userInfo.value] || '--'}</li>
                            </ul>
                        )}
                    </div>
                </div>
                <div>
                    <CustomButton
                        style={{ padding: '12px 20px' }}
                        label={'Edit Profile'}
                    // onClick={this.handleSignIn}
                    />
                </div>
            </div>
        );
    }

    renderLoyaltyPoints() {
        return (
            Object.keys(this.props.userInfo).length > 0 &&
            <div className='loyaltyPoints--container'>
                {this.loyaltyPoints.map(loyalty =>
                    <div className='loyaltyPoints--card' key={`${loyalty.points}`}>
                        <img src='/images/points-icon.svg' alt='points-icon' />
                        <div>
                            <span>{this.props.userInfo.points[loyalty.points]}</span>
                            <span>{loyalty.type}</span>
                        </div>
                        <img src='/images/help-icon.svg' alt='help' />
                    </div>
                )}
                <div className='loyalty-totalPoints-card'>
                    <span>Total Redeemable points: <strong>{this.props.userInfo.points.total_points}</strong></span>
                    <CustomButton
                        style={{ padding: '12px 40px' }}
                        label={'Redeem Now'}
                        isPrimary={true}
                    // onClick={this.handleSignIn}
                    />
                </div>
            </div>
        );
    }

    addNewSection(sectionName) {
        return (
            <>
                <div className='add-new-section'>
                    <div>+</div>
                    <span>{`Add new ${sectionName}`}</span>
                </div>
            </>
        );
    }

    achievement() {
        return (
            <>
                {this.addNewSection('achievement')}
            </>
        );
    }

    favoriteHand() {
        return (
            <>
                {this.addNewSection('favorite hand')}
            </>
        );
    }

    networkTagging() {
        return (
            <>
                {this.addNewSection('Network')}
            </>
        );
    }

    cardWrapper(heading, component) {
        return (
            <div>
                <header className='profile-card-heading'>{heading}</header>
                <div className='profile-card'>{component}</div>
            </div>
        );
    }
    render() {
        return (
            <>
                {this.cardWrapper('My Basic Info', this.basicInfo())}
                {this.cardWrapper('Loyalty Points', this.renderLoyaltyPoints())}
                {this.cardWrapper('Network Tagging', this.networkTagging())}
                {this.cardWrapper('Favorite Hand', this.favoriteHand())}
                {this.cardWrapper('Achievements', this.achievement())}
            </>
        );
    }
}

export default UserAccount;