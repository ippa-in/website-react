import React from 'react';

import CustomButton from '../customComponents/CustomButton';
import CustomDialog from '../customComponents/CustomDialog';
import CustomFileUpload from '../customComponents/customFileUpload';
import InputField from '../customComponents/InputField';

import { makeStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function BankDetails() {

    const classes = useStyles();
    const [values, setValues] = React.useState({
        age: 'none',
        name: 'hai',
    });

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    // React.useEffect(() => {
    //   setLabelWidth(inputLabel.current.offsetWidth);
    // }, []);

    const handleChange = event => {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    };

    const [dialogOpen, setDialogOpen] = React.useState(false);

    const handleBankAccountForm = () => {
        setDialogOpen(true);
    }

    const accountDetails = () => {
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
            </div>
        );
    }

    const KYC = () => {
        return (
            <div className='KYC--container'>
                <div className=''>
                    <CustomFileUpload />
                </div>
                <div>
                    <CustomFileUpload />
                </div>
            </div>
        );
    }

    const dialogBody = () => {
        return (
            <>
                <FormControl variant="outlined" className={classes.formControl}>
                    {/* <InputLabel ref={inputLabel} htmlFor="outlined-age-simple"> */}
                    {/* Age */}
                    {/* </InputLabel> */}
                    <Select
                        value={values.age}
                        onChange={handleChange}
                        labelWidth={labelWidth}
                        inputProps={{
                            name: 'age',
                            id: 'outlined-age-simple',
                        }}
                    >
                        <MenuItem value={0}>Select a bank from following</MenuItem>
                        <MenuItem value={1}>Ten</MenuItem>
                        <MenuItem value={2}>Twenty</MenuItem>
                        <MenuItem value={3}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <InputField
                    name='ifsc_code'
                    label='IFSC code'
                    hintText='Enter IFSC code'
                    inputStyle={{ padding: 12 }}
                // onChange={this.handleOnInputChange}
                />
                <InputField
                    name='ifsc_code'
                    label='Account name'
                    hintText='Enter account name'
                    inputStyle={{ padding: 12 }}
                // onChange={this.handleOnInputChange}
                />
                <InputField
                    name='ifsc_code'
                    label='Account number'
                    hintText='Enter account number'
                    inputStyle={{ padding: 12 }}
                // onChange={this.handleOnInputChange}
                />
                <InputField
                    name='ifsc_code'
                    label='Confirm account number'
                    hintText='Confirm account number'
                    inputStyle={{ padding: 12 }}
                // onChange={this.handleOnInputChange}
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
            />
        </>
    );
}

export default BankDetails;