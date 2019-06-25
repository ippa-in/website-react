import React from 'react';
import './customButton.scss';
import PropTypes from 'prop-types';

export default class CustomButton extends React.PureComponent {
    render() {
        const { label, style, isPrimary, ...rest } = this.props;
        return (
            <button
                {...rest}
                className={isPrimary ? 'primaryButton' : 'secondaryButton'}
                style={style}
            >
                {label}
            </button>
        );
    }
}

CustomButton.propTypes = {
    label: PropTypes.string,
    style: PropTypes.object,
    isPrimary: PropTypes.bool
}

CustomButton.defaultProps = {
    label: '',
    style: {},
    isPrimary: false
}