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
    AppState,
    NetInfo,
    AsyncStorage,
    Modal,
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import Icon3 from "react-native-vector-icons/Foundation";
import Icon4 from "react-native-vector-icons/AntDesign";
import Icon5 from "react-native-vector-icons/MaterialCommunityIcons";
import FastImage from "react-native-fast-image";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import Locales from "../../cores/languages/languages";
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {firebaseApp} from '../../components/firebase/Realtimedb';
import EStyleSheet from "react-native-extended-stylesheet";
import constants from "../../assets/constants";
import {colors} from "../../cores/styles/colors";
import {getDataOfflineMode, inValidateText} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import MapTheme1 from "./MapTheme1";
import MapTheme2 from "./MapTheme2";

const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
    return px * deviceW / basePx
}

export default class Maps extends Component {

    constructor(props) {
        super(props);
        this.state = {

            check: false,
            theme: MapTheme1,

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

                    theme: MapTheme1
                })
            } else if (this.state.changetheme === 0) {
                this.setState({

                    theme: MapTheme1
                })
            } else if (this.state.changetheme === 1) {
                this.setState({

                    theme: MapTheme2
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


