import {Platform, StyleSheet} from "react-native";
import {setHeight, setWidth} from "../../../cores/viewComponents/baseFunctions/BaseFunctions";
import {colors} from "../../../cores/styles/colors";
import EStyleSheet from "react-native-extended-stylesheet";
import {large_bold, medium, medium_bold, mini2, small, small2_bold, small_bold} from "../../../cores/styles/styleText";

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "$background",
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },
    header: {
        width: setWidth("100%"),
        height: 70,
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
        marginRight: 20,
    },
    keyboardView: {
        width: setWidth("100%"),
        height: setHeight("100%"),
    },
    fake: {
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
    searchbar: {
        width: setWidth("94%"),
        height: 45,
        backgroundColor: "#F2F5F8",
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
        backgroundColor: "#F2F5F8",
        padding: 5,
        ...medium,
        marginLeft: 15
    },
    icon3: {
        marginRight: 15
    },
    segment: {
        width: 282,
        height: 50,
        backgroundColor: "#E2E6EC",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 30,
        bottom: 40,
        position: 'absolute',
    },
    buy: {
        //width: "50%",
        height: "100%",
        //backgroundColor: '#0174DF',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
    },
    textBuy: {
        ...medium_bold,
        //color: "red"
    },
    sell: {
        //width: "50%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
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
    body: {
        width: setWidth("100%"),
    },
    content: {
        width: setWidth("40%"),
        margin: 10,
    },
    touchable: {
        width: '100%',
        height: 200,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 7
    },
    image: {
        width: "100%",
        height: 140,
        marginBottom: 8,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
    },
    partBottom: {
        width: "100%",
        paddingLeft: 8,
        paddingRight: 8,
        justifyContent: "space-between"
    },
    title: {
        ...small_bold,
        color: colors.black,
        textAlign: "left"
    },
    body2: {
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
        ...mini2,
        color: colors.color_text_second,
    },
    textReviews: {
        ...mini2,
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
        //color: colors.button1,ss
    },
});