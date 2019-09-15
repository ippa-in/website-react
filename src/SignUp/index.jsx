import React from 'react';
import './signUp.scss';
import Header from '../Header';
import InputField from '../customComponents/InputField';
import CustomButton from '../customComponents/CustomButton';

import {
    requestSignUpStep1Data,
    requestSignUpStep2Data
} from './actionCreators';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SignUp extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            email_id: '',
            password: '',
            confirm_password: '',
            referral_code: '',
            name: '',
            mobile_number: '',
            city: '',
            isDisabledSignUpStep2: true,
        };
    }

    registerAccount = () => {
        const { name, mobile_number, city } = this.state;
        //Do a regex test here.
        if (!name) {
            //show email id error.
            console.log('Enter name.');
            return;
        }

        // if (mobile_number) {
        //     // Do a regex test of mobile number if user enter's it.
        //     console.log('Enter password.');
        //     return;
        // }

        // if (city) {
        //     //Not sure how to show city.
        //     console.log('Enter correct city name.');
        //     return;
        // }

        let data = { name, mobile_number, city };

        this.props.requestSignUpStep2Data(data);
    }

    handleSignUp = () => {
        const { email_id, password, confirm_password, referral_code } = this.state;
        //Do a regex test here.
        if (!email_id) {
            //show email id error.
            console.log('Enter correct email ID.');
            return;
        }

        if (!password) {
            //show password error.
            console.log('Enter password.');
            return;
        }

        if (!confirm_password) {
            //show confirm password error.
            console.log('Enter confirm password.');
            return;
        }

        if (password !== confirm_password) {
            // show password validations error.
            console.log('passwords doesn\'t match!');
            return;
        }

        let data = { email_id, password, referral_code };

        this.props.requestSignUpStep1Data(data);
    }

    handleOnInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleFullNameInput = (event) => {
        const { isDisabledSignUpStep2 } = this.state;
        if (!event.target.value) {
            //Disable signup button and show error text on right.
            console.log('Enter name.');
            !isDisabledSignUpStep2 && this.setState({ isDisabledSignUpStep2: true });
            return;
        } else {
            this.setState({ isDisabledSignUpStep2: false });
        }
        this.handleOnInputChange(event);
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
                    name='email_id'
                    label='Your email'
                    hintText='you@email.com'
                    onChange={this.handleOnInputChange}
                />
                <InputField
                    name='password'
                    label='Password'
                    hintText='something secure'
                    type='password'
                    onChange={this.handleOnInputChange}
                />
                <InputField
                    name='confirm_password'
                    label='Confirm password'
                    hintText='something secure'
                    type='password'
                    onChange={this.handleOnInputChange}
                />
                <InputField
                    name='referral_code'
                    label='Referral code'
                    hintText='Enter referral code'
                    onChange={this.handleOnInputChange}
                />
                <CustomButton
                    style={{ marginTop: 15 }}
                    label={'sign Up'}
                    isPrimary={true}
                    onClick={this.handleSignUp}
                />
            </>
        );
    }

    renderRightStep2 = () => {
        const { isDisabledSignUpStep2 } = this.state;
        return (
            <>
                <InputField
                    name='name'
                    label='Full name'
                    hintText='First and last name'
                    required={true}
                    onChange={this.handleFullNameInput}
                />
                <InputField
                    name='mobile_number'
                    label='Phone number'
                    hintText='Something secure'
                    onChange={this.handleOnInputChange}
                />
                <InputField
                    name='city'
                    label='City'
                    hintText='Type city name'
                    onChange={this.handleOnInputChange}
                />
                <CustomButton
                    style={{ marginTop: 15 }}
                    label={'Sign Up'}
                    disabled={isDisabledSignUpStep2}
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

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        requestSignUpStep1Data,
        requestSignUpStep2Data
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);