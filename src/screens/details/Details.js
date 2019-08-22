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
    Easing,
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/Foundation";
import Icon4 from "react-native-vector-icons/AntDesign";
import Icon5 from "react-native-vector-icons/MaterialIcons";
import Icon6 from "react-native-vector-icons/Ionicons";
import Icon7 from "react-native-vector-icons/FontAwesome5";
import Icon8 from "react-native-vector-icons/MaterialCommunityIcons";
import FastImage from "react-native-fast-image";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Rating, AirbnbRating} from 'react-native-ratings';
import color from '../../cores/styles/colors';
import PhotoUpload from 'react-native-photo-upload';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import darkTheme from "../../cores/viewComponents/themes/dark";
import lightTheme from "../../cores/viewComponents/themes/light";
import EStyleSheet from "react-native-extended-stylesheet";
import Locales from "../../cores/languages/languages";
import {styles} from './styles/StyleDetails';
import {firebaseApp} from '../../components/firebase/Realtimedb';
import ZoomImage from 'react-native-zoom-image';
import ImageViewer from 'react-native-image-zoom-viewer';
import {getDataOfflineMode, inValidateText} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import constants from "../../assets/constants";
import DetailsTheme1 from "./DetailsTheme1";
import DetailsTheme2 from "./DetailsTheme2";

const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
    return px * deviceW / basePx
}

const Header_Maximum_Height = 70;

const Header_Minimum_Height = 70;

export default class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {

            check: false,
            theme: DetailsTheme1,

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

                    theme: DetailsTheme1
                })
            } else if (this.state.changetheme === 0) {
                this.setState({

                    theme: DetailsTheme1
                })
            } else if (this.state.changetheme === 1) {
                this.setState({

                    theme: DetailsTheme2
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
