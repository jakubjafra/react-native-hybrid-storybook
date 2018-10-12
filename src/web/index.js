import { storiesOf } from '@storybook/react';

import {
    Host,
    createHostDecorator,
    fullScreenHostDecorator,
    inlineHostDecorator,
} from './components/Host';
import './components/Story';
import { loadFont } from './components/Fonts';

module.exports = {
    storiesOf,
    Host,
    createHostDecorator,
    fullScreenHostDecorator,
    inlineHostDecorator,
    loadFont,

    // for *-native compatibility
    StorybookUI: {},
};