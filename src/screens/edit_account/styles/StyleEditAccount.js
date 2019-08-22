import EStyleSheet from "react-native-extended-stylesheet";
import {colors} from "../../../cores/styles/colors";
import {setHeight, setWidth} from "../../../cores/viewComponents/baseFunctions/BaseFunctions";
import {large_bold, medium_bold, small, small2, small2_bold} from "../../../cores/styles/styleText";

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
    iconSearch: {
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
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 130,
        backgroundColor: colors.white,
        borderWidth: 0.5,
        borderColor: colors.color_text_second,
        justifyContent: "center",
        alignItems: "center",
        top: 20
    },
    imageAvatar: {
        width: 125,
        height: 125,
        borderRadius: 125
    },
    btnSelectImage: {
        width: setWidth("30%"),
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 35,
        marginBottom: 20,
        borderRadius: 5,
        //backgroundColor: colors.orange,
    },
    textSelectImage: {
        ...small2_bold,
        color: colors.white
    },
    information: {
        width: setWidth("85%"),
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        width: "100%",
        height: 45,
        marginBottom: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.lightGrey,
        backgroundColor: colors.white
    },
    textInput: {
        ...small2,
        paddingLeft: 10,
        paddingRight: 10
    },
    btn: {
        width: setWidth("85%"),
        height: 110,
        alignItems: "center",
        marginTop: 20,
    },
    btnUpdate: {
        width: "100%",
        height: 45,
        //backgroundColor: colors.button1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginBottom: 15
    },
    textUpdate: {
        ...small2_bold,
        color: colors.white
    },
    btnCancel: {
        width: "100%",
        height: 45,
        //backgroundColor: colors.button1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    textCancel: {
        ...small2_bold,
        color: colors.white
    },
});