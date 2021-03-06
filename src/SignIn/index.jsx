import React from 'react';
import './signIn.scss';
import Header from '../Header';
import InputField from '../customComponents/InputField';
import CustomButton from '../customComponents/CustomButton';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    signIn
} from './actionCreators';

class SignIn extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showCheckMail: false,
            email_id: '',
            password: '',
        }
    }

    handleOnInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSignIn = (isAdmin = false) => {
        const { email_id, password } = this.state;

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

        let data = { email_id, password, isAdmin };

        this.props.signIn(data);
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
        if (query === '/admin/login') {
            return (
                <>
                    <h2 className='signIn-header'>Sign in to admin dashboard</h2>
                    <p className='signIn--content'>
                        Hope you’ve been well, hopefully you’re signing in to learn something in the poker tutorials.
                    </p>
                </>
            )
        }
    }

    responseFacebook = response => {
        console.log("facebook", response);
    };

    componentClicked = response => {
        console.log("google componentClicked", response);
    };

    responseGoogle = (response) => {
        console.log("google response", response);
    }

    renderSignIn = (showSocialLogin = true) => {
        return (
            <>
                {showSocialLogin &&
                    <>
                        <div className='socialLogin--container'>
                            <FacebookLogin
                                appId="202128337633230"
                                autoLoad={false}
                                fields="name, email, picture"
                                callback={() => this.responseFacebook}
                                onClick={() => this.componentClicked}
                                // cookiePolicy={'single_host_origin'}
                                render={renderProps => (
                                    <button className="socialLogin" onClick={renderProps.onClick}>
                                        <img src='/images/facebook-signin.svg' alt='facebook-logo' />
                                        Sign in with Facebook
                                    </button>
                                )} />
                            {/* <div className='socialLogin'>
                                <img src='/images/facebook-signin.svg' alt='facebook-logo' />
                                Sign in with Facebook
                            </div> */}
                            <GoogleLogin
                                clientId="498291790660-u0l5psfrffqbd6g8ijfg9ccjt26ia5in.apps.googleusercontent.com"
                                render={renderProps => (
                                    <button className="socialLogin" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                        <img src='/images/gmail-logo.svg' alt='gmail-logo' />
                                        Sign in with Gmail
                                    </button>
                                )}
                                buttonText="Login"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                // cookiePolicy={'single_host_origin'}
                            />
                            {/* <div className='socialLogin'>
                                <img src='/images/gmail-logo.svg' alt='gmail-logo' />
                                Sign in with Gmail
                            </div> */}
                        </div>
                        <div className='signIn-divider'>
                            <span>Or</span>
                        </div>
                    </>}
                <InputField
                    name='email_id'
                    label='Your email'
                    hintText='you@email.com'
                    onChange={this.handleOnInputChange}
                />
                <InputField
                    name='password'
                    label='Password'
                    type='password'
                    hintText='something secure.'
                    showForgotPassword={showSocialLogin}
                    onChange={this.handleOnInputChange}
                />
                <CustomButton
                    style={{ marginTop: 15 }}
                    label={'Sign In'}
                    isPrimary={true}
                    onClick={() => this.handleSignIn(!showSocialLogin)}
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
                    <CustomButton
                        style={{ marginTop: 15 }}
                        label={'Reset Link Sent!'}
                        isPrimary={true}
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
                <CustomButton
                    style={{ marginTop: 15 }}
                    label={'Send Reset Link'}
                    isPrimary={true}
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
                <CustomButton
                    style={{ marginTop: 15 }}
                    label={'Reset Password'}
                    isPrimary={true}
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
        if (query === '/admin/login') {
            return this.renderSignIn(false);
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

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        signIn
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);