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
import {large_bold, medium} from "../../../cores/styles/styleText";

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "$background",
    },
    keyboardView: {
      width: "100%",
      height: "100%"
    },
    body: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    tabsss: {
        width: setWidth('90%'),
        borderWidth: 0,
        borderBottomWidth: 0,
        backgroundColor: "$background",
        elevation: 0,
        borderColor: colors.red,
        borderTopColor: colors.red
    },
    HeaderStyle: {
        //justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: (Platform.OS === 'ios') ? 20 : 0,
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
        marginLeft: 5,
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
        marginRight: 5,
    },
    searchbar: {
        width: setWidth('90%'),
        height: 50,
        backgroundColor: "$bg2",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        borderRadius: 5,
        marginBottom: 13,
        marginTop: 80,
    },
    iconRightcircleo: {
        marginLeft: 15,
    },
    textInputSearch: {
        width: '78%',
        height: '100%',
        backgroundColor: "$bg2",
        padding: 5,
        ...medium,
        marginLeft: 6,
    },
    iconSearch: {
        marginRight: 15
    },
    content: {
        width: setWidth('90%'),
        height: 50,
        backgroundColor: '$background',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        borderRadius: 5,
        marginBottom: 15,
    },
    house: {
        width: '48%',
        height: '100%',
        backgroundColor: "$bg2",
        alignItems: "center",
        flexDirection: 'row',
        borderRadius: 5,
    },
    iconHouse: {
        marginLeft: 20,
        marginRight: 10,
    },
    textHouse: {
        ...medium,
        color: colors.color_text_second
    },
    price: {
        width: '48%',
        height: '100%',
        backgroundColor: "$bg2",
        alignItems: "center",
        flexDirection: 'row',
        borderRadius: 5,
    },
    iconPrice: {
        marginLeft: 20,
        marginRight: 10,
    },
    textPrice: {
        ...medium,
        color: colors.color_text_second
    },
});
  