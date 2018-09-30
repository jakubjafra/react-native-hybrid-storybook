const merge = require('lodash.merge');
const _ = { merge };

const LIBRARY_NAME = 'react-native-hybrid-storybook';
const PACKAGE_JSON_ENTRY = LIBRARY_NAME;

const DEFAULT_CONFIG = {
    expo: false,
    magic: {
        autoResolveStories: false,
    },
    addonOptions: {
        addonPanelInRight: true,
    },
    getStorybookUI: {
        port: 7007,
        onDeviceUI: true,
    }
};

const createConfig = (packageJson) => {
    const packageJsonConfig = (packageJson[PACKAGE_JSON_ENTRY] || {});
    return _.merge({}, DEFAULT_CONFIG, packageJsonConfig);
};

module.exports = {
    LIBRARY_NAME,
    PACKAGE_JSON_ENTRY,
    DEFAULT_CONFIG,
    createConfig,
};
