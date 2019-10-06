import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';

import CloseIcon from '@material-ui/icons/Close';
import CustomButton from '../CustomButton';

import PropTypes from 'prop-types';

import './customDialog.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomDialog(props) {

    const { title, open, handleClose, dialogBody, dialogStyle, ...rest } = props;
    return (
        <div>
            <Dialog
                {...rest}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <div className='custom-dialog-header--wrapper'>
                    <header className='custom-dialog--header'>{title}</header>
                    <CloseIcon
                        onClick={handleClose}
                    />
                </div>
                <DialogContent style={dialogStyle}>{dialogBody}</DialogContent>
                <DialogActions>
                    <CustomButton
                        style={{ padding: '12px 18px' }}
                        label={'cancel'}
                        onClick={handleClose}
                    />
                    <CustomButton
                        style={{ padding: '12px 18px', marginLeft: 20 }}
                        label={'Add Network'}
                        isPrimary={true}
                    // onClick={handleBankAccountForm}
                    />
                </DialogActions>
            </Dialog>
        </div>
    );
}

CustomDialog.propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool,
    handleClose: PropTypes.func
}

CustomDialog.defaultProps = {
    title: '',
    open: false,
    handleClose: () => { }
}