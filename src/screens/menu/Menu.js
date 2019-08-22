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
    Modal
} from "react-native";
import TabNavigator from "react-native-tab-navigator";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon1 from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/EvilIcons";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon5 from "react-native-vector-icons/SimpleLineIcons";
import Home from "../home/Home";
import Favourites from "../favourites/Favourites";
import Profile from "../profile/Profile";
import Settings from "../settings/Settings";
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import darkTheme from "../../cores/viewComponents/themes/dark";
import lightTheme from "../../cores/viewComponents/themes/light";
import EStyleSheet from "react-native-extended-stylesheet";
import News from "../news/News";
import Maps from '../maps/Maps';
import {ifIphoneX} from "react-native-iphone-x-helper";
import {colors} from "../../cores/styles/colors";
import {styles} from './styles/StyleMenu';
import {
    getDataOfflineMode,
    saveDataOfflineMode,
    inValidateText,
    validateText
} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import constants from "../../assets/constants";
import global from "../../cores/utils/global";

const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
    return px * deviceW / basePx
}

export default class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bg: colors.blue,
            selectedTab: "home"
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
    }

    render() {
        const color = this.state.bg;
        return (
            <View style={styles.container}>
                <TabNavigator tabBarStyle={styles.menu}>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        //title="Home"
                        selectedTitleStyle={{color: "#3496f0"}}
                        renderIcon={() => <Icon style={styles.chuyenmau} name="home" size={px2dp(22)} color="black"/>}
                        renderSelectedIcon={() => <Icon name="home" size={px2dp(22)} color={color}/>}
                        //badgeText="1"
                        onPress={() => this.setState({selectedTab: 'home'})}>
                        <Home navigation={this.props.navigation}/>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'maps'}
                        //title="Maps"
                        selectedTitleStyle={{color: "#3496f0"}}
                        renderIcon={() => <Icon3 style={styles.chuyenmau} name="map-marker-radius" size={px2dp(22)} color="black"/>}
                        renderSelectedIcon={() => <Icon3 name="map-marker-radius" size={px2dp(22)} color={color}/>}
                        //badgeText="1"
                        onPress={() => this.setState({selectedTab: 'maps'})}>
                        <Maps navigation={this.props.navigation}/>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'news'}
                        //title="News"
                        selectedTitleStyle={{color: "#3496f0"}}
                        renderIcon={() => <Icon style={styles.chuyenmau} name="newspaper-o" size={px2dp(22)} color="black"/>}
                        renderSelectedIcon={() => <Icon name="newspaper-o" size={px2dp(22)} color={color}/>}
                        onPress={() => this.setState({selectedTab: 'news'})}>
                        <News navigation={this.props.navigation}/>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'favourites'}
                        //title="Favourites"
                        selectedTitleStyle={{color: "#3496f0"}}
                        renderIcon={() => <Icon1 style={styles.chuyenmau} name="favorite-border" size={px2dp(24)} color="black"/>}
                        renderSelectedIcon={() => <Icon1 name="favorite-border" size={px2dp(24)} color={color}/>}
                        onPress={() => this.setState({selectedTab: 'favourites'})}>
                        <Favourites navigation={this.props.navigation}/>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'profile'}
                        //title="Profile"
                        selectedTitleStyle={{color: "#3496f0"}}
                        renderIcon={() => <Icon2 style={styles.chuyenmau} name="user" size={px2dp(30)} color="black"/>}
                        renderSelectedIcon={() => <Icon2 name="user" size={px2dp(30)} color={color}/>}
                        onPress={() => this.setState({selectedTab: 'profile'})}>
                        <Profile navigation={this.props.navigation}/>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'settings'}
                        //title="Settings"
                        selectedTitleStyle={{color: "#3496f0"}}
                        renderIcon={() => <Icon5 style={styles.chuyenmau} name="settings" size={px2dp(22)} color="black"/>}
                        renderSelectedIcon={() => <Icon5 name="settings" size={px2dp(22)} color={color}/>}
                        onPress={() => this.setState({selectedTab: 'settings'})}>
                        <Settings navigation={this.props.navigation}/>
                    </TabNavigator.Item>
                </TabNavigator>
                <View style={styles.bottom}/>
            </View>
        );
    }
}

// const styles = EStyleSheet.create({
//     container: {
//         flex: 1,
//         //justifyContent: "center",
//         //alignItems: "center",
//         //backgroundColor: "black"
//     },
//     menu: {
//         backgroundColor: "$menu"
//     },
//     chuyenmau: {
//         color: '$chuyenmau'
//     },
//     bottom: {
//         ...ifIphoneX({
//             height: 20
//         }, {
//             height: 0
//         }),
//         backgroundColor: "$menu",
//     },
// });

AppRegistry.registerComponent('Menu', () => Menu);
