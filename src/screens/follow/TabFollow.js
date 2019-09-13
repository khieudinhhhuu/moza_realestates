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

class TabFollow extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    backgroundColor="transparent"
                    translucent
                />
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
});

const TabScreen = createMaterialTopTabNavigator(
    {
        Following: {
            screen: Following
        },
        Followers: {
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
                backgroundColor: "#368fc7",
                width: setWidth("100%"),
                height: 70,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: 'row',
                paddingHorizontal: 5
            },
            headerTintColor: "#FFFFFF",
            title: "Khiếu Đình Hữu",
            headerTitleStyle: {
                color: colors.white, ...large_bold, marginTop: 20
            },
            header: (
                <View
                    style={{
                        width: setWidth("100%"),
                        height: 70,
                        backgroundColor: "#368fc7",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: 'row',
                        paddingHorizontal: 5
                    }}>
                    <Icon3 style={{marginTop: 20, color: colors.white}} name="chevron-left" size={px2dp(30)}/>
                    <TextComponent style={{color: colors.white, ...large_bold, marginTop: 20}}>Khiếu Đình Hữu</TextComponent>
                    <Icon style={{marginTop: 20, color: colors.white}} name="search" size={px2dp(30)}/>
                </View>
            )
        }
    }
});

export default createAppContainer(App);

