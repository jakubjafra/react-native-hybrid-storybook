const merge = require('lodash.merge');
const _ = { merge };

const LIBRARY_NAME = 'react-native-hybrid-storybook';
const PACKAGE_JSON_ENTRY = LIBRARY_NAME;

const DEFAULT_CONFIG = {
    magic: {
        overwritePlatform: false,
        autoResolveStories: true,
    },
    excludedPaths: [
        'node_modules/art',
    ],
    includedFontPaths: [
        'node_modules/react-native-vector-icons',
    ],
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
