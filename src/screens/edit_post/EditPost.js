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
    Modal,
    Switch,
    ActivityIndicator, Linking,
} from "react-native";
import {createDrawerNavigator, createStackNavigator, createAppContainer} from "react-navigation";
import Icon from "react-native-vector-icons/EvilIcons";
import Icon3 from "react-native-vector-icons/Foundation";
import Icon4 from "react-native-vector-icons/AntDesign";
import FastImage from "react-native-fast-image";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {colors} from "../../cores/styles/colors";
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import Locales from "../../cores/languages/languages";
import darkTheme from "../../cores/viewComponents/themes/dark";
import lightTheme from "../../cores/viewComponents/themes/light";
import EStyleSheet from "react-native-extended-stylesheet";
import ImageSlider from 'react-native-image-slider';
import Slideshow from 'react-native-image-slider-show';
import {firebaseApp} from '../../components/firebase/Realtimedb';
import {
    getDataOfflineMode,
    saveDataOfflineMode,
    inValidateText,
    validateText, setWidth, setHeight
} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import constants from "../../assets/constants";
import global from "../../cores/utils/global";
import {large_bold, medium, medium_bold, mini, mini2, small_bold} from "../../cores/styles/styleText";
import {NavigationActions, StackActions} from "react-navigation";

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'EditPost'})],
});

const deviceW = Dimensions.get("window").width;

const basePx = 375;

function px2dp(px) {
    return (px * deviceW) / basePx;
}

export default class EditPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            data: [],
            data2: [],
            check: false,
            search: '',
            bg: colors.blue,
        };

        thisState = this;
    }

    async componentDidMount() {

        const backgroundColor = await getDataOfflineMode(constants.CHANGE_COLOR);
        console.log("colortheme: " + backgroundColor);
        if (validateText(backgroundColor)) {
            this.setState({
                    bg: backgroundColor
                }, () =>
                    global.colors = this.state.bg
            )
        } else {
            this.setState({
                    bg: colors.blue
                }, () =>
                    global.colors = this.state.bg
            )
        }

        this.listenForItems(firebaseApp.database());

    }

    listenForItems() {
        let array = [];
        const user = firebaseApp.auth().currentUser;
        firebaseApp.database().ref('data').child('sell').on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childData = childSnapshot.val();
                if (childData.uid === user.uid) {
                    array.push({
                        id: childSnapshot.key,
                        image: childData.image,
                        address: childData.address,
                        type: childData.type,
                        direction: childData.direction,
                        latitude: childData.latitude,
                        longitude: childData.longitude,
                        location: childData.location,
                        name: childData.name,
                        owner: childData.owner,
                        price: childData.price,
                        sqm: childData.sqm,
                        year: childData.year,
                        description: childData.description,
                        detail: childData.detail,
                        email: childData.email,
                        displayName: childData.displayName,
                        photoURL: childData.photoURL,
                        phoneNumber: childData.phoneNumber,
                        addressUser: childData.addressUser,
                        follow: childData.follow,
                        checkFavourite: childData.checkFavourite,
                        uid: childData.uid,
                    });
                    thisState.setState({
                        data: array,
                        isLoading: false,
                    });
                }
            });
            thisState.setState({
                data2: thisState.state.data,
                isLoading: false,
            }, function () {
                console.log("data2: " + JSON.stringify(this.state.data2));
            });
        });

        firebaseApp.database().ref('data').child('sell').on('child_removed', (snapshot) => {
            array = array.filter((x) => x.id !== snapshot.key);
            thisState.setState({
                data2: array,
                isLoading: false,
            });
        });

    }

    deletePost(item) {
        Alert.alert(
            'Delete Post ',
            'Do you want to delete post !',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {text: 'OK', onPress: () => this.delete(item)},
            ],
            {cancelable: false}
        );
    };

    delete(item) {
        firebaseApp.database().ref('data').child('sell').child(item.id).remove();
        this.listenForItems(firebaseApp.database());
        this.props.navigation.dispatch(resetAction)
    }

    render() {
        const color = this.state.bg;
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <StatusBar
                        barStyle="dank-content"
                        hidden={false}
                        backgroundColor="transparent"
                        translucent
                    />
                    <View style={styles.header}>
                        <Icon4 onPress={() => navigation.goBack()} style={styles.iconLeft} name="arrowleft"
                               size={px2dp(28)}/>
                        <TextComponent style={styles.titleHeader}>Edit Post</TextComponent>
                        <Icon style={styles.iconBell} name="bell" size={px2dp(30)}/>
                    </View>
                    <ActivityIndicator size="large"/>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dank-content"
                    hidden={false}
                    backgroundColor="transparent"
                    translucent
                />
                <View style={styles.header}>
                    <Icon4 onPress={() => navigation.goBack()} style={styles.iconLeft} name="arrowleft"
                           size={px2dp(28)}/>
                    <TextComponent style={styles.titleHeader}>Edit Post</TextComponent>
                    <Icon style={styles.iconBell} name="bell" size={px2dp(30)}/>
                </View>
                <KeyboardAwareScrollView style={styles.keyboardView}>
                    <View style={styles.body}>
                        <View style={styles.FlatList1}>
                            <FlatList
                                data={this.state.data2}
                                renderItem={({item}) => (
                                    <View style={styles.item}>
                                        <Image style={styles.imageItem}
                                               source={typeof item.image === "string"
                                                   ? {uri: item.image} : item.image}
                                        />
                                        <View style={styles.partBottom}>
                                            <TextComponent style={styles.title}>{item.name}</TextComponent>
                                            <View style={styles.content2}>
                                                <View style={styles.Address}>
                                                    <Icon4
                                                        style={styles.iconEnviromento}
                                                        name="enviromento"
                                                        size={px2dp(11)}
                                                        color="#666"
                                                    />
                                                    <TextComponent style={styles.textCity}>
                                                        {item.address}
                                                    </TextComponent>
                                                </View>
                                                <View style={styles.Sqm}>
                                                    <Icon4
                                                        style={styles.iconHome}
                                                        name="home"
                                                        size={px2dp(11)}
                                                        color="#666"
                                                    />
                                                    <Text style={styles.textKm}>{item.sqm}</Text>
                                                    <Text style={styles.textUnit}>sq/m</Text>
                                                </View>
                                            </View>
                                            <View style={styles.Price}>
                                                <TextComponent
                                                    style={[styles.textCurrency, {color: color}]}>$</TextComponent>
                                                <TextComponent
                                                    style={[styles.textMoney, {color: color}]}>{item.price}</TextComponent>
                                            </View>
                                        </View>
                                        <View style={styles.buttonFunction}>
                                            <TouchableOpacity style={[styles.btnEdit, {backgroundColor: color}]}
                                                              onPress={() => navigate("EditOnePost", {item: item})}>
                                                <Icon4 style={styles.iconEdit} name="edit" size={px2dp(15)}
                                                       color="#fff"/>
                                                <TextComponent style={styles.textEdit}>Edit</TextComponent>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={[styles.btnDelete, {backgroundColor: color}]}
                                                              onPress={() => this.deletePost(item)}>
                                                <Icon4 style={styles.iconDelete} name="delete" size={px2dp(15)}
                                                       color="#fff"/>
                                                <TextComponent style={styles.textDelete}>Delete</TextComponent>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                                keyExtractor={(item, index) => item.id}
                                numColumns={2}
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>

            </View>
        );
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "$background",
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
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
        height: setHeight("100%"),
    },
    body: {
        width: setWidth("100%"),
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
    },
    FlatList1: {
        width: setWidth("98%"),
        marginHorizontal: 5,
    },
    item: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "$bg2",
        margin: 5,
        borderRadius: 5
    },
    imageItem: {
        width: "100%",
        height: 150,
        marginBottom: 8,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
    partBottom: {
        width: "100%",
        paddingLeft: 8,
        paddingRight: 8,
        justifyContent: "space-between",
        height:setWidth('22%')
    },
    title: {
        ...small_bold,
        color: "$textColor",
        textAlign: "left"
    },
    content2: {
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 3,
    },
    Address: {
        width: "50%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "row",
        paddingRight: 7,
    },
    iconEnviromento: {
        marginRight: 2,
        marginTop: 1,
    },
    textCity: {
        ...mini,
        color: colors.color_text_second
    },
    Sqm: {
        width: "50%",
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
    },
    iconHome: {
        marginRight: 2
    },
    textKm: {
        marginRight: 2,
        ...mini,
        color: colors.color_text_second
    },
    textUnit: {
        ...mini,
        color: colors.color_text_second
    },
    Price: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 2
    },
    textCurrency: {
        ...mini2,
        //color: colors.button1,
        fontWeight: "500",
        marginRight: 1
    },
    textMoney: {
        ...mini2,
        //color: colors.button1,
        fontWeight: "bold"
    },
    buttonFunction: {
        width: "100%",
        height: 30,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 5
    },
    btnEdit: {
        width: "48%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 5,
        marginLeft: "1%",
    },
    iconEdit: {
        marginRight: 5
    },
    textEdit: {
        fontSize: 16,
        color: colors.white,
        fontWeight: "bold"
    },
    btnDelete: {
        width: "48%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 5,
        marginRight: "1%"
    },
    iconDelete: {
        marginRight: 5
    },
    textDelete: {
        fontSize: 16,
        color: colors.white,
        fontWeight: "bold"
    },
});

