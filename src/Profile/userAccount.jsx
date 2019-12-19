import React from 'react';

import CustomButton from '../customComponents/CustomButton';
import CustomDropDown from '../customComponents/customDropDown';
import CustomDialog from '../customComponents/CustomDialog';
import CustomFileUpload from '../customComponents/customFileUpload';

import PersonIcon from '@material-ui/icons/Person';

import InputField from '../customComponents/InputField';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import { getFormattedDate } from '../utils/common';

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
            latestAchievementDialogOpen: false,
            network_id: '',
            tag_user_name: '',
            selectedCards: [],
            files: [],
            title: ''
        }
    }

    componentDidMount() {
        this.props.getTaggedNetworkList();
    }

    basicInfo() {
        // console.log('ac', this.props);
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
                                {userInfo.title === 'Date of Birth' ?
                                    <li>{getFormattedDate(this.props.userInfo[userInfo.value]) || '--'}</li>
                                    : <li>{this.props.userInfo[userInfo.value] || '--'}</li>
                                }
                            </ul>
                        )}
                    </div>
                </div>
                <div>
                    {/* <CustomButton
                        style={{ padding: '12px 20px' }}
                        label={'Edit Profile'}
                    // onClick={this.handleSignIn}
                    /> */}
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

    getNetworkList = () => {
        let networkList = this.props.networkList.map(network => ({
            key: network.network_id, value: network.name
        }));
        networkList.unshift({ key: "0", value: 'Select a network from following' });
        return networkList;
    }

    getDropDownValue = (value) => {
        this.setState({ network_id: value });
    }

    handleOnInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    dialogBody = () => {
        return (
            <>
                <CustomDropDown
                    label='Network'
                    menuList={this.getNetworkList()}
                    getDropDownValue={this.getDropDownValue}
                />
                <InputField
                    name='tag_user_name'
                    label='Username'
                    hintText='Enter Username'
                    inputStyle={{ padding: 12 }}
                    onChange={this.handleOnInputChange}
                />
            </>
        );
    }

    getFiles = (files) => {
        this.setState({ files });
    }

    achievementDialogBody = () => {
        return (
            <>
                <InputField
                    name='title'
                    label='Title'
                    hintText='Enter the title'
                    inputStyle={{ padding: 12 }}
                    onChange={this.handleOnInputChange}
                />
                <CustomFileUpload
                    id='achievement'
                    getFiles={this.getFiles}
                />
            </>
        );
    }

    selectCard = (card) => {
        const { selectedCards } = this.state;
        if (selectedCards.length < 2) {
            let selectedCardList = [...selectedCards];
            selectedCardList.push(card);
            this.setState({ selectedCards: selectedCardList });
        }
    }

    deleteCard = (card) => {
        const { selectedCards } = this.state;
        let selectedCardList = selectedCards.filter(scards => scards !== card);
        this.setState({ selectedCards: selectedCardList });
    }

    favoriteHandDialogBody = () => {
        const { selectedCards } = this.state;
        let cardNumbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let cardFaces = ['D', 'C', 'H', 'S'];
        let count = selectedCards.length;
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
                            className={selectedCards.includes(card) ? 'fav--cards selected' : 'fav--cards'}
                            onClick={() => this.selectCard(card)}
                        />
                    )}
                </div>{
                    count === 0 ?
                        <div>
                            <img src='/images/pick-cards-icon.svg' alt='pick cards' style={{ marginBottom: '10px' }} />
                            Pick Cards
                        </div>
                        : count === 1 ?
                            <div id='count1'>
                                <div key={`${selectedCards[0]}`} style={{ position: 'relative' }}>
                                    <img src={`/images/cards/${selectedCards[0]}.svg`} alt={selectedCards[0]} />
                                    <div className="deleteIcon">
                                        <CloseIcon
                                            style={{ cursor: 'pointer', color: '#000' }}
                                            onClick={() => this.deleteCard(selectedCards[0])}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <AddIcon />
                                </div>
                            </div>
                            : <div id='count2'>{
                                selectedCards.map(card =>
                                    <div key={`${card}`} style={{ position: 'relative' }}>
                                        <img
                                            src={`/images/cards/${card}.svg`} alt={`${card}`} />
                                        <div className="deleteIcon">
                                            <CloseIcon
                                                style={{ cursor: 'pointer', color: '#000' }}
                                                onClick={() => this.deleteCard(card)}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                }
            </div>
        );
    }

    addNewSection(sectionName, dialogType) {
        return (
            <>
                <div className='add-new-section' onClick={() => this.setDialogOpen(dialogType, true)}>
                    <div>+</div>
                    <span>{`Add new ${sectionName}`}</span>
                </div>
            </>
        );
    }

    achievement() {
        const { userInfo: { achievements } } = this.props;
        let sortedAchievements = (achievements && achievements.sort((a, b) => a.order - b.order)) || [];
        return (
            <>
                <div style={{ display: 'flex' }}>
                    {sortedAchievements.map(achievement =>
                        <div className='achievement--wrapper' key={`${achievement.order}-${achievement.s3_url}`}>
                            <img src={achievement.s3_url} alt='achievement' />
                            <label>{achievement.unique_id}</label>
                        </div>
                    )}
                    {this.addNewSection('achievement', 'latestAchievementDialogOpen')}
                </div>
            </>
        );
    }

    favoriteHand() {
        const { userInfo: { favourite_hands } } = this.props;
        return (
            <>
                <div style={{ display: 'flex' }}>
                    {favourite_hands && favourite_hands.map((card, index) =>
                        <div className='favroiteHand--wrapper' key={`${index}`}>
                            <img src={`/images/cards/${card.split(',')[0]}.svg`} alt={`${card.split(',')[0]}`} />
                            <img src={`/images/cards/${card.split(',')[1]}.svg`} alt={`${card.split(',')[1]}`} />
                        </div>
                    )}
                    {this.addNewSection('favorite hand', 'favoriteHandDialogOpen')}
                </div>
            </>
        );
    }

    onAddNetworkClick = () => {
        this.props.getNetwork();
        this.setDialogOpen('dialogOpen', true);
    }

    networkTagging() {
        return (
            <div style={{ display: 'flex' }}>
                {this.props.taggedNetworks.map(network =>
                    <div className='taggedNetwork--wrapper' key={network.tag_id}>
                        <div>
                            <img src={network.network.image_url} alt='pokerstar' width='100%' style={{ maxHeight: 40, objectFit: 'contain' }} />
                            <img src={`/images/status/${network.status}.svg`} alt={network.status} />
                        </div>
                        <div>
                            <PersonIcon style={{ marginRight: 10 }} />
                            <span>{network.user_name}</span>
                        </div>
                    </div>
                )}
                <div onClick={this.onAddNetworkClick}>
                    {this.addNewSection('Network')}
                </div>
            </div>
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

    submitNetwork = () => {
        const { network_id, tag_user_name } = this.state;
        this.props.tagNetwork({ network_id, tag_user_name });
        this.setDialogOpen('dialogOpen', false)
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
                    onClick={this.submitNetwork}
                />
            </>
        );
    }

    handleFavHandSubmit = () => {
        const { selectedCards } = this.state;
        const data = {
            favourite_hands: selectedCards.join()
        };
        this.props.updateUserInfo(data);
        this.setDialogOpen('favoriteHandDialogOpen', false);
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
                    onClick={this.handleFavHandSubmit}
                />
            </>
        );
    }

    handleAchievementSubmit = () => {
        const { title, files } = this.state;
        this.props.addAchievement({ title, achievement: files });
        this.setDialogOpen('latestAchievementDialogOpen', false);
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
                    onClick={this.handleAchievementSubmit}
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

UserAccount.defaultProps = {
    userInfo: {},
    networkList: [],
    taggedNetworks: [],
    getNetwork: () => {},
    redeemPoints: () => {},
    tagNetwork: () => {},
    getTaggedNetworkList: () => {},
    updateUserInfo: () => {},
    addAchievement: () => {}
};


export default UserAccount;