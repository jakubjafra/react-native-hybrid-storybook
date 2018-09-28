react-native-hybrid-storybook
=============================

Document your `react-native` project's UI components, with browser preview.

![Example cover screenshot](docs/assets/cover.png?raw=true)

This repository is a `react-native` optimized, predefined set of rules for [Storybook](https://storybook.js.org/) allowing you to easliy create per-project UI documentation for your `react-native` components.

#### Highlights & key concepts

* Easy to get started - no need to set up webpack, loaders, or go into any of that fuss. Just install `react-native-hybrid-storybook` and run one command to start creating your documentation.
* Extensible - building on top of `storybook` should allow to easily adjust the default rules to your project, avoiding lock-in.
* Easy preview - `react-native-web` integration that allows to render most non-native components in the browser.

Philosophy
----------

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
        "expo": true,
        "magic": {
            "autoResolveStories": true
        }
    }
}
````

3. Create any documentation entry for your component as `ExampleComponent.story.js`:
````js
import ExampleComponent from 'react';
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
| `expo`                        | `true`, `false` | `false` | Is this an expo project? This information is helpful for `web` rendering |
| `magic.autoResolveStories`    | `true`, `false` | `false` | In `web` mode it can automatically resolve `*.story.js` files for you, without maintaing list in `storybook.js` |

Defaults:
````
{
    "react-native-hybrid-storybook": {
        "expo": false,
        "magic": {
            "autoResolveStories": false
        }
    }
}
````

Known issues
------------

##### React version does not match React native prefered version for Expo installations
Expo (as of Expo 30.0.1) still uses React Native 0.55.4 version, that uses React 16.3.1 - which has very rough support from `react-native-web`. So I decided to go with latest React version (`16.5.2`), and just wait for Expo to upgrade theirs.

Examples
--------

[Many examples can be found in the examples repo.](https://github.com/khronedev/react-native-hybrid-storybook)
