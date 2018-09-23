import { storiesOf } from '@storybook/react';

import {
    Host,
    createHostDecorator,
    fullScreenHostDecorator,
    inlineHostDecorator,
} from './components/Host';
import './components/Story';

module.exports = {
    storiesOf,
    Host,
    createHostDecorator,
    fullScreenHostDecorator,
    inlineHostDecorator,
    StorybookUI: {}, // for *-native compatibility
};