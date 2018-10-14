import React from 'react';
import { configure, setAddon, addDecorator } from '@storybook/react';

import { setOptions } from '@storybook/addon-options';
import { withKnobs } from '@storybook/addon-knobs';

import chaptersAddon, { setDefaults as chaptersAddonSetDefaults } from 'react-storybook-addon-chapters';

const reactNativeWeb = require('react-native-web');

const {
    magic,
    addonOptions,
} = process.env.__STORYBOOK_CONFIG;

if (magic.overwritePlatform) {
    const OS = magic.overwritePlatform;

    reactNativeWeb.Platform = {
        OS,
        select: function select(obj) {
            return OS in obj ? obj[OS] : obj.default;
        }
    };
}

const autoResolveReq = magic.autoResolveStories === true
    ? require.context('../../../../../', true, /\.story\.js$/)
    : null;

const defaultResolveReq = require.context('../../../../../', false, /^\.\/storybook\.js$/);

function loadStories() {
    if (magic.autoResolveStories === true) {
        autoResolveReq.keys().forEach(autoResolveReq);
    }

    defaultResolveReq.keys().forEach(defaultResolveReq);
}

chaptersAddonSetDefaults({
    sectionOptions: {
        useTheme: true, // TODO: Make own distinct theme
        showSource: false,
        allowSourceToggling: true,
        showPropTables: false,
        allowPropTablesToggling: true,
    },
});
setAddon(chaptersAddon);

addDecorator(withKnobs);

setOptions(addonOptions);

configure(loadStories, module);