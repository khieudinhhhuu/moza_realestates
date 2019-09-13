import React, {Component} from "react";
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
    Modal
} from "react-native";
import TextComponent from "../../cores/viewComponents/text/TextComponent";
import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/Foundation";
import Icon4 from "react-native-vector-icons/AntDesign";
import Icon5 from "react-native-vector-icons/MaterialIcons";
import Icon6 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon7 from "react-native-vector-icons/FontAwesome";
import Icon8 from "react-native-vector-icons/Octicons";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {colors} from "../../cores/styles/colors";
import {large_bold} from "../../cores/styles/styleText";
import EStyleSheet from "react-native-extended-stylesheet";
import Locales from "../../cores/languages/languages";
import FastImage from "react-native-fast-image";
import {setHeight, setWidth} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import {firebaseApp} from "../../components/firebase/Realtimedb";
import {ChatRightHolder} from "./ChatRightHolder";
import {ChatLeftHolder} from "./ChatLeftHolder";

const deviceW = Dimensions.get("window").width;

const basePx = 375;

function px2dp(px) {
    return (px * deviceW) / basePx;
}

export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataChat: [],
            message: "",
            photoURL: 'http://media2.sieuhai.tv:8088/onbox/images/user_lead_image/20190408/84947430634_20190408001343.jpg',
        };

        thisState = this;
    }

    componentDidMount() {
        firebaseApp.database().ref('chats').on('value', function (snapshot) {
            thisState.setState({
                dataChat: Object.values(snapshot.val())
            });
        });
    }

    onSendMessage(){
        const item = this.props.navigation.state.params.item;
        const user = firebaseApp.auth().currentUser;
        firebaseApp.database().ref("chats").push({
            message: this.state.message,
            receiver: item.uid,
            sender: user.uid,
        });
        this.setState({
            message: "",
        })
    }

    _renderChatLine = (item) => {
        const user = firebaseApp.auth().currentUser;
        if(user.uid === item.sender) {
            return(
                <View style={{width: "100%", justifyContent: "center", alignItems: "center"}}>
                    <ChatRightHolder message={item.message} />
                </View>
            );
        } else {
            return(
                <View style={{width: "100%", justifyContent: "center", alignItems: "center"}}>
                    <ChatLeftHolder message={item.message} />
                </View>

            );
        }
    };

    render() {
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        const item = this.props.navigation.state.params.item;
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dank-content"
                    hidden={false}
                    backgroundColor="transparent"
                    translucent
                />
                <View style={styles.header}>
                    <Icon4 onPress={() => navigation.goBack()} style={styles.iconLeft} name="arrowleft" size={px2dp(28)}/>
                    <TextComponent style={styles.titleHeader}>Chat</TextComponent>
                    <Icon style={styles.iconBell} name="bell" size={px2dp(30)} />
                </View>
                <KeyboardAwareScrollView style={styles.keyboardView}>
                    <View style={styles.FlatList}>
                        <FlatList
                            data={this.state.dataChat}
                            renderItem={({item}) => this._renderChatLine(item)}
                            keyExtractor={(item, index) => item.id}
                        />
                    </View>
                </KeyboardAwareScrollView>
                <View style={styles.chat}>
                    <Icon4 style={styles.iconPicture} name="picture" size={px2dp(30)} color="#000"/>
                    <View style={styles.viewTextInput}>
                        <TextInput
                            style={styles.textInput}
                            placeholder= "Chat message"
                            returnKeyType="send"
                            keyboardType="default"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(message) => this.setState({message})}
                        />
                    </View>
                    <TouchableOpacity onPress={() => this.onSendMessage()}>
                        <Icon6 style={styles.iconSend} name="send" size={px2dp(35)} color="#1C70FF"/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff"
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
    },
    keyboardView: {
        width: setWidth("100%"),
        height: setHeight("100%")
    },
    FlatList: {
        width: "100%",
        height: "100%",
        paddingBottom: 10,
    },
    item: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    right: {
        width: "97%",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        flexDirection: 'row',
        marginTop: 5,
        paddingVertical: 5,
    },
    messageRight: {
        width: "60%",
        backgroundColor: "#3895ff",
        borderTopLeftRadius: 10,
        borderTopRightRadius:  5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    textRight: {
        fontSize: 15,
        color: colors.white
    },
    avatarRight: {
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 35,
        marginLeft: 5,
        marginRight: 5,
    },
    imageAvatar: {
        width: 35,
        height: 35,
        borderRadius: 35,
    },
    left: {
        width: "97%",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        flexDirection: 'row',
        marginTop: 5,
        paddingVertical: 5,
    },
    avatarLeft: {
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 35,
        marginLeft: 5,
        marginRight: 5,
    },
    messageLeft: {
        width: "60%",
        backgroundColor: "#6e6e6e",
        borderTopLeftRadius: 15,
        borderTopRightRadius:  10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    textLeft: {
        fontSize: 15,
        color: colors.white
    },
    chat: {
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingVertical: 3,
        backgroundColor: "#ececec",
    },
    iconPicture: {
        marginLeft: 3
    },
    viewTextInput: {
        width: "80%",
        height: 45,
        justifyContent: "center",
    },
    textInput: {
        fontSize: 17,
        paddingLeft: 10,
        paddingRight: 5
    },
});