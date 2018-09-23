react-native-hybrid-storybook
=============================

Document your `react-native` project's UI components, with browser preview.

![Example cover screenshot](docs/cover.png?raw=true)

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

* `web` - a "production" build, where you can develop your application with support of well crafted documentation
  * special webpack bundler replaces `react-native` imports with `react-native-web` ones
  * used mainly for **production** - you can develop your application with support of (hopefully) well crafted documentation
  * does not block your application
  * separated build system, should not break anything (except some native-code dependend components, see [react-native-web compatibility table](https://github.com/necolas/react-native-web#compatibility-with-react-native))

Usage
-----

Install package:
````
yarn add https://jakub-jafra@bitbucket.org/jakub-jafra/react-native-hybrid-storybook.git
````

Add these entries to `package.json`:
````
{
    "scripts": {
        "storybook-web": "node ./node_modules/@storybook/react/dist/server/index.js -p 9001 -c ./node_modules/react-native-hybrid-storybook/src/web/storybook",
        "storybook-native-device": "REACT_NATIVE_STORYBOOK=true expo start",
        "storybook-native": "node ./node_modules/@storybook/react-native/dist/bin/storybook-start.js -p 7007 -c ./node_modules/react-native-hybrid-storybook/src/native/storybook"
    },
    "react-native-hybrid-storybook": {
        "expo": true,
        "magic": {
            "autoResolveStories": true
        }
    }
}
````

Create documentation entry for your component as `ExampleComponent.story.js`:
````
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

Add `./storybook.js` file to your project root, with contents:
````
// Unfortunately Metro bundler does not support wildcard require, so you need to maintain this list:
import './src/components/ExampleComponent.story.js';

export { StorybookUIHMRRoot as default } from 'react-native-hybrid-storybook';
````

Run documentation (in web mode):
````
yarn run storybook-web

# Open http://localhost:9001 in the browser
````

Run documentation (on native device mode):
````
# 1st terminal window:
yarn run storybook-native
# 2nd terminal window:
yarn run storybook-native-device

# Open http://localhost:7007 in the browser
# Run your app as you'd normally on the device
````

Configuration options
---------------------

In your `package.json` there is a possibility to specify few options:

| Option                        | Allowed values | Default  | Meaning                  |
|:-----------------------------:|:--------------:|:--------:|:------------------------:|
| `expo`                        | `true`, `false` | `false` | Is this an expo project? This information is helpful for `web` rendering |
| `magic.autoResolveStories`    | `true`, `false` | `false` | In `web` mode it can automatically resolve `*.story.js` files for you, without maintaing list in `storybook.js` |

Known issues
------------

##### React version does not match React native prefered version for Expo installations
Expo (as of Expo 30.0.1) still uses React Native 0.55.4 version, that uses React 16.3.1 - which has very rough support from `react-native-web`. So I decided to go with latest React version (`16.5.2`), and just wait for Expo to upgrade theirs.
