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
import TextComponent from "../../cores/viewComponents/text/TextComponent";

const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
    return px * deviceW / basePx
}

export default class Followers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            check: false
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextComponent>Followers</TextComponent>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "red"
    },
});