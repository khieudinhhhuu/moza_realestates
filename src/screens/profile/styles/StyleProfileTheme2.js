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
    medium2,
    medium2_bold,
    medium_bold,
    mini,
    mini2,
    small,
    small2, small2_bold, small_bold
} from "../../../cores/styles/styleText";

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
    viewInformation: {
        width: setWidth("90%"),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
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
    },
    imageAvatar: {
        width: 125,
        height: 125,
        borderRadius: 125
    },
    call: {
        width: 80,
        height: 50,
        backgroundColor: "#0D9DA6",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        marginLeft: 70,
    },
    textCall: {
        color: colors.white,
        ...mini2,
    },
    editUser: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: "#0D9DA6",
        justifyContent: "center",
        alignItems: "center",
    },
    iconEditUser: {
        color: "$textColor",
    },
    name: {
        width: "90%",
        alignItems: "flex-start",
        marginTop: 20
    },
    textName: {
        ...medium2_bold,
        color: "$textColor"
    },
    textEmail: {
        ...small2,
        color: "$textColor"
    },
    viewFP: {
        width: setWidth('100%'),
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.color_text_second,
    },
    follow: {
        width: "50%",
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    textFollow: {
        ...medium_bold,
        color: "$textColor"
    },
    numberFollow: {
        ...medium2,
        color: "$textColor"
    },
    property: {
        width: "50%",
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    textProperty: {
        ...medium_bold,
        color: "$textColor"
    },
    numberProperty: {
        ...medium2,
        color: "$textColor"
    },
    content: {
        width: setWidth("90%"),
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
    FlatList: {
        width: setWidth("100%"),
    },
    content22: {
        width: setWidth("88%"),
        margin: 10,
        backgroundColor: colors.white,
        borderRadius: 7
    },
    touchable22: {
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: 7,
    },
    fastImage: {
        width: '100%',
        height: 170,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
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
        top: 130,
        left: 13,
    },
    textStatus: {
        color: colors.white,
        ...mini2,
    },
    partBottom2: {
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
    title2: {
        ...small_bold,
        color: colors.black,
        textAlign: 'center',
    },
    content2: {
        width: '28%',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    iconStar: {},
    rating: {
        ...small,
        color: colors.color_text_second,
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
        ...small_bold,
        //color: colors.button1,
    },
    textMoney: {
        ...small_bold,
        //color: colors.button1,
    },
});
