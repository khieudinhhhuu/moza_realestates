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
    Linking,
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/Foundation";
import Icon4 from "react-native-vector-icons/AntDesign";
import Icon5 from "react-native-vector-icons/MaterialIcons";
import Icon6 from "react-native-vector-icons/Entypo";
import Icon7 from "react-native-vector-icons/FontAwesome";
import Icon8 from "react-native-vector-icons/MaterialCommunityIcons";
import FastImage from "react-native-fast-image";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Rating, AirbnbRating} from 'react-native-ratings';
import {colors} from '../../cores/styles/colors';
import PhotoUpload from 'react-native-photo-upload';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import darkTheme from "../../cores/viewComponents/themes/dark";
import lightTheme from "../../cores/viewComponents/themes/light";
import EStyleSheet from "react-native-extended-stylesheet";
import Locales from "../../cores/languages/languages";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {firebaseApp} from '../../components/firebase/Realtimedb';
import {styles} from './styles/StyleSellDetail';
import {getDataOfflineMode, validateText} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import constants from "../../assets/constants";
import global from "../../cores/utils/global";

const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
    return px * deviceW / basePx
}

export default class Sell_Detail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            photoURL: 'http://media2.sieuhai.tv:8088/onbox/images/user_lead_image/20190408/84947430634_20190408001343.jpg',
            region: {
                latitude: 21.0156199,
                longitude: 105.7784527,
                latitudeDelta: 0.009233219033370062,
                longitudeDelta: 0.007230845987782573,
            },
            bg: colors.blue,
        };
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

    }

    render() {
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        const color = this.state.bg;
        const item = this.props.navigation.state.params.item;
        //console.log("item123: " + JSON.stringify(item));
        return (
            <View style={styles.container}>
                <StatusBar
                    //barStyle="dark-content"
                    hidden={false}      
                    backgroundColor='transparent'
                    translucent
                />
                <View style={styles.header}>
                    <Icon4 onPress={() => navigation.goBack()} style={styles.iconLeft} name="arrowleft" size={px2dp(28)}/>
                    <TextComponent style={styles.titleHeader}>{Locales.RealEstateDetails}</TextComponent>
                    <Icon style={styles.iconSearch} name="search" size={px2dp(30)} />
                </View>
                <KeyboardAwareScrollView style={styles.keyboardView}>
                    <View style={styles.body}>
                        <Image  style={styles.imageItem} source={{uri: item.image}}/>
                        <View style={styles.viewName}>
                            <TextComponent style={styles.textName}>{item.name}</TextComponent>
                        </View>
                        <View style={styles.content}>
                            <View style={styles.acreage}>
                                <TextComponent style={[styles.textAcreage, {color: color}]}>{item.sqm} sq/m</TextComponent>
                            </View>
                            <View style={styles.price}>
                                <TextComponent style={[styles.textPrice, {color: color}]}>{item.price} vnđ</TextComponent>
                            </View>
                        </View>
                        <View style={styles.location}>
                            <Icon5 style={styles.iconLocation} name="location-on" size={px2dp(18)} color={color}/>
                            <TextComponent style={[styles.textLocation, {color: color}]}>{item.location}</TextComponent>
                        </View>
                        <View style={styles.property_type}>
                            <Icon7 style={styles.iconProperty_type} name="home" size={px2dp(17)} color={color}/>
                            <TextComponent style={[styles.textProperty_type, {color: color}]}>{item.type}</TextComponent>
                        </View>
                        <View style={styles.description}>
                            <TextComponent style={styles.textDescription}>{Locales.Described}: {item.description}</TextComponent>
                        </View>
                        <View style={styles.year_built}>
                            <TextComponent style={styles.textYear_built}>{Locales.Yearbuilt}: {item.year}</TextComponent>
                        </View>
                        <View style={styles.direction}>
                            <TextComponent style={styles.textDirection}>{Locales.Directions}: {item.direction}</TextComponent>
                        </View>
                        <View style={styles.city}>
                            <TextComponent style={styles.textCity}>{Locales.City}: {item.address}</TextComponent>
                        </View>
                        <View style={styles.owner}>
                            <TextComponent style={styles.textOwner}>{Locales.Owners}: {item.owner}</TextComponent>
                        </View>
                        <View style={styles.detail}>
                            <TextComponent style={styles.textDetail}>{Locales.Details2} {item.detail}</TextComponent>
                        </View>
                        <MapView
                            ref={map => this.map = map}
                            provider={MapView.PROVIDER_GOOGLE}
                            style={styles.map}
                            listViewDisplayed={false}
                            initialRegion={{
                                latitude: item.latitude,
                                longitude: item.longitude,
                                latitudeDelta: 0.005233219033370062,
                                longitudeDelta: 0.003230845987782573,
                            }}
                            onMapReady={this.onMapReady}
                            onRegionChange={this.onRegionChange}
                            showsUserLocation={true}
                            showUserLocationButton={true}
                            zoomControlEnabled={true}
                            mapType="hybrid"
                            followsUserLocation={true}
                            showsMyLocationButton={true}
                            showsPointsOfInterest={true}
                            showsCompass={true}
                            showsBuildings={true}
                        >
                            <MapView.Marker
                                title={item.name}
                                description={item.sqm + " sq/m " + " - " + item.price + " vnđ"}
                                coordinate={{
                                    latitude: item.latitude,
                                    longitude: item.longitude,
                                }}
                            />
                        </MapView>
                        <TouchableOpacity style={styles.informationUser} onPress={() => navigate("Users", {item: item})}>
                            <View style={styles.viewAvatar}>
                                <Image style={styles.imageAvatar} source={{uri: item.photoURL}}/>
                            </View>
                            <View style={styles.viewText}>
                                <TextComponent style={styles.textNameUser}>{item.displayName}</TextComponent>
                                <View style={styles.phoneUser}>
                                    <Icon6 style={styles.iconPhone} name="phone" size={px2dp(15)} color={color}/>
                                    <TextComponent style={styles.textPhone}>{item.phoneNumber}</TextComponent>
                                </View>
                                <View style={styles.addressUser}>
                                    <Icon5 style={styles.iconAddressUser} name="location-on" size={px2dp(17)} color={color}/>
                                    <TextComponent numberOfLines={1} style={styles.textAddressUser}>{item.addressUser}</TextComponent>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
                <View style={styles.btn}>
                    <TouchableOpacity style={[styles.btnCall, {backgroundColor: color}]} onPress={() => Linking.openURL(`tel:${item.phoneNumber}`)}>
                        <Icon6 style={styles.iconCall} name="phone" size={px2dp(15)} color="#fff"/>
                        <TextComponent style={styles.textCall}>{Locales.CallPhone}</TextComponent>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnChat, {backgroundColor: color}]} onPress={() => Linking.openURL(`sms:${item.phoneNumber}`)}>
                        <Icon6 style={styles.iconChat} name="chat" size={px2dp(15)} color="#fff"/>
                        <TextComponent style={styles.textChat}>{Locales.Ask}</TextComponent>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnCare, {backgroundColor: color}]}>
                        <Icon7 style={styles.iconCare} name="stack-overflow" size={px2dp(15)} color="#fff"/>
                        <TextComponent style={styles.textCare}>{Locales.Care}</TextComponent>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

// const styles = EStyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center",
//         backgroundColor: "$bgColor"
//     },
//     header: {
//         height: 70,
//         backgroundColor: "$header",
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: 'row',
//         width: "100%",
//         paddingLeft: 3,
//         paddingRight: 3,
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
//         fontSize: 21,
//         marginTop: 20,
//     },
//     iconSearch: {
//         marginTop: 20,
//         color: colors.white,
//         marginRight: 5,
//     },
//     keyboardView: {
//         width: "100%",
//         //height: "100%"
//     },
//     fake: {
//         width: "100%",
//         //height: "100%",
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     image: {
//         width: "100%",
//         height: 220,
//     },
//     name: {
//         width: "95%",
//         justifyContent: "center",
//         marginTop: 10,
//     },
//     textName: {
//         fontSize: 20,
//         color: "$textColor",
//         fontWeight: "bold",
//     },
//     content: {
//         width: "95%",
//         height: 35,
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: 'row',
//         marginTop: 10,
//     },
//     acreage: {
//         width: "49%",
//         height: '100%',
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#DBDBDB",
//         borderRadius: 7,
//     },
//     textAcreage: {
//         fontSize: 16,
//         color: colors.red,
//         fontWeight: "bold",
//     },
//     price: {
//         width: "49%",
//         height: '100%',
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#DBDBDB",
//         borderRadius: 7,
//     },
//     textPrice: {
//         fontSize: 16,
//         color: colors.red,
//         fontWeight: "bold",
//     },
//     location: {
//         width: "95%",
//         justifyContent: "flex-start",
//         alignItems: "flex-start",
//         flexDirection: 'row',
//         marginTop: 10,
//         paddingRight: 18,
//     },
//     iconLocation: {
//         marginTop: 2,
//     },
//     textLocation: {
//         fontSize: 16,
//         color: "#3399FF",
//         fontWeight: "bold",
//     },
//     property_type: {
//         width: "95%",
//         justifyContent: "flex-start",
//         alignItems: "flex-start",
//         flexDirection: 'row',
//         marginTop: 10,
//         paddingRight: 18,
//     },
//     iconProperty_type: {
//         marginRight: 3,
//         marginTop: 2,
//     },
//     textProperty_type: {
//         fontSize: 16,
//         color: "#3399FF",
//         fontWeight: "bold",
//     },
//     description: {
//         width: "95%",
//         justifyContent: "center",
//         marginTop: 10,
//     },
//     textDescription: {
//         fontSize: 16,
//         color: "$textColor",
//     },
//     year_built: {
//         width: "95%",
//         justifyContent: "center",
//         marginTop: 10,
//     },
//     textYear_built: {
//         fontSize: 16,
//         color: "$textColor",
//     },
//     direction: {
//         width: "95%",
//         justifyContent: "center",
//         marginTop: 10,
//     },
//     textDirection: {
//         fontSize: 16,
//         color: "$textColor",
//     },
//     city: {
//         width: "95%",
//         justifyContent: "center",
//         marginTop: 10,
//     },
//     textCity: {
//         fontSize: 16,
//         color: "$textColor",
//     },
//     owner: {
//         width: "95%",
//         justifyContent: "center",
//         marginTop: 10,
//     },
//     textOwner: {
//         fontSize: 16,
//         color: "$textColor",
//     },
//     detail: {
//         width: "95%",
//         justifyContent: "center",
//         marginTop: 10,
//         marginBottom: 20,
//     },
//     textDetail: {
//         fontSize: 16,
//         color: "$textColor",
//     },
//     map: {
//         width: '95%',
//         height: 200
//     },
//     informationUser: {
//         width: "95%",
//         height: 95,
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: 'row',
//         backgroundColor: "#CCCCCC",
//         borderRadius: 5,
//         marginTop: 20,
//         marginBottom: 10,
//     },
//     viewImage: {
//         width: "25%",
//         height: "100%",
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     avatar: {
//         width: 85,
//         height: 85,
//         borderRadius: 85,
//     },
//     viewText: {
//         width: "75%",
//         height: "100%",
//         justifyContent: "space-between",
//         paddingTop: 10,
//         paddingBottom: 10,
//         paddingRight: 10,
//         paddingLeft: 5,
//     },
//     nameUser: {
//         fontSize: 20,
//         color: colors.black,
//         fontWeight: "bold",
//         marginLeft: 2,
//     },
//     phoneUser: {
//         width: "100%",
//         alignItems: "center",
//         flexDirection: 'row',
//     },
//     iconPhone: {
//         marginRight: 3,
//     },
//     textPhone: {
//         fontSize: 16,
//         color: colors.black,
//     },
//     addressUser: {
//         width: "100%",
//         alignItems: "center",
//         flexDirection: 'row',
//     },
//     iconAddressUser: {
//
//     },
//     textAddressUser: {
//         fontSize: 16,
//         color: colors.black,
//     },
//     btn: {
//         width: "95%",
//         height: 40,
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: 'row',
//         marginTop: 10,
//         marginBottom: 10,
//     },
//     btnCall: {
//         width: "33%",
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
//         width: "33%",
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
//     btnCare: {
//         width: "33%",
//         height: '100%',
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: 'row',
//         backgroundColor: "#0174DF",
//         borderRadius: 5,
//     },
//     iconCare: {
//         marginRight: 3,
//     },
//     textCare: {
//         fontSize: 16,
//         color: colors.white,
//         fontWeight: "bold",
//     },
// });