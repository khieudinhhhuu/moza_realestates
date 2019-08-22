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
import {colors} from "../../cores/styles/colors";
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import Locales from "../../cores/languages/languages";
import darkTheme from "../../cores/viewComponents/themes/dark";
import lightTheme from "../../cores/viewComponents/themes/light";
import EStyleSheet from "react-native-extended-stylesheet";
import ImageSlider from 'react-native-image-slider';
import Slideshow from 'react-native-image-slider-show';
import {styles} from './styles/StyleHomeTheme1';
import {firebaseApp} from '../../components/firebase/Realtimedb';
import {
    getDataOfflineMode,
    saveDataOfflineMode,
    inValidateText,
    validateText
} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import constants from "../../assets/constants";
import global from "../../cores/utils/global";

const deviceW = Dimensions.get("window").width;

const basePx = 375;

function px2dp(px) {
    return (px * deviceW) / basePx;
}

const Header_Maximum_Height = 70;

const Header_Minimum_Height = 70;

export default class HomeTheme1 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            data: [],
            dataSource: [],
            bgc1: '#0174DF',
            bgc2: "#fff",
            color1: "#fff",
            color2: "#0174DF",
            check: false,
            search: '',
            textInformation: Locales.PopularHome,
            data2: [],
            dataSource2: [],
            bg: colors.blue,
        };

        thisState = this;
        this.arrayholder = [];

        this.AnimatedHeaderValue = new Animated.Value(0);
    }

    async componentDidMount() {

        const backgroundColor = await getDataOfflineMode(constants.CHANGE_COLOR);
        console.log("colortheme: " + backgroundColor);
        // if (backgroundColor === undefined) {
        //     this.setState({
        //         bg: '#0174DF'
        //     });
        // } else {
        //     this.setState({
        //         //bg: '#0174DF'
        //         bg: backgroundColor
        //     });
        // }
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

        let array2 = [];
        firebaseApp.database().ref('data').child('sell').on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childData = childSnapshot.val();
                array2.push({
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
                });

            });
            thisState.setState(
                {
                    data2: array2,
                    dataSource2: array2,
                    isLoading: false,
                },
                function () {
                    this.arrayholder = array2;
                }
            );
        });

    }

    onCheck(value) {
        //console.log("value: " + value);
        if (value === false) {
            this.setState({
                check: false,
                bgc1: "#fff",
                bgc2: this.state.bg,
                color1: this.state.bg,
                color2: "#fff",
                textInformation: Locales.ForSaleHome,
                data: this.state.data2,
            });
        } else {
            this.setState({
                check: true,
                bgc1: this.state.bg,
                bgc2: "#fff",
                color1: "#fff",
                color2: this.state.bg,
                textInformation: Locales.PopularHome,
                data: this.state.dataSource
            });
        }
    }

    checkDetail(item) {
        console.log("item: " + item.status);
        if (item.status === undefined) {
            this.props.navigation.navigate('Sell_Detail', {item: item});
        } else {
            this.props.navigation.navigate('Properties');
        }

    }

    SearchFilterFunction(text) {
        //passing the inserted text in textinput
        const newData = this.arrayholder.filter(function (item) {
            //applying filter for the inserted text in search bar
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            data: newData,
            search: text,
        });
    }

    _onUpdate(){
        Alert.alert("Function is updating");
    }

    render() {
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
                            <Icon onPress={() => this._onUpdate()} style={styles.iconLeft} name="navicon" size={px2dp(34)}/>
                            <TextComponent style={styles.titleHeader}>{Locales.Home}</TextComponent>
                            <Icon onPress={() => this._onUpdate()} style={styles.iconBell} name="bell" size={px2dp(31)}/>
                        </View>
                        <View style={styles.searchBar}>
                            <TextInput style={styles.textInputSearch}
                                       placeholder={Locales.SearchHome}
                                       keyboardType="default"
                                       returnKeyType="go"
                                       // placeholderTextColor="#666"
                                       onChangeText={text => this.SearchFilterFunction(text)}
                                       onClear={text => this.SearchFilterFunction('')}
                                       value={this.state.search}/>
                            <Icon style={styles.icon3} name="search" size={px2dp(26)} color="#666"/>
                        </View>
                        <View style={styles.segment}>
                            <TouchableOpacity style={[styles.buy, {backgroundColor: this.state.bgc1}]}
                                              onPress={() => this.onCheck(true)}>
                                <TextComponent
                                    style={[styles.textBuy, {color: this.state.color1}]}>{Locales.BuyHome}</TextComponent>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.sell, {backgroundColor: this.state.bgc2}]}
                                              onPress={() => this.onCheck(false)}>
                                <TextComponent
                                    style={[styles.textSell, {color: this.state.color2}]}>{Locales.SellHome}</TextComponent>
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
        // console.log("data: " + JSON.stringify(this.state.checkData));
        const {navigate} = this.props.navigation;
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
                    //barStyle="$statusBar"
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
                        <ImageBackground style={styles.imageBackground} source={require("../../assets/image/villa01.jpg")}>
                            <View style={styles.searchBar}>
                                <TextInput style={styles.textInputSearch}
                                           placeholder={Locales.SearchHome}
                                           keyboardType="default"
                                           returnKeyType="go"
                                           // placeholderTextColor="#666"
                                           onChangeText={text => this.SearchFilterFunction(text)}
                                           onClear={text => this.SearchFilterFunction('')}
                                           value={this.state.search}/>
                                <Icon style={styles.icon3} name="search" size={px2dp(26)} color="#666"/>
                            </View>
                            <View style={styles.segment}>
                                <TouchableOpacity style={[styles.buy, {backgroundColor: this.state.bgc1}]} onPress={() => this.onCheck(true)}>
                                    <TextComponent style={[styles.textBuy, {color: this.state.color1}]}>{Locales.BuyHome}</TextComponent>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.sell, {backgroundColor: this.state.bgc2}]} onPress={() => this.onCheck(false)}>
                                    <TextComponent style={[styles.textSell, {color: this.state.color2}]}>{Locales.SellHome}</TextComponent>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                        <View style={styles.information}>
                            <TextComponent style={styles.textInformation}>{this.state.textInformation}</TextComponent>
                        </View>
                        <View style={styles.FlatList1}>
                            <FlatList
                                data={this.state.data}
                                renderItem={({item}) => (
                                    <TouchableOpacity style={styles.item} onPress={() => this.checkDetail(item)}>
                                        <Image style={styles.imageItem}
                                            // source={{ uri: item.wallpaper_image }}
                                            // typeof là để check xem 1 đối tượng có phải là 1 chuỗi string hay ko?
                                            //Trong trường hợp này là để check link image là có phải lấy ảnh từ url
                                            //Nếu là url mà api trả về thì nó string nên mình sẽ dùng cú pháp
                                            // { uri: item.wallpaper_image} còn ko phải string thì nghĩa là lấy ảnh
                                            // từ local sẽ dùng cú pháp require("../../assets/image/Screen04.jpg")
                                               source={typeof item.image === "string"
                                                   ? {uri: item.image} : item.image}
                                        />
                                        <View style={styles.partBottom}>
                                            <TextComponent style={styles.title}>{item.name}</TextComponent>
                                            <View style={styles.content2}>
                                                <View style={styles.Address}>
                                                    <Icon4
                                                        style={styles.iconEnviromento}
                                                        name="enviromento"
                                                        size={px2dp(11)}
                                                        color="#666"
                                                    />
                                                    <TextComponent style={styles.textCity}>
                                                        {item.address}
                                                    </TextComponent>
                                                </View>
                                                <View style={styles.Sqm}>
                                                    <Icon4
                                                        style={styles.iconHome}
                                                        name="home"
                                                        size={px2dp(11)}
                                                        color="#666"
                                                    />
                                                    <Text style={styles.textKm}>{item.sqm}</Text>
                                                    <Text style={styles.textUnit}>sq/m</Text>
                                                </View>
                                            </View>
                                            <View style={styles.Price}>
                                                <TextComponent style={[styles.textCurrency, {color: color }]}>$</TextComponent>
                                                <TextComponent style={[styles.textMoney, {color: color}]}>{item.price}</TextComponent>
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
                        <Icon onPress={() => this._onUpdate()} style={styles.iconLeft} name="navicon" size={px2dp(34)}/>
                        <TextComponent style={styles.titleHeader}>{Locales.Home}</TextComponent>
                        <Icon onPress={() => this._onUpdate()} style={styles.iconBell} name="bell" size={px2dp(31)}/>
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
//     body: {
//         width: "100%",
//         height: "100%",
//         justifyContent: "center",
//         alignItems: "center"
//     },
//     imageBackground: {
//         width: "100%",
//         height: 290,
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
//     navicon: {
//         width: 35,
//         alignItems: "flex-start"
//     },
//     iconNavicon: {},
//     home: {
//         width: 130,
//         justifyContent: "center",
//         alignItems: "center"
//     },
//     titleHome: {
//         fontSize: 22,
//         fontWeight: "bold",
//         color: "#fff"
//     },
//     bell: {
//         width: 35,
//         alignItems: "center"
//     },
//     iconBell: {
//         marginLeft: 3,
//     },
//     searchBar: {
//         width: "88%",
//         height: 45,
//         backgroundColor: "#fff",
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//         borderRadius: 5
//     },
//     textInputSearch: {
//         width: "83%",
//         height: "100%",
//         backgroundColor: "#fff",
//         padding: 5,
//         fontSize: 18,
//         marginLeft: 15
//     },
//     icon3: {
//         marginRight: 15
//     },
//     segment: {
//         width: "55%",
//         height: 38,
//         backgroundColor: "#fff",
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//         borderRadius: 30,
//         top: 100
//     },
//     buy: {
//         width: "50%",
//         height: "100%",
//         //backgroundColor: '#0174DF',
//         justifyContent: "center",
//         alignItems: "center",
//         borderTopLeftRadius: 30,
//         borderBottomLeftRadius: 30
//     },
//     textBuy: {
//         fontSize: 18,
//         fontWeight: "500"
//         //color: "red"
//     },
//     sell: {
//         width: "50%",
//         height: "100%",
//         justifyContent: "center",
//         alignItems: "center",
//         borderTopRightRadius: 30,
//         borderBottomRightRadius: 30
//     },
//     textSell: {
//         fontSize: 18,
//         fontWeight: "500"
//         //color: "yellow"
//     },
//     information: {
//         width: "90%",
//         alignItems: "flex-start",
//         marginTop: 25,
//         marginBottom: 5
//     },
//     textInformation: {
//         fontSize: 18,
//         fontWeight: "500",
//         color: "$textColor"
//     },
//     FlatList1: {
//         width: "90%",
//     },
//     item: {
//         width: '47.1%',
//         marginRight: 20,
//         justifyContent: "flex-start",
//         alignItems: "center",
//         backgroundColor: "#fff",
//         marginTop: 10,
//         marginBottom: 15,
//         borderRadius: 5
//     },
//     imageItem: {
//         width: "100%",
//         height: 100,
//         marginBottom: 8,
//         borderRadius: 3
//     },
//     partBottom: {
//         width: "100%",
//         paddingLeft: 10,
//         paddingRight: 10,
//         justifyContent: "space-between"
//     },
//     title: {
//         fontSize: 13,
//         color: "black",
//         fontWeight: "500",
//         textAlign: "center"
//     },
//     content2: {
//         width: "100%",
//         alignItems: "center",
//         justifyContent: "space-between",
//         flexDirection: "row",
//         marginTop: 3,
//     },
//     Address: {
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
//     Sqm: {
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
//     Price: {
//         width: "100%",
//         alignItems: "center",
//         flexDirection: "row",
//         marginBottom: 7,
//         marginTop: 2
//     },
//     textCurrency: {
//         fontSize: 13,
//         color: "#2E64FE",
//         fontWeight: "500",
//         marginRight: 1
//     },
//     textMoney: {
//         fontSize: 13,
//         color: "#2E64FE",
//         fontWeight: "500"
//     }
// });

