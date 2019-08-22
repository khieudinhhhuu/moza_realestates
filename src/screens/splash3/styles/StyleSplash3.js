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
    Switch,
  } from "react-native";
import {setHeight, setWidth} from "../../../cores/viewComponents/baseFunctions/BaseFunctions";
import {colors} from "../../../cores/styles/colors";
import EStyleSheet from "react-native-extended-stylesheet";
import {small2_bold} from "../../../cores/styles/styleText";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: colors.bgLogin,
    },
    logo: {
      width: setWidth('95%'),
      height: setHeight('12%'),
      justifyContent: "center",
      alignItems: "center",
      marginTop: 110,
    },
    imageLogo: {
      width: '50%',
      height: '90%',
    },
    content1: {
      width: setWidth('100%'),
      height: setHeight('30%'),
      justifyContent: "center",
      alignItems: "center",
      marginTop: 50,
    },
    image: {
      width: '80%', 
      height: '100%', 
    },
    btn: {
      width: setWidth("80%"),
      height: 110,
      alignItems: "center",
      marginTop: 90,
    },
    btnSignin: {
      width: "100%",
      height: 45,
      backgroundColor: colors.button1,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 15,
      borderRadius: 35,
    },
    textSignin: {
      ...small2_bold,
      color: colors.white
    },
    btnSignup: {
      width: "100%",
      height: 45,
      backgroundColor: colors.white,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 35,
      borderWidth: 2,
      borderColor: colors.button1,
    },
    textSignup: {
        ...small2_bold,
      color: colors.button1
    },
  });
