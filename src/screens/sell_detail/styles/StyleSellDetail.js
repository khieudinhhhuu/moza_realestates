import EStyleSheet from "react-native-extended-stylesheet";
import {colors} from "../../../cores/styles/colors";
import {setHeight, setWidth} from "../../../cores/viewComponents/baseFunctions/BaseFunctions";
import {large_bold, medium2_bold, small, small2, small2_bold} from "../../../cores/styles/styleText";

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "$bgColor"
    },
    header: {
        height: 70,
        backgroundColor: "$header",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        width: "100%",
        paddingLeft: 3,
        paddingRight: 3,
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
    iconSearch: {
        marginTop: 20,
        color: colors.white,
        marginRight: 5,
    },
    keyboardView: {
        width: setWidth("100%"),
    },
    body: {
        width: setWidth("100%"),
        //height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    imageItem: {
        width: setWidth("100%"),
        height: 220,
    },
    viewName: {
        width: setWidth("95%"),
        justifyContent: "center",
        marginTop: 10,
    },
    textName: {
        ...medium2_bold,
        color: "$textColor",
    },
    content: {
        width: setWidth("95%"),
        height: 35,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        marginTop: 10,
    },
    acreage: {
        width: "49%",
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.lightGrey,
        borderRadius: 7,
    },
    textAcreage: {
        ...small2_bold,
        //color: colors.red,
    },
    price: {
        width: "49%",
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.lightGrey,
        borderRadius: 7,
    },
    textPrice: {
        ...small2_bold,
        //color: colors.red,
    },
    location: {
        width: setWidth("95%"),
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: 'row',
        marginTop: 10,
        paddingRight: 18,
    },
    iconLocation: {
        marginTop: 2,
    },
    textLocation: {
        ...small2_bold,
        //color: colors.button1,
    },
    property_type: {
        width: setWidth("95%"),
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: 'row',
        marginTop: 10,
        paddingRight: 18,
    },
    iconProperty_type: {
        marginRight: 3,
        marginTop: 2,
    },
    textProperty_type: {
        ...small2_bold,
        //color: colors.button1,
    },
    description: {
        width: setWidth("95%"),
        justifyContent: "center",
        marginTop: 10,
    },
    textDescription: {
        ...small,
        color: "$textColor",
    },
    year_built: {
        width: setWidth("95%"),
        justifyContent: "center",
        marginTop: 10,
    },
    textYear_built: {
        ...small,
        color: "$textColor",
    },
    direction: {
        width: setWidth("95%"),
        justifyContent: "center",
        marginTop: 10,
    },
    textDirection: {
        ...small,
        color: "$textColor",
    },
    city: {
        width: setWidth("95%"),
        justifyContent: "center",
        marginTop: 10,
    },
    textCity: {
        ...small,
        color: "$textColor",
    },
    owner: {
        width: setWidth("95%"),
        justifyContent: "center",
        marginTop: 10,
    },
    textOwner: {
        ...small,
        color: "$textColor",
    },
    detail: {
        width: setWidth("95%"),
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 20,
    },
    textDetail: {
        ...small,
        color: "$textColor",
    },
    map: {
        width: setWidth("95%"),
        height: 200
    },
    informationUser: {
        width: setWidth("95%"),
        height: 95,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        backgroundColor: colors.lightGrey,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 10,
    },
    viewAvatar: {
        width: "23%",
        height: "92%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 85,
        borderWidth: 0.5,
        borderColor: "#666",
        backgroundColor: colors.white,
        marginLeft: "2%",
    },
    imageAvatar: {
        width: 85,
        height: 85,
        borderRadius: 85,
    },
    viewText: {
        width: "75%",
        height: "100%",
        justifyContent: "space-between",
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 5,
    },
    textNameUser: {
        ...medium2_bold,
        color: colors.black,
        marginLeft: 2,
    },
    phoneUser: {
        width: "100%",
        alignItems: "center",
        flexDirection: 'row',
    },
    iconPhone: {
        marginRight: 3,
    },
    textPhone: {
        ...small2,
        color: colors.black,
    },
    addressUser: {
        width: "100%",
        alignItems: "center",
        flexDirection: 'row',
    },
    iconAddressUser: {

    },
    textAddressUser: {
        ...small2,
        color: colors.black,
    },
    btn: {
        width: setWidth("95%"),
        height: 40,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
    },
    btnCall: {
        width: "33%",
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
        width: "33%",
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
    btnCare: {
        width: "33%",
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        //backgroundColor: colors.button1,
        borderRadius: 5,
    },
    iconCare: {
        marginRight: 3,
    },
    textCare: {
        ...small2_bold,
        color: colors.white,
    },
});