import React, {Component} from 'react';
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
  ActivityIndicator,
  WebView
} from 'react-native';
import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/Entypo";
import Icon4 from "react-native-vector-icons/AntDesign";
import Icon5 from "react-native-vector-icons/MaterialIcons";
import {styles} from "./styles/stylesNew_Details";
import HeaderComponent from "../../cores/viewComponents/headerComponent/HeaderComponent";
import FastImage from "react-native-fast-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import TextComponent from "../../cores/viewComponents/text/TextComponent";
import Locales from "../../cores/languages/languages";
import {firebaseApp} from '../../components/firebase/Realtimedb';
import EStyleSheet from "react-native-extended-stylesheet";
import {colors} from "../../cores/styles/colors";
import {setWidth} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import {NavigationActions, StackActions} from "react-navigation";

const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
  return px *  deviceW / basePx
}

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'News_Details'})],
});

export default class News_Details extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            data: [],
        };

        thisState = this;
    }
    
    componentDidMount() {
        let array = [];
        firebaseApp.database().ref('data').child('news').on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                array.push({
                    id: childSnapshot.key,
                    title: childData.title,
                    description: childData.description,
                    detail: childData.detail,
                    image: childData.image,
                    date: childData.date,
                    time: childData.time,
                    link: childData.link,
                });
            });
            thisState.setState({
                data: array,
                isLoading: false,
            });
        });
    }

    _onUpdate(){
        Alert.alert("Function is updating");
    }

    render() {
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        const item = this.props.navigation.state.params.item;
        // const title = navigation.getParam('title', 'some default value');
        // const date = navigation.getParam('date', 'some default value');
        // const time = navigation.getParam('time', 'some default value');
        // const description = navigation.getParam('description', 'some default value');
        // const image = navigation.getParam('image', 'some default value');
        // const detail = navigation.getParam('detail', 'some default value');
        // const link = navigation.getParam('link', 'some default value');
        return (
            <View style={styles.container}>
                <StatusBar
                    // barStyle="$statusBar"
                    hidden={false}
                    backgroundColor="transparent"
                    translucent
                />
                <View style={styles.header}>
                    <Icon3 onPress={() => navigation.goBack()} style={styles.iconLeft} name="chevron-left" size={px2dp(30)}/>
                    <TextComponent style={styles.titleHeader}>{Locales.RealEstateNews}</TextComponent>
                    <Icon onPress={() => this._onUpdate()} style={styles.iconSearch} name="search" size={px2dp(30)}/>
                </View>
                <ScrollView>
                    <View style={styles.body}>
                        <View style={styles.viewTitle}>
                            <TextComponent style={styles.textTitle}>{item.title}</TextComponent>
                        </View>
                        <View style={styles.viewDateTime}>
                            <Icon5 style={styles.iconDate_range} name="date-range" size={px2dp(16)} color="#666"/>
                            <TextComponent style={styles.textDate}>{item.date}</TextComponent>
                            <Icon5 style={styles.iconAccess_time} name="access-time" size={px2dp(16)} color="#666"/>
                            <TextComponent style={styles.textTime}>{item.time}</TextComponent>
                        </View>
                        <View style={styles.viewDescription}>
                            <TextComponent style={styles.textDescription}>{item.description}</TextComponent>
                        </View>
                        <View style={styles.viewImage}>
                            <Image 
                                style={styles.imageItem}
                                source={{uri: item.image}} />
                        </View>
                        <View style={styles.viewDetail}>
                            <TextComponent style={styles.textDetail}>{item.detail}</TextComponent>
                        </View>
                        <View style={styles.viewLink}>
                            <TextComponent style={styles.textLink}>link: {item.link}</TextComponent>
                        </View>
                        <View style={styles.viewOtherNews}>
                            <TextComponent style={styles.textOtherNews}>------- {Locales.OtherNews} -------</TextComponent>
                        </View>
                        <FlatList
                            // horizontal
                            data={this.state.data}
                            renderItem={({item}) => (
                                <TouchableOpacity style={styles.item}
                                    onPress={() => navigate('News_Details', {item: item})}>
                                    <View style={styles.viewImageTwo}>
                                        <FastImage 
                                            style={[styles.imageItemTwo]}
                                            source={{uri: item.image}}/>
                                    </View>
                                    <View style={styles.viewText}>
                                        <TextComponent style={styles.textTitleTwo} numberOfLines={2}>{item.title}</TextComponent>
                                        <View style={styles.viewDescriptionTwo}>
                                            <TextComponent style={[styles.textDescriptionTwo]} numberOfLines={2}>{item.description}</TextComponent>
                                        </View>
                                        <TextComponent style={[styles.textDateTwo]}>{item.date}</TextComponent>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => item.id}
                            //numColumns={1}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

// const styles = EStyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: '$bgColor',
//     },
//     header: {
//         height: 70,
//         backgroundColor: "$header",
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: 'row',
//         width: "100%",
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
//         fontSize: 20,
//         marginTop: 20,
//     },
//     iconSearch: {
//         marginTop: 20,
//         color: "#fff",
//         marginRight: 5,
//     },
//     body: {
//         marginLeft: 15,
//         marginRight: 15,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     title: {
//         width: "100%",
//         justifyContent: "center",
//         marginTop: 10,
//     },
//     textTitle: {
//         fontSize: 20,
//         color: "$textColor",
//         fontWeight: "bold",
//     },
//     datetime: {
//         width: "100%",
//         justifyContent: "flex-start",
//         alignItems: "center",
//         flexDirection: 'row',
//         marginTop: 10,
//     },
//     textDate: {
//         fontSize: 16,
//         color: "#666",
//         lineHeight: 23,
//         marginRight: 30
//     },
//     textTime: {
//         fontSize: 16,
//         color: "#666",
//         lineHeight: 23,
//     },
//     description: {
//         width: "100%",
//         justifyContent: "center",
//         marginTop: 10,
//     },
//     textDescription: {
//         fontSize: 17,
//         color: "$textColor",
//         fontWeight: "500",
//         lineHeight: 23,
//     },
//     viewImage: {
//         width: "100%",
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 10,
//     },
//     image: {
//         width: "100%",
//         height: 200
//     },
//     detail: {
//         width: "100%",
//         justifyContent: "center",
//         marginTop: 10,
//     },
//     textDetail: {
//         fontSize: 16,
//         color: "#666",
//         textAlign: "justify",
//         lineHeight: 23,
//     },
//     link: {
//         width: "100%",
//         justifyContent: "center",
//         marginTop: 10,
//         marginBottom: 20,
//     },
//     textLink: {
//         fontSize: 16,
//         color: "#368fc7",
//         textAlign: "justify",
//         lineHeight: 23,
//         fontWeight: "bold",
//     },
//     tinkhac: {
//         width: "100%",
//         justifyContent: "center",
//         marginTop: 10,
//         marginBottom: 10,
//     },
//     textTinkhac: {
//         fontSize: 18,
//         color: "$textColor",
//         textAlign: "center",
//         fontWeight: "bold",
//     },
//     content: {
//         width: '100%',
//         height: 100,
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: 'row',
//         marginBottom: 15,
//         marginTop: 10,
//         borderRadius: 4,
//         backgroundColor: "$bgColor"
//     },
//     viewImage2: {
//         width: '30%',
//     },
//     fastImage: {
//         width: '100%',
//         height: 100,
//         borderRadius: 3,
//     },
//     viewText: {
//         width: '70%',
//         height: 100,
//         paddingLeft: 10,
//         paddingRight: 10,
//         paddingBottom: 5,
//         paddingTop: 5,
//         justifyContent: "space-between",
//     },
//     title2: {
//         fontSize: 15,
//         color: "$textColor",
//         fontWeight: "500",
//     },
//     content2: {
//         width: '100%',
//         height: 38,
//         justifyContent: "flex-start",
//         alignItems: "flex-start",
//     },
//     textContent2: {
//         fontSize: 13,
//         color: "#666",
//     },
//     textDate2: {
//         fontSize: 13,
//         color: "#666",
//     },
// });

