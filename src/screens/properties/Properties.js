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
import {createStackNavigator, createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import {Container, Header, Content, Tab, Tabs, ScrollableTab} from "native-base";
import Mostpopular from "../mostpopular/Mostpopular";
import Toprated from "../toprated/Toprated";
import Recommended from "../recommended/Recommended";

import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/Foundation";
import Icon4 from "react-native-vector-icons/AntDesign";
import Icon5 from "react-native-vector-icons/MaterialIcons";
import Icon6 from "react-native-vector-icons/Entypo";
import FastImage from "react-native-fast-image";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import Locales from "../../cores/languages/languages";
import darkTheme from "../../cores/viewComponents/themes/dark";
import lightTheme from "../../cores/viewComponents/themes/light";
import EStyleSheet from "react-native-extended-stylesheet";
import {styles} from './styles/StyleProperties';
import {firebaseApp} from '../../components/firebase/Realtimedb';

const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
    return px * deviceW / basePx
}

const Header_Maximum_Height = 70;

const Header_Minimum_Height = 70;

export default class Properties extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
        };

        this.AnimatedHeaderValue = new Animated.Value(0);

    }

    componentDidMount() {

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
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        const AnimateHeaderBackgroundColor = this.AnimatedHeaderValue.interpolate(
            {
                inputRange: [ 0, ( Header_Maximum_Height - Header_Minimum_Height )  ],

                outputRange: [ 'transparent' , '#368fc7' ],

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
                    backgroundColor="#D8D8D8"
                    translucent={false}
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
                        <View style={styles.searchbar}>
                            <Icon4 style={styles.iconRightcircleo} name="rightcircleo" size={px2dp(15)} color="#666"/>
                            <TextInput style={styles.textInputSearch}
                                       placeholder={Locales.SearchProperties}
                                       keyboardType='default'
                                       returnKeyType="go"
                                       placeholderTextColor='#666'
                            />
                            <Icon onPress={() => this._onUpdate()} style={styles.iconSearch} name="search" size={px2dp(26)} color="#666"/>
                        </View>
                        <View style={styles.content}>
                            <TouchableOpacity style={styles.house} onPress={() => this._onUpdate()}>
                                <Icon4 style={styles.iconHouse} name="home" size={px2dp(15)} color="#666"/>
                                <TextComponent style={styles.textHouse}>{Locales.HouseProperties}</TextComponent>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.price} onPress={() => this._onUpdate()}>
                                <Icon6 style={styles.iconPrice} name="wallet" size={px2dp(17)} color="#666"/>
                                <TextComponent style={styles.textPrice}>{Locales.PriceProperties}</TextComponent>
                            </TouchableOpacity>
                        </View>
                        <Tabs tabBarUnderlineStyle={{backgroundColor: '#0174DF', height: 3, borderRadius: 10, elevation: 0}}
                              style={styles.tabsss}>
                            <Tab
                                heading={Locales.MostPopular}
                                tabStyle={{backgroundColor: '#EBEBEB'}}                            //background các tab còn lại  (Style for tab bar)
                                activeTabStyle={{backgroundColor: '#EBEBEB'}}                      //màu nền khi chuyển tab  (Style for active tab bar)
                                textStyle={{
                                    fontWeight: 'bold',
                                    color: 'black',
                                    fontSize: 13
                                }}     //màu chữ các tab còn lại đang k hoạt động (Style for text)
                                activeTextStyle={{
                                    color: '#0174DF',
                                    fontSize: 13
                                }}                 //màu chữ tab hiện tại đang hoạt động (Style for active text)
                                style={{backgroundColor: '#EBEBEB'}}>
                                <Mostpopular navigation={this.props.navigation}/>
                            </Tab>
                            <Tab
                                heading={Locales.TopRated}
                                tabStyle={{backgroundColor: '#EBEBEB'}}
                                activeTabStyle={{backgroundColor: '#EBEBEB'}}
                                activeTextStyle={{color: '#0174DF', fontSize: 13}}
                                textStyle={{fontWeight: 'bold', color: 'black', fontSize: 13}}
                                style={{backgroundColor: '#EBEBEB'}}>
                                <Toprated navigation={this.props.navigation}/>
                            </Tab>
                            <Tab
                                heading={Locales.Recommended}
                                tabStyle={{backgroundColor: '#EBEBEB'}}
                                activeTabStyle={{backgroundColor: '#EBEBEB'}}
                                activeTextStyle={{color: '#0174DF', fontSize: 13}}
                                textStyle={{fontWeight: 'bold', color: 'black', fontSize: 13}}
                                style={{backgroundColor: '#EBEBEB'}}>
                                <Recommended navigation={this.props.navigation}/>
                            </Tab>
                        </Tabs>
                    </View>
                </KeyboardAwareScrollView>

                <Animated.View style = {[ styles.HeaderStyle, { height: AnimateHeaderHeight, backgroundColor: AnimateHeaderBackgroundColor } ]}>

                    <View style={styles.header}>
                        <Icon4 onPress={() => navigation.goBack()} style={styles.iconLeft} name="arrowleft" size={px2dp(28)}/>
                        <TextComponent style={styles.titleHeader}>{Locales.Properties}</TextComponent>
                        <Icon onPress={() => this._onUpdate()} style={styles.iconBell} name="bell" size={px2dp(30)}/>
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
//         backgroundColor: "$background",
//     },
//     // keyboardView: {
//     //   width: "100%",
//     //   height: "100%"
//     // },
//     // fake: {
//     //   flex: 1,
//     //   justifyContent: "center",
//     //   alignItems: "center",
//     // },
//     tabsss: {
//         width: '90%',
//         borderWidth: 0,
//         borderBottomWidth: 0,
//         backgroundColor: "#D8D8D8",
//         elevation: 0,
//         borderColor: 'red',
//         borderTopColor: 'red'
//     },
//     tabar: {
//         width: '90%',
//         height: 50,
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//         marginTop: 20,
//         marginBottom: 10,
//     },
//     arrowleft: {
//         width: 35,
//         alignItems: "flex-start",
//     },
//     iconArrowleft: {
//         color: "$textColor"
//     },
//     properties: {
//         width: 150,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     titleProperties: {
//         fontSize: 20,
//         fontWeight: "bold",
//         color: "$textColor"
//     },
//     bell: {
//         width: 35,
//         alignItems: "center",
//     },
//     iconBell: {
//         marginLeft: 3,
//         color: "$textColor"
//     },
//     searchbar: {
//         width: '90%',
//         height: 50,
//         backgroundColor: '#fff',
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: 'row',
//         borderRadius: 5,
//         marginBottom: 13,
//     },
//     iconRightcircleo: {
//         marginLeft: 15,
//     },
//     textInputSearch: {
//         width: '78%',
//         height: '100%',
//         backgroundColor: '#fff',
//         padding: 5,
//         fontSize: 18,
//         marginLeft: 6,
//     },
//     iconSearch: {
//         marginRight: 15
//     },
//     content: {
//         width: '90%',
//         height: 50,
//         backgroundColor: '$background',
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: 'row',
//         borderRadius: 5,
//         marginBottom: 15,
//     },
//     house: {
//         width: '48%',
//         height: '100%',
//         backgroundColor: '#fff',
//         alignItems: "center",
//         flexDirection: 'row',
//         borderRadius: 5,
//     },
//     iconHouse: {
//         marginLeft: 20,
//         marginRight: 10,
//     },
//     textHouse: {
//         fontSize: 18,
//         color: "#666"
//     },
//     price: {
//         width: '48%',
//         height: '100%',
//         backgroundColor: '#fff',
//         alignItems: "center",
//         flexDirection: 'row',
//         borderRadius: 5,
//     },
//     iconPrice: {
//         marginLeft: 20,
//         marginRight: 10,
//     },
//     textPrice: {
//         fontSize: 18,
//         color: "#666"
//     },
// });



