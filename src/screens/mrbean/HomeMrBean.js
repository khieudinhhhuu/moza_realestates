import React, {Component} from 'react';
import {
    ScrollView, StyleSheet, View, Animated, Text, Image,
    Platform, SafeAreaView, TouchableOpacity, FlatList, Dimensions, StatusBar, ActivityIndicator
} from 'react-native';
import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/Foundation";
import Icon4 from "react-native-vector-icons/AntDesign";
import Icon5 from "react-native-vector-icons/MaterialIcons";
import {colors} from '../../cores/styles/colors';
import {setHeight, setWidth} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import ItemList from "../../cores/viewComponents/viewItems/ItemList";
import TextComponent from "../../cores/viewComponents/text/TextComponent";
import EStyleSheet from "react-native-extended-stylesheet";
import {firebaseApp} from "../../components/firebase/Realtimedb";
import Locales from "../../cores/languages/languages";
import {large_bold, mini2, small_bold} from "../../cores/styles/styleText";

const Header_Maximum_Height = 70;

const Header_Minimum_Height = 50;

const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
    return px *  deviceW / basePx
}

export const scrollRangeForAnimation = 100;

export default class HomeMrBean extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            data: [],
        };

        thisState = this;
        this.AnimatedHeaderValue = new Animated.Value(0);
    }

    componentDidMount() {
        let array = [];
        firebaseApp.database().ref('data').child('news').on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childData = childSnapshot.val();
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
        const AnimateHeaderBackgroundColor = this.AnimatedHeaderValue.interpolate(
            {
                inputRange: [0, (Header_Maximum_Height - Header_Minimum_Height)],

                outputRange: [ 'transparent' , "#fff"],

                extrapolate: 'clamp'
            });
        const AnimateHeaderHeight = this.AnimatedHeaderValue.interpolate(
            {
                inputRange: [0, (Header_Maximum_Height - Header_Minimum_Height)],

                outputRange: [Header_Maximum_Height, Header_Minimum_Height],

                extrapolate: 'clamp'
            });
        let opacity = this.AnimatedHeaderValue.interpolate({
            inputRange: [0, 200],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <StatusBar
                        barStyle="dark-content"
                        hidden={false}
                        backgroundColor="#BBBBBB"
                        translucent={false}
                    />
                    <View style={styles.header}>
                        <Icon2 style={styles.iconLeft} name="align-left" size={px2dp(25)}/>
                        <Icon4 style={styles.iconRight} name="appstore1" size={px2dp(22)} />
                    </View>
                    <ActivityIndicator size="large" />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor="#BBBBBB"
                    translucent={false}
                />
                <View style={styles.header}>
                    <Icon2 style={styles.iconLeft} name="align-left" size={px2dp(25)}/>
                    <Icon4 style={styles.iconRight} name="appstore1" size={px2dp(22)} />
                </View>
                <ScrollView
                    style={styles.keyboardView}
                    scrollEventThrottle={26}
                    onScroll={Animated.event(
                        [{nativeEvent: {
                                contentOffset: {
                                    y: this.AnimatedHeaderValue,
                                }
                            }}]

                    )}
                >
                    <View style={styles.viewImageLogo}>
                        <Image style={styles.imgLogo} source={require("../../assets/image/Screen051.jpg")}/>
                    </View>
                    <View style={styles.store}>
                        <FlatList
                            showsHorizontalScrollIndicator ={false}
                            data={this.state.data}
                            horizontal={true}
                            renderItem={({item}) => (
                                <TouchableOpacity style={styles.contentStore} onPress={() => navigate("DetailStore")}>
                                    <View style={styles.viewImageStore}>
                                        <FastImage
                                            style={styles.imageStore}
                                            source={{uri: item.image}}/>
                                    </View>
                                    <View style={styles.viewTitleStore}>
                                        <TextComponent style={styles.titleStore} numberOfLines={1}>{item.title}</TextComponent>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => item.id}
                        />
                    </View>
                    <View style={styles.body}>
                        <FlatList
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
                        />
                    </View>
                </ScrollView>

                <Animated.View style={[styles.HeaderStyle, {
                    height: AnimateHeaderHeight,
                    backgroundColor: AnimateHeaderBackgroundColor,
                    opacity: opacity,
                }]}>
                    <View style={styles.header}>
                        <Icon2 style={styles.iconLeft} name="align-left" size={px2dp(25)}/>
                        <Image style={styles.titleHeader} source={require("../../assets/image/Screen051.jpg")}/>
                        <Icon4 style={styles.iconRight} name="appstore1" size={px2dp(22)} />
                    </View>
                </Animated.View>
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
    HeaderStyle: {
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: (Platform.OS === 'ios') ? 20 : 0,
    },
    header: {
        width: setWidth("100%"),
        height: 50,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
    },
    iconLeft: {
        color: "#000",
    },
    titleHeader: {
        width: 70,
        height: 35,
    },
    iconRight: {
        color: "#000",
    },
    viewImageLogo: {
        width: setWidth("100%"),
        height: 50,
        marginBottom: 10,
        marginTop: 20,
    },
    imgLogo: {
        width: 100,
        height: 50,
        marginLeft: 10,
    },
    store: {
        width: "100%",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        marginTop: 10,
    },
    contentStore: {
        width: 80,
        height: 100,
        justifyContent: "center",
        flexDirection: 'column',
        marginLeft: 10,
    },
    viewImageStore: {
        width: 60,
        height: 60,
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#CCFFCC"
    },
    imageStore: {
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    viewTitleStore: {
        marginTop: 5,
    },
    titleStore: {
        fontSize: 15,
        color: "#000"
    },

    body: {
        width: setWidth('100%'),
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        paddingHorizontal: 10,
    },
    item: {
        width: '100%',
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        marginBottom: 5,
        marginTop: 10,
        borderRadius: 4,
        backgroundColor: "$bgColor"
    },
    viewImage: {
        width: '30%',
    },
    imageItem: {
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
        paddingTop: 7,
        justifyContent: "space-between",
    },
    title: {
        ...small_bold,
        color: "$textColor",
    },
    Description: {
        width: '100%',
        height: 33,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    textDescription: {
        ...mini2,
        color: colors.color_text_second,
    },
    textDate: {
        ...mini2,
        color: colors.color_text_second,
    },
});
