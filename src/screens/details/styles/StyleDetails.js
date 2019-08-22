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
    content: {
        width: setWidth('100%'),
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 175,
        backgroundColor: colors.black,
        opacity: 0.7,
    },
    lineOne: {
        width: setWidth('90%'),
        justifyContent: "space-between",
        flexDirection: 'row',
        marginTop: 5
    },
    status: {
        width: 60,
        height: 23,
        backgroundColor: colors.button1,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    textStatus: {
        color: colors.white,
        fontSize: 10,
    },
    content1: {
        width: setWidth('90%'),
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 5,
    },
    viewTitle: {
        justifyContent: "center",
        alignItems: "center",
    },
    textTitle: {
        fontSize: 17,
        color: colors.white,
        fontWeight: "400",
        textAlign: 'center',
    },
    favorite: {
        width: 30,
        height: 30,
        backgroundColor: colors.white,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    iconFavorite: {},
    content2: {
        width: setWidth('90%'),
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 10
    },
    content3: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    viewAddress: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginRight: 10,
    },
    iconEnviromento: {},
    textCity: {
        fontSize: 13,
        color: colors.white,
    },
    viewSqm: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    iconHome: {
        marginRight: 1,
    },
    textKm: {
        marginRight: 1,
        fontSize: 13,
        color: colors.white,
    },
    textUnit: {
        fontSize: 13,
        color: colors.white,
    },
    viewReviews: {
        width: '25%',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    iconStar: {},
    rating: {
        fontSize: 13,
        color: colors.white,
        fontWeight: "400",
    },
    textReviews: {
        fontSize: 13,
        color: colors.white,
    },
    personal: {
        width: setWidth('90%'),
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    imageAvatar: {
        width: 60,
        height: 60,
        borderRadius: 60,
    },
    name: {
        width: '40%',
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexDirection: "column",
    },
    textName: {
        fontSize: 15,
        color: "$textColor",
        fontWeight: "500",
    },
    textOwner: {
        fontSize: 12,
        color: "$textColor",
    },
    call: {
        width: 60,
        height: 25,
        backgroundColor: colors.button1,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    textCall: {
        color: colors.white,
        fontSize: 12,
    },
    mail: {
        width: 60,
        height: 25,
        backgroundColor: colors.button1,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    textMail: {
        color: colors.white,
        fontSize: 12,
    },
    belongings: {
        width: setWidth('90%'),
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.color_text_second,
    },
    bedrooms: {
        width: '24%',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
    },
    iconBed: {},
    textBedrooms: {
        fontSize: 10,
        color: "$textColor",
        marginTop: 5,
    },
    information: {
        width: setWidth('90%'),
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 20,
    },
    propertyType: {
        width: '33%',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
    },
    titleProperty: {
        fontSize: 15,
        color: "$textColor",
        fontWeight: "500",
    },
    textType: {
        fontSize: 13,
        color: "$textColor",
        marginTop: 3,
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
    footer: {
        width: setWidth('90%'),
        justifyContent: "center",
        alignItems: "center",
    },
    photos: {
        width: '100%',
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
        marginTop: 5,
    },
    touchable: {
        width: 104,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 20
    },
    imagePhotos: {
        width: '100%',
        height: 100,
        marginBottom: 3,
        borderRadius: 3,
    },
});
  