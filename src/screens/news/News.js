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
  ActivityIndicator
} from 'react-native';
import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/Foundation";
import Icon4 from "react-native-vector-icons/AntDesign";
import Icon5 from "react-native-vector-icons/MaterialIcons";
import {styles} from "./styles/styleNews";
import HeaderComponent from "../../cores/viewComponents/headerComponent/HeaderComponent";
import FastImage from "react-native-fast-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import TextComponent from "../../cores/viewComponents/text/TextComponent";
import Locales from "../../cores/languages/languages";
import {firebaseApp} from '../../components/firebase/Realtimedb';
import EStyleSheet from "react-native-extended-stylesheet";
import {colors} from "../../cores/styles/colors";
import {setWidth} from "../../cores/viewComponents/baseFunctions/BaseFunctions";

const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
  return px *  deviceW / basePx
}

export default class News extends Component {

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

    render() {
        if (this.state.isLoading) {
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
                        <TextComponent style={styles.titleHeader}>{Locales.News}</TextComponent>
                        <Icon style={styles.iconBell} name="bell" size={px2dp(30)} />
                    </View>
                    <ActivityIndicator size="large" />
                </View>
            );
        }
        const {navigate} = this.props.navigation;
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
                    <TextComponent style={styles.titleHeader}>{Locales.News}</TextComponent>
                    <Icon style={styles.iconBell} name="bell" size={px2dp(30)} />
                </View>
                <View style={styles.body}>
                    <FlatList
                        // horizontal
                        showsVerticalScrollIndicator={false}
                        data={this.state.data}
                        renderItem={({item}) => (
                            <TouchableOpacity style={styles.item} onPress={() => navigate('News_Details', {item: item})}>
                                <View style={styles.viewImage}>
                                    <FastImage 
                                        style={[styles.imageItem]}
                                        source={{uri: item.image}}/>
                                </View>
                                <View style={styles.viewText}>
                                    <TextComponent style={styles.title} numberOfLines={2}>{item.title}</TextComponent>
                                    <View style={styles.Description}>
                                        <TextComponent style={[styles.textDescription]} numberOfLines={2}>{item.description}</TextComponent>
                                    </View>
                                    <TextComponent style={[styles.textDate]}>{item.date}</TextComponent>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => item.id}
                        //numColumns={1}
                    />
                </View>   
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
//         paddingBottom: 70,
//     },
//     content: {
//         width: '100%',
//         height: 100,
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: 'row',
//         marginBottom: 5,
//         marginTop: 10,
//         borderRadius: 4,
//         backgroundColor: "$bgColor"
//     },
//     viewImage: {
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
//         paddingTop: 7,
//         justifyContent: "space-between",
//     },
//     title: {
//         fontSize: 15,
//         color: "$textColor",
//         fontWeight: "500",
//     },
//     content2: {
//         width: '100%',
//         height: 33,
//         justifyContent: "flex-start",
//         alignItems: "flex-start",
//     },
//     textContent2: {
//         fontSize: 13,
//         color: "#666",
//     },
//     textDate: {
//         fontSize: 13,
//         color: "#666",
//     },
// });

