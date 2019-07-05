import React from 'react';
import './pokerDealsCard.scss';

import CustomButton from '../customComponents/CustomButton';

const PokerDealsCard = (props) => {
    return (
        <div className='pokerDeal--container'>
            <img src='/images/pokerstar-logo.png' alt='logo' />
            <header>PokerStars India</header>
            <div className='pokerDeal--content'>
                <div>Freerolls Worth ₹18 Lakhs</div>
                <div>₹1,500 Free Play</div>
                <div>100% Deposit Bonus</div>
            </div>
            <div className='pokerDealsCard--CTA'>
                <CustomButton
                    style={{ borderColor: '#f32c4c', color: '#f32c4c', padding: 10, minWidth: 110 }}
                    label={'Deal'}
                // onClick={this.sendResetLink}
                />
                <CustomButton
                    style={{ padding: 10, minWidth: 110 }}
                    label={'Review'}
                // onClick={this.sendResetLink}
                />
            </div>
        </div>
    );
}

export default PokerDealsCard;