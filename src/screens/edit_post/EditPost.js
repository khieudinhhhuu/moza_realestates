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
import {firebaseApp} from '../../components/firebase/Realtimedb';
import {
    getDataOfflineMode,
    saveDataOfflineMode,
    inValidateText,
    validateText, setWidth, setHeight
} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import constants from "../../assets/constants";
import global from "../../cores/utils/global";
import {large_bold, medium, medium_bold, mini, mini2, small_bold} from "../../cores/styles/styleText";

const deviceW = Dimensions.get("window").width;

const basePx = 375;

function px2dp(px) {
    return (px * deviceW) / basePx;
}

const Header_Maximum_Height = 70;

const Header_Minimum_Height = 70;

export default class EditPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            data: [],
            dataSource: [],
            check: false,
            search: '',
            bg: colors.blue,
        };

        thisState = this;
        this.arrayholder = [];

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
        firebaseApp.database().ref('data').child('sell').on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childData = childSnapshot.val();
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
                });

            });
            thisState.setState(
                {
                    data: array,
                    dataSource2: array,
                    isLoading: false,
                },
                function () {
                    this.arrayholder = array;
                }
            );
        });

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

    render() {
        const color = this.state.bg;
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <StatusBar
                        barStyle="dank-content"
                        hidden={false}
                        backgroundColor="transparent"
                        translucent
                    />
                    <ImageBackground style={styles.imageBackground} source={require("../../assets/image/villa01.jpg")}>
                        <View style={styles.header}>
                            <Icon style={styles.iconLeft} name="navicon" size={px2dp(34)}/>
                            <TextComponent style={styles.titleHeader}>{Locales.Home}</TextComponent>
                            <Icon style={styles.iconBell} name="bell" size={px2dp(31)}/>
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
                    barStyle="dank-content"
                    hidden={false}
                    backgroundColor="transparent"
                    translucent
                />
                <KeyboardAwareScrollView
                    style={styles.keyboardView}
                    scrollEventThrottle = { 16 }
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
                        </ImageBackground>
                        <View style={styles.FlatList1}>
                            <FlatList
                                data={this.state.data}
                                renderItem={({item}) => (
                                    <TouchableOpacity style={styles.item} onPress={() => navigate('EditOnePost', {item: item})}>
                                        <Image style={styles.imageItem}
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

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "$background",
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },
    HeaderStyle: {
        //justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: (Platform.OS === 'ios') ? 20 : 0,
    },
    header: {
        width: setWidth("100%"),
        height: 70,
        //backgroundColor: "$header",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 10,
    },
    iconLeft: {
        marginTop: 20,
        color: colors.white,
    },
    titleHeader: {
        color: colors.white,
        textAlign: "center",
        ...large_bold,
        marginTop: 20,
    },
    iconBell: {
        marginTop: 20,
        color: colors.white,
    },
    keyboardView: {
        width: setWidth("100%"),
        height: setHeight("100%"),
    },
    body: {
        width: setWidth("100%"),
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    imageBackground: {
        width: "100%",
        height: 290,
        alignItems: "center"
    },
    searchBar: {
        width: setWidth("94%"),
        height: 45,
        backgroundColor: colors.white,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 5,
        marginTop: 75,
        position: 'absolute',
    },
    textInputSearch: {
        width: "83%",
        height: "100%",
        backgroundColor: colors.white,
        padding: 5,
        ...medium,
        marginLeft: 15
    },
    icon3: {
        marginRight: 15
    },
    FlatList1: {
        width: setWidth("98%"),
        marginHorizontal: 5,
    },
    item: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "$bg2",
        margin: 5,
        borderRadius: 5
    },
    imageItem: {
        width: "100%",
        height: 150,
        marginBottom: 8,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
    partBottom: {
        width: "100%",
        paddingLeft: 8,
        paddingRight: 8,
        justifyContent: "space-between"
    },
    title: {
        ...small_bold,
        color: "$textColor",
        textAlign: "left"
    },
    content2: {
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 3,
    },
    Address: {
        width: "50%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "row",
        paddingRight: 7,
    },
    iconEnviromento: {
        marginRight: 2,
        marginTop: 1,
    },
    textCity: {
        ...mini,
        color: colors.color_text_second
    },
    Sqm: {
        width: "50%",
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
    },
    iconHome: {
        marginRight: 2
    },
    textKm: {
        marginRight: 2,
        ...mini,
        color: colors.color_text_second
    },
    textUnit: {
        ...mini,
        color: colors.color_text_second
    },
    Price: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 2
    },
    textCurrency: {
        ...mini2,
        //color: colors.button1,
        fontWeight: "500",
        marginRight: 1
    },
    textMoney: {
        ...mini2,
        //color: colors.button1,
        fontWeight: "500"
    }
});

