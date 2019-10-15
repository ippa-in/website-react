import React from 'react';

import CustomButton from '../customComponents/CustomButton';
import CustomDropDown from '../customComponents/customDropDown';
import CustomDialog from '../customComponents/CustomDialog';
import CustomFileUpload from '../customComponents/customFileUpload';

import InputField from '../customComponents/InputField';

import _ from 'lodash';

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

        this.state = {
            dialogOpen: false,
            favoriteHandDialogOpen: false,
            latestAchievementDialogOpen: false
        }
    }

    basicInfo() {
        console.log('ac', this.props);
        return (
            // Object.keys(this.props.userInfo).length > 0 ?
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
            // Object.keys(this.props.userInfo).length > 0 &&
            <div className='loyaltyPoints--container'>
                {this.loyaltyPoints.map(loyalty =>
                    <div className='loyaltyPoints--card' key={`${loyalty.points}`}>
                        <img src='/images/points-icon.svg' alt='points-icon' />
                        <div>
                            <span>{_.get(this.props.userInfo, ['points', `${loyalty.points}`], '--')}</span>
                            <span>{loyalty.type}</span>
                        </div>
                        <img src='/images/help-icon.svg' alt='help' />
                    </div>
                )}
                <div className='loyalty-totalPoints-card'>
                    <span>Total Redeemable points: <strong>{_.get(this.props.userInfo, 'points.total_points', '--')}</strong></span>
                    <CustomButton
                        style={{ padding: '12px 40px' }}
                        label={'Redeem Now'}
                        isPrimary={true}
                        onClick={this.props.redeemPoints}
                    />
                </div>
            </div>
        );
    }

    setDialogOpen = (key, value) => {
        this.setState({
            [key]: value
        });
    }

    dialogBody = () => {
        return (
            <>
                <CustomDropDown
                    label='Network'
                    menuList={[
                        { key: 0, value: 'Select a network from following' },
                        { key: 1, value: 'something' },
                        { key: 2, value: 'something' }
                    ]}
                />
                <InputField
                    name='user_name'
                    label='Username'
                    hintText='Enter Username'
                    inputStyle={{ padding: 12 }}
                // onChange={this.handleOnInputChange}
                />
            </>
        );
    }

    achievementDialogBody = () => {
        return(
            <>
                <InputField
                    name='title'
                    label='Title'
                    hintText='Enter the title'
                    inputStyle={{ padding: 12 }}
                // onChange={this.handleOnInputChange}
                />
                <CustomFileUpload
                    uploadFiles={this.props.uploadFiles}
                    id='poa'
                    fileUrl="https://s3.ap-south-1.amazonaws.com//ippacontent/KYC/FILE201910121747276752618904IPPA"
                />
            </>
        );
    }

    favoriteHandDialogBody = () => {

        let cardNumbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let cardFaces = ['D', 'C', 'H', 'S'];
        let cards = cardFaces.map(faces => cardNumbers.map(num => `${num}${faces}`));
        cards = cards.flat();
        return (
            <div className='favDialog--container'>
                <div>
                    {cards.map(card =>
                        <img
                        key={`${card}`}
                        src={`/images/cards/${card}.svg`}
                        alt={`${card}`}
                        className='fav--cards'
                        />
                    )}
                </div>
                <div>
                    <img src='/images/pick-cards-icon.svg' alt='pick cards' style={{ marginBottom: '10px' }} />
                    Pick Cards
                </div>
            </div>
        );
    }

    addNewSection(sectionName, onClick) {
        return (
            <>
                <div className='add-new-section' onClick={() => eval(onClick)}>
                    <div>+</div>
                    <span>{`Add new ${sectionName}`}</span>
                </div>
            </>
        );
    }

    achievement() {
        if (_.get(this.props.userInfo, 'achievement.length', 0) === 0) {
            return (
                <>
                    {this.addNewSection('achievement', "this.setDialogOpen('latestAchievementDialogOpen', true)")}
                </>
            );
        }
    }

    favoriteHand() {
        return (
            <>
                {this.addNewSection('favorite hand', 'this.setDialogOpen("favoriteHandDialogOpen", true)')}
            </>
        );
    }

    networkTagging() {
        return (
            <>
                {this.addNewSection('Network', 'this.setDialogOpen("dialogOpen", true)')}
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

    networkDialogActions() {
        return (
            <>
                <CustomButton
                    style={{ padding: '12px 18px' }}
                    label={'cancel'}
                    onClick={() => this.setDialogOpen('dialogOpen', false)}
                />
                <CustomButton
                    style={{ padding: '12px 18px', marginLeft: 20 }}
                    label={'Add Network'}
                    isPrimary={true}
                // onClick={handleBankFormSubmit}
                />
            </>
        );
    }

    favoriteHandDialogActions() {
        return (
            <>
                <CustomButton
                    style={{ padding: '12px 18px' }}
                    label={'cancel'}
                    onClick={() => this.setDialogOpen('favoriteHandDialogOpen', false)}
                />
                <CustomButton
                    style={{ padding: '12px 18px', marginLeft: 20 }}
                    label={'Submit'}
                    isPrimary={true}
                // onClick={handleBankFormSubmit}
                />
            </>
        );
    }

    achievementDialogActions() {
        return (
            <>
                <CustomButton
                    style={{ padding: '12px 18px' }}
                    label={'cancel'}
                    onClick={() => this.setDialogOpen('latestAchievementDialogOpen', false)}
                />
                <CustomButton
                    style={{ padding: '12px 18px', marginLeft: 20 }}
                    label={'Submit'}
                    isPrimary={true}
                // onClick={handleBankFormSubmit}
                />
            </>
        );
    }

    render() {
        const { dialogOpen, favoriteHandDialogOpen, latestAchievementDialogOpen } = this.state;
        return (
            <>
                {this.cardWrapper('My Basic Info', this.basicInfo())}
                {this.cardWrapper('Loyalty Points', this.renderLoyaltyPoints())}
                {this.cardWrapper('Network Tagging', this.networkTagging())}
                {this.cardWrapper('Favorite Hand', this.favoriteHand())}
                {this.cardWrapper('Achievements', this.achievement())}
                <CustomDialog
                    open={dialogOpen}
                    handleClose={() => this.setDialogOpen('dialogOpen', false)}
                    title='Add Network'
                    dialogBody={this.dialogBody()}
                    dialogStyle={{ minWidth: 460 }}
                    actions={this.networkDialogActions()}
                />
                <CustomDialog
                    open={favoriteHandDialogOpen}
                    handleClose={() => this.setDialogOpen('favoriteHandDialogOpen', false)}
                    title='Favorite Hand'
                    dialogBody={this.favoriteHandDialogBody()}
                    dialogStyle={{ minWidth: 1000 }}
                    actions={this.favoriteHandDialogActions()}
                />
                 <CustomDialog
                    open={latestAchievementDialogOpen}
                    handleClose={() => this.setDialogOpen('latestAchievementDialogOpen', false)}
                    title='Latest Achievement'
                    dialogBody={this.achievementDialogBody()}
                    dialogStyle={{ minWidth: 520 }}
                    actions={this.achievementDialogActions()}
                />
            </>
        );
    }
}

export default UserAccount;