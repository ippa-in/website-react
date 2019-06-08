import React from 'react';

export default class Videos extends React.PureComponent {
    render() {
        let page = window.location.pathname;
        return `Welcome to ${page} page!`;
    }
}