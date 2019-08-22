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
    AsyncStorage,
    ActivityIndicator,
} from "react-native";
import AppIntroSlider from 'react-native-app-intro-slider';
import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/Foundation";
import Icon4 from "react-native-vector-icons/AntDesign";
import Icon5 from "react-native-vector-icons/MaterialIcons";
import Icon6 from "react-native-vector-icons/Entypo";
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import Locales from "../../cores/languages/languages";
import darkTheme from "../../cores/viewComponents/themes/dark";
import lightTheme from "../../cores/viewComponents/themes/light";
import EStyleSheet from "react-native-extended-stylesheet";
import {styles} from './styles/StyleSplash2';
import {firebaseApp} from '../../components/firebase/Realtimedb';
import Welcome from '../welcome/Welcome';
import Menu from '../menu/Menu';

export default class Splash2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showRealApp: false,
            loading: true,
            authenticated: false,
            isHidden: false
        };
    }

    componentDidMount() {
        AsyncStorage.getItem('first_time').then((value) => {
            this.setState({showRealApp: !!value, loading: false});
        });

        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({loading: false, authenticated: true});
            } else {
                this.setState({loading: false, authenticated: false});
            }
        });

    }

    _onSkip = () => {
        // After user skip the intro slides. Show real app through
        // navigation or simply by controlling state
        AsyncStorage.setItem('first_time', 'true').then(() => {
            this.setState({showRealApp: true});
            this.props.navigation.navigate('Splash3');
        });
    };

    _onDone = () => {
        // After user finished the intro slides. Show real app through
        // navigation or simply by controlling state
        AsyncStorage.setItem('first_time', 'true').then(() => {
            this.setState({showRealApp: true});
            this.props.navigation.navigate('Splash3');
        });
    };

    render() {
        if (this.state.loading) {
            return <ActivityIndicator size="large"/>
        } else if (!this.state.authenticated) {
            return (
                <View style={styles.container}>
                    <StatusBar
                        //barStyle="dark-content"
                        hidden={false}
                        backgroundColor="transparent"
                        translucent
                    />
                    <AppIntroSlider style={styles.introslider}
                                    slides={slides}

                                    onSkip={this._onSkip}
                                    onDone={this._onDone}

                                    showSkipButton={true}
                                    showPrevButton={true}
                                    skipLabel={Locales.Skip}
                                    prevLabel={Locales.Skip}
                                    nextLabel={Locales.Next}
                                    doneLabel={Locales.Finish}
                                    buttonTextStyle={{color: 'black', fontWeight: '500'}}
                                    dotStyle={{backgroundColor: '#BDBDBD', width: 7, height: 7, borderRadius: 7}}
                                    activeDotStyle={{backgroundColor: '#0174DF', width: 7, height: 7, borderRadius: 7}}
                                    paginationStyle={{marginBottom: 20}}
                    />
                </View>
            );
        } else {
            return (
                <Menu navigation={this.props.navigation}/>
            );
        }
    }

}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#F5FCFF",
//     },
//     image: {
//         width: 340,
//         height: 270,
//         marginTop: 50
//     },
//     title: {
//         fontSize: 25,
//         fontWeight: '500',
//         color: 'black',
//         textAlign: 'center',
//         position: 'absolute',
//         bottom: 270
//     },
//     text: {
//         color: '#666',
//         fontSize: 16,
//         textAlign: 'center',
//         marginLeft: 35,
//         marginRight: 35,
//         marginBottom: 50
//     },
// });

const slides = [
    {
        key: 's1',
        title: Locales.Title1Splash2,
        text: Locales.Text1Splash2,
        titleStyle: styles.title,
        // titleStyle:{color:'red',  position: 'absolute', bottom: 150},
        textStyle: styles.text,
        image: require('../../assets/image/Screen02.jpg'),
        imageStyle: styles.image,
        backgroundColor: '#fff',
    },
    {
        key: 's2',
        title: Locales.Title2Splash2,
        text: Locales.Text2Splash2,
        titleStyle: styles.title,
        textStyle: styles.text,
        image: require('../../assets/image/Screen03.jpg'),
        imageStyle: styles.image,
        backgroundColor: '#fff',
    },
    {
        key: 's3',
        title: Locales.Title3Splash2,
        text: Locales.Text3Splash2,
        titleStyle: styles.title,
        textStyle: styles.text,
        image: require('../../assets/image/Screen04.jpg'),
        imageStyle: styles.image,
        backgroundColor: '#fff',
    },
];
