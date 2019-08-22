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
import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/AntDesign";
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import Locales from "../../cores/languages/languages";
import {styles} from './styles/StyleWelcome';
import {NavigationActions, StackActions} from "react-navigation";

const deviceW = Dimensions.get("window").width;
const basePx = 375;

function px2dp(px) {
    return (px * deviceW) / basePx;
}

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'Menu'})],
});

export default class Welcome extends Component {

    constructor(props) {
        super(props);

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
                <View style={styles.logo}>
                    <FastImage
                        style={styles.imageLogo}
                        source={require('../../assets/image/Screen051.jpg')}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </View>
                <View style={styles.content1}>
                    <FastImage
                        style={styles.image}
                        source={require('../../assets/image/Screen08.jpg')}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </View>
                <TextComponent style={styles.title}>{Locales.TitleWelcome}</TextComponent>
                <View style={styles.content2}>
                    <TextComponent style={styles.text2}>{Locales.TextWelcome}</TextComponent>
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity style={styles.btnSignin} onPress={() => {
                        this.props.navigation.dispatch(resetAction);
                    }}>
                        <Icon style={styles.icon} name="rightcircleo" size={px2dp(15)} color="#fff"/>
                        <TextComponent style={styles.textSignin}>{Locales.ButtonWelcome}</TextComponent>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         //justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#FAFAFA"
//     },
//     logo: {
//         width: '95%',
//         height: '12%',
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 100,
//     },
//     imageLogo: {
//         width: '50%',
//         height: '90%',
//     },
//     content1: {
//         width: '100%',
//         height: '30%',
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 50,
//     },
//     image: {
//         width: '80%',
//         height: '100%',
//     },
//     title: {
//         fontWeight: '600',
//         fontSize: 25,
//         color: 'black',
//         marginTop: 40,
//     },
//     content2: {
//         width: '70%',
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 20,
//     },
//     text2: {
//         fontWeight: '400',
//         fontSize: 15,
//         color: '#A4A4A4',
//         textAlign: "center",
//         lineHeight: 23,
//     },
//     btn: {
//         width: "80%",
//         height: 110,
//         alignItems: "center",
//         marginTop: 40,
//     },
//     btnSignin: {
//         width: "100%",
//         height: 45,
//         backgroundColor: "#0174DF",
//         alignItems: "center",
//         justifyContent: "center",
//         flexDirection: "row",
//         marginBottom: 15,
//         borderRadius: 35,
//     },
//     icon: {
//         marginRight: 13,
//     },
//     textSignin: {
//         fontSize: 16,
//         fontWeight: '400',
//         color: '#fff'
//     },
// });