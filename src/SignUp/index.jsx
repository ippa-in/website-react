import React from 'react';
import './signUp.scss';
import Header from '../Header';
import InputField from '../customComponents/InputField';
import CustomButton from '../customComponents/CustomButton';

import { get } from '../utils/api';

export default class SignUp extends React.PureComponent {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        let url = 'access/v1/createuser/';
        let data = {
            email_id: 'farzi@gmail.com'
        }

        let headers = { 'PLAYER-ID': 'IPPA2019612212698437954726IPPA' };
        get(url, { headers }).then(res => console.log(res));
    }

    renderLeftContent = () => {
        const step = this.props.match.params.step || 1;
        if (step === '2') {
            return (
                <>
                    <p className='signIn--content'>Step {step} of 2</p>
                    <h2 className='signIn-header'>Lets get to know each other</h2>
                    <p className='signIn--content'>
                        Your personal information is used to verify payments made to you. This ensures it gets to you with no issues.
                    </p>
                </>
            );
        }
        return (
            <>
                <p className='signIn--content'>Step {step} of 2</p>
                <h2 className='signIn-header'>Create your account</h2>
                <p className='signIn--content'>
                    Your password must be at least 8 characters long, we also recommend it contains a symbol or number.
                </p>
            </>
        );
    }

    registerAccount = () => {
        return ''
    }

    renderSignUp = () => {
        return (
            <>
                <div className='socialLogin--container'>
                    <div className='socialLogin'>
                        <img src='/images/facebook-signin.svg' alt='facebook-logo' />
                        Sign up with Facebook
                    </div>
                    <div className='socialLogin'>
                        <img src='/images/gmail-logo.svg' alt='gmail-logo' />
                        Sign up with Gmail
                     </div>
                </div>
                <div className='signIn-divider'>
                    <span>Or</span>
                </div>
                <InputField
                    label='Your email'
                    hintText='you@email.com'
                />
                <InputField
                    label='Password'
                    hintText='something secure'
                />
                <InputField
                    label='Confirm password'
                    hintText='something secure'
                />
                <InputField
                    label='Referral code'
                    hintText='Enter referral code'
                />
                <CustomButton
                    style={{ marginTop: 15 }}
                    label={'sign Up'}
                    isPrimary={true}
                />
            </>
        );
    }

    renderRightStep2 = () => {
        return (
            <>
                <InputField
                    label='Full name'
                    hintText='First and last name'
                    required={true}
                />
                <InputField
                    label='Phone number'
                    hintText='Something secure'
                />
                <InputField
                    label='City'
                    hintText='Type city name'
                />
                <CustomButton
                    style={{ marginTop: 15 }}
                    label={'Sign Up'}
                    disabled={true}
                    onClick={this.registerAccount}
                    isPrimary={true}
                />
            </>
        );
    }

    renderRightcontent = () => {
        const step = this.props.match.params.step || 1;
        if (step === '2') {
            return this.renderRightStep2();
        }
        return this.renderSignUp();
    }

    render() {
        return (
            <div>
                <Header
                    style={{ boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.05)' }}
                    showCenterTabs={false}
                />
                <div className='signUpContainer'>
                    <div>{this.renderLeftContent()}</div>
                    <div>{this.renderRightcontent()}</div>
                </div>
            </div>
        );
    }
}