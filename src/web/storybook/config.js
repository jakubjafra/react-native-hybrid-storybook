import React from 'react';
import { configure, setAddon, addDecorator } from '@storybook/react';

import { setOptions } from '@storybook/addon-options';
import { withKnobs } from '@storybook/addon-knobs';

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

addDecorator(withKnobs);

setOptions({
    addonPanelInRight: true,
});

configure(loadStories, module);