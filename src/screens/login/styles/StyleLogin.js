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
import {large_bold, medium, small2, small2_bold, small_bold} from "../../../cores/styles/styleText";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.bgLogin
    },
    body: {
        width: setWidth('100%'),
        height: setHeight('100%'),
    },
    fake: {
        width: setWidth('100%'),
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 70,
    },
    logo: {
        width: "100%",
        height: "20%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 80,
    },
    imageLogo: {
        width: "50%",
        height: "85%",
    },
    title: {
        ...large_bold,
        color: colors.black,
        marginTop: 60
    },
    loginForm: {
        width: "80%",
        height: 130,
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
        ...small2,
        textAlign: "left",
        paddingRight: 7
    },
    checked: {
        width: "80%",
        flexDirection: "row",
        alignItems: "center"
    },
    textChecked: {
        ...small2,
        color: colors.color_text_second
    },
    btn: {
        width: "80%",
        height: 70,
        alignItems: "center",
        marginTop: 20
    },
    btnSignin: {
        width: "100%",
        height: 45,
        backgroundColor: colors.button1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 35
    },
    textSignin: {
        ...small2_bold,
        color: colors.white
    },
    signup: {
        width: "80%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    text1: {
        ...small2,
        color: colors.color_text_second
    },
    btnSignup: {

    },
    textSignup: {
        ...small2,
        color: colors.button1
    },
    or: {
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 15
    },
    text2: {
        ...medium,
        color: colors.color_text_second
    },
    btnSocial: {
        width: "80%",
        height: 110,
        alignItems: "center",
        justifyContent: "center"
    },
    btnFacebook: {
        width: "100%",
        height: 45,
        backgroundColor: colors.Purple,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginBottom: 10,
        borderRadius: 35
    },
    textFacebook1: {
        ...small_bold,
        color: colors.white
    },
    imageFacebook: {
        marginRight: 1
    },
    textFacebook2: {
        ...small_bold,
        color: colors.white
    },
    btnTwitter: {
        width: "100%",
        height: 45,
        backgroundColor: colors.saf,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 35
    },
    textTwitter1: {
        ...small_bold,
        color: colors.white
    },
    imageTwitter: {
        marginRight: 1
    },
    textTwitter2: {
        ...small_bold,
        color: colors.white
    }
});
