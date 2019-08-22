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
    ActivityIndicator
} from "react-native";
import {createDrawerNavigator, createStackNavigator, createAppContainer} from "react-navigation";
import Icon from "react-native-vector-icons/EvilIcons";
import Icon3 from "react-native-vector-icons/Foundation";
import Icon4 from "react-native-vector-icons/AntDesign";
import FastImage from "react-native-fast-image";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import color, {colors} from "../../cores/styles/colors";
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import Locales from "../../cores/languages/languages";
import darkTheme from "../../cores/viewComponents/themes/dark";
import lightTheme from "../../cores/viewComponents/themes/light";
import EStyleSheet from "react-native-extended-stylesheet";
import ImageSlider from 'react-native-image-slider';
import Slideshow from 'react-native-image-slider-show';
import {firebaseApp} from '../../components/firebase/Realtimedb';
import {
    getDataOfflineMode,
    setHeight,
    setWidth,
    validateText
} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import Icon5 from "react-native-vector-icons/MaterialIcons";
import {styles} from "./styles/StyleHomeTheme2";
import constants from "../../assets/constants";
import global from "../../cores/utils/global";

const deviceW = Dimensions.get("window").width;

const basePx = 375;

function px2dp(px) {
    return (px * deviceW) / basePx;
}


export default class HomeTheme2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            data: [],
            width1: "60%",
            width2: "40%",
            bgc1: "#fff",
            bgc2: "#E2E6EC",
            color1: "#00DEB7",
            color2: "#50505A",
            check: false,
            bg: colors.blue,
        };

        thisState = this;
        this.arrayholder = [];

    }

    onCheck(value) {
        //console.log("value: " + value);
        if (value === false) {
            this.setState({
                check: false,
                width1: "40%",
                width2: "60%",
                bgc1: "#E2E6EC",
                bgc2: "#fff",
                color1: "#50505A",
                color2: "#00DEB7",
            });
        } else {
            this.setState({
                check: true,
                width1: "60%",
                width2: "40%",
                bgc1: "#fff",
                bgc2: "#E2E6EC",
                color1: "#00DEB7",
                color2: "#50505A",
            });
        }
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
            thisState.setState(
                {
                    data: array,
                    dataSource: array,
                    isLoading: false,
                },
                function () {
                    this.arrayholder = array;
                }
            );
        });

    }

    render() {
        const {navigate} = this.props.navigation;
        const color = this.state.bg;
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <StatusBar
                        //barStyle="$statusBar"
                        hidden={false}
                        backgroundColor="transparent"
                        translucent
                    />
                    <ImageBackground style={styles.imageBackground} source={require("../../assets/image/villa01.jpg")}>
                        <View style={styles.header}>
                            <Icon style={styles.iconLeft} name="navicon" size={px2dp(34)}/>
                            <TextComponent style={styles.titleHeader}>{Locales.Home}</TextComponent>
                            <Icon style={styles.iconBell} size={px2dp(31)}/>
                        </View>
                        <View style={styles.searchbar}>
                            <TextInput style={styles.textInputSearch}
                                       placeholder={Locales.SearchHome}
                                       keyboardType="default"
                                       returnKeyType="go"
                                       placeholderTextColor="#666"
                                       value={this.state.search}/>
                            <Icon style={styles.icon3} name="search" size={px2dp(26)} color="#666"/>
                        </View>
                        <View style={styles.segment}>
                            <TouchableOpacity style={[styles.buy, {width: this.state.width1, backgroundColor: this.state.bgc1}]} onPress={() => this.onCheck(true)}>
                                <TextComponent style={[styles.textBuy, {color: this.state.color1}]}>{Locales.BuyHome}</TextComponent>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.sell, {width: this.state.width2, backgroundColor: this.state.bgc2}]} onPress={() => this.onCheck(false)}>
                                <TextComponent style={[styles.textSell, {color: this.state.color2}]}>{Locales.SellHome}</TextComponent>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                    <View style={styles.information}>
                        <TextComponent style={styles.textInformation}>{this.state.textInformation}</TextComponent>
                    </View>
                    <ActivityIndicator size="large"/>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <StatusBar
                    //barStyle="$statusBar"
                    hidden={false}
                    backgroundColor="transparent"
                    translucent
                />
                <KeyboardAwareScrollView style={styles.keyboardView} >
                    <View style={styles.fake}>
                        <ImageBackground style={styles.imageBackground} source={require("../../assets/image/villa01.jpg")}>
                            <View style={styles.header}>
                                <Icon style={styles.iconLeft} name="navicon" size={px2dp(34)}/>
                                <TextComponent style={styles.titleHeader}>{Locales.Home}</TextComponent>
                                <Icon style={styles.iconBell} size={px2dp(31)}/>
                            </View>
                            <View style={styles.searchbar}>
                                <TextInput style={styles.textInputSearch}
                                           placeholder={Locales.SearchHome}
                                           keyboardType="default"
                                           returnKeyType="go"
                                           placeholderTextColor="#666"
                                           value={this.state.search}/>
                                <Icon style={styles.icon3} name="search" size={px2dp(26)} color="#666"/>
                            </View>
                            <View style={styles.segment}>
                                <TouchableOpacity style={[styles.buy, {width: this.state.width1, backgroundColor: this.state.bgc1}]} onPress={() => this.onCheck(true)}>
                                    <TextComponent style={[styles.textBuy, {color: this.state.color1}]}>{Locales.BuyHome}</TextComponent>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.sell, {width: this.state.width2, backgroundColor: this.state.bgc2}]} onPress={() => this.onCheck(false)}>
                                    <TextComponent style={[styles.textSell, {color: this.state.color2}]}>{Locales.SellHome}</TextComponent>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                        <View style={styles.information}>
                            <TextComponent style={styles.textInformation}>FEATURED CITIES</TextComponent>
                        </View>
                        <View style={styles.body}>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                data={this.state.data}
                                renderItem={({item}) => (
                                    <View style={styles.content}>
                                        <TouchableOpacity onPress={() => navigate('Properties')} style={styles.touchable}>
                                            <Image style={styles.image}
                                                   source={typeof item.image === "string"
                                                       ? {uri: item.image} : item.image}
                                            />
                                            <View style={styles.partBottom}>
                                                <TextComponent style={styles.title}>{item.name}</TextComponent>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                keyExtractor={(item, index) => item.id}
                            />
                        </View>
                        <View style={styles.information}>
                            <TextComponent style={styles.textInformation}>POPULAR PROPERTIES</TextComponent>
                        </View>
                        <View style={styles.body2}>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                data={this.state.data}
                                renderItem={({item}) => (
                                    <View style={styles.content22}>
                                        <TouchableOpacity onPress={() => navigate('Details', {item: item})} style={styles.touchable22}>
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
                                                        <TextComponent style={[styles.textCurrency, {color: color }]}>$</TextComponent>
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

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center",
//         backgroundColor: "#bdc0b8",
//         paddingTop: (Platform.OS === 'ios') ? 20 : 0
//     },
//     header: {
//         width: setWidth("100%"),
//         height: 70,
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: 'row',
//         paddingLeft: 5,
//         paddingRight: 5,
//         marginBottom: 10,
//     },
//     iconLeft: {
//         marginTop: 20,
//         color: colors.white,
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
//         marginRight: 20,
//     },
//     keyboardView: {
//         width: setWidth("100%"),
//         height: setHeight("100%"),
//     },
//     fake: {
//         width: setWidth("100%"),
//         height: "100%",
//         justifyContent: "center",
//         alignItems: "center"
//     },
//     imageBackground: {
//         width: "100%",
//         height: 290,
//         alignItems: "center"
//     },
//     searchbar: {
//         width: setWidth("94%"),
//         height: 45,
//         backgroundColor: "#F2F5F8",
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//         borderRadius: 10,
//         marginTop: 75,
//         position: 'absolute',
//     },
//     textInputSearch: {
//         width: "83%",
//         height: "100%",
//         backgroundColor: "#F2F5F8",
//         padding: 5,
//         fontSize: 18,
//         marginLeft: 15
//     },
//     icon3: {
//         marginRight: 15
//     },
//     segment: {
//         width: 282,
//         height: 50,
//         backgroundColor: "#E2E6EC",
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//         borderRadius: 30,
//         bottom: 40,
//         position: 'absolute',
//     },
//     buy: {
//         //width: "50%",
//         height: "100%",
//         //backgroundColor: '#0174DF',
//         justifyContent: "center",
//         alignItems: "center",
//         borderRadius: 25,
//     },
//     textBuy: {
//         fontSize: 15,
//         fontWeight: "bold"
//         //color: "red"
//     },
//     sell: {
//         //width: "50%",
//         height: "100%",
//         justifyContent: "center",
//         alignItems: "center",
//         borderRadius: 25,
//     },
//     textSell: {
//         fontSize: 15,
//         fontWeight: "bold"
//         //color: "yellow"
//     },
//     information: {
//         width: setWidth("95%"),
//         alignItems: "flex-start",
//         marginTop: 20,
//         marginBottom: 5
//     },
//     textInformation: {
//         fontSize: 18,
//         fontWeight: "bold",
//         color: colors.black
//     },
//     body: {
//         width: setWidth("100%"),
//     },
//     content: {
//         width: setWidth("40%"),
//         margin: 10,
//     },
//     touchable: {
//         width: '100%',
//         height: 200,
//         justifyContent: "flex-start",
//         alignItems: "center",
//         backgroundColor: "#fff",
//         borderRadius: 7
//     },
//     image: {
//         width: "100%",
//         height: 140,
//         marginBottom: 8,
//         borderTopLeftRadius: 7,
//         borderTopRightRadius: 7,
//     },
//     partBottom: {
//         width: "100%",
//         paddingLeft: 8,
//         paddingRight: 8,
//         justifyContent: "space-between"
//     },
//     title: {
//         fontSize: 15,
//         color: colors.black,
//         fontWeight: "bold",
//         textAlign: "left"
//     },
//     body2: {
//         width: setWidth("100%"),
//     },
//     content22: {
//         width: setWidth("80%"),
//         margin: 10,
//         backgroundColor: colors.white,
//     },
//     touchable22: {
//         justifyContent: "flex-start",
//         alignItems: "center",
//         backgroundColor: colors.white,
//         borderRadius: 7,
//     },
//     fastImage: {
//         width: '100%',
//         height: 170,
//         borderTopLeftRadius: 7,
//         borderTopRightRadius: 7,
//         flexDirection: "row",
//         justifyContent: "space-between",
//     },
//     status: {
//         width: 80,
//         height: 27,
//         backgroundColor: colors.button1,
//         borderRadius: 30,
//         justifyContent: "center",
//         alignItems: "center",
//         top: 16,
//         left: 13,
//     },
//     textStatus: {
//         color: colors.white,
//         fontSize: 13,
//     },
//     favorite: {
//         width: 35,
//         height: 35,
//         backgroundColor: colors.white,
//         borderRadius: 35,
//         justifyContent: "center",
//         alignItems: "center",
//         top: 13,
//         right: 13,
//     },
//     iconFavorite: {
//         color: colors.red,
//     },
//     partBottom2: {
//         width: '100%',
//         paddingLeft: 10,
//         paddingRight: 10,
//         justifyContent: "space-between",
//     },
//     content1: {
//         width: '100%',
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//         marginTop: 13,
//     },
//     title2: {
//         fontSize: 15,
//         color: colors.black,
//         fontWeight: "500",
//         textAlign: 'center',
//     },
//     content2: {
//         width: '28%',
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//     },
//     iconStar: {},
//     rating: {
//         fontSize: 14,
//         color: colors.color_text_second,
//         fontWeight: "400",
//     },
//     textReviews: {
//         fontSize: 14,
//         color: colors.color_text_second,
//     },
//     content3: {
//         width: '100%',
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//         marginTop: 1,
//         marginBottom: 13,
//     },
//     content4: {
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//     },
//     content5: {
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//         marginRight: 10,
//     },
//     iconEnviromento: {
//         marginRight: 2,
//     },
//     textCity: {
//         fontSize: 14,
//         color: colors.color_text_second,
//     },
//     content6: {
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//     },
//     iconHome: {
//         marginRight: 2,
//     },
//     textKm: {
//         marginRight: 2,
//         fontSize: 14,
//         color: colors.color_text_second,
//     },
//     textUnit: {
//         fontSize: 14,
//         color: colors.color_text_second,
//     },
//     content7: {
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//     },
//     textCurrency: {
//         fontSize: 15,
//         color: colors.button1,
//         fontWeight: "500",
//     },
//     textMoney: {
//         fontSize: 16,
//         color: colors.button1,
//         fontWeight: "500",
//     },
// });

