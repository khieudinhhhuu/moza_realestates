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
import {mini, mini2_bold, small_bold} from "../../../cores/styles/styleText";

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center",
        alignItems: "center",
        backgroundColor: "$background"
    },
    body: {
        width: '100%',
        marginTop: 10,
    },
    touchable: {
        width: 167,
        marginRight: 18,
        backgroundColor: "$bg2",
        marginTop: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    fastImage: {
        width: '100%',
        height: 150,
        borderRadius: 3,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    status: {
        width: 60,
        height: 23,
        //backgroundColor: colors.button1,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        top: 13,
        left: 11,
    },
    textStatus: {
        color: colors.white,
        ...mini,
    },
    partBottom: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: "space-between",
    },
    content2: {
        width: '40%',
        marginTop: 10,
        marginLeft: 7,
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
  