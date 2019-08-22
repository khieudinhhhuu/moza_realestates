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
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/Foundation";
import Icon4 from "react-native-vector-icons/AntDesign";
import Icon5 from "react-native-vector-icons/MaterialIcons";
import Icon6 from "react-native-vector-icons/Entypo";
import FastImage from "react-native-fast-image";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import color from '../../cores/styles/colors';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import darkTheme from "../../cores/viewComponents/themes/dark";
import lightTheme from "../../cores/viewComponents/themes/light";
import EStyleSheet from "react-native-extended-stylesheet";
import {styles} from './styles/StyleMostpopular';
import {colors} from "../../cores/styles/colors";
import {firebaseApp} from '../../components/firebase/Realtimedb';
import {getDataOfflineMode, validateText} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import constants from "../../assets/constants";
import global from "../../cores/utils/global";

const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
    return px * deviceW / basePx
}

export default class Mostpopular extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
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

        let array = [];
        firebaseApp.database().ref('data').child('bds').on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
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
        return (
            <View style={styles.container}>
                <StatusBar
                    // barStyle="$statusBar"
                    hidden={false}
                    backgroundColor="transparent"
                    translucent
                />
                <View style={styles.body}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.data}
                        renderItem={({item}) => (
                            <View style={styles.content}>
                                <TouchableOpacity style={styles.touchable}
                                                  onPress={() => navigate('Details',{item: item})}>
                                    <FastImage style={styles.fastImage} source={{uri: item.image}}>
                                        <View style={[styles.status, {backgroundColor: color}]}>
                                            <TextComponent style={styles.textStatus}>{item.status}</TextComponent>
                                        </View>
                                    </FastImage>
                                    <View style={styles.partBottom}>
                                        <View style={styles.content1}>
                                            <TextComponent style={styles.title}>{item.name}</TextComponent>
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
        );
    }
}

// const styles = EStyleSheet.create({
//     container: {
//         flex: 1,
//         //justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "$background"
//     },
//     body: {
//         width: '100%',
//         //paddingBottom: 20,
//         marginTop: 20,
//     },
//     content: {
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: 'row',
//         marginBottom: 20,
//         backgroundColor: "#fff",
//         borderRadius: 4,
//     },
//     touchable: {
//         width: '100%',
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     fastImage: {
//         width: '100%',
//         height: 170,
//         borderRadius: 3,
//         flexDirection: "row",
//         justifyContent: "space-between",
//     },
//     status: {
//         width: 80,
//         height: 27,
//         backgroundColor: '#0174DF',
//         borderRadius: 30,
//         justifyContent: "center",
//         alignItems: "center",
//         top: 16,
//         left: 13,
//     },
//     textStatus: {
//         color: '#fff',
//         fontSize: 13,
//     },
//     partBottom: {
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
//     title: {
//         fontSize: 15,
//         color: "black",
//         fontWeight: "500",
//         textAlign: 'center',
//     },
//     content2: {
//         width: '27%',
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//     },
//     iconStar: {},
//     rating: {
//         fontSize: 14,
//         color: "#666",
//         fontWeight: "400",
//     },
//     textReviews: {
//         fontSize: 14,
//         color: "#666",
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
//         color: "#666",
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
//         color: "#666",
//     },
//     textUnit: {
//         fontSize: 14,
//         color: "#666",
//     },
//     content7: {
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//     },
//     textCurrency: {
//         fontSize: 15,
//         color: "#2E64FE",
//         fontWeight: "500",
//     },
//     textMoney: {
//         fontSize: 16,
//         color: "#2E64FE",
//         fontWeight: "500",
//     },
// });
