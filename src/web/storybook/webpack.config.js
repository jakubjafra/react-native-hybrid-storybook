const fs = require('fs');
const webpack = require('webpack');

const LIBRARY_NAME = 'react-native-hybrid-storybook';
const PACKAGE_JSON_ENTRY = LIBRARY_NAME;
const PATH_TO_PARENT_ROOT = '../../../../../../';

const PWD = process.env.PWD || fs.realpathSync(__dirname + PATH_TO_PARENT_ROOT);
const packageJson = JSON.parse(fs.readFileSync(PWD + '/package.json'));

const pluginDefaultConfig = {
    expo: false,
    magic: {
        autoResolveStories: false,
    },
};

module.exports = (storybookBaseConfig, configType, defaultConfig) => {
    const packageJsonConfig = (packageJson[PACKAGE_JSON_ENTRY] || {});

    // TODO: FIXME, use lodash defaults or something
    const config = pluginDefaultConfig;
    config['expo'] = packageJsonConfig['expo'] || pluginDefaultConfig['expo'];
    config.magic['autoResolveStories'] = (packageJsonConfig.magic || {})['autoResolveStories'] || pluginDefaultConfig.magic['autoResolveStories'];

    const alias = {
        [LIBRARY_NAME]: LIBRARY_NAME + '/src/web',
        'react-native': 'react-native-web',
    };

    if (config.expo) {
        alias['react-native-vector-icons'] = '@expo/vector-icons';
    }

    defaultConfig.resolve = {
        modules: ['node_modules'],
        extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
        alias: alias,
    };

    // babel loader
    defaultConfig.module.rules[0].exclude = function (modulePath) {
        return /node_modules/.test(modulePath)
            && !new RegExp('node_modules\/' + LIBRARY_NAME).test(modulePath);
    };

    // see ./config.js for __STORYBOOK_CONFIG usage
    defaultConfig.plugins.push(new webpack.DefinePlugin({
        'process.env': {
            '__STORYBOOK_CONFIG': JSON.stringify(config),
        }
    }));

    return defaultConfig;
};