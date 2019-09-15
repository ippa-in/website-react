import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import './inputField.scss';

export default class InputField extends React.PureComponent {
    render() {
        let { label, name, disabled, errorText, value, onChange, hintText, required, type, showForgotPassword, style } = this.props;
        return (
            <div className='inputField-container' style={style}>
                {!!label && <div className='inputField-label--container'>
                    <label className='inputField--label'>
                        {label}
                        {required && <span className="required">*</span>}
                    </label>
                    {showForgotPassword && <Link className='frgt-pass' to='/frgt-pass'>Forgot password?</Link>}
                </div>}
                <input
                    name={name}
                    className={'inputField'}
                    // value={value}
                    // ref={inputRef}
                    // autoFocus={autoFocus ? true : false}
                    onChange={onChange}
                    placeholder={hintText}
                    required={required}
                    type={type}
                    disabled={disabled}
                />
            </div>
        );
    }
}

InputField.propTypes = {
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    showForgotPassword: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
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
    showForgotPassword: false,
    label: '',
    name: '',
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