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
import {
    large_bold,
    medium,
    medium2_bold,
    medium_bold, mini,
    mini2_bold,
    small2,
    small2_bold
} from "../../../cores/styles/styleText";

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "$background"
    },
    header: {
        height: 70,
        backgroundColor: "$header",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        width: "100%",
        paddingLeft: 10,
        paddingRight: 10,
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
    iconBell: {
        marginTop: 20,
        color: colors.white,
        marginRight: 5,
    },
    keyboardView: {
        width: setWidth("100%"),
        height: setHeight("100%")
    },
    body: {
        width: setWidth("100%"),
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    imageBackground: {
        width: setWidth("100%"),
        height: 200,
        alignItems: "center",
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 130,
        backgroundColor: colors.white,
        borderWidth: 0.5,
        borderColor: colors.color_text_second,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 98
    },
    imageAvatar: {
        width: 125,
        height: 125,
        borderRadius: 125
    },
    viewInformation: {
        width: "90%",
        alignItems: "center",
        marginTop: 35
    },
    textName: {
        ...medium2_bold,
        color: "$textColor",
        textAlign: "center",
    },
    textEmail: {
        ...small2,
        color: "$textColor",
        textAlign: "center",
    },
    follows: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    iconFollows: {
        marginRight: 3,
        color: "$textColor",
    },
    textFollows: {
        ...medium,
        color: "$textColor",
        marginRight: 3,
    },
    numberFollows: {
        ...medium_bold,
        color: "$textColor",
        fontWeight: "bold",
    },
    btn: {
        width: setWidth("90%"),
        height: 40,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        marginTop: 20,
    },
    btnCall: {
        width: "32.5%",
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        //backgroundColor: colors.button1,
        borderRadius: 5,
    },
    iconCall: {
        marginRight: 3,
    },
    textCall: {
        ...small2_bold,
        color: colors.white,
    },
    btnChat: {
        width: "32.5%",
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        //backgroundColor: colors.button1,
        borderRadius: 5,
    },
    iconChat: {
        marginRight: 4,
    },
    textChat: {
        ...small2_bold,
        color: colors.white,
    },
    btnFollow: {
        width: "32.5%",
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        //backgroundColor: colors.button1,
        borderRadius: 5,
    },
    iconFollow: {
        marginRight: 5,
    },
    textFollow: {
        ...small2_bold,
        color: colors.white,
    },
    recentlyView: {
        width: setWidth("90%"),
        alignItems: "flex-start",
        marginTop: 30,
        marginBottom: 10
    },
    textRecentlyView: {
        ...small2_bold,
        color: "$textColor"
    },
    FlatList1: {
        width: setWidth("90%"),
    },
    item: {
        width: 167,
        marginRight: 18,
        backgroundColor: colors.white,
        marginTop: 10,
        marginBottom: 15,
        borderRadius: 5
    },
    imageItem: {
        width: "100%",
        height: 150,
        borderRadius: 3,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    partBottom: {
        width: "100%",
        paddingLeft: 10,
        paddingRight: 15,
        justifyContent: "space-between"
    },
    viewTitle: {
        width: "100%",
        marginTop: 7
    },
    textTitle: {
        ...mini2_bold,
        color: colors.black,
    },
    content4: {
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 7
    },
    viewAddress: {
        width: "50%",
        alignItems: "center",
        flexDirection: "row",
        marginRight: 7
    },
    iconEnviromento: {
        marginRight: 2,
    },
    textCity: {
        ...mini,
        color: colors.color_text_second
    },
    viewSqm: {
        width: "50%",
        alignItems: "center",
        flexDirection: "row"
    },
    iconHome: {
        marginRight: 2
    },
    textKm: {
        marginRight: 2,
        ...mini,
        color: colors.color_text_second
    },
    textUnit: {
        ...mini,
        color: colors.color_text_second
    },
    viewPrice: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 5
    },
    textCurrency: {
        ...mini2_bold,
        color: colors.button1,
    },
    textMoney: {
        ...mini2_bold,
        color: colors.button1,
    }
});