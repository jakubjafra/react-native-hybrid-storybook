Usage for Expo apps
-------------------

### Minimal

This section outlines only hybrid rendering mode with use of `react-native-web`.

#### Installation

1. Install package:
````
yarn add https://github.com/khronedev/react-native-hybrid-storybook.git
````

2. Add these entries to `package.json` (choose one of `storybook-native-device` depending on your app):
````
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

#### Usage

Run documentation (in web mode):
````
yarn run storybook-web

# Open http://localhost:9001 in the browser
````

### Full

This section outlines full integration with Expo-based apps. You will be able to view your all your native components on the device and have browser preview for them.

#### Installation

1. Install package:
````
yarn add https://github.com/khronedev/react-native-hybrid-storybook.git
````

2. Add these entries to `package.json` (choose one of `storybook-native-device` depending on your app):
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

3. Create any documentation entry for your component as `ExampleComponent.story.js`:
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

5. Add `./storybook.js` file to your project root, with contents:
````
// Unfortunately Metro bundler does not support wildcard require, so you need to maintain this list:
import './src/components/ExampleComponent.story.js'; // <- Replace it with correct path

export { StorybookUI as default } from 'react-native-hybrid-storybook';
````

6. Replace your initial file (like `./path/to/your/real/App`, `./App.js` or `./index.js`) with conditional rendering:
````
import App from './path/to/your/real/App'; // <- Replace it with correct path
import Storybook from './storybook';

export default process.env.REACT_NATIVE_STORYBOOK ? Storybook : App;
````

#### Usage

A) Run documentation (in web mode):
````
yarn run storybook-web

# Open http://localhost:9001 in the browser
````

B) Run documentation (on the device):
````
# 1st terminal window:
yarn run storybook-native
# 2nd terminal window:
yarn run storybook-native-device

# Open http://localhost:7007 in the browser, for Storybook Web UI
# Run your app as you'd normally on the device (or simulator)
````

Usage for pure react-native apps
--------------------------------

### Minimal

This section outlines only hybrid rendering mode with use of `react-native-web`.

#### Installation

1. Install package:
````
yarn add https://github.com/khronedev/react-native-hybrid-storybook.git
````

2. Add these entries to `package.json` (choose one of `storybook-native-device` depending on your app):
````
{
    "scripts": {
        "storybook-web": "node ./node_modules/@storybook/react/dist/server/index.js -p 9001 -c ./node_modules/react-native-hybrid-storybook/src/web/storybook",
    },
    "react-native-hybrid-storybook": {
        "expo": false,
        "magic": {
            "autoResolveStories": true
        }
    }
}
````

3. Create any documentation entry for your component as `ExampleComponent.story.js`:
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

#### Usage

Run documentation (in web mode):
````
yarn run storybook-web

# Open http://localhost:9001 in the browser
````

### Full

This section outlines full integration with just react native based apps - no expo required. You will be able to view your all your native components on the device and have browser preview for them.

#### Installation

1. Install package:
````
yarn add https://github.com/khronedev/react-native-hybrid-storybook.git
````

2. Add these entries to `package.json` (choose one of `storybook-native-device` depending on your app):
````
{
    "scripts": {
        "storybook-web": "node ./node_modules/@storybook/react/dist/server/index.js -p 9001 -c ./node_modules/react-native-hybrid-storybook/src/web/storybook",
        "storybook-native-device": "REACT_NATIVE_STORYBOOK=true node node_modules/react-native/local-cli/cli.js start",
        "storybook-native": "node ./node_modules/@storybook/react-native/dist/bin/storybook-start.js -p 7007 -c ./node_modules/react-native-hybrid-storybook/src/native/storybook"
    },
    "react-native-hybrid-storybook": {
        "expo": false,
        "magic": {
            "autoResolveStories": true
        }
    }
}
````

3. For pure `react-native` apps, we suggest to go with [`transform-inline-environment-variables`](https://www.npmjs.com/package/babel-plugin-transform-inline-environment-variables) in order to pass env variables to the project:
````
yarn add transform-inline-environment-variables
````
Don't forget to edit your `.babelrc` to include this:
````
"plugins": [
  "transform-inline-environment-variables"
]
````

4. Create any documentation entry for your component as `ExampleComponent.story.js`:
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

5. Add `./storybook.js` file to your project root, with contents:
````
// Unfortunately Metro bundler does not support wildcard require, so you need to maintain this list:
import './src/components/ExampleComponent.story.js'; // <- Replace it with correct path

export { StorybookUI as default } from 'react-native-hybrid-storybook';
````

6. Replace your initial file (like `./path/to/your/real/App`, `./App.js` or `./index.js`) with conditional rendering:
````
import App from './path/to/your/real/App'; // <- Replace it with correct path
import Storybook from './storybook';

export default process.env.REACT_NATIVE_STORYBOOK ? Storybook : App;
````

#### Usage

A) Run documentation (in web mode):
````
yarn run storybook-web

# Open http://localhost:9001 in the browser
````

B) Run documentation (on the device):
````
# 1st terminal window:
yarn run storybook-native
# 2nd terminal window:
yarn run storybook-native-device

# Open http://localhost:7007 in the browser
# Run your app as you'd normally on the device
````
