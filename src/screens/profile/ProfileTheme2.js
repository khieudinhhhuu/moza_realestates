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
import Icon3 from "react-native-vector-icons/Foundation";
import Icon4 from "react-native-vector-icons/AntDesign";
import Icon5 from "react-native-vector-icons/MaterialIcons";
import Icon6 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon7 from "react-native-vector-icons/FontAwesome";
import Icon8 from "react-native-vector-icons/Octicons";
import FastImage from "react-native-fast-image";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Rating, AirbnbRating} from "react-native-ratings";
import {colors} from "../../cores/styles/colors";
import PhotoUpload from "react-native-photo-upload";
import ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import RNFS from "react-native-fs";
import TextComponent from "../../cores/viewComponents/text/TextComponent";
import Locales from "../../cores/languages/languages";
import darkTheme from "../../cores/viewComponents/themes/dark";
import lightTheme from "../../cores/viewComponents/themes/light";
import EStyleSheet from "react-native-extended-stylesheet";
import {firebaseApp} from '../../components/firebase/Realtimedb';
import {styles} from "./styles/StyleProfileTheme2";
import {getDataOfflineMode, validateText} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import constants from "../../assets/constants";
import global from "../../cores/utils/global";


const deviceW = Dimensions.get("window").width;

const basePx = 375;

function px2dp(px) {
    return (px * deviceW) / basePx;
}

export default class ProfileTheme2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            data2: [],
            currentUser: '',
            isLoading: false,
            photoURL: 'http://media2.sieuhai.tv:8088/onbox/images/user_lead_image/20190408/84947430634_20190408001343.jpg',
            bg: colors.blue,
        };

        thisState = this;
        //1 dau = de dung cho lenh gan
        //2 dau bang la de dung trong so sanh (tuong doi)
    }

    onUpdateUser = information => {
        this.setState(information);
        // console.log('information999: ' + JSON.stringify(information));
        // console.log('photoURL999: ' + JSON.stringify(information.photoURL));
        // console.log('displayName999: ' + JSON.stringify(information.displayName));
        // console.log('phoneNumber999: ' + JSON.stringify(information.phoneNumber));
        // console.log('address999: ' + JSON.stringify(information.address));
        // console.log('email999: ' + JSON.stringify(information.email));
        this.setState({
            currentUser: information,
        });
    };

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


        let array = [];
        firebaseApp.database().ref('data').child('bds').on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childData = childSnapshot.val();
                array.push({
                    id: childSnapshot.key,
                    address: childData.address,
                    avatar: childData.avatar,
                    bathrooms: childData.bathrooms,
                    bedrooms: childData.bedrooms,
                    description: childData.description,
                    detail: childData.detail,
                    image: childData.image,
                    kitchen: childData.kitchen,
                    landmark: childData.landmark,
                    latitude: childData.latitude,
                    latitudeDelta: childData.latitudeDelta,
                    link: childData.link,
                    longitude: childData.longitude,
                    longitudeDelta: childData.longitudeDelta,
                    name: childData.name,
                    owner: childData.owner,
                    parkings: childData.parkings,
                    price: childData.price,
                    rate: childData.rate,
                    sqm: childData.sqm,
                    status: childData.status,
                    type: childData.type,
                    year: childData.year,
                    checkFavourite: childData.checkFavourite,
                });
            });
            thisState.setState({
                    data: array,
                }, function () {
                    console.log("data: " + this.state.data)
                }
            );

        });


        // var user = firebaseApp.auth().currentUser;
        // console.log("user: " + JSON.stringify(user));
        // var displayName, email, photoURL, uid, password, phoneNumber, address;
        // if (user != null) {
        //     displayName = user.displayName;
        //     email = user.email;
        //     photoURL = user.photoURL;
        //     phoneNumber = user.phoneNumber;
        //     password = user.password;
        //     address = user.address;
        //     uid = user.uid;
        //
        //     console.log("  Provider-specific UID: " + uid);
        //     console.log("  displayName: " + displayName);
        //     console.log("  Email: " + email);
        //     console.log("  Photo URL: " + photoURL);
        //     console.log("  phoneNumber: " + phoneNumber);
        //     console.log("  address: " + address);
        //     console.log("  password: " + password);
        //
        //     // user.providerData.forEach(function (profile) {
        //     //     console.log("Sign-in provider: " + profile.providerId);
        //     //     console.log("  Provider-specific UID: " + profile.uid);
        //     //     console.log("  displayName: " + profile.displayName);
        //     //     console.log("  Email: " + profile.email);
        //     //     console.log("  Photo URL: " + profile.photoURL);
        //     //     console.log("  phoneNumber: " + profile.phoneNumber);
        //     //     console.log("  address: " + profile.address);
        //     //     console.log("  password: " + profile.password);
        //     // });
        // }

        this.getProfile();

    }


    getProfile() {
        //let array2 = [];
        //vì user này k đổi nên sẽ dùng const
        const user = firebaseApp.auth().currentUser;
        console.log("user: " + JSON.stringify(user));
        // firebaseApp.database().ref('users').child('accounts').child(user.uid).on('value', function (snapshot) {
        firebaseApp.database().ref('users').child('accounts').on('value', function (snapshot) {
            console.log("snapshot: " + JSON.stringify(snapshot));
            //đây là hàm để lặp toàn bộ object trong mảng accounts
            snapshot.forEach(function (childSnapshot) {
                const childData = childSnapshot.val();
                if (childData.uid === user.uid) {
                    thisState.setState({
                        isLoading: true,
                        currentUser: childData,
                    }, () => {
                        console.log("currentUser: " + JSON.stringify(childData));
                        console.log("currentUser_displayName: " + childData.displayName);
                    })
                }
                // array2.push({
                //     id: childSnapshot.key,
                //     email: childData.email,
                //     displayName: childData.displayName,
                //     password: childData.password,
                //     phoneNumber: childData.phoneNumber,
                //     address: childData.address,
                //     photoURL: childData.photoURL,
                //     uid: childData.uid,
                // });
            });
            // thisState.setState({
            //     data2: array2,
            // }, function () {
            //     console.log("data2: " + JSON.stringify(this.state.data2))
            // });

            //Log tat ca data tu mang
            // console.log("array2: " + JSON.stringify(array2));
            //
            // log 1 phan tu nho
            // console.log("array2_displayName: " + array2[0].displayName);
        });

    }

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
                    // barStyle="$statusBar"
                    hidden={false}
                    backgroundColor="transparent"
                    translucent
                />
                <View style={styles.header}>
                    <View style={styles.iconLeft}/>
                    {/*<Icon4 onPress={() => navigate('Menu')} style={styles.iconLeft} name="arrowleft" size={px2dp(28)}/>*/}
                    <TextComponent style={styles.titleHeader}>{Locales.Profile}</TextComponent>
                    <Icon onPress={() => this._onUpdate()} style={styles.iconBell} name="bell" size={px2dp(30)} color="#fff"/>
                </View>
                <KeyboardAwareScrollView style={styles.keyboardView}>
                    <View style={styles.body}>
                        <View style={styles.viewInformation}>
                            <View style={styles.avatar}>
                                <Image style={styles.imageAvatar} resizeMode="cover"
                                       source={{uri: this.state.currentUser.photoURL}}/>
                            </View>
                            <TouchableOpacity style={styles.call} >
                                <TextComponent style={styles.textCall}>{Locales.Call}</TextComponent>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.editUser} onPress={() => navigate("EditAccount",
                                {photoURL: this.state.currentUser.photoURL,
                                    displayName: this.state.currentUser.displayName,
                                    phoneNumber: this.state.currentUser.phoneNumber,
                                    address: this.state.currentUser.address,
                                    email: this.state.currentUser.email,
                                    onUpdateUser: this.onUpdateUser}
                            )}>
                                <Icon6 style={styles.iconEditUser} name="account-edit" size={px2dp(35)} color="black"/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.name}>
                            {console.log("xxxxxxxx: " + JSON.stringify(this.state.currentUser))}
                            <TextComponent style={styles.textName}>{this.state.currentUser.displayName}</TextComponent>
                            <TextComponent style={styles.textEmail}>Email: {this.state.currentUser.email}</TextComponent>
                        </View>
                        <View style={styles.viewFP}>
                            <View style={styles.follow}>
                                <TextComponent style={styles.textFollow}>FOLLOWERS</TextComponent>
                                <TextComponent style={styles.numberFollow}>375</TextComponent>
                            </View>
                            <View style={styles.property}>
                                <TextComponent style={styles.textProperty}>PROPERTIES</TextComponent>
                                <TextComponent style={styles.numberProperty}>64</TextComponent>
                            </View>
                        </View>
                        <View style={styles.content}>
                            <TouchableOpacity style={[styles.addPost, {backgroundColor: color}]} onPress={() => navigate('Sell')}>
                                <Icon5 style={styles.iconAddPost} name="add-circle-outline" size={px2dp(18)} color="#fff"/>
                                <TextComponent style={styles.textAddPost}>{Locales.PostSale}</TextComponent>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.editPost, {backgroundColor: color}]} onPress={() => this._onUpdate()}>
                                <Icon4 style={styles.iconEditPost} name="edit" size={px2dp(17)} color="#fff"/>
                                <TextComponent style={styles.textEditPost}>{Locales.EditPost}</TextComponent>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.recentlyView}>
                            <TextComponent style={styles.textRecentlyView}>
                                {Locales.RecentlyProfile}
                            </TextComponent>
                        </View>
                        <View style={styles.FlatList}>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                data={this.state.data}
                                renderItem={({item}) => (
                                    <View style={styles.content22}>
                                        <TouchableOpacity style={styles.touchable22}>
                                            <FastImage style={styles.fastImage} source={{uri: item.image}}>
                                                <View style={[styles.status, {backgroundColor: color}]}>
                                                    <TextComponent style={styles.textStatus}>{item.status}</TextComponent>
                                                </View>
                                            </FastImage>
                                            <View style={styles.partBottom2}>
                                                <View style={styles.content1}>
                                                    <TextComponent style={styles.title2}>{item.name}</TextComponent>
                                                    <View style={styles.content2}>
                                                        <Icon3 style={styles.iconStar} name="star" size={px2dp(14)}
                                                               color="#FE9A2E"/>
                                                        <TextComponent style={styles.rating}>{item.rate}</TextComponent>
                                                        <TextComponent style={styles.textReviews}>Reviews</TextComponent>
                                                    </View>
                                                </View>
                                                <View style={styles.content3}>
                                                    <View style={styles.content4}>
                                                        <View style={styles.content5}>
                                                            <Icon4 style={styles.iconEnviromento} name="enviromento"
                                                                   size={px2dp(14)} color="#666"/>
                                                            <TextComponent
                                                                style={styles.textCity}>{item.address}</TextComponent>
                                                        </View>
                                                        <View style={styles.content6}>
                                                            <Icon4 style={styles.iconHome} name="home" size={px2dp(14)}
                                                                   color="#666"/>
                                                            <TextComponent style={styles.textKm}>{item.sqm}</TextComponent>
                                                            <TextComponent style={styles.textUnit}>sq/m</TextComponent>
                                                        </View>
                                                    </View>
                                                    <View style={styles.content7}>
                                                        <TextComponent style={[styles.textCurrency, {color: color}]}>$</TextComponent>
                                                        <TextComponent style={[styles.textMoney, {color: color}]}>{item.price}</TextComponent>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                keyExtractor={(item, index) => item.id}
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

