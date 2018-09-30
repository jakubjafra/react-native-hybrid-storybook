import React from 'react';

import { storiesOf } from '@storybook/react-native';
import StorybookUI from './components/StorybookUI';

const noOpDecorator = story => story();

module.exports = {
    storiesOf,
    StorybookUI,

    // *-web compatibility no-op exports...
    Host: React.Fragment,
    createHostDecorator: () => noOpDecorator,
    fullScreenHostDecorator: noOpDecorator,
    inlineHostDecorator: noOpDecorator,
};