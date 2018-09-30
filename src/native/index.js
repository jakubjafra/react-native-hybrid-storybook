import React from 'react';

import { storiesOf } from '@storybook/react-native';
import StorybookUI from './components/StorybookUI';
import NoOpDecorator from './components/NoOpDecorator';

module.exports = {
    storiesOf,
    StorybookUI,

    // *-web compatibility no-op exports...
    Host: React.Fragment,
    createHostDecorator: () => NoOpDecorator,
    fullScreenHostDecorator: NoOpDecorator,
    inlineHostDecorator: NoOpDecorator,
};