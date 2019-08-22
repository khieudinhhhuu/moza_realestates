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
import {large_bold, medium_bold, mini2, small, small2, small2_bold, small_bold} from "../../../cores/styles/styleText";

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "$background",
    },
    map: {
        left: 0,
        right: 0,
        top: 120,
        bottom: 0,
        position: 'absolute'
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
        //marginLeft: 5,
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
        //marginRight: 5,
    },
    searchBar: {
        width: setWidth("100%"),
        //height: 50,
        backgroundColor: colors.white,
        justifyContent: "center",
        //alignItems: "center",
        flexDirection: "row",
    },
    iconRightcircleo: {
        marginLeft: 17,
        marginTop: 18,
    },
    iconSearch: {
        marginRight: 13,
        marginTop: 13,
    },
    viewStyle: {
        width: "12%",
        height: "13%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "absolute",
        borderRadius: 5,
        top: 220,
        right: 15,
    },
    styleMap: {
        width: "100%",
        height: "50%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        borderWidth: 0.5,
    },
    iconStyleMap: {
        color: colors.green
    },
    styleList: {
        width: "100%",
        height: "50%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        borderWidth: 0.5,
    },
    iconStyleList: {
        color: colors.green
    },
    modalContainer: {
        flex: 1,
        alignItems: "center",
    },
    ModalInsideView: {
        width: '92%',
        height: 140,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        position: "absolute",
        bottom: 80
    },
    content: {
        width: '100%',
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: "$bgColor"
    },
    viewImage: {
        width: '30%',
    },
    imageItem: {
        width: '100%',
        height: 100,
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
    },
    viewText: {
        width: '70%',
        height: 100,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        paddingTop: 1,
        //justifyContent: "space-between",
    },
    title: {
        ...medium_bold,
        color: "$textColor",
    },
    viewAddress: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
    },
    iconEnviromento: {
        marginRight: 2,
    },
    textCity: {
        ...small,
        color: colors.color_text_second
    },
    viewDescription: {
        width: '100%',
        //height: 33,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    textDescription: {
        ...mini2,
        color: colors.color_text_second,
    },
    textDetail: {
        ...mini2,
        color: "$textColor",
    },
    btn: {
        width: '100%',
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "$header",
        marginTop: 5,
        borderRadius: 5,
    },
    btnCancel: {
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
    textCancel: {
        ...medium_bold,
        color: colors.white,
    },
    body: {
        width: setWidth('95%'),
        paddingBottom: 70,
    },
    content2: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: "$bg2",
        borderRadius: 4,
    },
    itemTwo: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
    imageItemTwo: {
        width: '100%',
        height: 170,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
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
    content6: {
        width: '100%',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 13,
    },
    titleName: {
        ...small2_bold,
        color: "$textColor",
        textAlign: 'center',
    },
    viewRating: {
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
    content7: {
        width: '100%',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 1,
        marginBottom: 13,
    },
    content8: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    viewAddress2: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginRight: 10,
    },
    iconEnviromento10: {
        marginRight: 2,
    },
    textCity2: {
        ...small,
        color: colors.color_text_second,
    },
    viewSqm: {
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
    viewPrice: {
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
