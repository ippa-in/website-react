import React from 'react';
import './PrimaryButton.scss';
import PropTypes from 'prop-types';

export default class PrimaryButton extends React.PureComponent {
    render() {
        const { label, style } = this.props;
        return (
            <button
                {...this.props}
                className='primaryButton'
                style={style}
            >
                {label}
            </button>
        );
    }
}

PrimaryButton.propTypes = {
    label: PropTypes.string,
    style: PropTypes.object
}

PrimaryButton.defaultProps = {
    label: '',
    style: {}
}