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

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "$background"
    },
    header: {
        width: setWidth("100%"),
        height: 70,
        backgroundColor: "$header",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
    },
    iconLeft: {
        marginTop: 20,
        color: colors.white,
        marginLeft: 30,
    },
    titleHeader: {
        color: colors.white,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 22,
        marginTop: 20,
    },
    iconBell: {
        marginTop: 20,
        color: colors.white,
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
    imageItem: {
        width: setWidth("100%"),
        height: 210,
        alignItems: "center"
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
        top: 108
    },
    imageAvatar: {
        width: 125,
        height: 125,
        borderRadius: 125
    },
    editUser: {
        width: 40,
        height: 40,
        right: 15,
        position: "absolute",
        top: 250
    },
    iconEditUser: {
        color: "$textColor",
    },
    name: {
        width: "95%",
        alignItems: "center",
        marginTop: 35
    },
    textName: {
        fontSize: 20,
        fontWeight: "500",
        color: "$textColor"
    },
    textEmail: {
        fontSize: 16,
        color: "$textColor"
    },
    follows: {
        width: "95%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    iconFollows: {
        marginRight: 3,
        color: "$textColor",
    },
    textFollows: {
        fontSize: 18,
        color: "$textColor",
        marginRight: 3,
    },
    numberFollows: {
        fontSize: 17,
        color: "$textColor",
        fontWeight: "bold",
    },
    content: {
        width: setWidth("95%"),
        height: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
    },
    addPost: {
        width: "49%",
        height: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: colors.button1
    },
    iconAddPost: {
        marginRight: 3,
    },
    textAddPost: {
        fontSize: 18,
        color: colors.white,
        fontWeight: "bold",
    },
    editPost: {
        width: "49%",
        height: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: colors.button1
    },
    iconEditPost: {
        marginRight: 3,
    },
    textEditPost: {
        fontSize: 18,
        color: colors.white,
        fontWeight: "bold",
    },
    recentlyView: {
        width: setWidth("95%"),
        alignItems: "flex-start",
        marginTop: 20,
        marginBottom: 10
    },
    textRecentlyView: {
        fontSize: 16,
        fontWeight: "500",
        color: "$textColor"
    },
    FlatList1: {
        width: setWidth("98%"),
        marginHorizontal: 5,
    },
    item: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "$bg2",
        margin: 5,
        borderRadius: 5
    },
    imageItemTwo: {
        width: "100%",
        height: 150,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    status: {
        width: 60,
        height: 23,
        backgroundColor: colors.button1,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        top: 13,
        left: 11
    },
    textStatus: {
        color: colors.white,
        fontSize: 10
    },
    partBottom: {
        width: "100%",
        paddingLeft: 10,
        paddingRight: 15,
        justifyContent: "space-between"
    },
    content2: {
        width: "40%",
        marginTop: 10,
        marginLeft: 6
    },
    rating: {},
    viewTitle: {
        width: "100%",
        marginTop: 7
    },
    title: {
        fontSize: 13,
        color: "$textColor",
        fontWeight: "500"
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
        fontSize: 11,
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
        fontSize: 11,
        color: colors.color_text_second
    },
    textUnit: {
        fontSize: 11,
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
        fontSize: 13,
        color: colors.button1,
        fontWeight: "500"
    },
    textMoney: {
        fontSize: 14,
        color: colors.button1,
        fontWeight: "500"
    }
});
  