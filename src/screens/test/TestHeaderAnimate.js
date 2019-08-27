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

const Header_Minimum_Height = 70;

const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
    return px *  deviceW / basePx
}

export const scrollRangeForAnimation = 100;

export default class TestHeaderAnimate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            data: [],
        };

        thisState = this;
        this.AnimatedHeaderValue = new Animated.Value(0);
        this.currentY = new Animated.Value(0);
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

                outputRange: [ 'transparent' , "#0099ff"],

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
        // const Demo = ({scrollY, animationRange}) => {
        //     let _scrollView = null;
        //
        //     const onScrollEndSnapToEdge = event => {
        //         const y = event.nativeEvent.contentOffset.y;
        //         if (0 < y && y < scrollRangeForAnimation / 2) {
        //             if (_scrollView) {
        //                 _scrollView.scrollTo({y: 0});
        //             }
        //         } else if (scrollRangeForAnimation / 2 <= y && y < scrollRangeForAnimation) {
        //             if (_scrollView) {
        //                 _scrollView.scrollTo({y: scrollRangeForAnimation});
        //             }
        //         }
        //     };
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <StatusBar
                        barStyle="dark-content"
                        hidden={false}
                        backgroundColor="transparent"
                        translucent
                    />
                    <View style={styles.header}>
                        <Icon4 onPress={() => navigation.goBack()} style={styles.iconLeft} name="arrowleft" size={px2dp(28)}/>
                        {/*<Image style={styles.titleHeader} source={require("../../assets/image/Screen051.jpg")}/>*/}
                        <Icon onPress={() => this._onUpdate()} style={styles.iconBell} name="bell" size={px2dp(30)} />
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
                    backgroundColor="transparent"
                    translucent
                />
                <View style={styles.header}>
                    <Icon4 onPress={() => navigation.goBack()} style={styles.iconLeft} name="arrowleft" size={px2dp(28)}/>
                    {/*<Image style={styles.titleHeader} source={require("../../assets/image/Screen051.jpg")}/>*/}
                    <Icon onPress={() => this._onUpdate()} style={styles.iconBell} name="bell" size={px2dp(30)} />
                </View>
                <ScrollView
                    style={styles.keyboardView}
                    scrollEventThrottle={26}
                    //contentContainerStyle = {{ paddingTop: Header_Maximum_Height }}
                    onScroll={Animated.event(
                        [{nativeEvent: {
                            contentOffset: {
                                y: this.AnimatedHeaderValue,
                                //y2: this.currentY
                            }
                        }}]

                    )}
                >
                    <View style={styles.content2}>
                        <Image style={styles.imgbelow} source={require("../../assets/image/Screen051.jpg")}/>
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
                        />
                    </View>
                </ScrollView>

                <Animated.View style={[styles.HeaderStyle, {
                    height: AnimateHeaderHeight,
                    backgroundColor: AnimateHeaderBackgroundColor,
                    opacity: opacity,
                }]}>
                    <View style={styles.header}>
                        <Icon4 onPress={() => navigation.goBack()} style={styles.iconLeft} name="arrowleft" size={px2dp(28)}/>
                        <Image style={styles.titleHeader} source={require("../../assets/image/Screen051.jpg")}/>
                        <Icon style={styles.iconBell} name="bell" size={px2dp(30)}/>
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
    content2: {
        width: setWidth("100%"),
        height: 50,
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: "#e9e02f"
    },
    imgbelow: {
        width: 100,
        height: 50,
        marginLeft: 10,
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
        //backgroundColor: "#fff",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
    },
    iconLeft: {
        marginTop: 20,
        color: "#000",
    },
    titleHeader: {
        width: 70,
        height: 35,
        marginTop: 20,
        //opacity: 0.5,
    },
    iconBell: {
        marginTop: 20,
        color: "#000",
    },
    body: {
        width: setWidth('95%'),
        paddingBottom: 70,
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
