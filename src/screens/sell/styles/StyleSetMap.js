import EStyleSheet from "react-native-extended-stylesheet";
import {colors} from "../../../cores/styles/colors";
import {setHeight, setWidth} from "../../../cores/viewComponents/baseFunctions/BaseFunctions";
import {large_bold, medium_bold, small, small2} from "../../../cores/styles/styleText";

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '$background',
    },
    header: {
        height: 70,
        backgroundColor: "$header",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        width: "100%",
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
    latitude: {
        width: setWidth("90%"),
        justifyContent: "center",
        height: 65,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.lightGrey,
        backgroundColor: colors.white
    },
    textLatitude: {
        ...small2,
        paddingLeft: 10,
        paddingRight: 10,
        color: colors.black,
    },
    btn: {
        marginVertical: 5,
        backgroundColor: "rgba(255,255,255,0.7)",
        borderRadius: 30,
    },
    btnSelectLocation: {
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 30,
        padding: 12,
        width: 160,
    },
    textSelectLocation: {
        ...medium_bold,
        color: colors.black,
    }
});