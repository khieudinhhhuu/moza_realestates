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
import {small, small2, xlarge_bold} from "../../../cores/styles/styleText";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    image: {
        width: 340,
        height: 270,
        marginTop: 50
    },
    title: {
        ...xlarge_bold,
        color: colors.black,
        textAlign: 'center',
        position: 'absolute',
        bottom: 270
    },
    text: {
        color: colors.color_text_second,
        ...small,
        textAlign: 'center',
        marginLeft: 35,
        marginRight: 35,
        marginBottom: 50
    },
});
  