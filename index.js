/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import {AppRegistry} from 'react-native';
import App from './App';
import Main from './src/main/Main';
import {name as appName} from './app.json';
import SelectLocation from './src/screens/sell/SelectLocation';
import Sell from './src/screens/sell/Sell';
import TestMaps from "./src/screens/test/TestMaps";
import ZoomCaro from "./src/screens/test/TestZoomCarousel";
//import App2 from "./src-redux/App";
//import App from "./src-redux-react/App";

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => Main);
