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
} from "react-native";
import FastImage from 'react-native-fast-image';
import Locales from "../../cores/languages/languages";
import {
    getDataOfflineMode, inValidateText,
    saveDataOfflineMode, setHeight,
    ToastyError, validateText
} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import constants from "../../assets/constants";
import darkTheme from "../../cores/viewComponents/themes/dark";
import lightTheme from "../../cores/viewComponents/themes/light";
import EStyleSheet from "react-native-extended-stylesheet";
import {styles} from './styles/StyleSplash';
import {firebaseApp} from '../../components/firebase/Realtimedb';
import Welcome from '../welcome/Welcome';
import Menu from '../menu/Menu';
import { NavigationActions, StackActions} from 'react-navigation';
import global from "../../cores/utils/global";
import {colors} from "../../cores/styles/colors";

export default class Splash extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            authenticated: false,
            bg: colors.blue,
        };

    }

    async componentDidMount() {

        setTimeout(() => {
            this.setState({
                timePassed: this.navigateLogin("Splash2")
            });
        }, 2000);

        // console.log('Token will mount:' + this.state.login_token);
        const dataLanguage = await getDataOfflineMode(constants.LANGUAGE);
        this.setState({
            getLanguage: dataLanguage,
        });
        Locales.setLanguage(this.state.getLanguage);

        const isDarkMode = await getDataOfflineMode(constants.DARK_MODE);
        this.setState(
            {
                shouldRender: isDarkMode
            },
            console.log('theme: ' + isDarkMode)
        );
        if (isDarkMode === '' || isDarkMode === false) {
            EStyleSheet.build(lightTheme);
            //StatusBar.setBarStyle('light-content');
            console.log('log :', isDarkMode)
        } else {
            EStyleSheet.build(darkTheme);
            //StatusBar.setBarStyle('dark-content');
        }
        const isChangeTheme = await getDataOfflineMode(constants.CHANGE_THEME);
        console.log("ChangeTheme: " + isChangeTheme);


        const backgroundColor = await getDataOfflineMode(constants.CHANGE_COLOR);
        if (validateText(backgroundColor)) {
            this.setState({
                    bg: backgroundColor
                }, () =>
                    global.colors = this.state.bg
            )
        } else {
            this.setState({
                    bg: colors.orange
                }, () =>
                    global.colors = this.state.bg
            )
        }


    }

    navigateLogin = (screen) => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: screen })
            ]
        });
        this.props.navigation.dispatch(resetAction);
    };


    render() {
        // if (this.state.loading){
        //   return null;
        // }

        return (
            <View style={styles.container}>
                <StatusBar
                    //barStyle="dark-content"
                    hidden={false}
                    backgroundColor="#FAFAFA"
                    translucent={true}
                />
                <FastImage
                    style={styles.image}
                    source={require('../../assets/image/Screen01.jpg')}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </View>
        );

        // else {
        //   return(
        //     <Page navigation={this.props.navigation}/>
        //   );
        // }

    }

}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#FAFAFA"
//     },
//     image: {
//         width: '100%',
//         height: '100%',
//     }
// });
