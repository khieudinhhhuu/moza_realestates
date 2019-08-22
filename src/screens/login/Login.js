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
    CheckBox,
    AsyncStorage,
    NetInfo,
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/SimpleLineIcons";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import FastImage from "react-native-fast-image";
import Connection from "../../components/checkinternet/Connection";
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import Locales from "../../cores/languages/languages";
import {firebaseApp} from '../../components/firebase/Realtimedb';
import {styles} from './styles/StyleLogin';
import {getDataOfflineMode, saveDataOfflineMode} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import constants from "../../assets/constants";

const deviceW = Dimensions.get("window").width;
const basePx = 375;

function px2dp(px) {
    return (px * deviceW) / basePx;
}

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isConnected: true,
            email: "",
            password: "",
            loading: true,
            authenticated: false,
            checked: false,
            // textInputEmail: "",
            // TextInputPass: "",
        };

    }

    async componentDidMount() {
        NetInfo.isConnected.addEventListener(
            "connectionChange",
            this.handleConnectivityChange
        );

        // const checkboxx = await getDataOfflineMode('key')
        // this.setState({
        //   checked: checkboxx,
        // })

        AsyncStorage.getItem('key').then(value =>
            this.setState({getValue: value})
        );

    }

    //!this.state.checked
    _onCheckkeepme = (value) => {
        this.setState({
            checked: value
        });
        if (value == false) {
            saveDataOfflineMode('key', false);
            Alert.alert("keep me Off");
        } else {
            saveDataOfflineMode('key', true);
            Alert.alert("keep me On.");
        }
    };

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener(
            "connectionChange",
            this.handleConnectivityChange
        );
    }

    handleConnectivityChange = isConnected => {
        if (isConnected) {
            this.setState({isConnected});
        } else {
            this.setState({isConnected});
        }
    };

    _onCheckSignup() {
        if (this.state.isConnected === true) {
            this.props.navigation.navigate('Signup');
        } else {
            Alert.alert('No Internet Connection');
            return;
        }
    }

    Login() {
        if (this.state.email.trim() === '' || this.state.password.trim() === '') {
            Alert.alert('Please enter email and password');
            return
        }
        firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.props.navigation.navigate('Welcome');
                // Alert.alert(
                //     'Alert Title',
                //     'Loggin successfully\n' + this.state.email,
                //     [
                //         {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
                //         {
                //             text: 'OK', onPress: () => {this.props.navigation.navigate('Welcome')}
                //         },
                //     ],
                //     {cancelable: false},
                // );
                this.setState({
                    email: '',
                    password: ''
                });
            })
            .catch(function (error) {
                Alert.alert(
                    'Alert Title',
                    'login failed please try again',
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                );
            });

    }

    _onUpdate(){
        Alert.alert("Function is updating");
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor="#FAFAFA"
                    translucent={false}
                />
                {!this.state.isConnected ? <Connection/> : null}
                <KeyboardAwareScrollView style={styles.body}>
                    <View style={styles.fake}>
                        <View style={styles.logo}>
                            <FastImage
                                style={styles.imageLogo}
                                source={require("../../assets/image/Screen051.jpg")}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </View>
                        <TextComponent style={styles.title}>{Locales.TitleLogin}</TextComponent>
                        <View style={styles.loginForm}>
                            <View style={styles.content}>
                                <Icon style={styles.icon} name="envelope" size={px2dp(20)} color="#666"/>
                                <View style={styles.content2}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={Locales.TextInputEmail}
                                        returnKeyType="next"
                                        keyboardType="email-address"
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                        onSubmitEditing={() => this.passwordInput.focus()}
                                        onChangeText={email => this.setState({email})}
                                        value={this.state.textInputEmail}
                                    />
                                </View>
                            </View>
                            <View style={styles.content}>
                                <Icon
                                    style={styles.icon}
                                    name="lock"
                                    size={px2dp(22)}
                                    color="#666"
                                />
                                <View style={styles.content2}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={Locales.TextInputPass}
                                        keyboardType="default"
                                        returnKeyType="go"
                                        secureTextEntry
                                        autoCorrect={false}
                                        ref={input => (this.passwordInput = input)}
                                        onChangeText={password => this.setState({password})}
                                        value={this.state.TextInputPass}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.checked}>
                            <CheckBox
                                style={{marginLeft: 5}}
                                value={this.state.checked}
                                onValueChange={(value) => this._onCheckkeepme(value)}
                            />
                            <TextComponent style={styles.textChecked}>{Locales.Keep_me_Signin}</TextComponent>
                        </View>
                        <View style={styles.btn}>
                            <TouchableOpacity style={styles.btnSignin} onPress={() => this.Login()}>
                                <TextComponent style={styles.textSignin}>{Locales.ButtonLogin}</TextComponent>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.signup}>
                            <TextComponent style={styles.text1}>{Locales.Text1Login} </TextComponent>
                            <TouchableOpacity style={styles.btnSignup} onPress={() => this._onCheckSignup()}>
                                <TextComponent style={styles.textSignup}>{Locales.Text2Login}</TextComponent>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.or}>
                            <TextComponent style={styles.text2}>{Locales.Text3Login}</TextComponent>
                        </View>
                        <View style={styles.btnSocial}>
                            <TouchableOpacity style={styles.btnFacebook} onPress={() => this._onUpdate()}>
                                <TextComponent style={styles.textFacebook1}>{Locales.ButtonFB} </TextComponent>
                                <Icon2 style={styles.imageFacebook} name="social-facebook" size={px2dp(18)}
                                       color="#fff"/>
                                <TextComponent style={styles.textFacebook2}> FACEBOOK</TextComponent>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnTwitter} onPress={() => this._onUpdate()}>
                                <TextComponent style={styles.textTwitter1}>{Locales.ButtonTwitter} </TextComponent>
                                <Icon2 style={styles.imageTwitter} name="social-twitter" size={px2dp(18)} color="#fff"/>
                                <TextComponent style={styles.textTwitter2}> TWITTER</TextComponent>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#FAFAFA"
//     },
//     body: {
//         width: "100%",
//         height: "100%"
//     },
//     fake: {
//         width: "100%",
//         height: "100%",
//         justifyContent: "center",
//         alignItems: "center",
//         paddingBottom: 70,
//     },
//     logo: {
//         width: "100%",
//         height: "20%",
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 80
//     },
//     imageLogo: {
//         width: "50%",
//         height: "85%"
//     },
//     title: {
//         fontSize: 20,
//         color: "black",
//         fontWeight: "600",
//         marginTop: 60
//     },
//     loginForm: {
//         width: "80%",
//         height: 130,
//         marginTop: 30,
//         justifyContent: "center",
//         alignItems: "center"
//     },
//     content: {
//         width: "100%",
//         height: 45,
//         marginBottom: 20,
//         borderRadius: 35,
//         borderWidth: 1.5,
//         borderColor: "#848484",
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: "row"
//     },
//     icon: {
//         marginLeft: 10,
//         marginRight: 7
//     },
//     content2: {
//         width: "85%",
//         justifyContent: "flex-start",
//         alignItems: "flex-start"
//     },
//     textInput: {
//         width: "100%",
//         fontSize: 15,
//         textAlign: "left",
//         paddingRight: 7
//     },
//     checked: {
//         width: "80%",
//         flexDirection: "row",
//         alignItems: "center"
//     },
//     textChecked: {
//         fontSize: 16,
//         color: "#A4A4A4"
//     },
//     btn: {
//         width: "80%",
//         height: 70,
//         alignItems: "center",
//         marginTop: 20
//     },
//     btnSignin: {
//         width: "100%",
//         height: 45,
//         backgroundColor: "#0174DF",
//         alignItems: "center",
//         justifyContent: "center",
//         borderRadius: 35
//     },
//     textSignin: {
//         fontSize: 16,
//         fontWeight: "bold",
//         color: "#fff"
//     },
//     signup: {
//         width: "80%",
//         flexDirection: "row",
//         justifyContent: "center"
//     },
//     text1: {
//         fontSize: 16,
//         color: "#A4A4A4"
//     },
//     btnSignup: {
//         width: "20%"
//     },
//     textSignup: {
//         fontSize: 16,
//         color: "#0174DF"
//     },
//     or: {
//         width: "40%",
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 20,
//         marginBottom: 15
//     },
//     text2: {
//         fontSize: 18,
//         color: "#A4A4A4"
//     },
//     btnSocial: {
//         width: "80%",
//         height: 110,
//         alignItems: "center",
//         justifyContent: "center"
//     },
//     btnFacebook: {
//         width: "100%",
//         height: 45,
//         backgroundColor: "#8258FA",
//         alignItems: "center",
//         justifyContent: "center",
//         flexDirection: "row",
//         marginBottom: 10,
//         borderRadius: 35
//     },
//     textFacebook1: {
//         fontSize: 16,
//         fontWeight: "500",
//         color: "#fff"
//     },
//     imageFacebook: {
//         marginRight: 1
//     },
//     textFacebook2: {
//         fontSize: 16,
//         fontWeight: "500",
//         color: "#fff"
//     },
//     btnTwitter: {
//         width: "100%",
//         height: 45,
//         backgroundColor: "#2ECCFA",
//         alignItems: "center",
//         justifyContent: "center",
//         flexDirection: "row",
//         borderRadius: 35
//     },
//     textTwitter1: {
//         fontSize: 16,
//         fontWeight: "500",
//         color: "#fff"
//     },
//     imageTwitter: {
//         marginRight: 1
//     },
//     textTwitter2: {
//         fontSize: 16,
//         fontWeight: "500",
//         color: "#fff"
//     }
// });
