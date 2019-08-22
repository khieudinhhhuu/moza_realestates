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
    //Modal,
    Switch,
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import Icon4 from "react-native-vector-icons/AntDesign";
import FastImage from "react-native-fast-image";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import EStyleSheet from "react-native-extended-stylesheet";
import {getDataOfflineMode, saveDataOfflineMode, inValidateText} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import constants from "../../assets/constants";
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import Locales from "../../cores/languages/languages";
import darkTheme from "../../cores/viewComponents/themes/dark";
import lightTheme from "../../cores/viewComponents/themes/light";
import {colors} from "../../cores/styles/colors";
import {StackActions, NavigationActions} from 'react-navigation';
import {styles} from './styles/StyleSettings';
import {firebaseApp} from '../../components/firebase/Realtimedb';
import Modal from "react-native-modal";

const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
    return px * deviceW / basePx
}

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'Menu'})],
});

export default class Settings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            theme: null,
            //style: null,
            SwitchOnValueHolder: false,
            ModalVisibleStatus: false,
            isModalVisible: false,
            language: '',
            backgroundColor: colors.blue,
        };
        const lang = [
            {shortform: 'en', longform: 'English'},
            {shortform: 'vn', longform: 'Viêt Nam'},
            {shortform: 'ar', longform: 'Arabic'},
        ];
        global.lang = lang;

    }

    async componentDidMount() {
        const backgroundColor = await getDataOfflineMode(constants.CHANGE_COLOR);
        const isChangeTheme = await getDataOfflineMode(constants.CHANGE_THEME);
        this.setState({
                theme: isChangeTheme,
                backgroundColor: backgroundColor
            },
            console.log("themeCheck: " + this.state.theme)
        );

        const dataLanguage = await getDataOfflineMode(constants.LANGUAGE);
        this.setState({
            getLanguage: dataLanguage,
        });

        const swi = await getDataOfflineMode('123');
        this.setState({
            SwitchOnValueHolder: swi,
        });

        Locales.setLanguage(this.state.getLanguage);
        await this.getProfile();

        const isDarkMode = await getDataOfflineMode(constants.DARK_MODE);
        this.setState({
                shouldRender: isDarkMode,
                SwitchOnValueHolder: isDarkMode,
            }, () => {
                if (isDarkMode === false || inValidateText(isDarkMode)) {
                    EStyleSheet.build(lightTheme);
                    //StatusBar.setBarStyle('dark-content');
                    console.log('log :', isDarkMode)
                } else {
                    EStyleSheet.build(darkTheme);
                    //StatusBar.setBarStyle('light-content');
                }
                console.log('themes isDarkMode: ' + isDarkMode)
            }
        );

    }

    changeRed() {
        Alert.alert(
            Locales.Notification,
            "Bạn có chắc chắn muốn đổi màu ứng dụng.\nỨng dụng sẽ khởi động lại",

            [
                {text: "Cancel", style: 'cancel',},
                {
                    text: "Ok", onPress: () => {
                        this.setState({
                                backgroundColor: colors.red
                            }, () =>
                                saveDataOfflineMode(constants.CHANGE_COLOR, this.state.backgroundColor),
                        );
                        this.props.navigation.dispatch(resetAction)
                    }
                },
            ],
            {cancelable: false},
        );


    }

    changeBlue() {

        Alert.alert(
            "Thông Báo",
            "Bạn có chắc chắn muốn đổi màu ứng dụng.\nỨng dụng sẽ khởi động lại",

            [
                {text: "Cancel", style: 'cancel',},
                {
                    text: "Ok", onPress: () => {

                        this.setState({
                                backgroundColor: colors.blue
                            }, () =>
                                saveDataOfflineMode(constants.CHANGE_COLOR, this.state.backgroundColor),
                        );
                        this.props.navigation.dispatch(resetAction)
                    }
                },
            ],
            {cancelable: false},
        );

    }

    changeOrange() {
        Alert.alert(
            "Thông Báo",
            "Bạn có chắc chắn muốn đổi màu ứng dụng.\nỨng dụng sẽ khởi động lại",

            [
                {text: "Cancel", style: 'cancel',},
                {
                    text: "Ok", onPress: () => {

                        this.setState({
                                backgroundColor: colors.orange
                            }, () =>
                                saveDataOfflineMode(constants.CHANGE_COLOR, this.state.backgroundColor),
                        ) ,this.props.navigation.dispatch(resetAction)
                    }
                },
            ],
            {cancelable: false},
        );
    }


    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
    };

    toggleModalTheme = () => {
        this.setState({isModalTheme: !this.state.isModalTheme});

    };

    settext(value) {
        Locales.setLanguage(value);
        console.log('lang: ' + value);
        // saveLanguage(value);
        saveDataOfflineMode(constants.LANGUAGE, value);
        // this.props.navigation.dispatch(resetAction);
        this.setState({ModalVisibleStatus: !this.state.ModalVisibleStatus});
        this.props.navigation.dispatch(resetAction);
    }


    ShowModalFunction(visible) {
        this.setState({ModalVisibleStatus: visible});
    }

    ShowAlert = (value) => {
        this.setState({
            SwitchOnValueHolder: value
        });
        if (value === false) {
            EStyleSheet.build(lightTheme);
            saveDataOfflineMode(constants.DARK_MODE, false);
            saveDataOfflineMode('123', false)
            //Alert.alert("Switch is Off.");
        } else {
            EStyleSheet.build(darkTheme);
            saveDataOfflineMode(constants.DARK_MODE, true);
            saveDataOfflineMode('123', true)
            //Alert.alert("Switch is On.");
        }
        this.props.navigation.dispatch(resetAction);
        console.log('themes:' + this.state.SwitchOnValueHolder)
    };


    signOutUser() {
        Alert.alert(
            'Real Estates ',
            'Sign out of the app !',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {text: 'OK', onPress: () => this.logout()},
            ],
            {cancelable: false}
        );
    };

    logout= async () =>{
        try {
            await firebaseApp.auth().signOut();
            this.props.navigation.navigate('Splash3');
        } catch (e) {
            console.log(e);
        }
    };

    _onUpdate(){
        Alert.alert("Function is updating");
    }

    render() {
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        const color = this.state.backgroundColor;
        return (
            <View style={styles.container}>
                <StatusBar
                    // barStyle="$statusBar"
                    hidden={false}
                    backgroundColor="transparent"
                    translucent
                />
                <View style={styles.header}>
                    <View style={styles.iconLeft}/>
                    {/*<Icon4 onPress={() => navigate('Menu')} style={styles.iconLeft} name="arrowleft" size={px2dp(28)}/>*/}
                    <TextComponent style={styles.titleHeader}>{Locales.Settings}</TextComponent>
                    <Icon onPress={() => this._onUpdate()} style={styles.iconBell} name="bell" size={px2dp(30)}/>
                </View>
                <View style={styles.body}>
                    <TouchableOpacity style={styles.content} onPress={() => this._onUpdate()}>
                        <TextComponent style={styles.title}>{Locales.CountrySettings}</TextComponent>
                        <TextComponent style={styles.text}>United States</TextComponent>
                    </TouchableOpacity>
                    <View style={styles.content}>
                        <TextComponent style={styles.title}>{Locales.DankthemesSettings}</TextComponent>
                        <Switch
                            style={{margin: 0}}
                            onValueChange={(value) => this.ShowAlert(value)}
                            value={this.state.SwitchOnValueHolder}/>
                    </View>
                    <TouchableOpacity style={styles.content} onPress={() => this.ShowModalFunction(true)}>
                        <TextComponent style={styles.title}>{Locales.LanguageSettings}</TextComponent>
                        <TextComponent style={styles.text}>{Locales.language}</TextComponent>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.content} onPress={() => this.props.navigation.push('ChangeTheme')}>
                        <TextComponent style={styles.title}>CHANGE THEME</TextComponent>
                        <TextComponent style={styles.text}>Theme {this.state.theme + 1}</TextComponent>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.content} onPress={this.toggleModalTheme}>
                        <TextComponent style={styles.title}>CHANGE COLOR</TextComponent>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.content} onPress={() => this._onUpdate()}>
                        <TextComponent style={styles.title}>{Locales.PrivacySettings}</TextComponent>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.content} onPress={() => this._onUpdate()}>
                        <TextComponent style={styles.title}>{Locales.FaqSettings}</TextComponent>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.content} onPress={() => this._onUpdate()}>
                        <TextComponent style={styles.title}>{Locales.HelpSettings}</TextComponent>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.content} onPress={() => this.signOutUser()}>
                        <TextComponent style={styles.title}>{Locales.LogoutSettings}</TextComponent>
                    </TouchableOpacity>
                </View>

                <Modal
                    transparent={true}
                    animationType={"slide"}
                    visible={this.state.ModalVisibleStatus}
                    onRequestClose={() => {this.ShowModalFunction(!this.state.ModalVisibleStatus)}}>

                    <TouchableOpacity
                        onPress={() => this.ShowModalFunction(!this.state.ModalVisibleStatus)}
                        style={styles.modalContainer}>
                        <View style={styles.ModalInsideView}>
                            <TextComponent style={styles.modalTitle}>{Locales.SelectYourLanguage}</TextComponent>
                            <ScrollView style={{width: '100%'}}>
                                {global.lang.map((item, key) => (
                                    <TouchableOpacity key={key} style={styles.elementContainer} onPress={() => this.settext(item.shortform)}>
                                        <TextComponent
                                            key={key}
                                            ref={item.shortform}
                                            onPress={() => this.settext(item.shortform)}
                                            style={styles.text2}>
                                            {item.longform}
                                        </TextComponent>
                                        <View key={key} style={styles.saparator}/>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                            <View style={styles.btn}>
                                <TouchableOpacity style={styles.btnCancel}
                                                  onPress={() => this.ShowModalFunction(!this.state.ModalVisibleStatus)}>
                                    <TextComponent style={styles.textCancel}>{Locales.CancelSettings}</TextComponent>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>

                <Modal isVisible={this.state.isModalTheme}>
                    <TouchableOpacity
                        onPress={this.toggleModalTheme}
                        style={styles.modal}>
                        <View style={styles.itemModal}>
                            <TextComponent style={styles.tittleModal}>{Locales.Change_Color}</TextComponent>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>

                                <TouchableOpacity
                                    onPress={() => [this.changeBlue(), this.toggleModalTheme()]}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 5,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: colors.blue,
                                        marginRight: 10
                                    }}>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => [this.changeRed(), this.toggleModalTheme()]}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 5,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: colors.red,
                                        marginRight: 10
                                    }}>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => [this.changeOrange(), this.toggleModalTheme()]}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 5,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: colors.orange,
                                        marginRight: 10
                                    }}>
                                </TouchableOpacity>

                            </View>

                            <View style={styles.viewclose}>
                                <TouchableOpacity style={[styles.viewButtonModal, {borderColor: color}]}
                                                  onPress={this.toggleModalTheme}>
                                    <TextComponent style={[styles.btnCancel2, {color: color}]}>{Locales.Cancel}</TextComponent>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </TouchableOpacity>
                </Modal>

            </View>
        );
    }
}

// const styles = EStyleSheet.create({
//     container: {
//         flex: 1,
//         //justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "$background"
//     },
//     header: {
//         height: 70,
//         backgroundColor: "$header",
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: 'row',
//         width: "100%",
//         paddingLeft: 10,
//         paddingRight: 10,
//         marginBottom: 10,
//     },
//     iconLeft: {
//         marginTop: 20,
//         color: "#fff",
//         marginLeft: 5,
//     },
//     titleHeader: {
//         color: "white",
//         textAlign: "center",
//         fontWeight: "bold",
//         fontSize: 22,
//         marginTop: 20,
//     },
//     iconBell: {
//         marginTop: 20,
//         color: "#fff",
//         marginRight: 5,
//     },
//     body: {
//         width: '90%',
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#fff",
//         borderRadius: 5,
//     },
//     content: {
//         width: '100%',
//         height: 60,
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//         borderBottomWidth: 0.5,
//         borderBottomColor: '#E6E6E6',
//         paddingLeft: '5%',
//         paddingRight: '5%'
//     },
//     title: {
//         fontSize: 15,
//         fontWeight: '500',
//         color: 'black'
//     },
//     text: {
//         fontSize: 14,
//         color: '#6E6E6E'
//     },
//     modalContainer: {
//         flex: 1,
//         alignItems: 'center'
//     },
//     ModalInsideView: {
//         justifyContent: 'space-evenly',
//         alignItems: 'center',
//         backgroundColor: "$background",
//         height: 270,
//         width: '81%',
//         borderRadius: 10,
//         marginTop: 150
//     },
//     modalTitle: {
//         fontSize: 20,
//         color: "$textColor",
//         fontWeight: "bold",
//         textAlign: 'center',
//         marginTop: 10,
//     },
//     elementContainer: {
//         marginTop: 10,
//         marginBottom: 15,
//         alignItems: 'center',
//     },
//     text2: {
//         fontSize: 18,
//         textAlign: 'center',
//         color: "$textColor",
//     },
//     saparator: {
//         height: 0.5,
//         width: '70%',
//         backgroundColor: '#C2C2C2',
//     },
//     btn: {
//         width: "70%",
//         height: 40,
//         alignItems: "center",
//         justifyContent: "center",
//         marginTop: 15,
//         marginBottom: 10,
//     },
//     btnCancel: {
//         width: "100%",
//         height: 40,
//         backgroundColor: "#0174DF",
//         alignItems: "center",
//         justifyContent: "center",
//         borderRadius: 5
//     },
//     textCancel: {
//         fontSize: 20,
//         fontWeight: "bold",
//         color: "#fff"
//     },
// });
