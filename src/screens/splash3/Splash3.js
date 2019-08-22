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
import Connection from "../../components/checkinternet/Connection";
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import Locales from "../../cores/languages/languages";
import {styles} from './styles/StyleSplash3';

export default class Splash3 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isConnected: true,
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

    _onCheckLogin() {
        if (this.state.isConnected === true) {
            this.props.navigation.navigate('Login');
        } else {
            Alert.alert('No Internet Connection');
            return;
        }
    }

    _onCheckSignup() {
        if (this.state.isConnected === true) {
            this.props.navigation.navigate('Signup');
        } else {
            Alert.alert('No Internet Connection');
            return;
        }
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
                <View style={styles.logo}>
                    <Image style={styles.imageLogo} source={require('../../assets/image/Screen051.jpg')}/>
                </View>
                <View style={styles.content1}>
                    <Image style={styles.image} source={require('../../assets/image/Screen052.jpg')}/>
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity style={styles.btnSignin} onPress={() => this._onCheckLogin()}>
                        <TextComponent style={styles.textSignin}>{Locales.LoginSplash3}</TextComponent>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnSignup} onPress={() => this._onCheckSignup()}>
                        <TextComponent style={styles.textSignup}>{Locales.RegisterSplash3}</TextComponent>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     //justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#FAFAFA"
//   },
//   logo: {
//     width: '95%',
//     height: '12%',
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 120,
//   },
//   imageLogo: {
//     width: '50%',
//     height: '90%',
//   },
//   content1: {
//     width: '100%',
//     height: '30%',
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 50,
//   },
//   image: {
//     width: '80%',
//     height: '100%',
//   },
//   btn: {
//     width: "80%",
//     height: 110,
//     alignItems: "center",
//     marginTop: 100,
//   },
//   btnSignin: {
//     width: "100%",
//     height: 45,
//     backgroundColor: "#0174DF",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 15,
//     borderRadius: 35,
//   },
//   textSignin: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#fff'
//   },
//   btnSignup: {
//     width: "100%",
//     height: 45,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 35,
//     borderWidth: 2,
//     borderColor: "#0174DF",
//   },
//   textSignup: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#0174DF'
//   },
// });