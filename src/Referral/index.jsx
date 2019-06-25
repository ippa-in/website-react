import React from 'react';
import './referral.scss';
import InputField from '../customComponents/InputField';
import CustomButton from '../customComponents/CustomButton';

const Referral = (props) => {
    return (
        <div className='referral--container'>
            <div>
                <div className='refer-a-friend'>Refer a friend</div>
                <h2 className='referral-header'>We value friendship.</h2>
                <h2 className='referral-header'>At exactly ₹ 100.</h2>
                <p className='referral--content'>
                    When someone signs up with your unique referral code, both you and the referred user will recieve ₹ 100 worth of cash.
                </p>
                <div className='referral-inputField--container'>
                    <InputField
                        style={{ margin: 0, gridColumn: '1 / span 2' }}
                        hintText='Enter email address'
                    />
                    <CustomButton
                        style={{ borderColor: '#f32c4c', color: '#f32c4c', gridColumn: 3, marginLeft: 20 }}
                        label={'Invite Now'}
                    />
                </div>
            </div>
            <img src='/images/invite-friend-illustration.svg' alt='invite-friend-illustration' />
        </div>
    );
}

export default Referral;