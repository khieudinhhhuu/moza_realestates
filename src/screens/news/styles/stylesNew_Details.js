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
import {
    horizontalView,
    margin20,
    marginRight10,
    marginRight20,
    marginTop20,
    rowView
} from "../../../cores/styles/styleView";
import {text13, texts, textTitle, typeText} from "../../../cores/viewComponents/text/texts";
import {
    large_bold,
    medium2_bold,
    medium_bold, mini2,
    small,
    small2,
    small2_bold,
    small_bold
} from "../../../cores/styles/styleText";

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '$bgColor',
    },
    header: {
        width: setWidth("100%"),
        height: 70,
        backgroundColor: "$header",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
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
    body: {
        marginLeft: 13,
        marginRight: 13,
        justifyContent: "center",
        alignItems: "center",
    },
    viewTitle: {
        width: "100%",
        justifyContent: "center",
        marginTop: 10,
    },
    textTitle: {
        ...medium_bold,
        color: "$textColor",
    },
    viewDateTime: {
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: 'row',
        marginTop: 10,
    },
    textDate: {
        ...small2,
        color: colors.color_text_second,
        lineHeight: 23,
        marginRight: 30
    },
    textTime: {
        ...small2,
        color: colors.color_text_second,
        lineHeight: 23,
    },
    viewDescription: {
        width: "100%",
        justifyContent: "center",
        marginTop: 10,
    },
    textDescription: {
        ...small2_bold,
        color: "$textColor",
        lineHeight: 23,
    },
    viewImage: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    imageItem: {
        width: "100%",
        height: 200
    },
    viewDetail: {
        width: "100%",
        justifyContent: "center",
        marginTop: 10,
    },
    textDetail: {
        ...small,
        color: colors.color_text_second,
        textAlign: "justify",
        lineHeight: 23,
    },
    viewLink: {
        width: "100%",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 20,
    },
    textLink: {
        ...small2_bold,
        color: colors.button1,
        textAlign: "justify",
        lineHeight: 23,
    },
    viewOtherNews: {
        width: "100%",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
    },
    textOtherNews: {
        ...medium_bold,
        color: "$textColor",
        textAlign: "center",
    },
    item: {
        width: '100%',
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        marginBottom: 15,
        marginTop: 10,
        borderRadius: 4,
        backgroundColor: "$bgColor"
    },
    viewImageTwo: {
        width: '30%',
    },
    imageItemTwo: {
        width: '100%',
        height: 100,
        borderRadius: 3,
    },
    viewText: {
        width: '70%',
        height: 100,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        paddingTop: 5,
        justifyContent: "space-between",
    },
    textTitleTwo: {
        ...small_bold,
        color: "$textColor",
    },
    viewDescriptionTwo: {
        width: '100%',
        height: 38,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    textDescriptionTwo: {
        ...mini2,
        color: colors.color_text_second,
    },
    textDateTwo: {
        ...mini2,
        color: colors.color_text_second,
    },
});

