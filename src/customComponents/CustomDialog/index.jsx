import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';

import CloseIcon from '@material-ui/icons/Close';

import PropTypes from 'prop-types';

import './customDialog.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomDialog(props) {

    const { title, open, handleClose, headerStyle, dialogBody, dialogStyle, actionsStyle, actions, ...rest } = props;
    return (
        <Dialog
            {...rest}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <div className='custom-dialog-header--wrapper' style={headerStyle}>
                <header className='custom-dialog--header'>{title}</header>
                <CloseIcon
                    onClick={handleClose}
                />
            </div>
            <DialogContent style={dialogStyle}>{open ? dialogBody : null}</DialogContent>
            <DialogActions style={actionsStyle}>{open ? actions : null}</DialogActions>
        </Dialog>
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