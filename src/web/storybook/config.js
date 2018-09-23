import React from 'react';
import { configure, setAddon } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import JSXAddon from 'storybook-addon-jsx';
import chaptersAddon, { setDefaults as chaptersAddonSetDefaults } from 'react-storybook-addon-chapters';

const magic = process.env.__STORYBOOK_CONFIG.magic;

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

setAddon(JSXAddon);
setOptions({
    addonPanelInRight: true,
});

configure(loadStories, module);