import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';

import CustomButton from '../customComponents/CustomButton';
import CustomDialog from '../customComponents/CustomDialog';
import CustomFileUpload from '../customComponents/customFileUpload';
import InputField from '../customComponents/InputField';
import CustomDropDown from '../customComponents/customDropDown';

import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';

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

    const [files, setFiles] = React.useState({
        poi_f: '',
        poi_b: '',
        poa_f: '',
        poa_b: '',
        poaBack: false,
        poiBack: false,
    });

    const getFiles = (file, id) => {
        setFiles({ ...files, [id]: file });
    }

    useEffect(() => {
        props.getBankDetails();
        props.getKYCDetails();
    }, []);

    // useEffect(() => {
    //     props.kycDetails.hasOwnProperty("poi_status") {
    //         return {

    //         }
    //     }
    // }, [props.kycDetails]);

    const fileStyle = {
        border: "none",
        borderRadius: 0,
    };

    const accountDetails = () => {
        if (Object.keys(props.bankDetails).length) {
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
                            <li className={details.title === "Status" ? `${_.get(props.bankDetails, details.value, '')}` : ''}>
                                {details.title === "Status" &&
                                    <img src={`/images/${_.get(props.bankDetails, details.value, '').toLowerCase()}-icon.svg`}
                                        alt='status' />}
                                {_.get(props.bankDetails, details.value, '--')}
                            </li>
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

    const submitKYC = (type) => {
        let data = {};
        if (type.includes('poa')) {
            data['poa_f'] = files['poa_f'];
            data['poa_b'] = files['poa_b'];
        } else {
            data['poi_f'] = files['poi_f'];
            data['poi_b'] = files['poi_b'];
        }
        props.uploadKYC(data);
    }

    const handleKYCpages = (type, value) => {
        const KYCType = type.includes('poa') ? 'poaBack' : 'poiBack';
        setFiles({ ...files, [KYCType]: value });
    }

    const showKYCSubmitButtons = (type) => {
        const { kycDetails } = props;
        if (type.includes('poa')) {
            return !kycDetails.hasOwnProperty("poa_status");
        } else {
            return !kycDetails.hasOwnProperty("poi_status");
        }
    }

    const showKYCOptions = (type) => {
        const { kycDetails } = props;
        const { poi_f, poi_b, poa_f, poa_b } = files;
        if (type === "poi_f") {
            if (typeof poi_f === 'object') {
                return true;
            } else if (kycDetails.hasOwnProperty("poi_f_url") && !!kycDetails.poi_f_url) {
                return true;
            }
         } else if (type === "poi_b") {
                if (typeof poi_b === 'object') {
                    return true;
                } else if (kycDetails.hasOwnProperty("poi_b_url") && !!kycDetails.poi_b_url) {
                    return true;
                }
        } else if (type === "poa_f") {
            if (typeof poa_f === 'object') {
                return true;
            } else if (kycDetails.hasOwnProperty("poa_f_url") && !!kycDetails.poa_f_url) {
                return true;
            }
        } else if (type === "poa_b") {
            if (typeof poa_b === 'object') {
                return true;
            } else if (kycDetails.hasOwnProperty("poa_b_url") && !!kycDetails.poa_b_url) {
                return true;
            }
        }
        return false;
    }
    
    const KYCStatus = (status) => {
        let color = "";
        let message = "";
        if(status.toLowerCase() === "pending") {
            color = "#f8b630";
            message = "Pending Verification";
        } else if(status.toLowerCase() === "verified") {
            color = "#3ab36d";
            message = "Verified";
        }
        return (
            <span style={{ color }}>
                <InfoIcon style={{ marginRight: 6 }} />
                {message}
            </span>
        );
    }

    const KYCWrapper = (component, heading, type, status) => {
        return (
            <div className='KYC--wrapper'>
                <header>
                    <span>{heading}</span>
                    {status && KYCStatus(status)}
                </header>
                <div className='KYC-upload--wrapper'>
                    {component}
                    {/* {showKYCOptions(type) && <div className="KYC-options"> */}
                    {<div className="KYC-options">
                        <div>
                            <div className='options--wrapper' onClick={() => handleKYCpages(type, false)}>
                                <img src='/images/attachment-icon.svg' alt='attachment' />
                            </div>
                            <div className='options--wrapper'>
                                {<AddIcon
                                    onClick={() => handleKYCpages(type, true)}
                                />}
                            </div>
                        </div>
                        {/* {showKYCSubmitButtons(type) && <CustomButton */}
                        {<CustomButton
                            style={{ padding: '12px 24px' }}
                            label={'Submit Document'}
                            isPrimary={true}
                            onClick={() => submitKYC(type)}
                        />}
                    </div>}
                </div>
            </div>
        );
    }

    const KYC = () => {
        const { kycDetails } = props;
        const { poiBack, poaBack, poi_f, poi_b, poa_f, poa_b } = files;
        let poafileUrl = '';
        let poifileUrl = '';
        let poiStatus = "";
        let poaStatus = "";
        if (poiBack) {
            if (typeof poi_b === 'object') {
                poifileUrl = window.URL.createObjectURL(poi_b);
            } else if (kycDetails.hasOwnProperty("poi_b_url") && !!kycDetails.poi_b_url) {
                poifileUrl = kycDetails.poi_b_url;
                poiStatus = kycDetails.poi_status;
            }
        } else if (!poiBack) {
            if (typeof poi_f === 'object') {
                poifileUrl = window.URL.createObjectURL(poi_f);
            } else if (kycDetails.hasOwnProperty("poi_f_url") && !!kycDetails.poi_f_url) {
                poifileUrl = kycDetails.poi_f_url;
                poiStatus = kycDetails.poi_status;
            }
        }
        if (poaBack) {
            if (typeof poa_b === 'object') {
                poafileUrl = window.URL.createObjectURL(poa_b);
            } else if (kycDetails.hasOwnProperty("poa_b_url") && !!kycDetails.poa_b_url) {
                poafileUrl = kycDetails.poa_b_url;
                poaStatus = kycDetails.poa_status;
            }
        } else if (!poaBack) {
            if (typeof poa_f === 'object') {
                poafileUrl = window.URL.createObjectURL(poa_f);
            } else if (kycDetails.hasOwnProperty("poa_f_url") && !!kycDetails.poa_f_url) {
                poafileUrl = kycDetails.poa_f_url;
                poaStatus = kycDetails.poa_status;
            }
        }
        console.log("poifileUrl", poifileUrl, poafileUrl);
        return (
            <div className='KYC--container'>
                {!poiBack ? KYCWrapper(<CustomFileUpload
                    key={`poi_f_${poifileUrl}`}
                    parentStyle={fileStyle}
                    id='poi_f'
                    // fileUrl="https://s3.ap-south-1.amazonaws.com//ippacontent/KYC/FILE201910121747276752618904IPPA"
                    fileUrl={poifileUrl}
                    getFiles={getFiles}
                />, 'Your PAN Card', 'poi_f', poiStatus)
                    : KYCWrapper(<CustomFileUpload
                        key={`poi_b_${poifileUrl}`}
                        parentStyle={fileStyle}
                        id='poi_b'
                        fileUrl={poifileUrl}
                        getFiles={getFiles}
                    />, 'Your PAN Card', 'poi_b', poiStatus)
                }
                {!poaBack ? KYCWrapper(<CustomFileUpload
                    key={`poa_f_${poafileUrl}`}
                    parentStyle={fileStyle}
                    id='poa_f'
                    fileUrl={poafileUrl}
                    getFiles={getFiles}
                />, 'Your Address Proof', 'poa_f', poaStatus)
                    : KYCWrapper(<CustomFileUpload
                        key={`poa_b_${poafileUrl}`}
                        parentStyle={fileStyle}
                        id='poa_b'
                        fileUrl={poafileUrl}
                        getFiles={getFiles}
                    />, 'Your Address Proof', 'poa_b', poaStatus)
                }
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
        return (
            <div className="iform__container">
                <div className="iform__group">
                <CustomDropDown
                    label='New Bank Account'
                    menuList={getBankList()}
                    getDropDownValue={getDropDownValue}
                />
                </div>
                <div className="iform__group">
                <InputField
                    name='ifsc'
                    label='IFSC code'
                    hintText='Enter IFSC code'
                    inputStyle={{ padding: 12 }}
                    onChange={handleOnInputChange}
                />
                </div>
                <div className="iform__group">
                <InputField
                    name='acc_name'
                    label='Account name'
                    hintText='Enter account name'
                    inputStyle={{ padding: 12 }}
                    onChange={handleOnInputChange}
                /></div>
                <div className="iform__group">
                <InputField
                    name='acc_num'
                    label='Account number'
                    hintText='Enter account number'
                    inputStyle={{ padding: 12 }}
                    onChange={handleOnInputChange}
                /></div>
                <div className="iform__group">
                <InputField
                    name='confirm_acc_num'
                    label='Confirm account number'
                    hintText='Confirm account number'
                    inputStyle={{ padding: 12 }}
                    onChange={handleOnInputChange}
                /></div>
            </div>
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
        setDialogOpen(false);
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
    // console.log(files);
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
    bankDetails: {},
    kycDetails: {}
}

export default BankDetails;