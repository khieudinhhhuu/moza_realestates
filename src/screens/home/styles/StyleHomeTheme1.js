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
import {large_bold, medium, medium_bold, mini, mini2, small2_bold, small_bold} from "../../../cores/styles/styleText";

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "$background",
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
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 10,
    },
    iconLeft: {
        marginTop: 20,
        color: colors.white,
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
        height: setHeight("100%"),
    },
    body: {
        width: setWidth("100%"),
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    imageBackground: {
        width: "100%",
        height: 290,
        alignItems: "center"
    },
    searchBar: {
        width: setWidth("94%"),
        height: 45,
        backgroundColor: colors.white,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 5,
        marginTop: 75,
        position: 'absolute',
    },
    textInputSearch: {
        width: "83%",
        height: "100%",
        backgroundColor: colors.white,
        padding: 5,
        ...medium,
        marginLeft: 15
    },
    icon3: {
        marginRight: 15
    },
    segment: {
        width: setWidth("55%"),
        height: 38,
        backgroundColor: colors.white,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 30,
        bottom: 40,
        position: 'absolute',
    },
    buy: {
        width: "50%",
        height: "100%",
        //backgroundColor: '#0174DF',
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30
    },
    textBuy: {
        ...medium_bold,
        //color: "red"
    },
    sell: {
        width: "50%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30
    },
    textSell: {
        ...medium_bold,
        //color: "yellow"
    },
    information: {
        width: setWidth("95%"),
        alignItems: "flex-start",
        marginTop: 20,
        marginBottom: 5
    },
    textInformation: {
        ...medium_bold,
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
    imageItem: {
        width: "100%",
        height: 150,
        marginBottom: 8,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
    partBottom: {
        width: "100%",
        paddingLeft: 8,
        paddingRight: 8,
        justifyContent: "space-between"
    },
    title: {
        ...small_bold,
        color: "$textColor",
        textAlign: "left"
    },
    content2: {
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 3,
    },
    Address: {
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
    Sqm: {
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
    Price: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 2
    },
    textCurrency: {
        ...mini2,
        //color: colors.button1,
        fontWeight: "500",
        marginRight: 1
    },
    textMoney: {
        ...mini2,
        //color: colors.button1,
        fontWeight: "500"
    }
});
