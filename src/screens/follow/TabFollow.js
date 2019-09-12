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
import {createStackNavigator, createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import {Container, Header, Content, Tab, Tabs} from "native-base";
import Followers from "./Followers";
import Following from "./Following";
import TextComponent from "../../cores/viewComponents/text/TextComponent";
import Icon3 from "react-native-vector-icons/Entypo";
import Locales from "../../cores/languages/languages";
import Icon from "react-native-vector-icons/EvilIcons";
import {setWidth} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import {colors} from "../../cores/styles/colors";
import {large_bold} from "../../cores/styles/styleText";
import EStyleSheet from "react-native-extended-stylesheet";

const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
    return px * deviceW / basePx
}

export default class TabFollow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            check: false
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    backgroundColor="transparent"
                    translucent
                />
                <View style={styles.header}>
                    <Icon3 onPress={() => navigation.goBack()} style={styles.iconLeft} name="chevron-left" size={px2dp(30)}/>
                    <TextComponent style={styles.titleHeader}>{Locales.RealEstateNews}</TextComponent>
                    <Icon style={styles.iconSearch} name="search" size={px2dp(30)}/>
                </View>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "red"
    },
    header: {
        width: setWidth("100%"),
        height: 70,
        backgroundColor: "$header",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
    },
    iconLeft: {
        marginTop: 20,
        color: colors.white,
        marginLeft: 5,
    },
    titleHeader: {
        color: colors.white,
        textAlign: "center",
        ...large_bold,
        marginTop: 20,
    },
    iconSearch: {
        marginTop: 20,
        color: colors.white,
        marginRight: 5,
    },
});


const TabScreen = createMaterialTopTabNavigator(
    {
        Messages: {
            screen: Following
        },
        Notifications: {
            screen: Followers
        }
    },
    {
        tabBarPosition: "top",
        swipeEnabled: true,
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: "#FFFFFF",
            inactiveTintColor: "#F8F8F8",
            style: {
                backgroundColor: "black"
            },
            labelStyle: {
                textAlign: "center",
                fontWeight: "bold"
            },
            indicatorStyle: {
                borderBottomColor: "orange",
                borderBottomWidth: 2
            }
        }
    }
);

const App = createStackNavigator({
    TabScreen: {
        screen: TabScreen,
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#633689"
            },
            headerTintColor: "#FFFFFF",
            //title: 'TabExample',
            header: (
                <View
                    style={{
                        height: "30%",
                        //backgroundColor: '#fff',
                        justifyContent: "center"
                    }}
                >
                    <Image
                        style={{width: "100%", height: "100%"}}
                        source={require("../../image/notifi.png")}
                    />
                </View>
            )
        }
    }
});

export default createAppContainer(App);

