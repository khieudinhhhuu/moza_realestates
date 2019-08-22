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
import {mini, mini2, mini2_bold, small_bold} from "../../../cores/styles/styleText";

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "$background"
    },
    body: {
        width: '100%',
        //paddingBottom: 20,
        marginTop: 20,
    },
    content: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: "$bg2",
        borderRadius: 4,
    },
    touchable: {
        width: '100%',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
    },
    partLeft: {
        width: '48%',
    },
    fastImage: {
        width: '100%',
        height: 170,
        borderRadius: 3,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    status: {
        width: 60,
        height: 23,
        //backgroundColor: colors.button1,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        top: 13,
        left: 11,
    },
    textStatus: {
        color: colors.white,
        ...mini,
    },
    partRight: {
        width: '52%',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: "space-between",
    },
    content2: {
        width: '40%',
        marginTop: 10,
        marginLeft: 3,
    },
    rating: {},
    content3: {
        width: '100%',
        marginTop: 7,
    },
    title: {
        ...mini2_bold,
        color: "$textColor",
    },
    content4: {
        width: '100%',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 7,
    },
    content5: {
        //width: '50%',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginRight: 7,
    },
    iconEnviromento: {
        marginRight: 2,
    },
    textCity: {
        ...mini,
        color: colors.color_text_second,
    },
    content6: {
        //width: '50%',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    iconHome: {
        marginRight: 2,
    },
    textKm: {
        marginRight: 2,
        ...mini,
        color: colors.color_text_second,
    },
    textUnit: {
        ...mini,
        color: colors.color_text_second,
    },
    detail: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
    },
    textDetail: {
        ...mini2,
        color: colors.color_text_second,
    },
    content7: {
        width: '100%',
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 5,
    },
    textCurrency: {
        ...mini2_bold,
        //color: colors.button1,
    },
    textMoney: {
        ...small_bold,
        //color: colors.button1,
    },
});
  