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
    medium_bold, mini, mini2_bold,
    small2,
    small2_bold,
    small_bold
} from "../../../cores/styles/styleText";

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "$background"
    },
    HeaderStyle: {
        //justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: (Platform.OS === 'ios') ? 20 : 0,
    },
    header: {
        width: setWidth("100%"),
        height: 70,
        //backgroundColor: "$header",
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
        ...large_bold,
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
        height: 270,
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
        top: 165
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
        top: 320
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
        ...medium2_bold,
        color: "$textColor"
    },
    textEmail: {
        ...small2,
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
        ...medium,
        color: "$textColor",
        marginRight: 3,
    },
    numberFollows: {
        ...medium_bold,
        color: "$textColor",
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
        //backgroundColor: colors.button1
    },
    iconAddPost: {
        marginRight: 3,
    },
    textAddPost: {
        ...medium_bold,
        color: colors.white,
    },
    editPost: {
        width: "49%",
        height: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        //backgroundColor: colors.button1
    },
    iconEditPost: {
        marginRight: 3,
    },
    textEditPost: {
        ...medium_bold,
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
        ...small2_bold,
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
    partBottom: {
        width: "100%",
        paddingLeft: 8,
        paddingRight: 8,
        justifyContent: "space-between"
    },
    viewTitle: {
        width: "100%",
        marginTop: 7
    },
    title: {
        ...mini2_bold,
        color: "$textColor",
    },
    content4: {
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 3,
    },
    viewAddress: {
        width: "50%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "row",
        paddingRight: 7,
    },
    iconEnviromento: {
        marginRight: 2,
        marginTop: 1,
    },
    textCity: {
        ...mini,
        color: colors.color_text_second
    },
    viewSqm: {
        width: "50%",
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
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
        marginTop: 2
    },
    textCurrency: {
        ...mini2_bold,
        //color: colors.button1,
    },
    textMoney: {
        ...mini2_bold,
        //color: colors.button1,
    }
});
