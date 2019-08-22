import EStyleSheet from "react-native-extended-stylesheet";
import {colors} from "../../../cores/styles/colors";
import {setHeight, setWidth} from "../../../cores/viewComponents/baseFunctions/BaseFunctions";
import {large_bold, small, small2, small2_bold, small_bold} from "../../../cores/styles/styleText";

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
    textTitle: {
        color: "$textColor",
        textAlign: "center",
        ...small2_bold,
        marginTop: 10,
    },
    viewImageBDS: {
        width: setWidth('85%'),
        height: 200,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.lightGrey,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        borderRadius: 5,
    },
    imageBDS: {
        width: "100%",
        height: 200,
        borderRadius: 5,
    },
    btnSelectImage: {
        width: setWidth('85%'),
        height: 40,
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    selectImage: {
        width: "100%",
        height: 40,
        backgroundColor: colors.orange,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
    textSelectImage: {
        ...small2_bold,
        color: colors.white
    },
    information: {
        width: setWidth('85%'),
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    dropdown: {
        marginBottom: 20,
    },
    // viewSelect: {
    //   width: 335,
    //   height: 45,
    //   justifyContent: "center",
    //   alignItems: "center",
    //   borderRadius: 5,
    //   borderWidth: 0.5,
    //   borderColor: "black",
    //   marginBottom: 20,
    //   backgroundColor: '#fff'
    // },
    // option: {
    //   justifyContent: "center",
    //   alignItems: "center",
    // },
    // textOption: {
    //   fontSize: 16,
    //   textAlign: "center",
    //   fontWeight: 'bold'
    // },
    content: {
        width: "100%",
        height: 45,
        marginBottom: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.lightGrey,
        backgroundColor: colors.white,
        justifyContent: "center",
    },
    textInput: {
        ...small,
        paddingLeft: 10,
        paddingRight: 10
    },
    content2: {
        width: "100%",
        height: 80,
        marginBottom: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.lightGrey,
        backgroundColor: colors.white
    },
    textInput2: {
        paddingLeft: 10,
        paddingRight: 10,
        color: colors.black,
        ...small,
        textAlignVertical: 'top'
    },
    content3: {
        width: "100%",
        height: 140,
        marginBottom: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.lightGrey,
        backgroundColor: colors.white
    },
    latitude: {
        width: "100%",
        justifyContent: "center",
    },
    textLatitude: {
        ...small,
        paddingLeft: 10,
        paddingRight: 10,
        color: colors.black,
    },
    btnLocation: {
        width: "100%",
        height: 40,
        backgroundColor: colors.orange,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginBottom: 20,
    },
    textLocation: {
        ...small2_bold,
        color: colors.white
    },
    btn: {
        width: setWidth('85%'),
        height: 110,
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    btnPost: {
        width: "100%",
        height: 45,
        //backgroundColor: colors.button1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginBottom: 15
    },
    textPost: {
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