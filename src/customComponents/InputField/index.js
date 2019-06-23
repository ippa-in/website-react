import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import './inputField.scss';

export default class InputField extends React.PureComponent {
    render() {
        let { label, errorText, value, onChange, hintText, required, type, showForgotPassword,
            handleInputFocus, handleInputChange, handleInputClick, handleKeyDown, handleBlur } = this.props;
        return (
            <div className='inputField-container'>
                <div className='inputField-label--container'>
                    <label className='inputField--label'>
                        {label}
                        {required && <span className="required">*</span>}
                    </label>
                    {showForgotPassword && <Link className='frgt-pass' to='/frgt-pass'>Forgot password?</Link>}
                </div>
                <input
                    className={'inputField'}
                    // value={value}
                    // ref={inputRef}
                    // autoFocus={autoFocus ? true : false}
                    // onChange={onChange}
                    placeholder={hintText}
                    required={required}
                    // onFocus={(event) => handleInputFocus(event)}
                    // onClick={(event) => handleInputClick(event)}
                    // onKeyDown={(event) => handleKeyDown(event)}
                    // onBlur={(event) => handleBlur(event)}
                    type={type}
                // disabled={props.disabled}
                />
            </div>
        );
    }
}

InputField.propTypes = {
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    showLabel: PropTypes.bool,
    showForgotPassword: PropTypes.bool,
    value: PropTypes.string,
    hintText: PropTypes.string,
    errorText: PropTypes.string,
    type: PropTypes.string,
    defaultValue: PropTypes.string,
    customInputStyle: PropTypes.object,
    customInputParentStyle: PropTypes.object,
    customInputLabelStyle: PropTypes.object,
    onChange: PropTypes.func
}

InputField.defaultProps = {
    required: false,
    disabled: false,
    showLabel: true,
    showForgotPassword: false,
    value: '',
    hintText: '',
    errorText: '',
    type: 'text',
    defaultValue: '',
    customInputStyle: {},
    customInputParentStyle: {},
    customInputLabelStyle: {},
    onChange: () => { },
}