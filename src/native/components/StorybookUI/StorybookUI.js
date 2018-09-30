import React from 'react';
import { AppRegistry } from 'react-native';
import { getStorybookUI, configure, addDecorator, setAddon } from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';
import { setOptions } from '@storybook/addon-options';
import { createConfig } from '../../../common/config';

const packageJson = require('../../../../../../package.json');
const config = createConfig(packageJson);

// 'setTimeout' since there is a bug in https://github.com/storybooks/storybook/issues/1192
setTimeout(() => setOptions(config.addonOptions), 1000);

addDecorator(withKnobs);
setAddon({
    addWithChapters: () => null,
});

// This assumes that storybook is running on the same host as your RN packager,
// to set manually use, e.g. host: 'localhost' option
const StorybookUIRoot = getStorybookUI(config.getStorybookUI);

// react-native hot module loader must take in a Class - https://github.com/facebook/react-native/issues/10991
// https://github.com/storybooks/storybook/issues/2081
// eslint-disable-next-line react/prefer-stateless-function
class StorybookUI extends React.Component {
    render() {
        return <StorybookUIRoot />;
    }
}

AppRegistry.registerComponent('%APP_NAME%', () => StorybookUI);
export default StorybookUI;
