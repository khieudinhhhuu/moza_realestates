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
    Linking, ActivityIndicator, ToastAndroid,
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
import {styles} from './styles/StyleUsers';
import {getDataOfflineMode, validateText} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import constants from "../../assets/constants";
import global from "../../cores/utils/global";

const deviceW = Dimensions.get("window").width;

const basePx = 375;

function px2dp(px) {
    return (px * deviceW) / basePx;
}

export default class Users extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            userPosts: "",
            followUser: "",
            isLoading: true,
            photoURL: 'http://media2.sieuhai.tv:8088/onbox/images/user_lead_image/20190408/84947430634_20190408001343.jpg',
            bg: colors.blue,
            checkFollow: false,
            txtFollow: Locales.Follow,
            iconFollow: "rss",
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

        let array = [];
        const item = this.props.navigation.state.params.item;
        console.log("item8888: " + JSON.stringify(item));
        firebaseApp.database().ref('data').child('sell').on('value', function (snapshot) {
            console.log("snapshot333: " + JSON.stringify(snapshot));
            snapshot.forEach(function (childSnapshot) {
                console.log("childSnapshot999: " + JSON.stringify(childSnapshot));
                const childData = childSnapshot.val();
                if (childData.uid === item.uid) {
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
                userPosts: thisState.state.data,
                isLoading: false,
            }, function () {
                console.log("userPosts: " + JSON.stringify(this.state.userPosts));
            });
        });


        firebaseApp.database().ref('users').child('accounts').on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                const childData = childSnapshot.val();
                if (childData.uid === item.uid) {
                    thisState.setState({
                        isLoading: false,
                        followUser: childData,
                    }, () => {
                        console.log("currentUser: " + JSON.stringify(childData));
                        console.log("currentUser_displayName: " + childData.displayName);
                    })
                }
            });
        });

    }

    onFollow(){
        const item = this.props.navigation.state.params.item;
        if (this.state.checkFavourite === true) {
            this.setState({
                checkFavourite: false,
                txtFollow: Locales.Follow,
                iconFollow: "rss",
            });
            ToastAndroid.showWithGravityAndOffset(
                "Un" + Locales.Follow + " " + item.displayName,
                ToastAndroid.LONG, ToastAndroid.BOTTOM, 25,100,
            );
        } else {
            this.setState({
                checkFavourite: true,
                txtFollow: "Followed",
                iconFollow: "rss-square",
            });
            ToastAndroid.showWithGravityAndOffset(
                "Followed " + item.displayName,
                ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 100,
            );
            this.saveFollow();
            this.plusFollow();
        }
    }

    saveFollow(){
        const item = this.props.navigation.state.params.item;
        const user = firebaseApp.auth().currentUser;
        firebaseApp.database().ref('users').child('accounts').child(user.uid).child('followed').child(item.uid).update({
            uid: item.uid,
            displayName: item.displayName,
            email: item.email
        });
    }

    plusFollow(){
        const item = this.props.navigation.state.params.item;
        firebaseApp.database().ref('users').child('accounts').child(this.state.followUser.uid).update({
            follow: item.follow + 1,
        });

        firebaseApp.database().ref('data').child('sell').child(item.id).update({
            follow: item.follow + 1,
        });

    }

    render() {
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        const color = this.state.bg;
        const item = this.props.navigation.state.params.item;
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <StatusBar
                        barStyle="dank-content"
                        hidden={false}
                        backgroundColor="transparent"
                        translucent
                    />
                    <View style={styles.header}>
                        <Icon4 onPress={() => navigation.goBack()} style={styles.iconLeft} name="arrowleft" size={px2dp(28)}/>
                        <TextComponent style={styles.titleHeader}>{Locales.PersonalInformation}</TextComponent>
                        <Icon style={styles.iconBell} name="bell" size={px2dp(30)} />
                    </View>
                    <ActivityIndicator style={{flex: 0.7, justifyContent: "center"}} size="large"/>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dank-content"
                    hidden={false}
                    backgroundColor="transparent"
                    translucent
                />
                <View style={styles.header}>
                    <Icon4 onPress={() => navigation.goBack()} style={styles.iconLeft} name="arrowleft" size={px2dp(28)}/>
                    <TextComponent style={styles.titleHeader}>{Locales.PersonalInformation}</TextComponent>
                    <Icon style={styles.iconBell} name="bell" size={px2dp(30)} />
                </View>
                <KeyboardAwareScrollView style={styles.keyboardView}>
                    <View style={styles.body}>
                        <Image style={styles.imageBackground} source={require("../../assets/image/villa2.jpg")}/>
                        <View style={styles.avatar}>
                            <Image style={styles.imageAvatar} resizeMode="cover" source={{uri: item.photoURL}}/>
                        </View>
                        <View style={styles.viewInformation}>
                            <TextComponent style={styles.textName}>{item.displayName}</TextComponent>
                            <TextComponent style={styles.textEmail}>Email: {item.email}</TextComponent>
                            <TextComponent style={styles.textEmail}>{Locales.Address}: {item.addressUser}</TextComponent>
                        </View>
                        <View style={styles.follows}>
                            <Icon8 style={styles.iconFollows} name="rss" size={px2dp(18)} color="#000"/>
                            <TextComponent style={styles.textFollows}>{Locales.Followedby}</TextComponent>
                            <TextComponent style={styles.numberFollows}>{this.state.followUser.follow} {Locales.people}</TextComponent>
                        </View>
                        <View style={styles.btn}>
                            <TouchableOpacity style={[styles.btnCall, {backgroundColor: color}]} onPress={() => Linking.openURL(`tel:${item.phoneNumber}`)}>
                                <Icon6 style={styles.iconCall} name="phone" size={px2dp(15)} color="#fff"/>
                                <TextComponent style={styles.textCall}>{Locales.CallPhone}</TextComponent>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btnChat, {backgroundColor: color}]} onPress={() => Linking.openURL(`sms:${item.phoneNumber}`)}>
                                <Icon4 style={styles.iconChat} name="wechat" size={px2dp(15)} color="#fff"/>
                                <TextComponent style={styles.textChat}>{Locales.Chat}</TextComponent>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btnFollow, {backgroundColor: color}]} onPress={() => this.onFollow()}>
                                <Icon7 style={styles.iconFollow} name={this.state.iconFollow} size={px2dp(15)} color="#fff"/>
                                <TextComponent style={styles.textFollow}>{this.state.txtFollow}</TextComponent>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.recentlyView}>
                            <TextComponent style={styles.textRecentlyView}>{Locales.VIEWTHERECENTPOSTS}</TextComponent>
                        </View>
                        <View style={styles.FlatList1}>
                            {console.log("userPosts10000: " + JSON.stringify(this.state.userPosts))}
                            <FlatList
                                data={this.state.userPosts}
                                renderItem={({item}) => (
                                    <TouchableOpacity style={styles.item} onPress={() => navigate('Sell_Detail',{item: item})}>
                                        <FastImage style={styles.imageItem} source={{uri: item.image}}/>
                                        <View style={styles.partBottom}>
                                            <View style={styles.viewTitle}>
                                                <TextComponent style={styles.textTitle}>{item.name}</TextComponent>
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
                                                <TextComponent style={styles.textCurrency}>$</TextComponent>
                                                <TextComponent style={styles.textMoney}>{item.price}</TextComponent>
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
//         color: colors.white,
//         marginLeft: 5,
//     },
//     titleHeader: {
//         color: colors.white,
//         textAlign: "center",
//         fontWeight: "bold",
//         fontSize: 22,
//         marginTop: 20,
//     },
//     iconBell: {
//         marginTop: 20,
//         color: colors.white,
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
//     imageBackground: {
//         width: "100%",
//         height: 200,
//         alignItems: "center",
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
//         top: 98
//     },
//     imageAvatar: {
//         width: 125,
//         height: 125,
//         borderRadius: 125
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
//     follows: {
//         width: "90%",
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     iconFollows: {
//         marginRight: 3,
//         color: "$textColor",
//     },
//     textFollows: {
//         fontSize: 18,
//         color: "$textColor",
//         marginRight: 3,
//     },
//     numberFollows: {
//         fontSize: 17,
//         color: "$textColor",
//         fontWeight: "bold",
//     },
//     btn: {
//         width: "90%",
//         height: 40,
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: 'row',
//         marginTop: 20,
//     },
//     btnCall: {
//         width: "32.5%",
//         height: '100%',
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: 'row',
//         backgroundColor: "#0174DF",
//         borderRadius: 5,
//     },
//     iconCall: {
//         marginRight: 3,
//     },
//     textCall: {
//         fontSize: 16,
//         color: colors.white,
//         fontWeight: "bold",
//     },
//     btnChat: {
//         width: "32.5%",
//         height: '100%',
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: 'row',
//         backgroundColor: "#0174DF",
//         borderRadius: 5,
//     },
//     iconChat: {
//         marginRight: 4,
//     },
//     textChat: {
//         fontSize: 16,
//         color: colors.white,
//         fontWeight: "bold",
//     },
//     btnFollow: {
//         width: "32.5%",
//         height: '100%',
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: 'row',
//         backgroundColor: "#0174DF",
//         borderRadius: 5,
//     },
//     iconFollow: {
//         marginRight: 5,
//     },
//     textFollow: {
//         fontSize: 16,
//         color: colors.white,
//         fontWeight: "bold",
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
//     partBottom: {
//         width: "100%",
//         paddingLeft: 10,
//         paddingRight: 15,
//         justifyContent: "space-between"
//     },
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