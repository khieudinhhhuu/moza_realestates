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
import {setHeight, setWidth} from "../../../cores/viewComponents/baseFunctions/BaseFunctions";
import {colors} from "../../../cores/styles/colors";
import EStyleSheet from "react-native-extended-stylesheet";
import {small, small2_bold} from "../../../cores/styles/styleText";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.bgLogin
    },
    keyboardView: {
        width: setWidth('100%'),
        height: setHeight('100%'),
    },
    body: {
        width: setWidth('100%'),
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 70,
    },
    logo: {
        width: '100%',
        height: '20%',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 80,
    },
    imageLogo: {
        width: '50%',
        height: '85%',
    },
    title: {
        fontSize: 20,
        color: colors.black,
        fontWeight: "600",
        marginTop: 50
    },
    signupForm: {
        width: "80%",
        height: 330,
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    content: {
        width: "100%",
        height: 45,
        marginBottom: 20,
        borderRadius: 35,
        borderWidth: 1.5,
        borderColor: colors.color_text_second,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    icon: {
        marginLeft: 10,
        marginRight: 7
    },
    content2: {
        width: "85%",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    textInput: {
        width: "100%",
        ...small,
        textAlign: "left",
        paddingRight: 7
    },
    btn: {
        width: "80%",
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5
    },
    btnSignup: {
        width: "100%",
        height: 45,
        backgroundColor: colors.button1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 35
    },
    textSignup: {
        ...small2_bold,
        color: colors.white
    },
    signin: {
        width: "80%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    text1: {
        ...small,
        color: colors.color_text_second
    },
    btnSignin: {
        //width: "20%"
    },
    textSignin: {
        ...small,
        color: colors.button1
    },
});
