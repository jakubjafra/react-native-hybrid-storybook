const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const { createConfig, LIBRARY_NAME } = require('../../common/config');

const PATH_TO_PARENT_ROOT = '../../../../../../';
const PWD = process.env.PWD || fs.realpathSync(__dirname + PATH_TO_PARENT_ROOT);
const packageJson = JSON.parse(fs.readFileSync(PWD + '/package.json'));

module.exports = (storybookBaseConfig, configType, defaultConfig) => {
    const config = createConfig(packageJson);

    const alias = {
        [LIBRARY_NAME]: LIBRARY_NAME + '/src/web',
        'react-native': 'react-native-web',
    };

    defaultConfig.resolve = {
        modules: ['node_modules'],
        extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
        alias: alias,
    };

    defaultConfig.module.rules[0].exclude = [];

    const excludedPaths = [
        'node_modules/art',
    ];

    // babel loader
    defaultConfig.module.rules[0].exclude = function (modulePath) {
        return excludedPaths.some(path => new RegExp(path).test(modulePath));
    };

    defaultConfig.module.rules.push({
        test: /\.ttf$/,
        loader: 'url-loader', // or directly file-loader
        include: path.resolve(PWD, 'node_modules/react-native-vector-icons'),
    });

    // see ./config.js for __STORYBOOK_CONFIG usage
    defaultConfig.plugins.push(new webpack.DefinePlugin({
        'process.env': {
            '__STORYBOOK_CONFIG': JSON.stringify(config),
        }
    }));

    return defaultConfig;
};