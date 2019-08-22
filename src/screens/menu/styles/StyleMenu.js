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
    Switch
} from "react-native";
import {setHeight, setWidth} from "../../../cores/viewComponents/baseFunctions/BaseFunctions";
import {colors} from "../../../cores/styles/colors";
import EStyleSheet from "react-native-extended-stylesheet";
import {ifIphoneX} from "react-native-iphone-x-helper";

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center",
        //alignItems: "center",
        //backgroundColor: "black"
    },
    menu: {
        backgroundColor: "$menu"
    },
    chuyenmau: {
        color: '$chuyenmau'
    },
    bottom: {
        ...ifIphoneX({
            height: 20
        }, {
            height: 0
        }),
        backgroundColor: "$menu",
    },
});
  