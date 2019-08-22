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
import {small, small2, small2_bold, small_bold, xlarge_bold} from "../../../cores/styles/styleText";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.bgLogin
    },
    logo: {
        width: setWidth('95%'),
        height: setHeight('12%'),
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
    },
    imageLogo: {
        width: '50%',
        height: '90%',
    },
    content1: {
        width: setWidth('100%'),
        height: setHeight('30%'),
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    image: {
        width: '80%',
        height: '100%',
    },
    title: {
        ...xlarge_bold,
        color: colors.black,
        marginTop: 40,
    },
    content2: {
        width: '70%',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    text2: {
        fontWeight: '400',
        ...small,
        color: colors.color_text_second,
        textAlign: "center",
        lineHeight: 23,
    },
    btn: {
        width: setWidth("80%"),
        height: 110,
        alignItems: "center",
        marginTop: 40,
    },
    btnSignin: {
        width: "100%",
        height: 45,
        backgroundColor: colors.button1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginBottom: 15,
        borderRadius: 35,
    },
    icon: {
        marginRight: 13,
    },
    textSignin: {
        ...small2,
        color: colors.white
    },
});
