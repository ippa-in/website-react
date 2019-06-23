import React from 'react';
import './signIn.scss';
import Header from '../Header';
import InputField from '../customComponents/InputField';
import PrimaryButton from '../customComponents/PrimaryButton';

export default class SignIn extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showCheckMail: false
        }
    }

    renderLeftContent = () => {
        const query = window.location.pathname || '';
        if (query === '/sign-in') {
            return (
                <>
                    <h2 className='signIn-header'>Welcome back</h2>
                    <p className='signIn--content'>
                        Hope you’ve been well, hopefully you’re signing in to learn something in the poker tutorials.
                    </p>
                </>
            );
        }
        if (query === '/reset-pass') {
            return (
                <>
                    <h2 className='signIn-header'>Reset your password</h2>
                    <p className='signIn--content'>
                        Your password must be at least 8 characters long, we also recommend it contains a symbol or number.
                    </p>
                </>
            );
        }
        if (query === '/frgt-pass') {
            if (this.state.showCheckMail) {
                return (
                    <>
                        <h2 className='signIn-header'>Check your email</h2>
                        <p className='signIn--content'>
                            We've sent you an email which contains a reset link. Follow the link to reset your password.
                        </p>
                    </>
                )
            }
            return (
                <>
                    <h2 className='signIn-header'>Forgot password?</h2>
                    <p className='signIn--content'>No worries, we’ll help you get back in as quickly as possible.</p>
                </>
            )
        }
    }

    renderSignIn = () => {
        return (
            <>
                <div className='socialLogin--container'>
                    <div className='socialLogin'>
                        <img src='/images/facebook-signin.svg' alt='facebook-logo' />
                        Sign in with Facebook
            </div>
                    <div className='socialLogin'>
                        <img src='/images/gmail-logo.svg' alt='gmail-logo' />
                        Sign in with Gmail
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
                    hintText='something secure.'
                    showForgotPassword={true}
                />
                <PrimaryButton
                    style={{ marginTop: 15 }}
                    label={'Sign In'}
                />
            </>
        );
    }

    sendResetLink = () => {
        this.setState({ showCheckMail: true });
    }

    renderForgotPassword = () => {
        if (this.state.showCheckMail) {
            return (
                <>
                    <InputField
                        label='Your email'
                        hintText='you@email.com'
                    />
                    <PrimaryButton
                        style={{ marginTop: 15 }}
                        label={'Reset Link Sent!'}
                        onClick={this.sendResetLink}
                        disabled={true}
                    />
                </>
            )
        }
        return (
            <>
                <InputField
                    label='Your email'
                    hintText='you@email.com'
                />
                <PrimaryButton
                    style={{ marginTop: 15 }}
                    label={'Send Reset Link'}
                    onClick={this.sendResetLink}
                />
            </>
        )
    }

    renderResetPassword = () => {
        return (
            <>
                <InputField
                    label='Full name'
                    hintText='First and last name'
                />
                <InputField
                    label='Password'
                    hintText='something secure.'
                    showForgotPassword={false}
                />
                <InputField
                    label='Confirm password'
                    hintText='something secure.'
                    showForgotPassword={false}
                />
                <PrimaryButton
                    style={{ marginTop: 15 }}
                    label={'Reset Password'}
                />
            </>
        );
    }

    renderRightcontent = () => {
        const query = window.location.pathname || '';
        if (query === '/sign-in') {
            return this.renderSignIn();
        }
        if (query === '/reset-pass') {
            return this.renderResetPassword();
        }
        if (query === '/frgt-pass') {
            return this.renderForgotPassword();
        }
    }

    render() {
        return (
            <>
                <Header
                    style={{ boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.05)' }}
                    showCenterTabs={false}
                />
                <div className='signInContainer'>
                    <div>{this.renderLeftContent()}</div>
                    <div>{this.renderRightcontent()}</div>
                </div>
            </>
        );
    }
}
