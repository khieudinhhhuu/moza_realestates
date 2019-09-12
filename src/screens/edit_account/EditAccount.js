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
    Switch
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/Entypo";
import Icon4 from "react-native-vector-icons/AntDesign";
import Icon5 from "react-native-vector-icons/MaterialIcons";
import Icon6 from "react-native-vector-icons/MaterialCommunityIcons";
import FastImage from "react-native-fast-image";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Rating, AirbnbRating} from "react-native-ratings";
import color, {colors} from "../../cores/styles/colors";
import PhotoUpload from "react-native-photo-upload";
import ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import RNFS from "react-native-fs";
import TextComponent from "../../cores/viewComponents/text/TextComponent";
import Locales from "../../cores/languages/languages";
import darkTheme from "../../cores/viewComponents/themes/dark";
import lightTheme from "../../cores/viewComponents/themes/light";
import EStyleSheet from "react-native-extended-stylesheet";
import {getDataOfflineMode, setWidth, validateText} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import {firebaseApp} from '../../components/firebase/Realtimedb';
import RNFetchBlob from "rn-fetch-blob";
import {StackActions, NavigationActions} from 'react-navigation';
import {styles} from './styles/StyleEditAccount';
import constants from "../../assets/constants";
import global from "../../cores/utils/global";

const deviceW = Dimensions.get("window").width;

const basePx = 375;

function px2dp(px) {
    return (px * deviceW) / basePx;
}

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'Menu'})],
});

let options = {
    title: 'Select Avatar',
    customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export default class EditAccount extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: false,
            photoURL: 'http://media2.sieuhai.tv:8088/onbox/images/user_lead_image/20190408/84947430634_20190408001343.jpg',
            displayName: "",
            phoneNumber: "",
            address: "",
            email: "",
            follow: "",
            bg: colors.blue,
        };
        thisState = this;
    }

    async componentDidMount() {

        const backgroundColor = await getDataOfflineMode(constants.CHANGE_COLOR);
        console.log("colortheme: " + backgroundColor);
        if (validateText(backgroundColor)) {
            this.setState({
                    bg: backgroundColor
                }, () =>
                    global.colors = this.state.bg
            )
        } else {
            this.setState({
                    bg: colors.blue
                }, () =>
                    global.colors = this.state.bg
            )
        }


        const {navigation} = this.props;
        const photoURL = navigation.getParam('photoURL', this.state.photoURL);
        const displayName = navigation.getParam('displayName', Locales.FirstAndLastName);
        const phoneNumber = navigation.getParam('phoneNumber', Locales.PhoneNumber);
        const address = navigation.getParam('address', Locales.Address);
        const email = navigation.getParam('email', "Email");
        const follow = navigation.getParam('follow', "Follow");
        thisState.setState({
            photoURL: photoURL,
            displayName: displayName,
            phoneNumber: phoneNumber,
            address: address,
            email: email,
            follow: follow,
        });


        let array = [];
        firebaseApp.database().ref('users').child('account').on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childData = childSnapshot.val();
                array.push({
                    id: childSnapshot.key,
                    email: childData.email,
                    displayName: childData.displayName,
                    password: childData.password,
                    phoneNumber: childData.phoneNumber,
                    uid: childData.uid,
                });
            });
            thisState.setState({
                data: array,
            });
        });
    }


    _onPost() {
        console.log('photoURL: ' + this.state.photoURL);
        console.log('displayname: ' + this.state.displayName);
        console.log('phoneNumber: ' + this.state.phoneNumber);
        console.log('address: ' + this.state.address);
        console.log('email: ' + this.state.email);
        console.log('follow: ' + this.state.follow);
        if (this.state.displayName.trim() === '' || this.state.phoneNumber.trim() === '' || this.state.address.trim() === '') {
            Alert.alert('Error !!!', 'Please enter Text Content');
            return
        }else {
            this.id = firebaseApp.auth().getUid();
            firebaseApp.database().ref('users').child('accounts').child(this.id).update({
                displayName: this.state.displayName,
                phoneNumber: this.state.phoneNumber,
                address: this.state.address,
                photoURL: this.state.photoURL,
                email: this.state.email,
            });

            this.goBack();

            // this.setState({
            //     displayName: '',
            //     phoneNumber: '',
            //     address: '',
            // });

        }

    }

    goBack(){
        const { navigation } = this.props;
        const {photoURL, displayName, phoneNumber, address, email, follow} = this.state;
        navigation.goBack();
        navigation.state.params.onUpdateUser({follow: follow, email: email, photoURL: photoURL, displayName: displayName, phoneNumber: phoneNumber, address: address });
    }

    uploadImage(uri, mime = 'application/octet-stream') {
        return new Promise((resolve, reject) => {
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
            const sessionId = new Date().getTime();
            let uploadBlob = null;

            const imageRef = firebaseApp.storage().ref('images').child(`${sessionId}.jpg`);

            fs.readFile(uploadUri, 'base64')
                .then((data) => {
                    return Blob.build(data, {type: `${mime};BASE64`})
                })
                .then((blob) => {
                    uploadBlob = blob;
                    return imageRef.put(blob, {contentType: mime})
                })
                .then(() => {
                    uploadBlob.close();
                    return imageRef.getDownloadURL()
                })
                .then((url) => {
                    resolve(url)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    chooseFile = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // let source = { uri: response.uri };
                // this.setState({photoURL: response.uri})

                // You can also display the image using data:
                // let photoURL = { uri: 'data:image/jpeg;base64,' + response.data };

                this.uploadImage(response.uri)
                    .then(url => {
                        this.setState({photoURL: url})
                    })
                    .catch(error => console.log(error))

            }
        });
    };

    _onUpdate(){
        Alert.alert("Function is updating");
    }

    render() {
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        const color = this.state.bg;
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="$statusBar"
                    hidden={false}
                    backgroundColor="transparent"
                    translucent
                />
                <View style={styles.header}>
                    <Icon3 onPress={() => navigation.goBack()} style={styles.iconLeft} name="chevron-left" size={px2dp(30)}/>
                    <TextComponent style={styles.titleHeader}>{Locales.EditAccount}</TextComponent>
                    <Icon onPress={() => this._onUpdate()} style={styles.iconSearch} name="search" size={px2dp(30)}/>
                </View>
                <KeyboardAwareScrollView style={styles.keyboardView}>
                    <View style={styles.body}>
                        <View style={styles.avatar}>
                            <Image style={styles.imageAvatar} resizeMode="cover" source={{uri: this.state.photoURL}}/>
                        </View>
                        <TouchableOpacity style={[styles.btnSelectImage, {backgroundColor: color}]} onPress={this.chooseFile.bind(this)}>
                            <TextComponent style={styles.textSelectImage}>{Locales.SelectImage}</TextComponent>
                        </TouchableOpacity>
                        <View style={styles.information}>
                            <View style={styles.content}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder= {Locales.FirstAndLastName}
                                    returnKeyType="next"
                                    keyboardType="default"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    onSubmitEditing={() => this.textInputName.focus()}
                                    onChangeText={(displayName) => this.setState({displayName})}
                                    value={this.state.displayName}
                                />
                            </View>
                            <View style={styles.content}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder= {Locales.PhoneNumber}
                                    returnKeyType="next"
                                    keyboardType="number-pad"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    ref={(input) => this.textInputName = input}
                                    onSubmitEditing={() => this.textInputPhone.focus()}
                                    onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                                    value={this.state.phoneNumber}
                                />
                            </View>
                            <View style={styles.content}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder= {Locales.Address}
                                    returnKeyType="go"
                                    keyboardType="default"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    ref={(input) => this.textInputPhone = input}
                                    onChangeText={(address) => this.setState({address})}
                                    value={this.state.address}
                                />
                            </View>
                        </View>
                        <View style={styles.btn}>
                            <TouchableOpacity style={[styles.btnUpdate, {backgroundColor: color}]} onPress={() => this._onPost()}>
                                <TextComponent style={styles.textUpdate}>{Locales.Update}</TextComponent>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btnCancel, {backgroundColor: color}]} onPress={() => navigation.goBack()}>
                                <TextComponent style={styles.textCancel}>{Locales.Cancel}</TextComponent>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

// const styles = EStyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center",
//         backgroundColor: "$background"
//     },
//     header: {
//         height: 70,
//         backgroundColor: "$header",
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: 'row',
//         width: "100%",
//         paddingLeft: 10,
//         paddingRight: 10,
//     },
//     iconLeft: {
//         marginTop: 20,
//         color: "#fff",
//         marginLeft: 5,
//     },
//     titleHeader: {
//         color: "white",
//         textAlign: "center",
//         fontWeight: "bold",
//         fontSize: 20,
//         marginTop: 20,
//     },
//     iconSearch: {
//         marginTop: 20,
//         color: "#fff",
//         marginRight: 5,
//     },
//     keyboardView: {
//         width: "100%",
//         height: "100%"
//     },
//     fake: {
//         width: "100%",
//         height: "100%",
//         justifyContent: "center",
//         alignItems: "center"
//     },
//     avatar: {
//         width: 130,
//         height: 130,
//         borderRadius: 130,
//         backgroundColor: "#fff",
//         borderWidth: 0.5,
//         borderColor: "#666",
//         justifyContent: "center",
//         alignItems: "center",
//         top: 20
//     },
//     imageAvatar: {
//         width: 125,
//         height: 125,
//         borderRadius: 125
//     },
//     btnSelectImage: {
//         width: "30%",
//         height: 35,
//         alignItems: "center",
//         justifyContent: "center",
//         marginTop: 35,
//         marginBottom: 20,
//         borderRadius: 5,
//         backgroundColor: "orange",
//     },
//     textSelectImage: {
//         fontSize: 17,
//         fontWeight: "bold",
//         color: "#fff"
//     },
//     information: {
//         width: "85%",
//         marginTop: 20,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     content: {
//         width: "100%",
//         height: 45,
//         marginBottom: 20,
//         borderRadius: 5,
//         borderWidth: 1,
//         borderColor: colors.lightGrey,
//         backgroundColor: '#fff'
//     },
//     textInput: {
//         fontSize: 16,
//         paddingLeft: 10,
//         paddingRight: 10
//     },
//     btn: {
//         width: "85%",
//         height: 110,
//         alignItems: "center",
//         marginTop: 20,
//     },
//     btnUpdate: {
//         width: "100%",
//         height: 45,
//         backgroundColor: "#0174DF",
//         alignItems: "center",
//         justifyContent: "center",
//         borderRadius: 5,
//         marginBottom: 15
//     },
//     textUpdate: {
//         fontSize: 16,
//         fontWeight: "bold",
//         color: "#fff"
//     },
//     btnCancel: {
//         width: "100%",
//         height: 45,
//         backgroundColor: "#0174DF",
//         alignItems: "center",
//         justifyContent: "center",
//         borderRadius: 5
//     },
//     textCancel: {
//         fontSize: 16,
//         fontWeight: "bold",
//         color: "#fff"
//     },
// });
