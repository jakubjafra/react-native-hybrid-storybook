react-native-hybrid-storybook
=============================

Document your `react-native` project's UI components, with browser preview.

![Example cover screenshot](docs/assets/cover.png?raw=true)

This repository is a `react-native` optimized, predefined set of rules for [Storybook](https://storybook.js.org/) allowing you to easliy create per-project UI documentation for your `react-native` components.

Philosophy
----------

* **A set of tools for creating per-project-basis component libraries.**
  * Example-based auto-generated documentation.
* Extensible
  * Building on top of [Storybook](https://storybook.js.org) should allow to easily adjust the default rules to your project, avoiding lock-in.
* Minimal setup time.
  * No need to set up webpack, loaders, or go into any of that fuss. Just install `react-native-hybrid-storybook` and run one command to start creating your documentation.
  * Popular Storybook plugins pre-installed.
* Web-only documentation preview (as static page) out of the box.

#### Modes

You can run this in 2 basic modes:
* `native`
  * just as you would do with `@storybook/react-native` - more on [Storybook's react-native integration documentation page](https://github.com/storybooks/storybook/tree/master/app/react-native)
  * used mainly for **development** of your custom UI components
  * blocks your application
  * integrated into your app

* `web`
  * a "production" build, where you can develop your application with support of well crafted documentation
  * special webpack bundler replaces `react-native` imports with `react-native-web` ones
  * used mainly for **production** - you can develop your application with support of (hopefully) well crafted documentation
  * does not block your application
  * separated build system, should not break anything (except some native-code dependent components, see [react-native-web compatibility table](https://github.com/necolas/react-native-web#compatibility-with-react-native))

Usage
-----

### Quick start

Minimal recipe to start documenting your react-native UI & components in the web.

#### Installation

1. Install package:
````bash
yarn add https://github.com/khronedev/react-native-hybrid-storybook.git
````

2. Add these entries to `package.json`:
````json
{
    "scripts": {
        "storybook-web": "node ./node_modules/@storybook/react/dist/server/index.js -p 9001 -c ./node_modules/react-native-hybrid-storybook/src/web/storybook",
    },
    "react-native-hybrid-storybook": {
        "magic": {
            "autoResolveStories": true
        }
    }
}
````

3. Create any documentation entry for your component as `ExampleComponent.story.js`:
````js
import React from 'react';
import {
    storiesOf,
} from 'react-native-hybrid-storybook';
import ExampleComponent from './ExampleComponent';

storiesOf('ExampleComponent', module)
    .add('First example', () => (
        <ExampleComponent title="Test component" />
    ));
````

#### Usage

Run documentation (in web mode):
````bash
yarn run storybook-web # Now open http://localhost:9001 in the browser
````

### Recipes

| Stack                 | Web rendering only ("**minimal**")    | Web & native rendering ("**full**")    |
|:---------------------:|:-------------------------------------:|:----------------------------------:|
| Expo / CRNA           | [Integration](docs/integration.md#minimal), [Example](https://github.com/khronedev/react-native-hybrid-storybook-examples/tree/master/minimal-expo)  | [Integration](docs/integration.md#full), [Example](https://github.com/khronedev/react-native-hybrid-storybook-examples/tree/master/crna) |
| "Pure" `react-native` | [Integration](docs/integration.md#minimal-1) | [Integration](docs/integration.md#full-1), [Example](https://github.com/khronedev/react-native-hybrid-storybook-examples/tree/master/rninit) |

Configuration options
---------------------

In your `package.json` there is a possibility to specify few options:

| Option                        | Allowed values | Default  | Meaning                  |
|:-----------------------------:|:--------------:|:--------:|:------------------------:|
| `magic.autoResolveStories`    | `true`, `false` | `false` | In `web` mode it can automatically resolve `*.story.js` files for you, without maintaing list in `storybook.js` |
| `addonOptions`                | `object`        | (below) | See [`addon-options` documentation for reference](https://github.com/storybooks/storybook/tree/master/addons/options). |
| `getStorybookUI`              | `object`       | (below) | See [`storybook/react-native` plugin documentation for reference](https://github.com/storybooks/storybook/tree/master/app/react-native#getstorybookui-options). No effect in web mode. |

Defaults:
````
{
    "magic": {
        "autoResolveStories": false,
    },
    "addonOptions": {
        "addonPanelInRight": true,
    },
    "getStorybookUI": {
        "port": 7007,
        "onDeviceUI": true,
    }
}
````

Options under `magic` are likely to be changed in future releases.

Plugins
-------

This comes with predefined set of plugins, that're working in [both web & native](https://github.com/storybooks/storybook/blob/master/ADDONS_SUPPORT.md) modes:
* [Addon knobs](https://github.com/storybooks/storybook/tree/master/addons/knobs) - for playing with your component's properties in real time
* [Addon actions](https://github.com/storybooks/storybook/tree/master/addons/actions) - for logging actions
* [Addon options](https://github.com/storybooks/storybook/tree/master/addons/options) - with some preconfigured options

Some plugins & integrations are web only (will not render / be ignored on the device):
* [react-storybook-addon-chapters](https://github.com/Checkfront/react-storybook-addon-chapters) - adds structural template to document your components, see [CRNA example](https://github.com/khronedev/react-native-hybrid-storybook-examples/blob/master/crna/src/components/Button.story.js) for usage
* [storybook-host](https://github.com/philcockfield/storybook-host) - better web preview rendering

Examples
--------

[Many examples can be found in the examples repo.](https://github.com/khronedev/react-native-hybrid-storybook)

Known issues
------------

##### React version does not match React native prefered version for Expo installations
Expo (as of Expo 30.0.1) still uses React Native 0.55.4 version, that uses React 16.3.1 - which has very rough support from `react-native-web`. So I decided to go with latest React version (`16.5.2`), and just wait for Expo to upgrade theirs.
