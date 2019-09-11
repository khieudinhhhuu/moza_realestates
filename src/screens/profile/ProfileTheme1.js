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
import {styles} from "./styles/StyleProfileTheme1";
import {getDataOfflineMode, setWidth, validateText} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import constants from "../../assets/constants";
import global from "../../cores/utils/global";

const deviceW = Dimensions.get("window").width;

const basePx = 375;

function px2dp(px) {
    return (px * deviceW) / basePx;
}

const Header_Maximum_Height = 70;

const Header_Minimum_Height = 70;

export default class ProfileTheme1 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            data2: [],
            data3: [],
            currentUser: '',
            currentUserPost: "",
            isLoading: true,
            photoURL: 'http://media2.sieuhai.tv:8088/onbox/images/user_lead_image/20190408/84947430634_20190408001343.jpg',
            bg: colors.blue,
        };

        this.AnimatedHeaderValue = new Animated.Value(0);
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


        // firebaseApp.database().ref('data').child('sell').on('value', snapshot => {
        //     thisState.setState({
        //         isLoading: false,
        //         data: Object.values(snapshot.val()),
        //     }, () => {
        //         console.log("childSnapshot_post: " + JSON.stringify(Object.values(snapshot.val())));
        //     });
        // });

        let array = [];
        const user = firebaseApp.auth().currentUser;
        firebaseApp.database().ref('data').child('sell').on('value', snapshot => {
            snapshot.forEach(function (childSnapshot) {
                let childData = childSnapshot.val();
                //console.log("childData_post: " + JSON.stringify(childData));
                if (childData.uid === user.uid) {
                    // thisState.setState({
                    //     isLoading: false,
                    //     currentUserPost: childData,
                    // },() => {
                    //     console.log("currentUserPost: " + JSON.stringify(childData));
                    //     console.log("currentUserPost_uid: " + childData.uid);
                    // });
                    array.push({
                        id: childSnapshot.key,
                        image: childData.image,
                        address: childData.address,
                        type: childData.type,
                        direction: childData.direction,
                        latitude: childData.latitude,
                        longitude: childData.longitude,
                        location: childData.location,
                        name: childData.name,
                        owner: childData.owner,
                        price: childData.price,
                        sqm: childData.sqm,
                        year: childData.year,
                        description: childData.description,
                        detail: childData.detail,
                        email: childData.email,
                        displayName: childData.displayName,
                        photoURL: childData.photoURL,
                        phoneNumber: childData.phoneNumber,
                        addressUser: childData.addressUser,
                        follow: childData.follow,
                        checkFavourite: childData.checkFavourite,
                        uid: childData.uid,
                    });
                    thisState.setState({
                        isLoading: false,
                        data: array,
                    }, function () {
                        console.log("data_libaba: " + JSON.stringify(this.state.data));
                    });
                }
            });
            thisState.setState({
                isLoading: false,
                data3: this.state.data,
            }, function () {
                console.log("data3: " + JSON.stringify(this.state.data3));
            });
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
        //console.log("user: " + JSON.stringify(user));
        // firebaseApp.database().ref('users').child('accounts').child(user.uid).on('value', function (snapshot) {
        firebaseApp.database().ref('users').child('accounts').on('value', function (snapshot) {
            //console.log("snapshot: " + JSON.stringify(snapshot));
            //đây là hàm để lặp toàn bộ object trong mảng accounts
            snapshot.forEach(function (childSnapshot) {
                const childData = childSnapshot.val();
                if (childData.uid === user.uid) {
                    thisState.setState({
                        isLoading: false,
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

    render() {
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        const color = this.state.bg;
        const AnimateHeaderBackgroundColor = this.AnimatedHeaderValue.interpolate(
            {
                inputRange: [ 0, ( Header_Maximum_Height - Header_Minimum_Height )  ],

                outputRange: [ 'transparent' , this.state.bg ],

                extrapolate: 'clamp'
            });
        const AnimateHeaderHeight = this.AnimatedHeaderValue.interpolate(
            {
                inputRange: [ 0, ( Header_Maximum_Height - Header_Minimum_Height ) ],

                outputRange: [ Header_Maximum_Height, Header_Minimum_Height ],

                extrapolate: 'clamp'
            });
        return (
            <View style={styles.container}>
                <StatusBar
                    // barStyle="$statusBar"
                    hidden={false}
                    backgroundColor="transparent"
                    translucent
                />
                <KeyboardAwareScrollView
                    style={styles.keyboardView}
                    scrollEventThrottle = { 16 }
                    //contentContainerStyle = {{ paddingTop: Header_Maximum_Height }}
                    onScroll = { Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.AnimatedHeaderValue }}}]
                    )}
                >
                    <View style={styles.body}>
                        <Image style={styles.imageItem} source={require("../../assets/image/villa7.jpg")}/>
                        <View style={styles.avatar}>
                            <Image style={styles.imageAvatar} resizeMode="cover"
                                   source={{uri: this.state.currentUser.photoURL}}/>
                        </View>
                        <View style={styles.name}>
                            {/*{console.log("xxxxxxxx: " + JSON.stringify(this.state.currentUser))}*/}
                            <TextComponent style={styles.textName}>{this.state.currentUser.displayName}</TextComponent>
                            <TextComponent style={styles.textEmail}>Email: {this.state.currentUser.email}</TextComponent>
                        </View>
                        <View style={styles.follows}>
                            <Icon8 style={styles.iconFollows} name="rss" size={px2dp(18)} color="#000"/>
                            <TextComponent style={styles.textFollows}>{Locales.Followedby}</TextComponent>
                            <TextComponent style={styles.numberFollows}>{this.state.currentUser.follow} {Locales.people}</TextComponent>
                        </View>
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
                        <View style={styles.content}>
                            <TouchableOpacity style={[styles.addPost, {backgroundColor: color}]} onPress={() => navigate('Sell')}>
                                <Icon5 style={styles.iconAddPost} name="add-circle-outline" size={px2dp(18)} color="#fff"/>
                                <TextComponent style={styles.textAddPost}>{Locales.PostSale}</TextComponent>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.editPost, {backgroundColor: color}]} onPress={() => navigate("EditPost")}>
                                <Icon4 style={styles.iconEditPost} name="edit" size={px2dp(17)} color="#fff"/>
                                <TextComponent style={styles.textEditPost}>{Locales.EditPost}</TextComponent>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.recentlyView}>
                            <TextComponent style={styles.textRecentlyView}>
                                {Locales.RecentlyProfile}
                            </TextComponent>
                        </View>
                        <View style={styles.FlatList1}>
                            <FlatList
                                data={this.state.data3}
                                renderItem={({item}) => (
                                    <TouchableOpacity style={styles.item} onPress={() => navigate('Details',{item: item})}>
                                        <FastImage
                                            style={styles.imageItemTwo}
                                            source={{uri: item.image}}
                                        >
                                        </FastImage>
                                        <View style={styles.partBottom}>
                                            <View style={styles.viewTitle}>
                                                <TextComponent style={styles.title}>{item.name}</TextComponent>
                                            </View>
                                            <View style={styles.content4}>
                                                <View style={styles.viewAddress}>
                                                    <Icon4 style={styles.iconEnviromento} name="enviromento" size={px2dp(11)} color="#666"/>
                                                    <TextComponent style={styles.textCity}>{item.address}</TextComponent>
                                                </View>
                                                <View style={styles.viewSqm}>
                                                    <Icon4 style={styles.iconHome} name="home" size={px2dp(11)} color="#666"/>
                                                    <Text style={styles.textKm}>{item.sqm}</Text>
                                                    <Text style={styles.textUnit}>sq/m</Text>
                                                </View>
                                            </View>
                                            <View style={styles.viewPrice}>
                                                <TextComponent style={[styles.textCurrency, {color: color }]}>
                                                    $
                                                </TextComponent>
                                                <TextComponent style={[styles.textMoney, {color: color}]}>
                                                    {item.price}
                                                </TextComponent>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item, index) => item.id}
                                numColumns={2}
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>

                <Animated.View style = {[ styles.HeaderStyle, { height: AnimateHeaderHeight, backgroundColor: AnimateHeaderBackgroundColor } ]}>

                    <View style={styles.header}>
                        <View style={styles.iconLeft}/>
                        {/*<Icon4 onPress={() => navigate('Menu')} style={styles.iconLeft} name="arrowleft" size={px2dp(28)}/>*/}
                        <TextComponent style={styles.titleHeader}>{Locales.Profile}</TextComponent>
                        <Icon style={styles.iconBell} name="bell" size={px2dp(30)} color="#fff"/>
                    </View>

                </Animated.View>

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
//     imageBackground: {
//         width: "100%",
//         height: 270,
//         alignItems: "center"
//     },
//     tabar: {
//         width: "90%",
//         height: 50,
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//         marginTop: 20
//     },
//     arrowleft: {
//         width: 35,
//         alignItems: "flex-start"
//     },
//     iconArrowleft: {
//
//     },
//     profile: {
//         width: 130,
//         justifyContent: "center",
//         alignItems: "center"
//     },
//     titleProfile: {
//         fontSize: 22,
//         fontWeight: "bold",
//         color: "#fff"
//     },
//     bell: {
//         width: 35,
//         alignItems: "center"
//     },
//     iconBell: {
//         marginLeft: 3
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
//         position: "absolute",
//         top: 165
//     },
//     imageAvatar: {
//         width: 125,
//         height: 125,
//         borderRadius: 125
//     },
//     edit: {
//         width: 40,
//         height: 40,
//         right: 15,
//         position: "absolute",
//         top: 310
//     },
//     iconEdit: {
//         color: "$textColor",
//     },
//     name: {
//         width: "85%",
//         alignItems: "center",
//         marginTop: 35
//     },
//     textName: {
//         fontSize: 20,
//         fontWeight: "500",
//         color: "$textColor"
//     },
//     textEmail: {
//         fontSize: 16,
//         color: "$textColor"
//     },
//     content: {
//         width: "65%",
//         height: 60,
//         flexDirection: "row",
//         justifyContent: "space-evenly",
//         alignItems: "center",
//         marginTop: 20
//     },
//     followers: {
//         width: "50%",
//         height: "100%",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         borderTopWidth: 1,
//         borderRightWidth: 1,
//         borderBottomWidth: 1,
//         borderColor: "#BDBDBD"
//     },
//     textNumberFollowers: {
//         fontSize: 18,
//         color: "$textColor"
//     },
//     textFollowers: {
//         fontSize: 18,
//         color: "$textColor"
//     },
//     properties: {
//         width: "50%",
//         height: "100%",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         borderTopWidth: 1,
//         borderLeftWidth: 1,
//         borderBottomWidth: 1,
//         borderColor: "#BDBDBD"
//     },
//     textNumberProperties: {
//         fontSize: 18,
//         color: "$textColor"
//     },
//     textProperties: {
//         fontSize: 18,
//         color: "$textColor"
//     },
//     recentlyView: {
//         width: "90%",
//         alignItems: "flex-start",
//         marginTop: 30,
//         marginBottom: 10
//     },
//     textRecentlyView: {
//         fontSize: 16,
//         fontWeight: "500",
//         color: "$textColor"
//     },
//     body: {
//         width: "90%"
//     },
//     touchable: {
//         width: 167,
//         marginRight: 18,
//         backgroundColor: "#fff",
//         marginTop: 10,
//         marginBottom: 15,
//         borderRadius: 5
//     },
//     fastImage: {
//         width: "100%",
//         height: 150,
//         borderRadius: 3,
//         flexDirection: "row",
//         justifyContent: "space-between"
//     },
//     status: {
//         width: 60,
//         height: 23,
//         backgroundColor: "#0174DF",
//         borderRadius: 16,
//         justifyContent: "center",
//         alignItems: "center",
//         top: 13,
//         left: 11
//     },
//     textStatus: {
//         color: "#fff",
//         fontSize: 10
//     },
//     partBottom: {
//         width: "100%",
//         paddingLeft: 10,
//         paddingRight: 15,
//         justifyContent: "space-between"
//     },
//     content2: {
//         width: "40%",
//         marginTop: 10,
//         marginLeft: 6
//     },
//     rating: {},
//     content3: {
//         width: "100%",
//         marginTop: 7
//     },
//     title: {
//         fontSize: 13,
//         color: "black",
//         fontWeight: "500"
//     },
//     content4: {
//         width: "100%",
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//         marginTop: 7
//     },
//     content5: {
//         width: "50%",
//         alignItems: "center",
//         flexDirection: "row",
//         marginRight: 7
//     },
//     iconEnviromento: {
//         marginRight: 2,
//     },
//     textCity: {
//         fontSize: 11,
//         color: "#666"
//     },
//     content6: {
//         width: "50%",
//         alignItems: "center",
//         flexDirection: "row"
//     },
//     iconHome: {
//         marginRight: 2
//     },
//     textKm: {
//         marginRight: 2,
//         fontSize: 11,
//         color: "#666"
//     },
//     textUnit: {
//         fontSize: 11,
//         color: "#666"
//     },
//     content7: {
//         width: "100%",
//         alignItems: "center",
//         flexDirection: "row",
//         marginBottom: 10,
//         marginTop: 5
//     },
//     textCurrency: {
//         fontSize: 13,
//         color: "#2E64FE",
//         fontWeight: "500"
//     },
//     textMoney: {
//         fontSize: 14,
//         color: "#2E64FE",
//         fontWeight: "500"
//     }
// });