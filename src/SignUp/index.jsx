import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './signUp.scss';
import Header from '../Header';
import InputField from '../customComponents/InputField';
import CustomButton from '../customComponents/CustomButton';
import CustomDropDown from '../customComponents/customDropDown';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

import {
    requestSignUpStep1Data,
    requestSignUpStep2Data
} from './actionCreators';

const RedCheckbox = withStyles({
    root: {
        '&$checked': {
            color: '#f32c4c'
        },
    },
    checked: {},
})(props => <Checkbox color="default" {...props} />);

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
            day: '',
            month: '',
            year: '',
            isDisabledSignUpStep1: false,
        };
    }

    registerAccount = () => {
        const { mobile_number, city } = this.state;
        // if (!name) {
        //     //show email id error.
        //     console.log('Enter name.');
        //     return;
        // }

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

        let data = { mobile_number, city };

        this.props.requestSignUpStep2Data(data);
    }

    handleSignUp = () => {
        const { name, email_id, password, confirm_password, referral_code } = this.state;

        if (!name) {
            //show email id error.
            console.log('Enter name.');
            return;
        }

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

        // if (!confirm_password) {
        //     //show confirm password error.
        //     console.log('Enter confirm password.');
        //     return;
        // }

        // if (password !== confirm_password) {
        //     // show password validations error.
        //     console.log('passwords doesn\'t match!');
        //     return;
        // }

        let data = { name, email_id, password, referral_code };

        this.props.requestSignUpStep1Data(data);
    }

    handleOnInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    toggleCheckBox = event => {
        this.setState({ [event.target.value]: event.target.checked });
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
                    name='name'
                    label='Full name'
                    hintText='First and last name'
                    required={true}
                    onChange={this.handleOnInputChange}
                />
                <InputField
                    name='email_id'
                    label='Your email'
                    hintText='you@email.com'
                    required={true}
                    onChange={this.handleOnInputChange}
                />
                <InputField
                    name='password'
                    label='Password'
                    hintText='something secure'
                    type='password'
                    required={true}
                    onChange={this.handleOnInputChange}
                />
                {/* <InputField
                    name='confirm_password'
                    label='Confirm password'
                    hintText='something secure'
                    type='password'
                    onChange={this.handleOnInputChange}
                /> */}
                {/* <InputField
                    name='referral_code'
                    label='Referral code'
                    hintText='Enter referral code'
                    onChange={this.handleOnInputChange}
                /> */}
                <FormControlLabel
                    value="Something random"
                    control={<RedCheckbox
                        checked={this.state.isDisabledSignUpStep1}
                        onChange={this.toggleCheckBox}
                        value="isDisabledSignUpStep1"
                    />}
                    label={<div className='signup-ckbox-label'>I certify that I am 18 years of age or older,
                     and I agree to the <br /> <a href=''>Terms & Conditions</a> and <a href=''>Privacy Policy</a></div>}
                    labelPlacement="end"
                />
                <CustomButton
                    style={{ marginTop: 15 }}
                    label={'sign Up'}
                    isPrimary={true}
                    disabled={!this.state.isDisabledSignUpStep1}
                    onClick={this.handleSignUp}
                />
            </>
        );
    }

    getDays = () => {
        let days = [];
        for (let i = 1; i <= 31; i++) {
            days.push({ key: i, value: i });
        }
        days.unshift({ key: "0", value: 'Day' });
        return days;
    }

    getDayValue = (value) => {
        this.setState({ day: value });
    }

    getMonths = () => {
        let monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let months = monthsList.map((month, index) => ({ key: index + 1, value: month }));
        months.unshift({ key: "0", value: 'Month' });
        return months;
    }

    getMonthValue = (value) => {
        this.setState({ month: value });
    }

    getYears = () => {
        let years = [];
        for (let i = 1940; i <= 2020; i++) {
            years.push({ key: i, value: i });
        }
        years.unshift({ key: 0, value: 'Year' });
        return years;
    }

    getYearValue = (value) => {
        this.setState({ year: value });
    }

    renderRightStep2 = () => {
        const { isDisabledSignUpStep2 } = this.state;
        return (
            <>
                <InputField
                    name='mobile_number'
                    label='Phone number'
                    hintText='Something secure'
                    onChange={this.handleOnInputChange}
                />
                <label className='inputField--label'>Date of birth</label>
                <div className="dob--container">
                    <CustomDropDown
                        menuList={this.getDays()}
                        getDropDownValue={this.getDayValue}
                    />
                    <CustomDropDown
                        menuList={this.getMonths()}
                        getDropDownValue={this.getMonthValue}
                    />
                    <CustomDropDown
                        menuList={this.getYears()}
                        getDropDownValue={this.getYearValue}
                    />
                </div>
                <InputField
                    name='city'
                    label='City'
                    hintText='Type city name'
                    onChange={this.handleOnInputChange}
                />
                <div className="registerButtons">
                    <CustomButton
                        label={'Sign Up'}
                        disabled={isDisabledSignUpStep2}
                        onClick={this.registerAccount}
                        isPrimary={true}
                    />
                    <Link className={'primeButton'} to='/sign-up/1'>Go Back</Link>
                </div>
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