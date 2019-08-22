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
import {large_bold, medium, medium2_bold, medium_bold, mini2, small_bold} from "../../../cores/styles/styleText";

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center",
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
        marginBottom: 10,
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
        //marginRight: 5,
    },
    body: {
        width: setWidth('95%'),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "$bg2",
        borderRadius: 5,
    },
    content: {
        width: '100%',
        height: 60,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderBottomColor: colors.background,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        paddingLeft: '5%',
        paddingRight: '5%'
    },
    title: {
        ...small_bold,
        color: "$textColor"
    },
    text: {
        ...mini2,
        color: colors.color_text_second
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
    },
    ModalInsideView: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: "$background",
        height: 270,
        width: '81%',
        borderRadius: 10,
        marginTop: 150
    },
    modalTitle: {
        ...medium2_bold,
        color: "$textColor",
        textAlign: 'center',
        marginTop: 10,
    },
    elementContainer: {
        marginTop: 5,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
    },
    text2: {
        ...medium,
        textAlign: 'center',
        color: "$textColor",
        marginBottom: 3,
    },
    saparator: {
        height: 0.5,
        width: '70%',
        backgroundColor: colors.color_text_second,
    },
    btn: {
        width: "70%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        marginBottom: 15,
    },
    btnCancel: {
        width: "100%",
        height: 40,
        backgroundColor: colors.button1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    textCancel: {
        ...medium2_bold,
        color: colors.white
    },
    modal: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        // height: setHeight('40%'),
    },
    viewclose: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewButtonModal: {
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        height: 40,
        width: setWidth(38),
        marginBottom: 10
    },
    btnCancel2: {
        ...small_bold,
    },
    itemModal: {
        padding: 10,
        width: setWidth('90%'),
        borderRadius: 10
    },
    tittleModal: {
        ...medium_bold,
        paddingBottom: 10,
        paddingTop: 10
    },
});
  