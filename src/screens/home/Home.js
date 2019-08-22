import React, {Component} from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TextInput,
    Alert,
    TouchableOpacity,
    KeyboardAvoidingView,
    StatusBar,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Animated,
    ImageBackground,
    Dimensions,
    FlatList,
    AppRegistry,
    Modal,
    Switch,
    ActivityIndicator
} from "react-native";
import {createDrawerNavigator, createStackNavigator, createAppContainer} from "react-navigation";
import Icon from "react-native-vector-icons/EvilIcons";
import Icon3 from "react-native-vector-icons/Foundation";
import Icon4 from "react-native-vector-icons/AntDesign";
import FastImage from "react-native-fast-image";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import color from "../../cores/styles/colors";
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import Locales from "../../cores/languages/languages";
import darkTheme from "../../cores/viewComponents/themes/dark";
import lightTheme from "../../cores/viewComponents/themes/light";
import EStyleSheet from "react-native-extended-stylesheet";
import ImageSlider from 'react-native-image-slider';
import Slideshow from 'react-native-image-slider-show';
import {firebaseApp} from '../../components/firebase/Realtimedb';

import {ScrollableTab, Tab, Tabs} from "native-base";
import {
    getDataOfflineMode, inValidateText,

} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import constants from "../../assets/constants";

import HomeTheme1 from "./HomeTheme1";
import HomeTheme2 from "./HomeTheme2";

const deviceW = Dimensions.get("window").width;

const basePx = 375;

function px2dp(px) {
    return (px * deviceW) / basePx;
}


export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            check: false,
            theme: HomeTheme1,
        };
    }

    async componentWillMount() {
        this.setState({

        });
        this.changeTheme();

    }

    changeTabs(value) {
        this.setState({
            changeTab: value
        })

    }

    async changeTheme() {
        const change_theme = await getDataOfflineMode(constants.CHANGE_THEME);

        this.setState({
            changetheme: change_theme
        }, () => {
            if (inValidateText(this.state.changetheme)) {
                this.setState({

                    theme: HomeTheme1
                })
            } else if (this.state.changetheme === 0) {
                this.setState({

                    theme: HomeTheme1
                })
            } else if (this.state.changetheme === 1) {
                this.setState({

                    theme: HomeTheme2
                })
            }
        }, console.log("change_style :" + change_theme))

    }

    render() {
        return (
            <View style={{flex:1}}>

                <this.state.theme navigation={this.props.navigation}/>

            </View>
        );
    }
}


