import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Animated,
    ScrollView,
    StatusBar,
    FlatList,
    TouchableOpacity
} from 'react-native';
import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/Foundation";
import Icon4 from "react-native-vector-icons/AntDesign";
import {firebaseApp} from "../../components/firebase/Realtimedb";
import FastImage from "react-native-fast-image";
import TextComponent from "../../cores/viewComponents/text/TextComponent";
import {setWidth} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import {mini2, small_bold} from "../../cores/styles/styleText";
import {colors} from "../../cores/styles/colors";
import EStyleSheet from "react-native-extended-stylesheet";

const deviceW = Dimensions.get('window').width;

const basePx = 375;

function px2dp(px) {
    return px *  deviceW / basePx
}


export default class TestHeaderAnimate2 extends Component {
    constructor(props) {
        super(props);

        this.offset = 0;

        this.state = {
            isLoading: true,
            data: [],
            scrollOffset: new Animated.Value(0),
            titleWidth: 0,
        };
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

        console.log("hhhhhh: " + JSON.stringify(this.state.data));

        this.state.scrollOffset.addListener(({ value }) => (this.offset = value));

    }

    onScroll = e => {
        const scrollSensitivity = 4 / 3;
        const offset = e.nativeEvent.contentOffset.y / scrollSensitivity;
        this.state.scrollOffset.setValue(offset);
    };

    getListItems = count => {
        const items = [];
        let i = 0;

        while (i < count) {
            i++;

            items.push(
                <View
                    style={[
                        styles.listItem,
                        { backgroundColor: i % 2 === 0 ? '#eee5ff' : '#ceebfd' },
                    ]}>
                    <Text style={{ color: '#999' }}>{`List Item ${i}`}</Text>
                </View>
            );
        }

        return items;
    };


    render() {
        const { scrollOffset } = this.state;
        const screenWidth = Dimensions.get('window').width;
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    hidden={false}
                    backgroundColor="transparent"
                    translucent
                />
                <Animated.View
                    style={[
                        styles.header,
                        {
                            paddingHorizontal: screenWidth * 0.05,
                            width: screenWidth,
                            height: scrollOffset.interpolate({
                                inputRange: [0, 200],
                                outputRange: [110, 70],
                                extrapolate: 'clamp',
                            }),
                        },
                    ]}>
                    <View style={styles.content5}>
                        <Icon4 onPress={() => navigation.goBack()} style={styles.iconLeft} name="arrowleft" size={px2dp(28)}/>
                    </View>
                    <Animated.Text
                        onLayout={e => {
                            if (this.offset === 0 && this.state.titleWidth === 0) {
                                const titleWidth = e.nativeEvent.layout.width;
                                this.setState({ titleWidth });
                            }
                        }}
                        style={{
                            fontWeight: 'bold',
                            color: "#000",
                            fontSize: scrollOffset.interpolate({
                                inputRange: [0, 200],
                                outputRange: [25, 22],
                                extrapolate: 'clamp',
                            }),
                            marginBottom: 10,
                            left: -8,
                        }}>
                        Header Title Here
                    </Animated.Text>
                    <Animated.View
                        style={{
                            width: scrollOffset.interpolate({
                                inputRange: [0, 200],
                                outputRange: [screenWidth * 0.9 - this.state.titleWidth, 0],
                                extrapolate: 'clamp',
                            }),
                        }}
                    />
                </Animated.View>

                <ScrollView
                    style={{ flex: 1, width: '100%' }}
                    contentContainerStyle={{ width: '100%' }}
                    onScroll={this.onScroll}
                    scrollEventThrottle={20}
                >
                    {this.getListItems(9)}
                    <Text>ahihi do ngoc</Text>
                    <View style={styles.body}>
                        <Text>ben trong body</Text>
                        {console.log("datataa: " + JSON.stringify(this.state.data))}
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
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#0099ff',
        borderBottomWidth: 1,
        borderColor: 'gainsboro',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
        //paddingBottom: 3,
    },
    content5: {
        width: '10%',
        height: 30,
        justifyContent: 'center',
        position: 'absolute',
        top: 30,
        left: 10,
    },
    iconLeft: {
        color: "#000",
    },
    listItem: {
        height: 200,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        width: setWidth('100%'),
        height: 600,
        backgroundColor: '#ff3c21',
        justifyContent: 'center',
        alignItems: 'center',
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
        backgroundColor: "#e91e82"
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