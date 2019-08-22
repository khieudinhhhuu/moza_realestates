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
    ActivityIndicator
} from "react-native";
import {setHeight, setWidth} from "../../../cores/viewComponents/baseFunctions/BaseFunctions";
import {colors} from "../../../cores/styles/colors";
import EStyleSheet from "react-native-extended-stylesheet";

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "$bgColor",
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
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
        marginBottom: 10,
    },
    iconLeft: {
        marginTop: 20,
        color: colors.white,
        marginLeft: 5,
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
        alignItems: "center",
    },
    imageBackground: {
        width: setWidth("100%"),
        height: 270,
        alignItems: "center",
    },
    viewStatus: {
        width: setWidth('90%'),
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        top: 220
    },
    status: {
        width: 80,
        height: 27,
        //backgroundColor: colors.button1,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    textStatus: {
        color: colors.white,
        fontSize: 13,
    },
    favorite: {
        width: 35,
        height: 35,
        backgroundColor: colors.white,
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center",
    },
    iconFavorite: {

    },
    content: {
        width: setWidth('100%'),
        justifyContent: "space-between",
        alignItems: "center",
    },
    viewTitle: {
        width: setWidth('90%'),
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: 5,
    },
    textTitle: {
        fontSize: 22,
        color: "$textColor",
        textAlign: 'center',
    },
    content2: {
        width: setWidth('90%'),
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 10
    },
    viewPrice: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    textCurrency: {
        fontSize: 18,
        //color: colors.button1,
        fontWeight: "bold",
    },
    textMoney: {
        fontSize: 19,
        //color: colors.button1,
        fontWeight: "bold",
    },
    viewAddress: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginRight: 5,
    },
    iconEnviromento: {
        color: "$textColor",
    },
    textCity: {
        fontSize: 15,
        color: "$textColor",
    },
    personal: {
        width: setWidth('90%'),
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: colors.white,
        borderRadius: 5,
        marginTop: 10,
        shadowColor: "#bababa",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 80,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.color_text_second,
        margin: 10,
    },
    imageAvatar: {
        width: 80,
        height: 80,
        borderRadius: 80,
    },
    name: {
        width: '42%',
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexDirection: "column",
    },
    textName: {
        fontSize: 16,
        color: "$textColor",
        fontWeight: "bold",
    },
    textOwner: {
        fontSize: 13,
        color: "$textColor",
        marginTop: 3,
    },
    call: {
        width: 80,
        height: 50,
        backgroundColor: "#0D9DA6",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
    textCall: {
        color: colors.white,
        fontSize: 12,
    },
    belongings: {
        width: setWidth('90%'),
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 25,
        paddingTop: 15,
        paddingBottom: 25,
        borderBottomWidth: 1,
        borderColor: colors.color_text_second,
    },
    viewDot: {
        width: 7,
        height: 7,
        borderRadius: 7,
        backgroundColor: colors.color_text_second,
    },
    bedrooms: {
        width: '33%',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    iconBed: {
        marginRight: 7,
    },
    textBedrooms: {
        fontSize: 14,
        color: "$textColor",
    },
    viewDescription: {
        width: setWidth('90%'),
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexDirection: "column",
        marginTop: 25,
    },
    titleDescription: {
        fontSize: 15,
        color: "$textColor",
        fontWeight: "500",
    },
    textDescription: {
        fontSize: 13,
        color: "$textColor",
        marginTop: 7,
    },
    viewDetailsTwo: {
        width: setWidth('90%'),
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexDirection: "column",
        marginTop: 25,
    },
    titleDetailsTwo: {
        fontSize: 15,
        color: "$textColor",
        fontWeight: "500",
    },
    textDetailsTwo: {
        fontSize: 13,
        color: "$textColor",
        marginTop: 7,
    },
    propertyType: {
        width: setWidth('90%'),
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexDirection: "column",
        marginTop: 25,
    },
    titleProperty: {
        fontSize: 15,
        color: "$textColor",
        fontWeight: "500",
    },
    textType: {
        fontSize: 13,
        color: "$textColor",
        marginTop: 7,
    },
    storeys: {
        width: setWidth('90%'),
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexDirection: "column",
        marginTop: 25,
    },
    titleStoreys: {
        fontSize: 15,
        color: "$textColor",
        fontWeight: "500",
    },
    textStoreys: {
        fontSize: 13,
        color: "$textColor",
        marginTop: 7,
    },
    footer: {
        width: setWidth('100%'),
        justifyContent: "center",
        alignItems: "center",
    },
    photos: {
        width: '90%',
        marginTop: 25,
        marginBottom: 5,
    },
    textPhotos: {
        fontSize: 15,
        fontWeight: "500",
        color: "$textColor"
    },
    FlatList1: {
        width: '100%',
    },
    contentPhotos: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        marginBottom: 15,
        margin: 10,
    },
    touchable: {
        width: 120,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
    },
    imagePhotos: {
        width: '100%',
        height: 100,
        marginBottom: 3,
        borderRadius: 3,
    },
    map: {
        width: setWidth("90%"),
        height: 200,
        marginTop: 10,
        marginBottom: 20,
    },
});
