import React from 'react';
import PropTypes from 'prop-types';
import { ComponentHost } from 'storybook-host/lib/components/ComponentHost';
import './Host.css';

const Host = (props) => {
    const {
        children,
        fullScreen,
    } = props;

    const className = [
        'host-wrapper',
        fullScreen === false ? 'host-wrapper-inline' : 'host-wrapper-fullscreen',
    ];

    return (
        <div className={className.join(' ')}>
            <ComponentHost
                story={() => children}
                className={'test'}
            />
        </div>
    );
};

Host.propTypes = {
    fullScreen: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

Host.defaultProps = {
    fullScreen: false,
};

export default Host;
