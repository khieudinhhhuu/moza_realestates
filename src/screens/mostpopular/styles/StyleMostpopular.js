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
import {mini2, small, small2_bold, small_bold} from "../../../cores/styles/styleText";

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center",
        alignItems: "center",
        backgroundColor: "$background"
    },
    body: {
        width: '100%',
        //paddingBottom: 20,
        marginTop: 20,
    },
    content: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: "$bg2",
        borderRadius: 4,
    },
    touchable: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
    fastImage: {
        width: '100%',
        height: 170,
        borderRadius: 3,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    status: {
        width: 80,
        height: 27,
        //backgroundColor: colors.button1,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        top: 16,
        left: 13,
    },
    textStatus: {
        color: colors.white,
        ...mini2,
    },
    partBottom: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: "space-between",
    },
    content1: {
        width: '100%',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 13,
    },
    title: {
        ...small2_bold,
        color: "$textColor",
        textAlign: 'center',
    },
    content2: {
        width: '27%',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    iconStar: {},
    rating: {
        ...small,
        color: colors.color_text_second,
        fontWeight: "400",
    },
    textReviews: {
        ...small,
        color: colors.color_text_second,
    },
    content3: {
        width: '100%',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 1,
        marginBottom: 13,
    },
    content4: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    content5: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginRight: 10,
    },
    iconEnviromento: {
        marginRight: 2,
    },
    textCity: {
        ...small,
        color: colors.color_text_second,
    },
    content6: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    iconHome: {
        marginRight: 2,
    },
    textKm: {
        marginRight: 2,
        ...small,
        color: colors.color_text_second,
    },
    textUnit: {
        ...small,
        color: colors.color_text_second,
    },
    content7: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    textCurrency: {
        ...small2_bold,
        //color: colors.button1,
    },
    textMoney: {
        ...small2_bold,
        //color: colors.button1,
    },
});
  