import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';

import CustomButton from '../customComponents/CustomButton';
import CustomDialog from '../customComponents/CustomDialog';
import CustomFileUpload from '../customComponents/customFileUpload';
import InputField from '../customComponents/InputField';
import CustomDropDown from '../customComponents/customDropDown';

import _ from 'lodash';

function BankDetails(props) {

    const [dialogOpen, setDialogOpen] = React.useState(false);

    const handleBankAccountForm = () => {
        props.getBankList();
        setDialogOpen(true);
    }

    const [state, setInputFields] = React.useState({
        ifsc: '',
        acc_name: '',
        acc_num: '',
        confirm_acc_num: '',
        bank_id: '',
    });

    const handleOnInputChange = (event) => {
        setInputFields({ ...state, [event.target.name]: event.target.value });
    }

    useEffect(() => {
        props.getBankDetails();
    }, [])

    const accountDetails = () => {
        if (Object.keys(props.bankDetails).length) {
            console.log('props.bankDetails', props.bankDetails);
            const bankDetails = [
                { 'title': 'Account Name', 'value': 'acc_name' },
                { 'title': 'Account Number', 'value': 'acc_number' },
                { 'title': 'Bank Name', 'value': 'bank.name' },
                { 'title': 'IFSC Code', 'value': 'ifsc_code' },
                { 'title': 'Status', 'value': 'status' }
            ];
            return (<div className='bankDetails--container'>
                <div className='bank-details'>
                        {bankDetails.map((details) =>
                            <ul key={`${details.value}`}>
                                <li>{details.title}</li>
                                <li>{_.get(props.bankDetails, details.value, '--')}</li>
                            </ul>
                        )}
                    </div>
                    <CustomButton
                        style={{ padding: '12px 20px' }}
                        label={'Edit Bank Info'}
                    // onClick={this.handleSignIn}
                    />
            </div>)
        } else {
            return (
                <div className='bank-account-container'>
                    <img src='/images/bank-icon.svg' alt='bank-icon' />
                    <span>No Bank Account Information!</span>
                    <p>Bank Account that you add to the system will be visible here.</p>
                    <CustomButton
                        style={{ padding: '12px 24px', marginTop: 30 }}
                        label={'Add Bank Account'}
                        isPrimary={true}
                        onClick={handleBankAccountForm}
                    />
                </div>);
        }
    }

    const KYCWrapper = (component, heading) => {
        return (
            <div className='KYC--wrapper'>
                <header>{heading}</header>
                {component}
            </div>
        );
    }

    const KYC = () => {
        const { uploadFiles, fileUrl } = props;
        // Object.keys(filesUrl).length
        return (
            <div className='KYC--container'>
                {KYCWrapper(<CustomFileUpload
                    uploadFiles={uploadFiles}
                    id='poa'
                    fileUrl="https://s3.ap-south-1.amazonaws.com//ippacontent/KYC/FILE201910121747276752618904IPPA"
                />, 'Your PAN Card')}
                {KYCWrapper(<CustomFileUpload
                    uploadFiles={uploadFiles}
                    id='poi'
                    fileUrl="https://s3.ap-south-1.amazonaws.com//ippacontent/KYC/FILE201910121747276752618904IPPA"
                />, 'Your Address Proof')}
            </div>
        );
    }

    const getBankList = () => {
        let bankList = props.bankList.map(bank => ({
            key: bank.bank_id, value: bank.name
        }));
        bankList.unshift({ key: "0", value: 'Select a bank from following' });
        return bankList;
    }

    const getDropDownValue = (value) => {
        setInputFields({ ...state, bank_id: value });
    }

    const dialogBody = () => {
        console.log('state', state);
        return (
            <>
                <CustomDropDown
                    label='New Bank Account'
                    menuList={getBankList()}
                    getDropDownValue={getDropDownValue}
                />
                <InputField
                    name='ifsc'
                    label='IFSC code'
                    hintText='Enter IFSC code'
                    inputStyle={{ padding: 12 }}
                    onChange={handleOnInputChange}
                />
                <InputField
                    name='acc_name'
                    label='Account name'
                    hintText='Enter account name'
                    inputStyle={{ padding: 12 }}
                    onChange={handleOnInputChange}
                />
                <InputField
                    name='acc_num'
                    label='Account number'
                    hintText='Enter account number'
                    inputStyle={{ padding: 12 }}
                    onChange={handleOnInputChange}
                />
                <InputField
                    name='confirm_acc_num'
                    label='Confirm account number'
                    hintText='Confirm account number'
                    inputStyle={{ padding: 12 }}
                    onChange={handleOnInputChange}
                />
            </>
        );
    }

    const cardWrapper = (heading, component) => {
        return (
            <div>
                <header className='profile-card-heading'>{heading}</header>
                <div className='profile-card'>{component}</div>
            </div>
        );
    }

    const handleBankFormSubmit = (event) => {
        console.log(state);
        props.addBankAccount(state);
    }

    const Actions = () => (
        <>
            <CustomButton
                style={{ padding: '12px 18px' }}
                label={'cancel'}
                onClick={() => setDialogOpen(false)}
            />
            <CustomButton
                style={{ padding: '12px 18px', marginLeft: 20 }}
                label={'Submit'}
                isPrimary={true}
                onClick={handleBankFormSubmit}
            />
        </>
    );

    return (
        <>
            {cardWrapper('Bank Details', accountDetails())}
            {cardWrapper('KYC Documents', KYC())}
            <CustomDialog
                open={dialogOpen}
                handleClose={() => setDialogOpen(false)}
                title='New Bank Account'
                dialogBody={dialogBody()}
                dialogStyle={{ minWidth: 460 }}
                actions={Actions()}
            />
        </>
    );
}

BankDetails.defaultProps = {
    bankList: [],
    bankDetails: {}
}

export default BankDetails;