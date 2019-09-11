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
    NetInfo,
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/Feather";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import FastImage from "react-native-fast-image";
import Connection from "../../components/checkinternet/Connection";
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import Locales from "../../cores/languages/languages";
import {firebaseApp} from '../../components/firebase/Realtimedb';
import {styles} from './styles/StyleSignup';

const deviceW = Dimensions.get("window").width;
const basePx = 375;

function px2dp(px) {
    return (px * deviceW) / basePx;
}

export default class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isConnected: true,
            displayName: "",
            phoneNumber: "",
            email: "",
            password: "",
            confirmpassword: "",
        };

    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener(
            "connectionChange",
            this.handleConnectivityChange
        );
    }

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

    _onCheckSignin() {
        if (this.state.isConnected == true) {
            this.props.navigation.navigate('Login');
        } else {
            Alert.alert('No Internet Connection');
            return;
        }
    }

    Signup() {
        if (this.state.displayName.trim() === '' | this.state.phoneNumber.trim() === '' | this.state.email.trim() === '' | this.state.password.trim() === '' | this.state.confirmpassword.trim() === '') {
            Alert.alert('Please enter email and password');
            return
        } else if (this.state.password.trim() !== this.state.confirmpassword.trim()) {
            Alert.alert('Password must match confirm password');
            return
        }

        firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.id = firebaseApp.auth().getUid();
                    firebaseApp.database().ref('users').child('accounts').child(this.id).set({
                        displayName: this.state.displayName,
                        phoneNumber: this.state.phoneNumber,
                        email: this.state.email,
                        password: this.state.password,
                        follow: 0,
                        uid: this.id,
                    });
                Alert.alert(
                    'Alert Title',
                    'Signup Success\n' + this.state.email,
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
                        {
                            text: 'OK', onPress: () => {
                                this.props.navigation.navigate('Splash3')
                            }
                        },
                    ],
                    {cancelable: false},
                );
                this.setState({
                    displayName: '',
                    phoneNumber: '',
                    email: '',
                    password: '',
                    confirmpassword: '',
                });
            })
            .catch(function (error) {
                Alert.alert(
                    'Alert Title',
                    'Registration failed',
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                );
            });

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
                <KeyboardAwareScrollView style={styles.keyboardView}>
                    <View style={styles.body}>
                        <View style={styles.logo}>
                            <FastImage
                                style={styles.imageLogo}
                                source={require('../../assets/image/Screen051.jpg')}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </View>
                        <TextComponent style={styles.title}>{Locales.TitleSignup}</TextComponent>
                        <View style={styles.signupForm}>
                            <View style={styles.content}>
                                <Icon style={styles.icon} name="user" size={px2dp(24)} color="#666"/>
                                <View style={styles.content2}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={Locales.TextInputName}
                                        returnKeyType='next'
                                        keyboardType='name-phone-pad'
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                        onSubmitEditing={() => this.textInputPhone.focus()}
                                        onChangeText={displayName => this.setState({displayName})}
                                    />
                                </View>
                            </View>
                            <View style={styles.content}>
                                <Icon2 style={styles.icon} name="phone" size={px2dp(18)} color="#666"/>
                                <View style={styles.content2}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={Locales.TextInputPhone}
                                        returnKeyType='next'
                                        keyboardType='number-pad'
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                        ref={(input) => this.textInputPhone = input}
                                        onSubmitEditing={() => this.textInputEmail.focus()}
                                        onChangeText={phoneNumber => this.setState({phoneNumber})}
                                    />
                                </View>
                            </View>
                            <View style={styles.content}>
                                <Icon style={styles.icon} name="envelope" size={px2dp(22)} color="#666"/>
                                <View style={styles.content2}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={Locales.TextInputEmail}
                                        returnKeyType='next'
                                        keyboardType='email-address'
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                        ref={(input) => this.textInputEmail = input}
                                        onSubmitEditing={() => this.textInputPassword.focus()}
                                        onChangeText={email => this.setState({email})}
                                    />
                                </View>
                            </View>
                            <View style={styles.content}>
                                <Icon style={styles.icon} name="lock" size={px2dp(24)} color="#666"/>
                                <View style={styles.content2}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={Locales.TextInputPass}
                                        keyboardType="default"
                                        returnKeyType='next'
                                        secureTextEntry
                                        autoCorrect={false}
                                        ref={(input) => this.textInputPassword = input}
                                        onSubmitEditing={() => this.textInputConfirmPassword.focus()}
                                        onChangeText={password => this.setState({password})}
                                    />
                                </View>
                            </View>
                            <View style={styles.content}>
                                <Icon style={styles.icon} name="lock" size={px2dp(24)} color="#666"/>
                                <View style={styles.content2}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={Locales.TextInputConfirmPass}
                                        keyboardType="default"
                                        returnKeyType='go'
                                        secureTextEntry
                                        autoCorrect={false}
                                        ref={(input) => this.textInputConfirmPassword = input}
                                        onChangeText={confirmpassword => this.setState({confirmpassword})}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.btn}>
                            <TouchableOpacity style={styles.btnSignup} onPress={() => this.Signup()}>
                                <TextComponent style={styles.textSignup}>{Locales.ButtonSignup}</TextComponent>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.signin}>
                            <TextComponent style={styles.text1}>{Locales.Text1Signup} </TextComponent>
                            <TouchableOpacity style={styles.btnSignin} onPress={() => this._onCheckSignin()}>
                                <TextComponent style={styles.textSignin}>{Locales.Text2Signup}</TextComponent>
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
//     keyboardView: {
//         width: '100%',
//         height: '100%',
//     },
//     body: {
//         width: '100%',
//         height: '100%',
//         justifyContent: "center",
//         alignItems: "center",
//         paddingBottom: 70,
//     },
//     logo: {
//         width: '100%',
//         height: '20%',
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 80,
//     },
//     imageLogo: {
//         width: '50%',
//         height: '85%',
//     },
//     title: {
//         fontSize: 20,
//         color: "black",
//         fontWeight: "600",
//         marginTop: 50
//     },
//     signupForm: {
//         width: "80%",
//         height: 330,
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
//     btn: {
//         width: "80%",
//         height: 60,
//         alignItems: "center",
//         justifyContent: "center",
//         marginTop: 5
//     },
//     btnSignup: {
//         width: "100%",
//         height: 45,
//         backgroundColor: "#0174DF",
//         alignItems: "center",
//         justifyContent: "center",
//         borderRadius: 35
//     },
//     textSignup: {
//         fontSize: 16,
//         fontWeight: "bold",
//         color: "#fff"
//     },
//     signin: {
//         width: "80%",
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 10,
//     },
//     text1: {
//         fontSize: 16,
//         color: "#A4A4A4"
//     },
//     btnSignin: {
//         //width: "20%"
//     },
//     textSignin: {
//         fontSize: 16,
//         color: "#0174DF"
//     },
// });