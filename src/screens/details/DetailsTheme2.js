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
    Easing,
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/Foundation";
import Icon4 from "react-native-vector-icons/AntDesign";
import Icon5 from "react-native-vector-icons/MaterialIcons";
import Icon6 from "react-native-vector-icons/Ionicons";
import Icon7 from "react-native-vector-icons/FontAwesome5";
import Icon8 from "react-native-vector-icons/MaterialCommunityIcons";
import FastImage from "react-native-fast-image";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Rating, AirbnbRating} from 'react-native-ratings';
import PhotoUpload from 'react-native-photo-upload';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import darkTheme from "../../cores/viewComponents/themes/dark";
import lightTheme from "../../cores/viewComponents/themes/light";
import EStyleSheet from "react-native-extended-stylesheet";
import Locales from "../../cores/languages/languages";
import {firebaseApp} from '../../components/firebase/Realtimedb';
import ZoomImage from 'react-native-zoom-image';
import ImageViewer from 'react-native-image-zoom-viewer';
import {styles} from "./styles/StyleDetailsTheme2";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {getDataOfflineMode, validateText} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import constants from "../../assets/constants";
import {colors} from '../../cores/styles/colors';
import global from "../../cores/utils/global";

const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
    return px * deviceW / basePx
}

const Header_Maximum_Height = 70;

const Header_Minimum_Height = 70;

export default class DetailsTheme2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            region: {
                latitude: 21.0156199,
                longitude: 105.7784527,
                latitudeDelta: 0.009233219033370062,
                longitudeDelta: 0.007230845987782573,
            },
            bg: colors.blue,
        };

        thisState = this;

        this.AnimatedHeaderValue = new Animated.Value(0);

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
            });
        });

    }


    render() {
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        const color = this.state.bg;
        const item = this.props.navigation.state.params.item;
        console.log("item45678" + JSON.stringify(item));
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
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor='transparent'
                    translucent
                />
                <ScrollView
                    style={styles.keyboardView}
                    scrollEventThrottle = { 16 }
                    //contentContainerStyle = {{ paddingTop: Header_Maximum_Height }}
                    onScroll = { Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.AnimatedHeaderValue }}}]
                    )}
                >
                    <View style={styles.body}>
                        <ImageBackground style={styles.imageBackground} source={{uri: item.image}}>
                            <View style={styles.viewStatus}>
                                <View style={[styles.status, {backgroundColor: color}]}>
                                    <TextComponent style={styles.textStatus}>{item.status}</TextComponent>
                                </View>
                                <TouchableOpacity style={styles.favorite}>
                                    <Icon5 style={styles.iconFavorite} name="favorite-border" size={px2dp(20)} color="black"/>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                        <View style={styles.content}>
                            <View style={styles.viewTitle}>
                                <TextComponent style={styles.textTitle}>{item.name}</TextComponent>
                            </View>
                            <View style={styles.content2}>
                                <View style={styles.viewPrice}>
                                    <TextComponent style={[styles.textCurrency, {color: color}]}>$</TextComponent>
                                    <TextComponent style={[styles.textMoney, {color: color}]}>{item.price}</TextComponent>
                                </View>
                                <View style={styles.viewAddress}>
                                    <Icon4 style={styles.iconEnviromento} name="enviromento" size={px2dp(14)} color="#000"/>
                                    <TextComponent style={styles.textCity}>{item.address}</TextComponent>
                                </View>
                            </View>
                        </View>
                        <View style={styles.personal}>
                            <View style={styles.avatar}>
                                <PhotoUpload onPhotoSelect={avatar => {
                                    if (avatar) {
                                        console.log('Image base64 string: ', avatar)
                                    }
                                }}>
                                    <Image style={styles.imageAvatar} resizeMode='cover' source={{uri: item.avatar}}/>
                                </PhotoUpload>
                            </View>
                            <View style={styles.name}>
                                <TextComponent style={styles.textName}>{item.owner}</TextComponent>
                                <TextComponent style={styles.textOwner}>{Locales.PropertyOwner}</TextComponent>
                            </View>
                            <TouchableOpacity style={styles.call} >
                                <TextComponent style={styles.textCall}>{Locales.Call}</TextComponent>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.belongings}>
                            <View style={styles.bedrooms}>
                                <Icon6 style={styles.iconBed} name="ios-bed" size={px2dp(20)} color={color}/>
                                <TextComponent style={styles.textBedrooms}>{item.bedrooms} BEDS</TextComponent>
                            </View>
                            <View style={styles.viewDot}/>
                            <View style={styles.bedrooms}>
                                <Icon7 style={styles.iconBed} name="shower" size={px2dp(20)} color={color}/>
                                <TextComponent style={styles.textBedrooms}>{item.bathrooms} BATHS</TextComponent>
                            </View>
                            <View style={styles.viewDot}/>
                            <View style={styles.bedrooms}>
                                <Icon4 style={styles.iconBed} name="home" size={px2dp(20)} color={color}/>
                                <TextComponent style={styles.textBedrooms}>{item.sqm} SQM</TextComponent>
                            </View>
                        </View>
                        <View style={styles.viewDescription}>
                            <TextComponent style={styles.titleDescription}>Description</TextComponent>
                            <TextComponent style={styles.textDescription}>{item.description}</TextComponent>
                        </View>
                        <View style={styles.viewDetailsTwo}>
                            <TextComponent style={styles.titleDetailsTwo}>{Locales.Details2}</TextComponent>
                            <TextComponent numberOfLines={4} style={styles.textDetailsTwo}>{item.detail}</TextComponent>
                        </View>
                        <View style={styles.propertyType}>
                            <TextComponent style={styles.titleProperty}>Type Of Property</TextComponent>
                            <TextComponent style={styles.textType}>{item.types}</TextComponent>
                        </View>
                        <View style={styles.storeys}>
                            <TextComponent style={styles.titleStoreys}>Storeys</TextComponent>
                            <TextComponent style={styles.textStoreys}>{item.year}</TextComponent>
                        </View>
                        <View style={styles.footer}>
                            <View style={styles.photos}>
                                <TextComponent style={styles.textPhotos}>{Locales.Photos}</TextComponent>
                            </View>
                            <View style={styles.FlatList1}>
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={true}
                                    data={this.state.data}
                                    renderItem={({item}) => (
                                        <View style={styles.contentPhotos}>
                                            <TouchableOpacity style={styles.touchable}>
                                                <ZoomImage
                                                    style={styles.imagePhotos}
                                                    source={{uri: item.image}}
                                                    imgStyle={styles.imagePhotos}
                                                    duration={200}
                                                    enableScaling={false}
                                                    easingFunc={Easing.ease} />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    keyExtractor={(item, index) => item.id}
                                    //numColumns={3}
                                />
                            </View>
                        </View>
                        <MapView
                            ref={map => this.map = map}
                            provider={MapView.PROVIDER_GOOGLE}
                            style={styles.map}
                            listViewDisplayed={false}
                            initialRegion={{
                                latitude: 21.0244247,
                                longitude: 105.7938073,
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
                                    latitude: 21.0244247,
                                    longitude: 105.7938073,
                                }}
                            />
                        </MapView>
                    </View>
                </ScrollView>

                <Animated.View style = {[ styles.HeaderStyle, { height: AnimateHeaderHeight, backgroundColor: AnimateHeaderBackgroundColor } ]}>
                    <View style={styles.header}>
                        <Icon4 onPress={() => navigation.goBack()} style={styles.iconLeft} name="arrowleft" size={px2dp(28)}/>
                        <TextComponent style={styles.titleHeader}>{Locales.Details}</TextComponent>
                        <Icon style={styles.iconBell} name="bell" size={px2dp(30)}/>
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
//         backgroundColor: "$bgColor"
//     },
//     keyboardView: {
//         width: "100%",
//         height: "100%"
//     },
//     fake: {
//         width: "100%",
//         height: "100%",
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     imageBackground: {
//         width: '100%',
//         height: 270,
//         alignItems: "center",
//     },
//     tabar: {
//         width: '90%',
//         height: 50,
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//         marginTop: 20,
//     },
//     arrowleft: {
//         width: 35,
//         alignItems: "flex-start",
//     },
//     iconArrowleft: {},
//     details: {
//         width: 130,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     titleDetails: {
//         fontSize: 22,
//         fontWeight: "bold",
//         color: "#fff"
//     },
//     bell: {
//         width: 35,
//         alignItems: "center",
//     },
//     iconBell: {
//         marginLeft: 3,
//     },
//     content: {
//         width: '100%',
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginTop: 105,
//         backgroundColor: "#000",
//         opacity: 0.7,
//     },
//     lineOne: {
//         width: '90%',
//         justifyContent: "space-between",
//         flexDirection: 'row',
//         marginTop: 5
//     },
//     status: {
//         width: 60,
//         height: 23,
//         backgroundColor: '#0174DF',
//         borderRadius: 30,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     textStatus: {
//         color: '#fff',
//         fontSize: 10,
//     },
//     content1: {
//         width: '90%',
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//         marginTop: 5,
//     },
//     viewTitle: {
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     textTitle: {
//         fontSize: 17,
//         color: "#fff",
//         fontWeight: "400",
//         textAlign: 'center',
//     },
//     favorite: {
//         width: 30,
//         height: 30,
//         backgroundColor: '#fff',
//         borderRadius: 30,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     iconFavorite: {},
//     content2: {
//         width: '90%',
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//         marginTop: 5,
//         marginBottom: 10
//     },
//     content3: {
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//     },
//     city: {
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//         marginRight: 10,
//     },
//     iconEnviromento: {},
//     textCity: {
//         fontSize: 13,
//         color: "#fff",
//     },
//     location: {
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//     },
//     iconHome: {
//         marginRight: 1,
//     },
//     textKm: {
//         marginRight: 1,
//         fontSize: 13,
//         color: "#fff",
//     },
//     textUnit: {
//         fontSize: 13,
//         color: "#fff",
//     },
//     content4: {
//         width: '25%',
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//     },
//     iconStar: {},
//     rating: {
//         fontSize: 13,
//         color: "#fff",
//         fontWeight: "400",
//     },
//     textReviews: {
//         fontSize: 13,
//         color: "#fff",
//     },
//     personal: {
//         width: '90%',
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//         marginTop: 10,
//     },
//     avatar: {
//         width: 60,
//         height: 60,
//         borderRadius: 60,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     imageAvatar: {
//         width: 60,
//         height: 60,
//         borderRadius: 60,
//     },
//     name: {
//         width: '40%',
//         justifyContent: "space-between",
//         alignItems: "flex-start",
//         flexDirection: "column",
//     },
//     textName: {
//         fontSize: 15,
//         color: "$textColor",
//         fontWeight: "500",
//     },
//     textOwner: {
//         fontSize: 12,
//         color: "$textColor",
//     },
//     call: {
//         width: 60,
//         height: 25,
//         backgroundColor: '#0174DF',
//         borderRadius: 30,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     textCall: {
//         color: '#fff',
//         fontSize: 12,
//     },
//     mail: {
//         width: 60,
//         height: 25,
//         backgroundColor: '#0174DF',
//         borderRadius: 30,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     textMail: {
//         color: '#fff',
//         fontSize: 12,
//     },
//     belongings: {
//         width: '90%',
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//         marginTop: 20,
//         paddingTop: 10,
//         paddingBottom: 10,
//         borderTopWidth: 1,
//         borderBottomWidth: 1,
//         borderColor: '#666',
//     },
//     bedrooms_bathrooms_kitchen_parkings: {
//         width: '24%',
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "column",
//     },
//     iconBed_Shower_Food_Parking: {},
//     textBedrooms_Bathrooms_Kitchen_Parkings: {
//         fontSize: 10,
//         color: "$textColor",
//         marginTop: 5,
//     },
//     information: {
//         width: '90%',
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//         marginTop: 20,
//     },
//     propertyType: {
//         width: '33%',
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "column",
//     },
//     titleProperty: {
//         fontSize: 15,
//         color: "$textColor",
//         fontWeight: "500",
//     },
//     textType: {
//         fontSize: 13,
//         color: "$textColor",
//         marginTop: 3,
//     },
//     details2: {
//         width: '90%',
//         justifyContent: "space-between",
//         alignItems: "flex-start",
//         flexDirection: "column",
//         marginTop: 25,
//     },
//     titleDetails2: {
//         fontSize: 15,
//         color: "$textColor",
//         fontWeight: "500",
//     },
//     textDetails2: {
//         fontSize: 13,
//         color: "$textColor",
//         marginTop: 7,
//     },
//     footer: {
//         width: '90%',
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     photos: {
//         width: '100%',
//         marginTop: 25,
//         marginBottom: 5,
//     },
//     textPhotos: {
//         fontSize: 15,
//         fontWeight: "500",
//         color: "$textColor"
//     },
//     flatlist: {
//         width: '100%',
//     },
//     contentPhotos: {
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: 'row',
//         marginBottom: 15,
//         marginTop: 5,
//     },
//     touchable: {
//         width: 104,
//         justifyContent: "center",
//         alignItems: "center",
//         marginRight: 20
//     },
//     imagePhotos: {
//         width: '100%',
//         height: 100,
//         marginBottom: 3,
//         borderRadius: 3,
//     },
// });