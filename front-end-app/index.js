/**
 * @format
 */

import {AppRegistry} from 'react-native';
require('react-native').unstable_enableLogBox()
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
